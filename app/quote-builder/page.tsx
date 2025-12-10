"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Minus, Trash2, Download, Mail, Printer, Building2, Paintbrush, Hammer, Wrench, Home, LogOut, Download as InstallIcon, X, Save, Check, FileText } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";
import { saveQuote, saveClient, type Quote } from "@/lib/firebase-quotes";

interface ServiceItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  postcode: string;
}

const availableServices = [
  {
    id: "chimney-removal-single",
    name: "Chimney Removal - Single Room Full Size",
    category: "Chimney Removal",
    basePrice: 900,
    unit: "per chimney",
  },
  {
    id: "chimney-removal-small",
    name: "Chimney Removal - Small Size",
    category: "Chimney Removal",
    basePrice: 500,
    unit: "per chimney",
  },
  {
    id: "chimney-removal-upstairs-downstairs",
    name: "Chimney Removal - Upstairs + Downstairs",
    category: "Chimney Removal",
    basePrice: 1800,
    unit: "per set",
  },
  {
    id: "chimney-removal-with-materials",
    name: "Chimney Removal - With Materials",
    category: "Chimney Removal",
    basePrice: 2200,
    unit: "per chimney",
  },
  {
    id: "skimming-single-room",
    name: "Skimming - Single Room",
    category: "Plastering & Skimming",
    basePrice: 150,
    unit: "per room",
  },
  {
    id: "skimming-multiple-rooms",
    name: "Skimming - Multiple Rooms",
    category: "Plastering & Skimming",
    basePrice: 130,
    unit: "per room",
  },
  {
    id: "plastering-small",
    name: "Full Plastering - Small Room (up to 12m²)",
    category: "Plastering & Skimming",
    basePrice: 350,
    unit: "per room",
  },
  {
    id: "plastering-medium",
    name: "Full Plastering - Medium Room (12-20m²)",
    category: "Plastering & Skimming",
    basePrice: 500,
    unit: "per room",
  },
  {
    id: "plastering-large",
    name: "Full Plastering - Large Room (20m²+)",
    category: "Plastering & Skimming",
    basePrice: 800,
    unit: "per room",
  },
  {
    id: "painting-interior-single",
    name: "Interior Painting - Single Room",
    category: "Painting & Decoration",
    basePrice: 300,
    unit: "per room",
  },
  {
    id: "painting-interior-multiple",
    name: "Interior Painting - Multiple Rooms",
    category: "Painting & Decoration",
    basePrice: 250,
    unit: "per room",
  },
  {
    id: "painting-exterior-small",
    name: "Exterior Painting - Small Property",
    category: "Painting & Decoration",
    basePrice: 1500,
    unit: "per property",
  },
  {
    id: "painting-exterior-medium",
    name: "Exterior Painting - Medium Property",
    category: "Painting & Decoration",
    basePrice: 2500,
    unit: "per property",
  },
  {
    id: "partition-standard",
    name: "Partition Installation - Standard",
    category: "Partition Installation",
    basePrice: 400,
    unit: "per partition",
  },
  {
    id: "partition-soundproof",
    name: "Partition Installation - Soundproof",
    category: "Partition Installation",
    basePrice: 800,
    unit: "per partition",
  },
  {
    id: "boarding-small",
    name: "Boarding - Small Area (up to 10m²)",
    category: "Boarding & Sealing",
    basePrice: 200,
    unit: "per area",
  },
  {
    id: "boarding-medium",
    name: "Boarding - Medium Area (10-20m²)",
    category: "Boarding & Sealing",
    basePrice: 400,
    unit: "per area",
  },
  {
    id: "sealing-gap",
    name: "Gap Sealing",
    category: "Boarding & Sealing",
    basePrice: 150,
    unit: "per area",
  },
  {
    id: "renovation-small",
    name: "Whole House Renovation - Small (1-2 bedrooms)",
    category: "Whole House Renovation",
    basePrice: 15000,
    unit: "per project",
  },
  {
    id: "renovation-medium",
    name: "Whole House Renovation - Medium (3-4 bedrooms)",
    category: "Whole House Renovation",
    basePrice: 35000,
    unit: "per project",
  },
];

