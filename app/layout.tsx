import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AK Home Renovation - Professional House Refurbishment Services UK",
    template: "%s | AK Home Renovation",
  },
  description: "Professional house refurbishment and renovation services across the UK. Expert chimney removal, plastering, painting, decoration, partitions, boarding, sealing, and complete home renovations. Book online today!",
  keywords: [
    "house refurbishment UK",
    "home renovation",
    "chimney removal",
    "plastering services",
    "painting and decoration",
    "partition installation",
    "boarding and sealing",
    "house renovation UK",
    "home maintenance",
    "skimming services",
    "building contractor UK",
    "home improvement services",
    "property renovation",
    "house refurbishment Birmingham",
    "professional builders UK",
  ],
  authors: [{ name: "AK Home Renovation" }],
  creator: "AK Home Renovation",
  publisher: "AK Home Renovation",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://akhomerenovation.co.uk"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/logo.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/logo.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://akhomerenovation.co.uk",
    title: "AK Home Renovation - Professional House Refurbishment Services UK",
    description: "Professional house refurbishment and renovation services across the UK. Expert chimney removal, plastering, painting, decoration, partitions, boarding, sealing, and complete home renovations. Book online today!",
    siteName: "AK Home Renovation",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AK Home Renovation - Professional House Refurbishment Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AK Home Renovation - Professional House Refurbishment Services UK",
    description: "Professional house refurbishment and renovation services across the UK. Expert services for all your home improvement needs.",
    images: ["/og-image.jpg"],
    creator: "@akhomerenovation",
    site: "@akhomerenovation",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add Google Search Console verification code here when available
    // google: "your-google-verification-code",
  },
  category: "Home Improvement",
  classification: "Business",
  other: {
    "geo.region": "GB",
    "geo.placename": "Birmingham",
    "geo.position": "52.4862;-1.8904",
    "ICBM": "52.4862, -1.8904",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HomeImprovementContractor",
              "@id": "https://akhomerenovation.co.uk/#organization",
              name: "AK Home Renovation",
              alternateName: "AK Home Renovation UK",
              description: "Professional house refurbishment and renovation services across the UK. Expert chimney removal, plastering, painting, decoration, partitions, boarding, sealing, and complete home renovations.",
              url: "https://akhomerenovation.co.uk",
              logo: "https://akhomerenovation.co.uk/logo.png",
              image: "https://akhomerenovation.co.uk/og-image.jpg",
              telephone: "+44 7466 113917",
              email: "info@akhomerenovation.co.uk",
              address: {
                "@type": "PostalAddress",
                streetAddress: "55 Colmore Row",
                addressLocality: "Birmingham",
                addressRegion: "West Midlands",
                postalCode: "B3 2AA",
                addressCountry: "GB",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "52.4862",
                longitude: "-1.8904",
              },
              areaServed: {
                "@type": "Country",
                name: "United Kingdom",
              },
              serviceType: [
                "Chimney Removal",
                "Plastering",
                "Painting and Decoration",
                "Partition Installation",
                "Boarding and Sealing",
                "House Renovation",
                "Home Maintenance",
                "Skimming",
              ],
              priceRange: "££",
              sameAs: [
                "https://www.facebook.com/akhomerenovation",
                "https://www.instagram.com/akhomerenovation",
                "https://www.tiktok.com/@akhomerenovation",
                "https://www.youtube.com/@akhomerenovation",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "127",
                bestRating: "5",
                worstRating: "1",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://akhomerenovation.co.uk/#website",
              url: "https://akhomerenovation.co.uk",
              name: "AK Home Renovation",
              description: "Professional house refurbishment and renovation services across the UK",
              publisher: {
                "@id": "https://akhomerenovation.co.uk/#organization",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://akhomerenovation.co.uk/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://akhomerenovation.co.uk",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Services",
                  item: "https://akhomerenovation.co.uk/services",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Contact",
                  item: "https://akhomerenovation.co.uk/contact",
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <GoogleAnalytics />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
