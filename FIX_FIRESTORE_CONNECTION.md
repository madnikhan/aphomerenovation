# Fix Firestore Connection Error

## 🔴 Error Message
```
Could not reach Cloud Firestore backend. Connection failed.
The operation could not be completed (code=unavailable)
```

## ✅ Quick Fixes

### Fix 1: Verify Firestore Database is Created (MOST COMMON)

**This is usually the issue!** Firestore database must be created in Firebase Console.

1. **Go to Firebase Console:**
   - Visit: https://console.firebase.google.com
   - Select your project: `akhomerenovation`

2. **Create Firestore Database:**
   - Click **"Firestore Database"** in left menu
   - If you see **"Create database"** or **"Get started"**, click it
   - Choose **"Start in test mode"** (for development)
   - Select a **location** (e.g., `europe-west2` for UK)
   - Click **"Enable"**
   - **Wait 2-5 minutes** for database to be created

3. **Verify Database is Ready:**
   - You should see the Firestore Database interface
   - Should show "No collections yet" or existing collections
   - If you see "Create database", it's not created yet

---

### Fix 2: Check Firestore Security Rules

1. **Go to Firestore Database > Rules:**
   - In Firebase Console
   - Click "Rules" tab

2. **Update Rules (for development):**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Allow all reads/writes (for development only)
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```

3. **Click "Publish"**

4. **For Production (later):**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /quotes/{quoteId} {
         allow read, write: if request.auth != null;
       }
       match /clients/{clientId} {
         allow read, write: if request.auth != null;
       }
       match /quoteRequests/{requestId} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

---

### Fix 3: Verify Environment Variables

1. **Check `.env.local` file exists:**
   ```bash
   ls -la .env.local
   ```

2. **Verify all variables are set:**
   ```bash
   cat .env.local
   ```

   Should have:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=akhomerenovation.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=akhomerenovation
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=akhomerenovation.firebasestorage.app
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1002665088466
   NEXT_PUBLIC_FIREBASE_APP_ID=1:1002665088466:web:...
   ```

3. **Restart Dev Server:**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

---

### Fix 4: Check Internet Connection

1. **Verify internet is working:**
   - Try accessing other websites
   - Check if Firebase Console loads: https://console.firebase.google.com

2. **Check Firewall/Network:**
   - Some corporate networks block Firebase
   - Try different network (mobile hotspot)
   - Check if VPN is blocking connections

3. **Test Firebase Connection:**
   - Go to Firebase Console
   - Try creating a test document manually
   - If this fails, it's a network/Firebase issue

---

### Fix 5: Verify Firebase Project Status

1. **Check Project Status:**
   - Go to Firebase Console
   - Check if project is active
   - Check billing status (if required)

2. **Check API Status:**
   - Visit: https://status.firebase.google.com
   - Check if Firestore is operational

---

### Fix 6: Clear Browser Cache

1. **Hard Refresh:**
   - Windows: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

2. **Clear Cache:**
   - Open DevTools (F12)
   - Right-click refresh button
   - Select "Empty Cache and Hard Reload"

---

## 🔍 Diagnostic Steps

### Step 1: Check Browser Console

1. Open DevTools (F12)
2. Go to Console tab
3. Look for:
   - "Firebase initialized successfully"
   - "Firebase Project ID: akhomerenovation"
   - Any error messages

### Step 2: Test Firestore Connection

1. Go to Firebase Console
2. Firestore Database
3. Click "Start collection"
4. Try creating a test document
5. If this fails, Firestore isn't set up correctly

### Step 3: Verify Environment Variables

1. Open browser console
2. Type:
   ```javascript
   console.log(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)
   ```
3. Should show: `akhomerenovation`
4. If `undefined`, environment variables aren't loading

---

## 🚨 Common Issues

### Issue: "Database not found"
**Solution:** Create Firestore database in Firebase Console (Fix 1)

### Issue: "Permission denied"
**Solution:** Update security rules (Fix 2)

### Issue: "Network error"
**Solution:** Check internet connection and firewall (Fix 4)

### Issue: Environment variables not loading
**Solution:** 
- Check file name is `.env.local` (with dot)
- Restart dev server
- Check variables start with `NEXT_PUBLIC_`

---

## ✅ Verification Checklist

After applying fixes, verify:

- [ ] Firestore database created in Firebase Console
- [ ] Security rules published
- [ ] Environment variables set in `.env.local`
- [ ] Dev server restarted
- [ ] Browser console shows "Firebase initialized successfully"
- [ ] Can access Firebase Console
- [ ] Internet connection is stable
- [ ] No firewall blocking Firebase

---

## 🧪 Test Connection

1. **Submit a test quote request:**
   - Go to `/contact`
   - Fill form with subject "Request a Quote"
   - Submit
   - Check browser console for errors

2. **Check Firebase Console:**
   - Go to Firestore Database
   - Look for `quoteRequests` collection
   - Check if document was created

3. **Check Quote Requests Page:**
   - Go to `/quote-requests`
   - Should see the request
   - If not, check console for errors

---

## 📞 Still Not Working?

If none of the above fixes work:

1. **Check Firebase Console:**
   - Is Firestore Database created?
   - Are security rules published?
   - Is project active?

2. **Check Network:**
   - Try different network
   - Disable VPN
   - Check firewall settings

3. **Check Browser:**
   - Try different browser
   - Clear cache
   - Disable extensions

4. **Check Environment:**
   - Verify `.env.local` exists
   - Verify all variables are set
   - Restart dev server

5. **Check Firebase Status:**
   - Visit: https://status.firebase.google.com
   - Check if there are any outages

---

## 💡 Pro Tip

The most common cause is **Firestore database not being created**. Always check Firebase Console first!

