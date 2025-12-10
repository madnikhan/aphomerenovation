# Firebase Troubleshooting Guide

## Error: "Failed to save quote. Please check your Firebase configuration."

This error can occur for several reasons. Follow these steps to diagnose and fix:

### Step 1: Verify Environment Variables

1. **Check if `.env.local` exists** (with the leading dot):
   ```bash
   ls -la .env.local
   ```

2. **Verify the file contains all required variables**:
   ```bash
   cat .env.local
   ```

3. **Restart your development server** after creating/modifying `.env.local`:
   ```bash
   # Stop the server (Ctrl+C or Cmd+C)
   npm run dev
   ```

### Step 2: Create Firestore Database

**This is the most common issue!** Firestore database must be created in Firebase Console.

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **akhomerenovation**
3. Click on **"Firestore Database"** in the left menu
4. If you see "Get started" or "Create database", click it
5. Choose **"Start in test mode"** (for now)
6. Select a **location** closest to your users (e.g., `europe-west2` for UK)
7. Click **"Enable"**

**Important:** The database creation can take a few minutes. Wait until you see the Firestore Database interface.

### Step 3: Check Security Rules

1. In Firebase Console, go to **Firestore Database** > **Rules**
2. For development, use these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to all documents (for development only)
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

3. Click **"Publish"**

**⚠️ Warning:** These rules allow anyone to read/write. For production, you should:
- Set up Firebase Authentication
- Update rules to check authentication
- Add proper access controls

### Step 4: Check Browser Console

1. Open your browser's Developer Tools (F12)
2. Go to the **Console** tab
3. Look for error messages when you try to save
4. Common errors:

   - **"Firebase is not initialized"**
     - Solution: Restart dev server, check `.env.local` file
   
   - **"Missing or insufficient permissions"**
     - Solution: Update Firestore security rules (Step 3)
   
   - **"Failed to get document because the client is offline"**
     - Solution: Check internet connection
   
   - **"Collection 'quotes' not found"**
     - Solution: This is normal - collections are created automatically on first write

### Step 5: Verify Firebase Initialization

1. Open browser console
2. Type: `console.log(window.location)`
3. Navigate to `/quote-builder`
4. Check console for: `"Firebase initialized successfully"`

If you see warnings about missing config, check your `.env.local` file.

### Step 6: Test Firestore Connection

1. Go to Firebase Console > Firestore Database
2. Try to manually create a document:
   - Click "Start collection"
   - Collection ID: `test`
   - Document ID: `test1`
   - Add a field: `name` (string) = `test`
   - Click "Save"
3. If this works, Firestore is set up correctly

### Common Issues and Solutions

#### Issue: Environment variables not loading
**Solution:**
- File must be named `.env.local` (with leading dot)
- Must be in project root directory
- Must restart dev server after changes
- Variables must start with `NEXT_PUBLIC_`

#### Issue: "Permission denied" error
**Solution:**
- Update Firestore security rules (see Step 3)
- Make sure rules are published
- For development, use test mode rules

#### Issue: Database not found
**Solution:**
- Create Firestore database in Firebase Console (Step 2)
- Wait for database to be fully created
- Refresh your app

#### Issue: Network error
**Solution:**
- Check internet connection
- Check if Firebase services are accessible
- Try accessing Firebase Console in browser

### Quick Checklist

- [ ] `.env.local` file exists with correct name (leading dot)
- [ ] All Firebase environment variables are set
- [ ] Development server restarted after creating `.env.local`
- [ ] Firestore database created in Firebase Console
- [ ] Security rules allow read/write (for development)
- [ ] Internet connection is working
- [ ] Browser console shows "Firebase initialized successfully"

### Still Not Working?

1. **Check the actual error in browser console** - it will show the specific Firebase error
2. **Verify Firebase project** - Make sure you're using the correct project ID
3. **Check Firebase Console** - Go to Firestore Database and see if any data appears
4. **Try a simple test** - Create a test document manually in Firebase Console

### Getting More Help

If you're still having issues, check:
- Browser console for detailed error messages
- Firebase Console for any service status issues
- Network tab in browser DevTools for failed requests

The error message in the alert should now show the actual Firebase error, which will help identify the specific issue.

