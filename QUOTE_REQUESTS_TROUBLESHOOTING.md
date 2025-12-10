# Quote Requests Not Showing - Troubleshooting Guide

## 🔍 Quick Checks

### 1. Are You Logged In?
- Quote requests page requires admin authentication
- Go to `/quote-builder` and log in first
- Then navigate to `/quote-requests`

### 2. Check Browser Console
- Open browser DevTools (F12)
- Go to Console tab
- Look for any red error messages
- Common errors:
  - "Firebase is not initialized"
  - "Permission denied"
  - "Index required"

### 3. Check Firebase Console
- Go to: https://console.firebase.google.com
- Select your project: `akhomerenovation`
- Go to **Firestore Database**
- Check if `quoteRequests` collection exists
- Check if documents are being created

---

## 🚨 Common Issues & Fixes

### Issue 1: "Permission Denied" Error

**Problem:** Firebase security rules blocking access

**Fix:**
1. Go to Firebase Console → Firestore Database → Rules
2. Update rules to allow reads:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write quoteRequests
    match /quoteRequests/{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Or allow public read (less secure):
    // match /quoteRequests/{document=**} {
    //   allow read, write: if true;
    // }
  }
}
```

3. Click "Publish"
4. Refresh the quote requests page

---

### Issue 2: "Index Required" Error

**Problem:** Firebase needs a composite index for filtered queries

**Fix:**
1. Check browser console for the exact error
2. Look for a link like: `https://console.firebase.google.com/...`
3. Click the link to create the index automatically
4. Wait 2-5 minutes for index to build
5. Refresh the page

**Or create index manually:**
1. Go to Firebase Console → Firestore Database → Indexes
2. Click "Create Index"
3. Collection: `quoteRequests`
4. Fields:
   - `status` (Ascending)
   - `createdAt` (Descending)
5. Click "Create"
6. Wait for index to build

---

### Issue 3: Quote Request Not Saving

**Check:**
1. Open browser console (F12)
2. Submit a quote request
3. Look for errors in console
4. Check Network tab for failed requests

**Common causes:**
- Firebase not initialized
- Security rules blocking writes
- Missing required fields
- Network error

**Fix:**
1. Check `.env.local` has Firebase config
2. Restart dev server: `npm run dev`
3. Check Firestore security rules allow writes
4. Verify all required fields are filled

---

### Issue 4: Page Shows "Loading..." Forever

**Problem:** Authentication check failing

**Fix:**
1. Check if you're logged in
2. Go to `/quote-builder` and log in
3. Then go to `/quote-requests`
4. Check browser console for auth errors

---

### Issue 5: Empty List (No Requests Showing)

**Check:**
1. Go to Firebase Console → Firestore Database
2. Check if `quoteRequests` collection exists
3. Check if there are any documents
4. If collection doesn't exist, submit a test request

**If collection is empty:**
- Submit a test quote request from contact/booking form
- Check browser console for save errors
- Verify the form is actually calling `saveQuoteRequest()`

---

## 🔧 Step-by-Step Debugging

### Step 1: Verify Request Was Saved

1. **Check Firebase Console:**
   - Go to Firebase Console
   - Firestore Database
   - Look for `quoteRequests` collection
   - Check if document exists

2. **Check Browser Console:**
   - Submit a request
   - Look for "Error saving quote request" message
   - Check for any errors

### Step 2: Verify Page Can Read

1. **Check Authentication:**
   - Make sure you're logged in
   - Check `/api/auth/check` returns `{ authenticated: true }`

2. **Check Firebase Connection:**
   - Open browser console
   - Go to `/quote-requests` page
   - Look for "Error loading quote requests" message
   - Check for Firebase errors

### Step 3: Check Filters

1. **Reset Filters:**
   - Set Status filter to "All Statuses"
   - Set Source filter to "All Sources"
   - Clear search box
   - Refresh page

2. **Check URL:**
   - Make sure you're on `/quote-requests`
   - Not `/quote-request` (missing 's')

---

## 🧪 Test Quote Request Submission

### Test from Contact Form:
1. Go to `/contact`
2. Fill out form:
   - Name: Test User
   - Email: test@example.com
   - Subject: **"Request a Quote"** (important!)
   - Message: Test message
3. Submit form
4. Check browser console for errors
5. Check Firebase Console for new document

### Test from Booking Form:
1. Go to `/book`
2. Fill out booking form
3. Submit
4. Check browser console for errors
5. Check Firebase Console for new document

---

## 📋 Firebase Security Rules

Make sure your Firestore rules allow access:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Quote Requests - allow authenticated access
    match /quoteRequests/{requestId} {
      allow read, write: if request.auth != null;
    }
    
    // Or allow public access (for testing only):
    // match /quoteRequests/{requestId} {
    //   allow read, write: if true;
    // }
  }
}
```

---

## 🔍 Verify Data Structure

Quote request document should have:
- `name` (string)
- `email` (string)
- `phone` (string)
- `service` (string)
- `description` (string)
- `source` ("contact" | "booking" | "other")
- `status` ("new" | "contacted" | "quoted" | "converted" | "closed")
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

---

## 🆘 Still Not Working?

1. **Check Browser Console:**
   - Open DevTools (F12)
   - Go to Console tab
   - Look for any red errors
   - Copy error message

2. **Check Network Tab:**
   - Open DevTools (F12)
   - Go to Network tab
   - Submit a request
   - Look for failed requests
   - Check response for errors

3. **Check Firebase Console:**
   - Verify collection exists
   - Verify documents are being created
   - Check security rules
   - Check indexes

4. **Restart Dev Server:**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

5. **Clear Browser Cache:**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Or clear cache in browser settings

---

## ✅ Quick Checklist

- [ ] Logged in as admin?
- [ ] On `/quote-requests` page?
- [ ] Firebase collection `quoteRequests` exists?
- [ ] Documents in collection?
- [ ] No errors in browser console?
- [ ] Security rules allow read?
- [ ] Firebase indexes created (if needed)?
- [ ] Filters set to "All"?
- [ ] Search box cleared?

---

## 📞 Need More Help?

If still not working:
1. Check browser console for exact error
2. Check Firebase Console for data
3. Verify Firebase configuration in `.env.local`
4. Check Firestore security rules
5. Try submitting a new test request

