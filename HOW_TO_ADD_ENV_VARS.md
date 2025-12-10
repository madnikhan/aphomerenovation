# How to Add Environment Variables in Vercel

## Step-by-Step Guide

### Step 1: Access Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Sign in to your account
3. Click on your project: **aphomerenovation**

### Step 2: Navigate to Environment Variables

1. Click on **Settings** (in the top navigation)
2. Click on **Environment Variables** (in the left sidebar)

### Step 3: Add Server-Side Variables

**Server-side variables** are private and only available on the server (not exposed to the browser).

#### Add `ADMIN_PASSWORD`:

1. Click **Add New** button
2. **Key:** `ADMIN_PASSWORD`
3. **Value:** Enter your secure password (e.g., `MySecurePass123!`)
4. **Environment:** Select **Production** (or **All** to apply to all environments)
5. Click **Save**

#### Add `RESEND_API_KEY`:

1. Click **Add New** button again
2. **Key:** `RESEND_API_KEY`
3. **Value:** `re_2xLu2LPh_Luoxxd4zbKTxCGZnVkHPiBP3`
4. **Environment:** Select **Production** (or **All**)
5. Click **Save**

### Step 4: Add Client-Side Variables

**Client-side variables** (with `NEXT_PUBLIC_` prefix) are exposed to the browser. This is OK for Firebase config.

#### Add Firebase Variables:

1. Click **Add New**
2. **Key:** `NEXT_PUBLIC_FIREBASE_API_KEY`
3. **Value:** `AIzaSyA5sXv6O0GHxqfELPaFrJf40uZXTr33Ca0`
4. **Environment:** Select **Production** (or **All**)
5. Click **Save**

Repeat for each Firebase variable:
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` = `akhomerenovation.firebaseapp.com`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` = `akhomerenovation`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` = `akhomerenovation.firebasestorage.app`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` = `1002665088466`
- `NEXT_PUBLIC_FIREBASE_APP_ID` = `1:1002665088466:web:eddbb9f1f0368138bea40b`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` = `G-71T4B01QRL`

### Step 5: Verify All Variables

After adding all variables, you should see:

**Server-Side (Private):**
- ✅ `ADMIN_PASSWORD`
- ✅ `RESEND_API_KEY`

**Client-Side (Public):**
- ✅ `NEXT_PUBLIC_FIREBASE_API_KEY`
- ✅ `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- ✅ `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- ✅ `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- ✅ `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- ✅ `NEXT_PUBLIC_FIREBASE_APP_ID`
- ✅ `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

### Step 6: Redeploy

**Important:** After adding environment variables, you MUST redeploy!

**Option A: Redeploy from Dashboard**
1. Go to **Deployments** tab
2. Click the **three dots** (⋯) on the latest deployment
3. Click **Redeploy**
4. Select **Use existing Build Cache** (optional)
5. Click **Redeploy**

**Option B: Trigger New Deployment**
- Push a new commit to GitHub (Vercel will auto-deploy)
- Or click **Redeploy** button in Vercel dashboard

## 📸 Visual Guide

```
Vercel Dashboard
  └── Your Project (aphomerenovation)
      └── Settings
          └── Environment Variables
              └── Add New
                  ├── Key: ADMIN_PASSWORD
                  ├── Value: your_password
                  └── Environment: Production
                      └── Save
```

## 🔒 Understanding Server-Side vs Client-Side

### Server-Side Variables (No `NEXT_PUBLIC_` prefix)
- ✅ **Private** - Only available on the server
- ✅ **Secure** - Not exposed to the browser
- ✅ **Use for:** API keys, passwords, secrets

**Examples:**
- `ADMIN_PASSWORD` ✅
- `RESEND_API_KEY` ✅
- `DATABASE_URL` ✅

### Client-Side Variables (With `NEXT_PUBLIC_` prefix)
- ⚠️ **Public** - Exposed to the browser
- ⚠️ **Visible** - Anyone can see them in source code
- ✅ **OK for:** Firebase config, public API keys

**Examples:**
- `NEXT_PUBLIC_FIREBASE_API_KEY` ✅ (OK to expose)
- `NEXT_PUBLIC_API_URL` ✅ (OK to expose)

## ⚠️ Important Notes

1. **Environment Selection:**
   - **Production:** Only for production deployments
   - **Preview:** Only for preview deployments
   - **Development:** Only for local development
   - **All:** Applies to all environments (recommended)

2. **After Adding Variables:**
   - **Must redeploy** for changes to take effect
   - Variables are only available after redeployment
   - Old deployments won't have new variables

3. **Security:**
   - Never commit `.env.local` to git (already in `.gitignore`)
   - Server-side variables are secure
   - Client-side variables are visible to users

## ✅ Quick Checklist

- [ ] Added `ADMIN_PASSWORD` (server-side)
- [ ] Added `RESEND_API_KEY` (server-side)
- [ ] Added all `NEXT_PUBLIC_FIREBASE_*` variables (client-side)
- [ ] Set environment to **Production** or **All**
- [ ] Clicked **Save** for each variable
- [ ] Redeployed after adding all variables
- [ ] Verified build succeeded in Vercel logs
- [ ] Tested website loads correctly

## 🆘 Troubleshooting

### Variables Not Working?
- ✅ Make sure you **redeployed** after adding variables
- ✅ Check that environment is set to **Production** or **All**
- ✅ Verify variable names are spelled correctly (case-sensitive)
- ✅ Check build logs for errors

### Still Getting 404?
- Check Vercel build logs for errors
- Verify all required variables are added
- Make sure build completed successfully

## 📞 Need Help?

If you're stuck:
1. Check Vercel build logs for specific errors
2. Verify all variables are added correctly
3. Make sure you redeployed after adding variables


