# How Firebase Collects Data - Data Flow Explanation

## Overview

Firebase Firestore is a NoSQL cloud database that stores your data in **collections** and **documents**. Here's how data flows from your application to Firebase:

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    USER INTERACTION                          │
│  User fills out quote form in /quote-builder                │
│  - Customer Info (name, email, phone, address)              │
│  - Services (selected services with quantities)             │
│  - Pricing (subtotal, discount, total)                      │
│  - Notes and Status                                         │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              CLICK "SAVE QUOTE" BUTTON                       │
│  handleSaveQuote() function is triggered                    │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              VALIDATION & DATA PREPARATION                   │
│  1. Validates required fields                               │
│  2. Prepares quote data object                              │
│  3. Prepares client data object                             │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              FIREBASE FUNCTIONS (lib/firebase-quotes.ts)     │
│                                                              │
│  Step 1: saveClient()                                       │
│  ├─ Checks if client exists (by email)                      │
│  ├─ If exists: Updates existing client                      │
│  └─ If new: Creates new client document                     │
│                                                              │
│  Step 2: saveQuote()                                        │
│  ├─ Adds timestamps (createdAt, updatedAt)                  │
│  ├─ Converts data to Firestore format                       │
│  └─ Saves to "quotes" collection                            │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              FIRESTORE DATABASE (Cloud)                      │
│                                                              │
│  Collection: "clients"                                      │
│  └─ Document: {                                             │
│       id: "auto-generated-id",                              │
│       name: "John Doe",                                     │
│       email: "john@example.com",                            │
│       phone: "+44 7XXX XXXXXX",                             │
│       address: "123 Street",                                │
│       postcode: "SW1A 1AA",                                 │
│       createdAt: Timestamp,                                 │
│       updatedAt: Timestamp,                                 │
│       totalQuotes: 0,                                       │
│       acceptedQuotes: 0,                                    │
│       totalValue: 0                                         │
│     }                                                       │
│                                                              │
│  Collection: "quotes"                                       │
│  └─ Document: {                                             │
│       id: "auto-generated-id",                              │
│       quoteNumber: "QUO-2025-0001",                         │
│       date: "2025-01-10",                                   │
│       validUntil: "2025-02-10",                             │
│       customer: { name, email, phone, address, postcode },  │
│       services: [                                           │
│         { id, name, description, quantity, unitPrice, total }│
│       ],                                                    │
│       subtotal: 1500.00,                                    │
│       discount: 10,                                         │
│       discountType: "percentage",                           │
│       total: 1350.00,                                       │
│       notes: "Customer requested...",                       │
│       status: "draft",                                      │
│       createdAt: Timestamp,                                 │
│       updatedAt: Timestamp                                  │
│     }                                                       │
└─────────────────────────────────────────────────────────────┘
```

## Step-by-Step Process

### 1. **User Creates a Quote** (`/quote-builder`)

When you fill out the quote form:
- Customer information is stored in React state (`customerInfo`)
- Selected services are stored in `selectedServices` array
- Pricing calculations happen automatically
- All data is in browser memory (not saved yet)

### 2. **User Clicks "Save Quote"**

The `handleSaveQuote()` function is called:

```typescript
// Located in: app/quote-builder/page.tsx (line 317)

const handleSaveQuote = async () => {
  // 1. Validates required fields
  if (!customerInfo.name || !customerInfo.email || ...) {
    alert("Please fill in all required fields");
    return;
  }

  // 2. Saves client first
  await saveClient({
    name: customerInfo.name,
    email: customerInfo.email,
    phone: customerInfo.phone,
    address: customerInfo.address,
    postcode: customerInfo.postcode,
  });

  // 3. Prepares quote data
  const quoteData = {
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
    status: quoteStatus,
  };

  // 4. Saves quote to Firebase
  await saveQuote(quoteData);
};
```

### 3. **Data is Sent to Firebase**

#### Client Data (`saveClient()` function)

```typescript
// Located in: lib/firebase-quotes.ts (line 200)

export async function saveClient(client) {
  // 1. Check if client already exists (by email)
  const existingClients = await getDocs(
    query(collection(db, "clients"), where("email", "==", client.email))
  );

  if (!existingClients.empty) {
    // Update existing client
    await updateDoc(doc(db, "clients", existingClient.id), {
      ...client,
      updatedAt: Timestamp.now(),
    });
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
    await addDoc(collection(db, "clients"), clientData);
  }
}
```

#### Quote Data (`saveQuote()` function)

```typescript
// Located in: lib/firebase-quotes.ts (line 64)

