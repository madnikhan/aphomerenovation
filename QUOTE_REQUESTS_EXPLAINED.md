# Quote Requests vs Quotes - Explained

## 🔍 The Difference

### **Quote Requests** (Customer Submissions)
- **What:** Requests from customers via website forms
- **Where:** Contact form (`/contact`) or Booking form (`/book`)
- **Purpose:** Customers asking for quotes
- **Status:** New → Contacted → Quoted → Converted → Closed
- **Location:** `/quote-requests` page
- **Collection:** `quoteRequests` in Firebase

### **Quotes** (Your Created Quotes)
- **What:** Actual quotes you create for customers
- **Where:** Quote Builder (`/quote-builder`)
- **Purpose:** Formal quotes with pricing
- **Status:** Draft → Sent → Accepted → Rejected → Expired
- **Location:** `/quotes` page
- **Collection:** `quotes` in Firebase

---

## 📋 Workflow

### Step 1: Customer Submits Request
1. Customer visits your website
2. Fills out **Contact Form** or **Booking Form**
3. Selects "Request a Quote" or books a service
4. **Quote Request** is automatically saved to Firebase

### Step 2: You Review Requests
1. Go to `/quote-requests` page
2. See all customer quote requests
3. Review customer details and requirements
4. Update status as you contact them

### Step 3: Convert to Quote
1. Click "Convert to Quote" on a request
2. Quote Builder opens with customer info pre-filled
3. Add services and pricing
4. Save as a formal **Quote**
5. Request status automatically updates to "Converted"

---

## 🎯 Where Quote Requests Go

### When Customer Submits:

**From Contact Form (`/contact`):**
- If subject = "Request a Quote"
- → Saved to `quoteRequests` collection
- Status: "new"
- Source: "contact"

**From Booking Form (`/book`):**
- All bookings are saved as quote requests
- → Saved to `quoteRequests` collection
- Status: "new"
- Source: "booking"

### View Quote Requests:
- **URL:** `/quote-requests`
- **Access:** Requires admin login
- **Features:**
  - View all customer requests
  - Filter by status and source
  - Search by name, email, or service
  - Convert to quote
  - Update status
  - Delete requests

---

## 📊 Status Flow

### Quote Request Statuses:
1. **New** - Just received, not contacted yet
2. **Contacted** - You've reached out to customer
3. **Quoted** - You've sent them a quote
4. **Converted** - Converted to actual quote
5. **Closed** - Request closed (not interested, etc.)

### Quote Statuses:
1. **Draft** - Created but not sent
2. **Sent** - Sent to customer
3. **Accepted** - Customer accepted
4. **Rejected** - Customer rejected
5. **Expired** - Quote expired

---

## 🔄 Converting Request to Quote

### How It Works:
1. Go to `/quote-requests`
2. Find the request you want to convert
3. Click "Convert to Quote" button
4. Quote Builder opens with:
   - Customer name pre-filled
   - Email pre-filled
   - Phone pre-filled
   - Address pre-filled
   - Notes include request details
5. Add services and pricing
6. Click "Save Quote"
7. Request status automatically changes to "Converted"

---

## 📍 Quick Access

### From Quotes Page:
- Click "Quote Requests" button in header
- View all customer requests

### From Quote Builder:
- Click "View Quotes" → "Quote Requests"
- Or navigate directly to `/quote-requests`

---

## ✅ Summary

**Quote Requests:**
- Customer submissions from website
- View at `/quote-requests`
- Convert to quotes when ready

**Quotes:**
- Your created quotes with pricing
- View at `/quotes`
- Created from requests or manually

**The Flow:**
```
Customer Request → Quote Request (new) 
                → You Review 
                → Convert to Quote 
                → Send to Customer
```

---

## 🆘 Troubleshooting

**Q: I don't see quote requests?**
- Check if customer actually submitted (check Firebase Console)
- Make sure you're logged in
- Check `/quote-requests` page exists

**Q: Request not saving?**
- Check Firebase configuration
- Check browser console for errors
- Verify Firestore security rules allow writes

**Q: Can't convert to quote?**
- Make sure you're logged in
- Check that customer info is complete
- Try refreshing the page

