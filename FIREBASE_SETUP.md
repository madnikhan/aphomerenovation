# Firebase Setup Guide

## Overview

Firebase integration has been added to your quote builder system with the following features:

✅ **Quote Management**
- Save quotes to Firestore database
- View all quotes with search and filters
- Update quote status (draft, sent, accepted, rejected, expired)
- Delete quotes

✅ **Client Management**
- Automatically save client information when creating quotes
- Track client history

✅ **Analytics** (Ready to use)
- Quote statistics
- Conversion rates
- Popular services tracking

## Setup Instructions

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard
4. Enable **Firestore Database**:
   - Go to "Firestore Database" in the left menu
   - Click "Create database"
   - Start in **test mode** (we'll add security rules later)
   - Choose a location closest to your users

### Step 2: Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps" section
3. Click the **Web icon** (`</>`) to add a web app
4. Register your app (you can name it "AK Home Renovation")
5. Copy the configuration values

### Step 3: Set Environment Variables

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

3. Restart your development server after adding environment variables

### Step 4: Set Up Firestore Security Rules

1. Go to Firestore Database > Rules
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Quotes collection - only authenticated admins can read/write
    match /quotes/{quoteId} {
      allow read, write: if request.auth != null;
    }
    
    // Clients collection - only authenticated admins can read/write
    match /clients/{clientId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**Note:** For now, we're using localStorage authentication. For production, you should:
- Set up Firebase Authentication
- Update security rules to check Firebase Auth tokens
- Or keep the current setup but restrict access to your IP/domain

### Step 5: Test the Integration

1. Start your development server: `npm run dev`
2. Go to `/quote-builder` and log in
3. Create a test quote
4. Click "Save Quote" - it should save to Firebase
5. Go to `/quotes` to see your saved quotes

## Features

### Quote Builder (`/quote-builder`)
- Create and customize quotes
- **Save Quote** button - saves to Firebase
- **Quote Status** dropdown - track quote status
- Print and download PDF functionality

### Quotes List (`/quotes`)
- View all saved quotes
- Search by quote number, customer name, or email
- Filter by status
- Update quote status inline
- Delete quotes
- Summary statistics

### Client Management (Automatic)
- Client information is automatically saved when you create a quote
- Clients are deduplicated by email address
- Client history is tracked

## Database Structure

### Quotes Collection
```typescript
{
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
  status: "draft" | "sent" | "accepted" | "rejected" | "expired";
  createdAt: Timestamp;
  updatedAt: Timestamp;
  sentAt?: Timestamp;
  acceptedAt?: Timestamp;
  rejectedAt?: Timestamp;
}
```

### Clients Collection
```typescript
{
  name: string;
  email: string;
  phone: string;
  address: string;
  postcode: string;
  totalQuotes: number;
  acceptedQuotes: number;
  totalValue: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

## Next Steps (Optional Enhancements)

1. **Email Functionality**
   - Currently uses `mailto:` links
   - Can be enhanced with:
     - Firebase Cloud Functions + SendGrid
     - Resend API
     - Nodemailer

2. **Analytics Dashboard**
   - Create `/analytics` page
   - Display charts and graphs
   - Track conversion rates
   - Popular services analysis

3. **Client Management Page**
   - Create `/clients` page
   - View all clients
   - See client quote history
   - Edit client information

4. **Firebase Authentication**
   - Replace localStorage auth with Firebase Auth
   - More secure
   - Better user management

## Troubleshooting

### "Firebase is not initialized" Error
- Check that all environment variables are set correctly
- Make sure `.env.local` file exists in project root
- Restart your development server after adding env variables

### "Permission denied" Error
- Check Firestore security rules
- Make sure rules allow read/write operations
- For development, you can temporarily use test mode rules

### Quotes not saving
- Check browser console for errors
- Verify Firebase configuration is correct
- Check Firestore database is created and accessible

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify Firebase configuration in `.env.local`
3. Check Firestore security rules
4. Ensure Firestore database is created in Firebase Console

