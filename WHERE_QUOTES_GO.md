# Where Quote Submissions Go

## 📍 Quick Answer

When you click **"Save Quote"** in the quote builder, the quote is saved to:

1. **Firebase Firestore Database** (Cloud Database)
   - **Collection: `quotes`** - All quote data
   - **Collection: `clients`** - Customer/client information

2. **You can view them at:** `/quotes` page (after logging in)

---

## 🔄 Complete Flow

### Step 1: User Creates Quote
- Go to `/quote-builder` page
- Fill in customer information
- Add services
- Set pricing and notes
- Click **"Save Quote"** button

### Step 2: Data is Saved to Firebase

**Client Data** → Saved to `clients` collection:
```javascript
{
  name: "John Doe",
  email: "john@example.com",
  phone: "+44 123 456 7890",
  address: "123 Main St",
  postcode: "B1 1AA",
  totalQuotes: 1,
  acceptedQuotes: 0,
  totalValue: 1500.00,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

**Quote Data** → Saved to `quotes` collection:
```javascript
{
  quoteNumber: "QUO-2025-0001",
  date: "2025-01-15",
  validUntil: "2025-02-14",
  customer: { name, email, phone, address, postcode },
  services: [
    { name: "Chimney Removal", quantity: 1, unitPrice: 900, total: 900 }
  ],
  subtotal: 900,
  discount: 0,
  discountType: "percentage",
  total: 900,
  notes: "Customer requested...",
  internalNotes: "Internal note...",
  reminderDate: null,
  status: "draft",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Step 3: View Saved Quotes

**Go to:** `https://yourdomain.com/quotes`

This page shows:
- ✅ All saved quotes in a table/list
- ✅ Search and filter functionality
- ✅ Analytics and charts
- ✅ Edit, delete, duplicate quotes
- ✅ Send quotes via email
- ✅ Export to CSV

---

## 📊 Where to View Quotes

### Option 1: Quotes Page (Recommended)
**URL:** `/quotes`

**Features:**
- View all quotes in a table
- Search by quote number, customer name, or email
- Filter by status (draft, sent, accepted, rejected, expired)
- View analytics (charts and statistics)
- Edit, delete, or duplicate quotes
- Send quotes via email
- Export to CSV

**How to Access:**
1. Log in to `/quote-builder`
2. Click **"View Quotes"** button in the header
3. Or navigate directly to `/quotes`

### Option 2: Firebase Console (Direct Database Access)
**URL:** https://console.firebase.google.com

**Steps:**
1. Go to Firebase Console
2. Select your project: `akhomerenovation`
3. Click **"Firestore Database"** in left menu
4. You'll see two collections:
   - **`quotes`** - All your quotes
   - **`clients`** - All your clients

**Note:** This is for viewing raw data. Use the `/quotes` page for a better interface.

### Option 3: Clients Page
**URL:** `/clients`

**Features:**
- View all clients
- See client statistics
- View quotes for each client
- Create new quote for a client

---

## 🔍 How to Check if Quote Was Saved

### Method 1: Success Message
After clicking "Save Quote", you should see:
- ✅ Green success message: "Quote saved successfully!"
- ✅ Message disappears after 3 seconds

### Method 2: Check Quotes Page
1. Go to `/quotes` page
2. Look for your quote in the list
3. Search by quote number or customer name

### Method 3: Check Firebase Console
1. Go to Firebase Console
2. Navigate to Firestore Database
3. Check `quotes` collection
4. Look for your quote document

---

## 🚨 Troubleshooting

### Quote Not Appearing?

**Check:**
1. ✅ Did you see "Quote saved successfully!" message?
2. ✅ Are you logged in? (Quotes page requires authentication)
3. ✅ Check browser console for errors
4. ✅ Verify Firebase is configured correctly
5. ✅ Check internet connection

### Common Issues:

**Error: "Firebase is not initialized"**
- Check `.env.local` file has Firebase config
- Restart development server
- Check Firebase project is created

**Error: "Permission denied"**
- Check Firestore security rules
- Ensure rules allow writes

**Quote saved but not visible:**
- Refresh the `/quotes` page
- Check if you're filtering by status
- Clear browser cache

---

## 📧 Email Integration

Quotes can also be sent via email:

1. **From Quote Builder:**
   - Click "Send Email" button
   - Quote PDF is attached
   - Sent to customer's email

2. **From Quotes Page:**
   - Click email icon on any quote
   - Quote PDF is attached
   - Sent to customer's email

**Email goes to:** Customer's email address (from quote form)

---

## 💾 Data Storage Details

### Firebase Firestore Structure:

```
Firestore Database
│
├── Collection: "clients"
│   ├── Document: "client-id-1"
│   │   └── { name, email, phone, address, ... }
│   ├── Document: "client-id-2"
│   │   └── { name, email, phone, address, ... }
│   └── ...
│
└── Collection: "quotes"
    ├── Document: "quote-id-1"
    │   └── { quoteNumber, customer, services, total, ... }
    ├── Document: "quote-id-2"
    │   └── { quoteNumber, customer, services, total, ... }
    └── ...
```

### Data Persistence:
- ✅ Data is stored in the cloud (Firebase)
- ✅ Accessible from any device
- ✅ Automatically backed up
- ✅ Real-time updates
- ✅ Secure and encrypted

---

## 🎯 Quick Summary

**When you save a quote:**
1. ✅ Client info → `clients` collection in Firebase
2. ✅ Quote data → `quotes` collection in Firebase
3. ✅ View at `/quotes` page
4. ✅ Can send via email
5. ✅ Can export to CSV

**To view quotes:**
- Go to `/quotes` page (after login)
- Or check Firebase Console directly

---

## 📞 Need Help?

If quotes aren't saving:
1. Check browser console for errors
2. Verify Firebase configuration
3. Check Firestore security rules
4. Ensure you're connected to internet
5. See `FIREBASE_TROUBLESHOOTING.md` for more help