export default function QuoteBuilder() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    email: "",
    phone: "",
    address: "",
    postcode: "",
  });

  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);
  const [quoteNumber, setQuoteNumber] = useState<string>("");
  const [quoteDate, setQuoteDate] = useState<Date | null>(null);
  const [validUntil, setValidUntil] = useState<Date | null>(null);
  const [notes, setNotes] = useState<string>("");
  const [internalNotes, setInternalNotes] = useState<string>("");
  const [reminderDate, setReminderDate] = useState<Date | null>(null);
  const [discount, setDiscount] = useState<number>(0);
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage");
  const [showPrintView, setShowPrintView] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [quoteStatus, setQuoteStatus] = useState<"draft" | "sent" | "accepted" | "rejected" | "expired">("draft");
  const quoteRef = useRef<HTMLDivElement>(null);

  // Check authentication on mount (client-side only)
  useEffect(() => {
    setIsMounted(true);
    
    // Only check authentication on client side
    if (typeof window !== "undefined") {
      const authenticated = localStorage.getItem("admin_authenticated") === "true";
      const loginTime = localStorage.getItem("admin_login_time");
      
      // Check if login is still valid (24 hours)
      if (authenticated && loginTime) {
        const timeDiff = Date.now() - parseInt(loginTime);
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        
        if (hoursDiff < 24) {
          setIsAuthenticated(true);
        } else {
          // Session expired
          localStorage.removeItem("admin_authenticated");
          localStorage.removeItem("admin_login_time");
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    }
    
    setIsCheckingAuth(false);
  }, []);

  // Add manifest link for PWA
  useEffect(() => {
    if (typeof window === "undefined" || !isAuthenticated) return;

    // Add manifest link to head
    const link = document.createElement("link");
    link.rel = "manifest";
    link.href = "/quote-builder-manifest.json";
    document.head.appendChild(link);

    return () => {
      // Cleanup on unmount
      const existingLink = document.querySelector('link[rel="manifest"][href="/quote-builder-manifest.json"]');
      if (existingLink) {
        document.head.removeChild(existingLink);
      }
    };
  }, [isAuthenticated]);

  // PWA Installation prompt
  useEffect(() => {
    if (typeof window === "undefined" || !isAuthenticated) return;

    // Check if already installed
    const isInstalled = window.matchMedia("(display-mode: standalone)").matches || 
                       (window.navigator as any).standalone === true ||
                       document.referrer.includes("android-app://");

    if (isInstalled) {
      return; // Already installed, don't show prompt
    }

    // Check if user has dismissed the prompt before
    const installPromptDismissed = localStorage.getItem("installPromptDismissed");
    if (installPromptDismissed) {
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show prompt after a delay
      setTimeout(() => {
        setShowInstallPrompt(true);
      }, 3000);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, [isAuthenticated]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Fallback: show instructions
      alert("To install this app:\n\nChrome/Edge: Click the install icon in the address bar\nSafari (iOS): Tap Share > Add to Home Screen\nFirefox: Not supported");
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }
    
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismissInstall = () => {
    setShowInstallPrompt(false);
    localStorage.setItem("installPromptDismissed", "true");
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated");
    localStorage.removeItem("admin_login_time");
    setIsAuthenticated(false);
    router.push("/quote-builder");
    router.refresh();
  };

  const handleSaveQuote = async () => {
    if (!customerInfo.name || !customerInfo.email || !quoteNumber || !quoteDate || !validUntil) {
      alert("Please fill in all required fields (Customer Name, Email, Quote Number, Date, Valid Until)");
      return;
    }

    if (selectedServices.length === 0) {
      alert("Please add at least one service to the quote");
      return;
    }

    setIsSaving(true);
    setSaveSuccess(false);

    try {
      // Save client first
      await saveClient({
        name: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone,
        address: customerInfo.address,
        postcode: customerInfo.postcode,
      });

      // Save quote
      const quoteData: Omit<Quote, "id" | "createdAt" | "updatedAt"> = {
        quoteNumber,
        date: quoteDate.toISOString().split("T")[0],
        validUntil: validUntil.toISOString().split("T")[0],
        customer: customerInfo,
        services: selectedServices,
        subtotal,
        discount,
        discountType,
        total,
        notes,
        internalNotes: internalNotes || undefined,
        reminderDate: reminderDate || undefined,
        status: quoteStatus,
      };

      await saveQuote(quoteData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error: any) {
      console.error("Error saving quote:", error);
      const errorMessage = error?.message || "Unknown error occurred";
      alert(`Failed to save quote: ${errorMessage}\n\nPlease check:\n1. Firestore database is created in Firebase Console\n2. Security rules allow writes\n3. You're connected to the internet`);
    } finally {
      setIsSaving(false);
    }
  };

  // Initialize client-side only values after mount and authentication
  useEffect(() => {
    if (isMounted && isAuthenticated) {
      // Check for duplicate quote data in URL
      const urlParams = new URLSearchParams(window.location.search);
      const duplicateData = urlParams.get("duplicate");
      const clientEmail = urlParams.get("client");

      if (duplicateData) {
        try {
          const data = JSON.parse(decodeURIComponent(duplicateData));
          setCustomerInfo(data.customer || customerInfo);
          setSelectedServices(data.services || []);
          setDiscount(data.discount || 0);
          setDiscountType(data.discountType || "percentage");
          setNotes(data.notes || "");
        } catch (error) {
          console.error("Error parsing duplicate data:", error);
        }
      }

      if (clientEmail) {
        // Load client data if available
        // This would require fetching from Firebase, but for now we'll just set the email
        setCustomerInfo({ ...customerInfo, email: decodeURIComponent(clientEmail) });
      }

      const now = new Date();
      const validDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      setQuoteDate(now);
      setValidUntil(validDate);
      setQuoteNumber(
        `QUO-${now.getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`
      );
    }
  }, [isMounted, isAuthenticated]);

  const addService = (service: typeof availableServices[0]) => {
    const newItem: ServiceItem = {
      id: `${service.id}-${Date.now()}`,
      name: service.name,
      description: service.unit,
      quantity: 1,
      unitPrice: service.basePrice,
      total: service.basePrice,
    };
    setSelectedServices([...selectedServices, newItem]);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setSelectedServices(
      selectedServices.map((item) =>
        item.id === id
          ? { ...item, quantity, total: item.unitPrice * quantity }
          : item
      )
    );
  };

  const removeService = (id: string) => {
    setSelectedServices(selectedServices.filter((item) => item.id !== id));
  };

  const updateUnitPrice = (id: string, price: number) => {
    if (price < 0) return;
    setSelectedServices(
      selectedServices.map((item) =>
        item.id === id
          ? { ...item, unitPrice: price, total: price * item.quantity }
          : item
      )
    );
  };

  const subtotal = selectedServices.reduce((sum, item) => sum + item.total, 0);
  const discountAmount = discountType === "percentage" 
    ? (subtotal * discount) / 100 
    : discount;
  const total = subtotal - discountAmount;

  const handlePrint = () => {
    setShowPrintView(true);
    // Wait for the print view to render
    setTimeout(() => {
      window.print();
      // Reset after print dialog closes
      setTimeout(() => {
        setShowPrintView(false);
      }, 500);
    }, 500);
  };

  const handleDownloadPDF = async () => {
    if (!quoteRef.current) {
      alert("Please fill in the quote details first.");
      return;
    }
    
    setIsGeneratingPDF(true);
    setShowPrintView(true);
    
    try {
      // Wait a bit for the print view to render
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const element = quoteRef.current;
      if (!element) {
        throw new Error("Quote element not found");
      }
      
      // Create a completely isolated version without Tailwind classes to avoid lab() color issues
      const cleanQuote = document.createElement("div");
      cleanQuote.style.cssText = `
        position: absolute;
        left: -9999px;
        top: 0;
        width: 800px;
        background: white;
        color: black;
        padding: 40px;
        font-family: Arial, sans-serif;
      `;
      
      // Build clean HTML manually to avoid CSS parsing issues
      const quoteHTML = `
        <div style="margin-bottom: 30px; border-bottom: 2px solid #202845; padding-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: start;">
            <div>
              <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <img src="/logo.png" alt="AK Home Renovation" style="height: 60px; width: auto; margin-right: 15px;" />
                <h1 style="color: #202845; font-size: 28px; font-weight: bold; margin: 0;">AK Home Renovation</h1>
              </div>
              <p style="color: #666; margin: 5px 0;">Professional House Refurbishment Services</p>
              <p style="color: #666; margin: 5px 0;">55 Colmore Row, Birmingham B3 2AA</p>
              <p style="color: #666; margin: 5px 0;">United Kingdom</p>
              <p style="color: #666; margin: 5px 0;">Phone: +44 7466 113917</p>
              <p style="color: #666; margin: 5px 0;">Email: info@akhomerenovation.co.uk</p>
            </div>
            <div style="text-align: right;">
              <h2 style="color: #202845; font-size: 24px; font-weight: bold; margin: 0 0 10px 0;">QUOTE</h2>
              <p style="color: #666; margin: 5px 0;">Quote #: ${quoteNumber}</p>
              <p style="color: #666; margin: 5px 0;">Date: ${quoteDate ? quoteDate.toLocaleDateString("en-GB") : ""}</p>
              <p style="color: #666; margin: 5px 0;">Valid Until: ${validUntil ? validUntil.toLocaleDateString("en-GB") : ""}</p>
            </div>
          </div>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h3 style="color: #202845; font-size: 18px; font-weight: bold; margin-bottom: 10px;">Bill To:</h3>
          <p style="color: #000; font-weight: bold; margin: 5px 0;">${customerInfo.name || ""}</p>
          <p style="color: #000; margin: 5px 0;">${customerInfo.address || ""}</p>
          <p style="color: #000; margin: 5px 0;">${customerInfo.postcode || ""}</p>
          <p style="color: #000; margin: 5px 0;">${customerInfo.phone || ""}</p>
          <p style="color: #000; margin: 5px 0;">${customerInfo.email || ""}</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background: #202845; color: white;">
              <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Description</th>
              <th style="padding: 12px; text-align: center; border: 1px solid #ddd;">Quantity</th>
              <th style="padding: 12px; text-align: right; border: 1px solid #ddd;">Unit Price</th>
              <th style="padding: 12px; text-align: right; border: 1px solid #ddd;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${selectedServices.map((item, index) => `
              <tr style="${index % 2 === 0 ? 'background: #f9f9f9;' : ''}">
                <td style="padding: 10px; border: 1px solid #ddd;">
                  <div style="font-weight: bold; color: #000;">${item.name}</div>
                  <div style="font-size: 12px; color: #666;">${item.description}</div>
                </td>
                <td style="padding: 10px; text-align: center; border: 1px solid #ddd;">${item.quantity}</td>
                <td style="padding: 10px; text-align: right; border: 1px solid #ddd;">£${item.unitPrice.toFixed(2)}</td>
                <td style="padding: 10px; text-align: right; font-weight: bold; border: 1px solid #ddd;">£${item.total.toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div style="display: flex; justify-content: flex-end; margin: 30px 0;">
          <div style="width: 300px;">
            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #ddd;">
              <span style="color: #666;">Subtotal:</span>
              <span style="font-weight: bold;">£${subtotal.toFixed(2)}</span>
            </div>
            ${discount > 0 ? `
              <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #ddd;">
                <span style="color: #666;">Discount (${discountType === "percentage" ? `${discount}%` : `£${discount.toFixed(2)}`}):</span>
                <span style="color: #d32f2f; font-weight: bold;">-£${discountAmount.toFixed(2)}</span>
              </div>
            ` : ''}
            <div style="display: flex; justify-content: space-between; padding: 12px 0; border-top: 2px solid #000; margin-top: 8px;">
              <span style="font-size: 20px; font-weight: bold;">Total:</span>
              <span style="font-size: 20px; font-weight: bold; color: #202845;">£${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        ${notes ? `
          <div style="margin: 30px 0; page-break-after: avoid;">
            <h3 style="color: #202845; font-size: 18px; font-weight: bold; margin-bottom: 10px;">Notes:</h3>
            <p style="color: #000; white-space: pre-wrap;">${notes}</p>
          </div>
        ` : ''}
        
        <div style="page-break-before: always; break-before: page; page-break-inside: avoid; padding-top: 20px; margin-top: 0;">
          <div style="border-top: 2px solid #ddd; padding-top: 20px; margin-bottom: 20px;"></div>
          <h3 style="color: #202845; font-size: 18px; font-weight: bold; margin-bottom: 15px; margin-top: 0; page-break-after: avoid;">Terms & Conditions:</h3>
          <ul style="color: #666; font-size: 14px; line-height: 1.8; padding-left: 20px;">
            <li>This quote is valid for 30 days from the date of issue.</li>
            <li>All prices are subject to site survey and may vary based on actual requirements.</li>
            <li>Payment terms: 30% deposit required to secure booking, balance on completion.</li>
            <li>All work is fully insured and guaranteed.</li>
            <li>Materials and skip hire (where applicable) are additional unless stated.</li>
            <li>We reserve the right to adjust prices if project scope changes.</li>
          </ul>
        </div>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 14px;">
          <p>Thank you for considering AK Home Renovation for your project.</p>
          <p style="margin-top: 10px;">For any questions, please contact us at +44 7466 113917 or info@akhomerenovation.co.uk</p>
        </div>
      `;
      
      cleanQuote.innerHTML = quoteHTML;
      document.body.appendChild(cleanQuote);
      
      const canvas = await html2canvas(cleanQuote, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        allowTaint: false,
        imageTimeout: 20000,
      });
      
      document.body.removeChild(cleanQuote);
      
      if (!canvas) {
        throw new Error("Failed to capture quote content");
      }
      
      const imgData = canvas.toDataURL("image/png", 1.0);
      if (!imgData || imgData === "data:,") {
        throw new Error("Failed to convert canvas to image");
      }
      
      const pdf = new jsPDF("p", "mm", "a4");
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      const fileName = `Quote-${quoteNumber}-${customerInfo.name || "Customer"}.pdf`.replace(/[^a-z0-9.-]/gi, "_");
      pdf.save(fileName);
    } catch (error) {
      console.error("Error generating PDF:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      alert(`Error generating PDF: ${errorMessage}\n\nPlease try using the Print option and save as PDF from your browser's print dialog.`);
    } finally {
      setIsGeneratingPDF(false);
      // Keep print view visible for a moment in case user wants to use print option
      setTimeout(() => {
        setShowPrintView(false);
      }, 2000);
    }
  };

  const handleSendEmail = async () => {
    if (!customerInfo.email) {
      alert("Please enter customer email address.");
      return;
    }

    if (!quoteNumber || !quoteDate || !validUntil) {
      alert("Please fill in all required fields (Quote Number, Date, Valid Until)");
      return;
    }

    if (selectedServices.length === 0) {
      alert("Please add at least one service to the quote");
      return;
    }

    setIsSendingEmail(true);
    setEmailSent(false);
    setShowPrintView(true);

    try {
      // Wait for print view to render
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate PDF first (reuse the same logic from handleDownloadPDF)
      const cleanQuote = document.createElement("div");
      cleanQuote.style.cssText = `
        position: absolute;
        left: -9999px;
        top: 0;
        width: 800px;
        background: white;
        color: black;
        padding: 40px;
        font-family: Arial, sans-serif;
      `;

      const quoteHTML = `
        <div style="margin-bottom: 30px; border-bottom: 2px solid #202845; padding-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: start;">
            <div>
              <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <img src="/logo.png" alt="AK Home Renovation" style="height: 60px; width: auto; margin-right: 15px;" />
                <h1 style="color: #202845; font-size: 28px; font-weight: bold; margin: 0;">AK Home Renovation</h1>
              </div>
              <p style="color: #666; margin: 5px 0;">Professional House Refurbishment Services</p>
              <p style="color: #666; margin: 5px 0;">55 Colmore Row, Birmingham B3 2AA</p>
              <p style="color: #666; margin: 5px 0;">United Kingdom</p>
              <p style="color: #666; margin: 5px 0;">Phone: +44 7466 113917</p>
              <p style="color: #666; margin: 5px 0;">Email: info@akhomerenovation.co.uk</p>
            </div>
            <div style="text-align: right;">
              <h2 style="color: #202845; font-size: 24px; font-weight: bold; margin: 0 0 10px 0;">QUOTE</h2>
              <p style="color: #666; margin: 5px 0;">Quote #: ${quoteNumber}</p>
              <p style="color: #666; margin: 5px 0;">Date: ${quoteDate ? quoteDate.toLocaleDateString("en-GB") : ""}</p>
              <p style="color: #666; margin: 5px 0;">Valid Until: ${validUntil ? validUntil.toLocaleDateString("en-GB") : ""}</p>
            </div>
          </div>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h3 style="color: #202845; font-size: 18px; font-weight: bold; margin-bottom: 10px;">Bill To:</h3>
          <p style="color: #000; font-weight: bold; margin: 5px 0;">${customerInfo.name || ""}</p>
          <p style="color: #000; margin: 5px 0;">${customerInfo.address || ""}</p>
          <p style="color: #000; margin: 5px 0;">${customerInfo.postcode || ""}</p>
          <p style="color: #000; margin: 5px 0;">${customerInfo.phone || ""}</p>
          <p style="color: #000; margin: 5px 0;">${customerInfo.email || ""}</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background: #202845; color: white;">
              <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Description</th>
              <th style="padding: 12px; text-align: center; border: 1px solid #ddd;">Quantity</th>
              <th style="padding: 12px; text-align: right; border: 1px solid #ddd;">Unit Price</th>
              <th style="padding: 12px; text-align: right; border: 1px solid #ddd;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${selectedServices.map((item, index) => `
              <tr style="${index % 2 === 0 ? 'background: #f9f9f9;' : ''}">
                <td style="padding: 10px; border: 1px solid #ddd;">
                  <div style="font-weight: bold; color: #000;">${item.name}</div>
                  <div style="font-size: 12px; color: #666;">${item.description}</div>
                </td>
                <td style="padding: 10px; text-align: center; border: 1px solid #ddd;">${item.quantity}</td>
                <td style="padding: 10px; text-align: right; border: 1px solid #ddd;">£${item.unitPrice.toFixed(2)}</td>
                <td style="padding: 10px; text-align: right; font-weight: bold; border: 1px solid #ddd;">£${item.total.toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div style="display: flex; justify-content: flex-end; margin: 30px 0;">
          <div style="width: 300px;">
            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #ddd;">
              <span style="color: #666;">Subtotal:</span>
              <span style="font-weight: bold;">£${subtotal.toFixed(2)}</span>
            </div>
            ${discount > 0 ? `
              <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #ddd;">
                <span style="color: #666;">Discount (${discountType === "percentage" ? `${discount}%` : `£${discount.toFixed(2)}`}):</span>
                <span style="color: #d32f2f; font-weight: bold;">-£${discountAmount.toFixed(2)}</span>
              </div>
            ` : ''}
            <div style="display: flex; justify-content: space-between; padding: 12px 0; border-top: 2px solid #000; margin-top: 8px;">
              <span style="font-size: 20px; font-weight: bold;">Total:</span>
              <span style="font-size: 20px; font-weight: bold; color: #202845;">£${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        ${notes ? `
          <div style="margin: 30px 0; page-break-after: avoid;">
            <h3 style="color: #202845; font-size: 18px; font-weight: bold; margin-bottom: 10px;">Notes:</h3>
            <p style="color: #000; white-space: pre-wrap;">${notes}</p>
          </div>
        ` : ''}
        
        <div style="page-break-before: always; break-before: page; page-break-inside: avoid; padding-top: 20px; margin-top: 0;">
          <div style="border-top: 2px solid #ddd; padding-top: 20px; margin-bottom: 20px;"></div>
          <h3 style="color: #202845; font-size: 18px; font-weight: bold; margin-bottom: 15px; margin-top: 0; page-break-after: avoid;">Terms & Conditions:</h3>
          <ul style="color: #666; font-size: 14px; line-height: 1.8; padding-left: 20px;">
            <li>This quote is valid for 30 days from the date of issue.</li>
            <li>All prices are subject to site survey and may vary based on actual requirements.</li>
            <li>Payment terms: 30% deposit required to secure booking, balance on completion.</li>
            <li>All work is fully insured and guaranteed.</li>
            <li>Materials and skip hire (where applicable) are additional unless stated.</li>
            <li>We reserve the right to adjust prices if project scope changes.</li>
          </ul>
        </div>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 14px;">
          <p>Thank you for considering AK Home Renovation for your project.</p>
          <p style="margin-top: 10px;">For any questions, please contact us at +44 7466 113917 or info@akhomerenovation.co.uk</p>
        </div>
      `;

      cleanQuote.innerHTML = quoteHTML;
      document.body.appendChild(cleanQuote);

      const canvas = await html2canvas(cleanQuote, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        allowTaint: false,
        imageTimeout: 20000,
      });

      document.body.removeChild(cleanQuote);

      if (!canvas) {
        throw new Error("Failed to capture quote content");
      }

      const imgData = canvas.toDataURL("image/png", 1.0);
      if (!imgData || imgData === "data:,") {
        throw new Error("Failed to convert canvas to image");
      }

      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Convert PDF to base64
      const pdfBlob = pdf.output("blob");
      const reader = new FileReader();
      const pdfBase64 = await new Promise<string>((resolve, reject) => {
        reader.onloadend = () => {
          const base64String = (reader.result as string).split(",")[1];
          resolve(base64String);
        };
        reader.onerror = reject;
        reader.readAsDataURL(pdfBlob);
      });

      // Send email via API
      const response = await fetch("/api/send-quote-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: customerInfo.email,
          quoteNumber,
          customerName: customerInfo.name,
          pdfBase64,
          quoteDate: quoteDate.toISOString(),
          total,
          validUntil: validUntil.toISOString(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send email");
      }

      setEmailSent(true);
      setTimeout(() => setEmailSent(false), 5000);

      // Update quote status to "sent" if it's currently "draft"
      if (quoteStatus === "draft") {
        setQuoteStatus("sent");
      }
    } catch (error: any) {
      console.error("Error sending email:", error);
      alert(`Failed to send email: ${error.message}\n\nPlease check:\n1. Resend API key is configured in .env.local\n2. Domain is verified in Resend\n3. You're connected to the internet`);
    } finally {
      setIsSendingEmail(false);
      setShowPrintView(false);
    }
  };

  // Show loading state while checking authentication (client-side only)
  if (!isMounted || isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#202845] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login form if not authenticated (only after mount)
  if (isMounted && !isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${showPrintView ? "print:bg-white" : ""}`}>
      {/* PWA Install Prompt */}
      {showInstallPrompt && !showPrintView && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 bg-white border-2 border-[#202845] rounded-lg shadow-2xl p-4 animate-slide-up">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-[#202845] rounded-lg flex items-center justify-center flex-shrink-0">
                <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Install Quote Builder</h3>
                <p className="text-sm text-gray-600">Install as an app for quick access</p>
              </div>
            </div>
            <button
              onClick={handleDismissInstall}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleInstallClick}
              className="flex-1 bg-[#202845] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#1a1f36] transition-colors flex items-center justify-center space-x-2"
            >
              <InstallIcon className="w-4 h-4" />
              <span>Install</span>
            </button>
            <button
              onClick={handleDismissInstall}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              Not now
            </button>
          </div>
        </div>
      )}

      {/* Add manifest link for PWA */}
      {isMounted && isAuthenticated && (
        <link rel="manifest" href="/quote-builder-manifest.json" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        {!showPrintView && (
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Quote Builder</h1>
              <p className="text-gray-600">Create and customize quotes for your customers</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/quotes"
                className="flex items-center space-x-2 px-4 py-2 bg-white border-2 border-[#202845] text-[#202845] rounded-lg hover:bg-[#202845] hover:text-white transition-colors"
                title="View All Quotes"
              >
                <FileText className="w-5 h-5" />
                <span className="hidden sm:inline">View Quotes</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          {!showPrintView && (
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Information */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Customer Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, name: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202845]"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, email: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202845]"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, phone: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202845]"
                      placeholder="+44 7XXX XXXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postcode *
                    </label>
                    <input
                      type="text"
                      value={customerInfo.postcode}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, postcode: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202845]"
                      placeholder="SW1A 1AA"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      value={customerInfo.address}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, address: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202845]"
                      placeholder="Street address"
                    />
                  </div>
                </div>
              </div>

              {/* Add Services */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Add Services</h2>
                <div className="space-y-4">
                  {Object.entries(
                    availableServices.reduce((acc, service) => {
                      if (!acc[service.category]) acc[service.category] = [];
                      acc[service.category].push(service);
                      return acc;
                    }, {} as Record<string, typeof availableServices>)
                  ).map(([category, services]) => (
                    <div key={category} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <h3 className="font-semibold text-gray-900 mb-2">{category}</h3>
                      <div className="space-y-2">
                        {services.map((service) => (
                          <button
                            key={service.id}
                            onClick={() => addService(service)}
                            className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg flex justify-between items-center transition-colors"
                          >
                            <div>
                              <div className="font-medium text-gray-900">{service.name}</div>
                              <div className="text-sm text-gray-600">
                                £{service.basePrice.toFixed(2)} {service.unit}
                              </div>
                            </div>
                            <Plus className="w-5 h-5 text-[#202845]" />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selected Services */}
              {selectedServices.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Selected Services</h2>
                  <div className="space-y-4">
                    {selectedServices.map((item) => (
                      <div
                        key={item.id}
                        className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row md:items-center gap-4"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-100"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(item.id, parseInt(e.target.value) || 1)
                              }
                              className="w-16 text-center border-0 focus:ring-0"
                              min="1"
                            />
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-100"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="w-32">
                            <label className="text-xs text-gray-600 mb-1 block">
                              Unit Price (£)
                            </label>
                            <input
                              type="number"
                              value={item.unitPrice}
                              onChange={(e) =>
                                updateUnitPrice(item.id, parseFloat(e.target.value) || 0)
                              }
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                              min="0"
                              step="0.01"
                            />
                          </div>
                          <div className="w-24 text-right">
                            <div className="text-sm text-gray-600">Total</div>
                            <div className="font-bold text-gray-900">
                              £{item.total.toFixed(2)}
                            </div>
                          </div>
                          <button
                            onClick={() => removeService(item.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional Notes</h2>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202845]"
                  placeholder="Add any additional notes, terms, or conditions..."
                />
              </div>
            </div>
          )}

          {/* Right Column - Quote Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Quote Summary</h2>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quote Number
                  </label>
                  <input
                    type="text"
                    value={quoteNumber}
                    onChange={(e) => setQuoteNumber(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202845]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={discountType}
                      onChange={(e) => setDiscountType(e.target.value as "percentage" | "fixed")}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202845]"
                    >
                      <option value="percentage">%</option>
                      <option value="fixed">£</option>
                    </select>
                    <input
                      type="number"
                      value={discount}
                      onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202845]"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal:</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-red-600">
                    <span>Discount ({discountType === "percentage" ? `${discount}%` : `£${discount.toFixed(2)}`}):</span>
                    <span>-£{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total:</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
              </div>

              {!showPrintView && (
                <div className="mt-6 space-y-3">
                  <button
                    onClick={handleSaveQuote}
                    disabled={isSaving}
                    className={`w-full px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center ${
                      saveSuccess
                        ? "bg-green-600 text-white"
                        : "bg-[#202845] text-white hover:bg-[#1a1f36]"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {saveSuccess ? (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Quote Saved!
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5 mr-2" />
                        {isSaving ? "Saving..." : "Save Quote"}
                      </>
                    )}
                  </button>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quote Status
                    </label>
                    <select
                      value={quoteStatus}
                      onChange={(e) => setQuoteStatus(e.target.value as Quote["status"])}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202845]"
                    >
                      <option value="draft">Draft</option>
                      <option value="sent">Sent</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                      <option value="expired">Expired</option>
                    </select>
                  </div>
                  <button
                    onClick={handlePrint}
                    className="w-full bg-white border-2 border-[#202845] text-[#202845] px-4 py-3 rounded-lg font-semibold hover:bg-[#202845] hover:text-white transition-colors flex items-center justify-center"
                  >
                    <Printer className="w-5 h-5 mr-2" />
                    Print Quote
                  </button>
                  <button
                    onClick={handleDownloadPDF}
                    disabled={isGeneratingPDF}
                    className="w-full bg-white border-2 border-[#202845] text-[#202845] px-4 py-3 rounded-lg font-semibold hover:bg-[#202845] hover:text-white transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    {isGeneratingPDF ? "Generating PDF..." : "Download PDF"}
                  </button>
                  <a
                    href={`mailto:${customerInfo.email}?subject=Quote ${quoteNumber} - AK Home Renovation&body=Please find attached your quote.`}
                    className="w-full bg-white border-2 border-[#202845] text-[#202845] px-4 py-3 rounded-lg font-semibold hover:bg-[#202845] hover:text-white transition-colors flex items-center justify-center"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Email Quote
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Printable Quote View */}
        <div
          ref={quoteRef}
          data-quote-content
          className={`bg-white rounded-xl shadow-lg p-8 mt-8 ${showPrintView ? "block" : "hidden"} print:!block`}
          style={{ backgroundColor: "#ffffff" }}
        >
          <style dangerouslySetInnerHTML={{ __html: `
            @media print {
              @page {
                margin: 0.5in;
              }
              body * {
                visibility: hidden;
              }
              [data-quote-content],
              [data-quote-content] * {
                visibility: visible !important;
              }
              [data-quote-content] {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                background: white !important;
                display: block !important;
                visibility: visible !important;
              }
              .terms-section {
                page-break-before: always !important;
                break-before: page !important;
                page-break-inside: avoid !important;
              }
              .terms-section h3 {
                page-break-after: avoid !important;
              }
            }
          `}} />
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-start mb-8 pb-8 border-b-2 border-gray-300">
              <div>
                <div className="flex items-center mb-4">
                  <img src="/logo.png" alt="AK Home Renovation" className="h-16 w-auto mr-4" />
                  <h1 className="text-3xl font-bold text-[#202845]">AK Home Renovation</h1>
                </div>
                <p className="text-gray-600">Professional House Refurbishment Services</p>
                <p className="text-gray-600">55 Colmore Row, Birmingham B3 2AA</p>
                <p className="text-gray-600">United Kingdom</p>
                <p className="text-gray-600 mt-2">Phone: +44 7466 113917</p>
                <p className="text-gray-600">Email: info@akhomerenovation.co.uk</p>
              </div>
              <div className="text-right">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">QUOTE</h2>
                <p className="text-gray-600">Quote #: {quoteNumber}</p>
                <p className="text-gray-600">
                  Date: {quoteDate ? quoteDate.toLocaleDateString("en-GB") : "Loading..."}
                </p>
                <p className="text-gray-600">
                  Valid Until: {validUntil ? validUntil.toLocaleDateString("en-GB") : "Loading..."}
                </p>
              </div>
            </div>

            {/* Customer Info */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Bill To:</h3>
              <p className="text-gray-700 font-medium">{customerInfo.name}</p>
              <p className="text-gray-700">{customerInfo.address}</p>
              <p className="text-gray-700">
                {customerInfo.postcode}
              </p>
              <p className="text-gray-700">{customerInfo.phone}</p>
              <p className="text-gray-700">{customerInfo.email}</p>
            </div>

            {/* Services Table */}
            <div className="mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#202845] text-white">
                    <th className="border border-gray-300 px-4 py-3 text-left">Description</th>
                    <th className="border border-gray-300 px-4 py-3 text-center">Quantity</th>
                    <th className="border border-gray-300 px-4 py-3 text-right">Unit Price</th>
                    <th className="border border-gray-300 px-4 py-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedServices.map((item, index) => (
                    <tr key={item.id} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                      <td className="border border-gray-300 px-4 py-3">
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-600">{item.description}</div>
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center">
                        {item.quantity}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-right">
                        £{item.unitPrice.toFixed(2)}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-right font-medium">
                        £{item.total.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end mb-8">
              <div className="w-80">
                <div className="flex justify-between py-2 border-b border-gray-300">
                  <span className="text-gray-700">Subtotal:</span>
                  <span className="text-gray-900 font-medium">£{subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between py-2 border-b border-gray-300">
                    <span className="text-gray-700">Discount ({discountType === "percentage" ? `${discount}%` : `£${discount.toFixed(2)}`}):</span>
                    <span className="text-red-600 font-medium">-£{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between py-3 border-t-2 border-gray-900 mt-2">
                  <span className="text-xl font-bold text-gray-900">Total:</span>
                  <span className="text-xl font-bold text-[#202845]">£{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            {notes && (
              <div className="mb-8 print:page-break-after-avoid" style={{ pageBreakAfter: 'avoid' }}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Notes:</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{notes}</p>
              </div>
            )}

            {/* Terms */}
            <div className="terms-section pt-8" style={{ pageBreakBefore: 'always', breakBefore: 'page', pageBreakInside: 'avoid' }}>
              <div className="border-t-2 border-gray-300 pt-4 mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-0" style={{ pageBreakAfter: 'avoid' }}>Terms & Conditions:</h3>
              <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
                <li>This quote is valid for 30 days from the date of issue.</li>
                <li>All prices are subject to site survey and may vary based on actual requirements.</li>
                <li>Payment terms: 30% deposit required to secure booking, balance on completion.</li>
                <li>All work is fully insured and guaranteed.</li>
                <li>Materials and skip hire (where applicable) are additional unless stated.</li>
                <li>We reserve the right to adjust prices if project scope changes.</li>
              </ul>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-300 text-center text-gray-600 text-sm">
              <p>Thank you for considering AK Home Renovation for your project.</p>
              <p className="mt-2">
                For any questions, please contact us at +44 7466 113917 or
                info@akhomerenovation.co.uk
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print\\:block,
          .print\\:block * {
            visibility: visible;
          }
          .print\\:block {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          button {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

