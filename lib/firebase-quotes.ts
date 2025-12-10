import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  QueryConstraint,
} from "firebase/firestore";
import { db } from "./firebase";

export interface Quote {
  id?: string;
  quoteNumber: string;
  date: string;
  validUntil: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    postcode: string;
  };
  services: Array<{
    id: string;
    name: string;
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  subtotal: number;
  discount: number;
  discountType: "percentage" | "fixed";
  total: number;
  notes: string;
  internalNotes?: string;
  reminderDate?: Date;
  status: "draft" | "sent" | "accepted" | "rejected" | "expired";
  createdAt: Date;
  updatedAt: Date;
  sentAt?: Date;
  acceptedAt?: Date;
  rejectedAt?: Date;
}

export interface Client {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  postcode: string;
  createdAt: Date;
  updatedAt: Date;
  totalQuotes: number;
  acceptedQuotes: number;
  totalValue: number;
}

// Save a new quote
export async function saveQuote(quote: Omit<Quote, "id" | "createdAt" | "updatedAt">): Promise<string> {
  if (!db) {
    throw new Error("Firebase is not initialized. Please check your environment variables.");
  }
  try {
    const quoteData = {
      ...quote,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      sentAt: quote.status === "sent" ? Timestamp.now() : null,
    };
    const docRef = await addDoc(collection(db, "quotes"), quoteData);
    return docRef.id;
  } catch (error) {
    console.error("Error saving quote:", error);
    throw error;
  }
}

// Get all quotes with optional filters
export async function getQuotes(filters?: {
  status?: Quote["status"];
  customerEmail?: string;
  startDate?: Date;
  endDate?: Date;
}): Promise<Quote[]> {
  if (!db) {
    throw new Error("Firebase is not initialized. Please check your environment variables.");
  }
  try {
    const constraints: QueryConstraint[] = [orderBy("createdAt", "desc")];

    if (filters?.status) {
      constraints.push(where("status", "==", filters.status));
    }

    if (filters?.customerEmail) {
      constraints.push(where("customer.email", "==", filters.customerEmail));
    }

    if (filters?.startDate) {
      constraints.push(where("createdAt", ">=", Timestamp.fromDate(filters.startDate)));
    }

    if (filters?.endDate) {
      constraints.push(where("createdAt", "<=", Timestamp.fromDate(filters.endDate)));
    }

    const q = query(collection(db, "quotes"), ...constraints);
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        sentAt: data.sentAt?.toDate(),
        acceptedAt: data.acceptedAt?.toDate(),
        rejectedAt: data.rejectedAt?.toDate(),
        reminderDate: data.reminderDate?.toDate(),
      } as Quote;
    });
  } catch (error) {
    console.error("Error getting quotes:", error);
    throw error;
  }
}

// Get a single quote by ID
export async function getQuoteById(quoteId: string): Promise<Quote | null> {
  if (!db) {
    throw new Error("Firebase is not initialized. Please check your environment variables.");
  }
  try {
    const docRef = doc(db, "quotes", quoteId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        sentAt: data.sentAt?.toDate(),
        acceptedAt: data.acceptedAt?.toDate(),
        rejectedAt: data.rejectedAt?.toDate(),
        reminderDate: data.reminderDate?.toDate(),
      } as Quote;
    }
    return null;
  } catch (error) {
    console.error("Error getting quote:", error);
    throw error;
  }
}

// Update a quote
export async function updateQuote(quoteId: string, updates: Partial<Quote>): Promise<void> {
  if (!db) {
    throw new Error("Firebase is not initialized. Please check your environment variables.");
  }
  try {
    const docRef = doc(db, "quotes", quoteId);
    const updateData: any = {
      ...updates,
      updatedAt: Timestamp.now(),
    };

    // Update status-specific timestamps
    if (updates.status === "sent" && !updates.sentAt) {
      updateData.sentAt = Timestamp.now();
    }
    if (updates.status === "accepted" && !updates.acceptedAt) {
      updateData.acceptedAt = Timestamp.now();
    }
    if (updates.status === "rejected" && !updates.rejectedAt) {
      updateData.rejectedAt = Timestamp.now();
    }

    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error("Error updating quote:", error);
    throw error;
  }
}