export async function saveQuote(quote) {
  // 1. Add timestamps
  const quoteData = {
    ...quote,
    createdAt: Timestamp.now(),      // When quote was created
    updatedAt: Timestamp.now(),       // Last update time
    sentAt: quote.status === "sent" ? Timestamp.now() : null,
  };

  // 2. Save to Firestore "quotes" collection
  const docRef = await addDoc(collection(db, "quotes"), quoteData);
  
  // 3. Returns the document ID
  return docRef.id;
}
```

### 4. **Firebase Stores the Data**

Firebase Firestore stores data in this structure:

```
Firestore Database
│
├── Collection: "clients"
│   ├── Document ID: "abc123"
│   │   └── Fields: { name, email, phone, address, ... }
│   ├── Document ID: "def456"
│   │   └── Fields: { name, email, phone, address, ... }
│   └── ...
│
└── Collection: "quotes"
    ├── Document ID: "xyz789"
    │   └── Fields: { quoteNumber, customer, services, total, ... }
    ├── Document ID: "uvw012"
    │   └── Fields: { quoteNumber, customer, services, total, ... }
    └── ...
```

## How Data is Retrieved

### Viewing Quotes (`/quotes` page)

```typescript
// Located in: app/quotes/page.tsx

const loadQuotes = async () => {
  // Calls getQuotes() function
  const allQuotes = await getQuotes();
  setQuotes(allQuotes);
};
```

The `getQuotes()` function:

```typescript
// Located in: lib/firebase-quotes.ts (line 84)

export async function getQuotes(filters?) {
  // 1. Build query with filters
  const constraints = [orderBy("createdAt", "desc")];
  
  if (filters?.status) {
    constraints.push(where("status", "==", filters.status));
  }

  // 2. Execute query
  const q = query(collection(db, "quotes"), ...constraints);
  const querySnapshot = await getDocs(q);

  // 3. Convert Firestore documents to JavaScript objects
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate(),
    updatedAt: doc.data().updatedAt?.toDate(),
  }));
}
```

## Real-Time Data Sync

Firebase Firestore provides **real-time synchronization**:

- ✅ Data is stored in Google's cloud servers
- ✅ Automatically synced across all devices
- ✅ Available even if your computer is off
- ✅ Can be accessed from anywhere with internet
- ✅ Automatic backups and redundancy

## Data Security

Currently, your Firestore security rules should be set to allow authenticated users only. In production, you should:

1. Set up Firebase Authentication
2. Update security rules to check authentication
3. Add field-level validation
4. Implement proper access controls

## What Gets Collected

### Every Quote Saves:
- ✅ Quote number and dates
- ✅ Complete customer information
- ✅ All selected services with details
- ✅ Pricing breakdown (subtotal, discount, total)
- ✅ Notes and status
- ✅ Timestamps (created, updated, sent, accepted, rejected)

### Every Client Saves:
- ✅ Name, email, phone
- ✅ Address and postcode
- ✅ Quote statistics (total quotes, accepted quotes, total value)
- ✅ Timestamps

## Viewing Your Data

You can view all collected data in:

1. **Firebase Console**: https://console.firebase.google.com/
   - Go to Firestore Database
   - See all collections and documents
   - View/edit data directly

2. **Your Application**:
   - `/quotes` - View all quotes
   - `/quote-builder` - Create new quotes
   - (Future: `/clients` - View all clients)
   - (Future: `/analytics` - View statistics)

## Data Persistence

- ✅ Data persists even after browser is closed
- ✅ Data is stored in Google's cloud (not on your computer)
- ✅ Can be accessed from any device
- ✅ Automatic backups by Firebase
- ✅ No data loss if your computer crashes

## Summary

**Data Collection Flow:**
1. User fills form → React state
2. User clicks "Save" → `handleSaveQuote()`
3. Data validated → Prepared for Firebase
4. `saveClient()` → Saves/updates client in "clients" collection
5. `saveQuote()` → Saves quote in "quotes" collection
6. Firebase stores → Cloud database
7. Data available → Can be retrieved anytime

**Key Points:**
- Data is collected **only when you click "Save Quote"**
- Data is stored in **Firestore collections** (clients and quotes)
- Each quote/client gets a **unique document ID**
- Data includes **timestamps** for tracking
- Data is **persistent** and **cloud-based**

