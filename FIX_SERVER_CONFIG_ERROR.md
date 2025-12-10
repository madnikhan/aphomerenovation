# Fix "Server configuration error"

## What This Error Means

The error "Server configuration error" means that the `ADMIN_PASSWORD` environment variable is **not set** in Vercel.

This happens when you try to log in, but the server can't find the admin password because it's missing from the environment variables.

## ✅ Quick Fix

### Step 1: Add ADMIN_PASSWORD to Vercel

1. Go to **Vercel Dashboard**: https://vercel.com/dashboard
2. Click on your project: **aphomerenovation**
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Fill in:
   - **Key:** `ADMIN_PASSWORD`
   - **Value:** Your secure password (e.g., `MySecurePassword123!`)
   - **Environment:** Select **Production** (or **All**)
6. Click **Save**

### Step 2: Redeploy (IMPORTANT!)

**You MUST redeploy after adding the variable!**

1. Go to **Deployments** tab
2. Click the **three dots** (⋯) on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

### Step 3: Test Login

After redeployment:
1. Go to: `https://aphomerenovation.vercel.app/quote-builder`
2. Try logging in with your password
3. Should work now! ✅

## 🔍 Why This Happens

The login API route checks for `ADMIN_PASSWORD`:

```typescript
const adminPassword = process.env.ADMIN_PASSWORD;

if (!adminPassword) {
  return NextResponse.json(
    { error: "Server configuration error" },
    { status: 500 }
  );
}
```

If the variable is missing, it returns this error.

## 📋 Complete Environment Variables Checklist

Make sure you have **ALL** of these set in Vercel:

### Server-Side (Required):
- [ ] `ADMIN_PASSWORD` ← **This one is missing!**
- [ ] `RESEND_API_KEY`

### Client-Side (Required):
- [ ] `NEXT_PUBLIC_FIREBASE_API_KEY`
- [ ] `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- [ ] `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- [ ] `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- [ ] `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- [ ] `NEXT_PUBLIC_FIREBASE_APP_ID`
- [ ] `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

## ⚠️ Important Notes

1. **Environment Variable Names are Case-Sensitive**
   - ✅ Correct: `ADMIN_PASSWORD`
   - ❌ Wrong: `admin_password` or `Admin_Password`

2. **Must Redeploy After Adding Variables**
   - Variables are only available after redeployment
   - Old deployments don't have new variables

3. **Set Environment to Production**
   - Make sure to select **Production** or **All**
   - Preview/Development won't work for production URLs

## 🚀 Quick Steps Summary

1. ✅ Add `ADMIN_PASSWORD` in Vercel Settings → Environment Variables
2. ✅ Set value to your secure password
3. ✅ Select **Production** environment
4. ✅ Click **Save**
5. ✅ **Redeploy** from Deployments tab
6. ✅ Test login again

## 🆘 Still Getting Error?

1. **Double-check variable name:**
   - Must be exactly: `ADMIN_PASSWORD` (all caps, underscore)

2. **Verify you redeployed:**
   - Check deployment timestamp
   - Should be after you added the variable

3. **Check build logs:**
   - Go to Deployments → Latest → Build Logs
   - Look for any errors

4. **Verify environment:**
   - Make sure variable is set for **Production** environment

## 💡 Pro Tip

After adding `ADMIN_PASSWORD`, you can verify it's set by:
1. Going to Vercel Dashboard
2. Settings → Environment Variables
3. You should see `ADMIN_PASSWORD` in the list
4. The value will be hidden (showing as dots)

If you see it there and you've redeployed, it should work!