// Delete a quote
export async function deleteQuote(quoteId: string): Promise<void> {
  if (!db) {
    throw new Error("Firebase is not initialized. Please check your environment variables.");
  }
  try {
    const docRef = doc(db, "quotes", quoteId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting quote:", error);
    throw error;
  }
}

// Save or update a client
export async function saveClient(client: Omit<Client, "id" | "createdAt" | "updatedAt" | "totalQuotes" | "acceptedQuotes" | "totalValue">): Promise<string> {
  if (!db) {
    throw new Error("Firebase is not initialized. Please check your environment variables.");
  }
  try {
    // Check if client exists by email
    const existingClients = await getDocs(
      query(collection(db, "clients"), where("email", "==", client.email))
    );

    if (!existingClients.empty) {
      // Update existing client
      const existingClient = existingClients.docs[0];
      await updateDoc(doc(db, "clients", existingClient.id), {
        ...client,
        updatedAt: Timestamp.now(),
      });
      return existingClient.id;
    } else {
      // Create new client
      const clientData = {
        ...client,
        totalQuotes: 0,
        acceptedQuotes: 0,
        totalValue: 0,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };
      const docRef = await addDoc(collection(db, "clients"), clientData);
      return docRef.id;
    }
  } catch (error) {
    console.error("Error saving client:", error);
    throw error;
  }
}

// Get all clients
export async function getClients(): Promise<Client[]> {
  if (!db) {
    throw new Error("Firebase is not initialized. Please check your environment variables.");
  }
  try {
    const querySnapshot = await getDocs(query(collection(db, "clients"), orderBy("createdAt", "desc")));
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Client;
    });
  } catch (error) {
    console.error("Error getting clients:", error);
    throw error;
  }
}

// Get a client by ID
export async function getClientById(clientId: string): Promise<Client | null> {
  if (!db) {
    throw new Error("Firebase is not initialized. Please check your environment variables.");
  }
  try {
    const docRef = doc(db, "clients", clientId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Client;
    }
    return null;
  } catch (error) {
    console.error("Error getting client:", error);
    throw error;
  }
}

// Get analytics data
export interface Analytics {
  totalQuotes: number;
  totalValue: number;
  acceptedQuotes: number;
  rejectedQuotes: number;
  pendingQuotes: number;
  conversionRate: number;
  averageQuoteValue: number;
  quotesByStatus: Record<string, number>;
  quotesByService: Record<string, number>;
  quotesByMonth: Array<{ month: string; count: number; value: number }>;
}

export async function getAnalytics(startDate?: Date, endDate?: Date): Promise<Analytics> {
  if (!db) {
    throw new Error("Firebase is not initialized. Please check your environment variables.");
  }
  try {
    const constraints: QueryConstraint[] = [];
    
    if (startDate) {
      constraints.push(where("createdAt", ">=", Timestamp.fromDate(startDate)));
    }
    if (endDate) {
      constraints.push(where("createdAt", "<=", Timestamp.fromDate(endDate)));
    }

    const q = constraints.length > 0 
      ? query(collection(db, "quotes"), ...constraints)
      : query(collection(db, "quotes"));
    
    const querySnapshot = await getDocs(q);
    const quotes = querySnapshot.docs.map((doc) => doc.data()) as any[];

    const totalQuotes = quotes.length;
    const totalValue = quotes.reduce((sum, q) => sum + (q.total || 0), 0);
    const acceptedQuotes = quotes.filter((q) => q.status === "accepted").length;
    const rejectedQuotes = quotes.filter((q) => q.status === "rejected").length;
    const pendingQuotes = quotes.filter((q) => q.status === "sent" || q.status === "draft").length;

    const quotesByStatus: Record<string, number> = {};
    quotes.forEach((q) => {
      quotesByStatus[q.status] = (quotesByStatus[q.status] || 0) + 1;
    });

    const quotesByService: Record<string, number> = {};
    quotes.forEach((q) => {
      if (q.services) {
        q.services.forEach((service: any) => {
          quotesByService[service.name] = (quotesByService[service.name] || 0) + 1;
        });
      }
    });

    // Group by month
    const quotesByMonthMap = new Map<string, { count: number; value: number }>();
    quotes.forEach((q) => {
      const date = q.createdAt?.toDate() || new Date();
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const existing = quotesByMonthMap.get(monthKey) || { count: 0, value: 0 };
      quotesByMonthMap.set(monthKey, {
        count: existing.count + 1,
        value: existing.value + (q.total || 0),
      });
    });

    const quotesByMonth = Array.from(quotesByMonthMap.entries())
      .map(([month, data]) => ({ month, ...data }))
      .sort((a, b) => a.month.localeCompare(b.month));

    return {
      totalQuotes,
      totalValue,
      acceptedQuotes,
      rejectedQuotes,
      pendingQuotes,
      conversionRate: totalQuotes > 0 ? (acceptedQuotes / totalQuotes) * 100 : 0,
      averageQuoteValue: totalQuotes > 0 ? totalValue / totalQuotes : 0,
      quotesByStatus,
      quotesByService,
      quotesByMonth,
    };
  } catch (error) {
    console.error("Error getting analytics:", error);
    throw error;
  }
}

