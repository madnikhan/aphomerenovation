# Quick Fix for 404 Error on Vercel

## Most Likely Cause: Missing Environment Variables

The 404 error usually means the build failed on Vercel. The most common cause is **missing environment variables**.

## ✅ Immediate Fix Steps

### Step 1: Check Vercel Build Logs

1. Go to https://vercel.com/dashboard
2. Click on your project: **aphomerenovation**
3. Go to **Deployments** tab
4. Click on the latest deployment (the one showing 404)
5. Check the **Build Logs** - this will show the exact error

### Step 2: Add Missing Environment Variables

Go to **Settings** → **Environment Variables** and add:

**Required (Server-side):**
```
ADMIN_PASSWORD=your_secure_password_here
RESEND_API_KEY=re_2xLu2LPh_Luoxxd4zbKTxCGZnVkHPiBP3
```

**Required (Client-side):**
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyA5sXv6O0GHxqfELPaFrJf40uZXTr33Ca0
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=akhomerenovation.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=akhomerenovation
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=akhomerenovation.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1002665088466
NEXT_PUBLIC_FIREBASE_APP_ID=1:1002665088466:web:eddbb9f1f0368138bea40b
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-71T4B01QRL
```

**Important:**
- Set environment to **Production** (or All)
- Click **Save** after adding each variable
- **Redeploy** after adding all variables

### Step 3: Redeploy

After adding environment variables:

1. Go to **Deployments** tab
2. Click the **three dots** (⋯) on the latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger automatic redeploy

## 🔍 What to Look For in Build Logs

### Error: "ADMIN_PASSWORD is not configured"
- **Fix:** Add `ADMIN_PASSWORD` environment variable

### Error: "RESEND_API_KEY is not configured"
- **Fix:** Add `RESEND_API_KEY` environment variable

### Error: "Firebase config missing"
- **Fix:** Add all `NEXT_PUBLIC_FIREBASE_*` variables

### Error: "Module not found"
- **Fix:** Check that all dependencies are in `package.json`

### Error: "Type error"
- **Fix:** Check TypeScript errors in build logs

## 🚀 Quick Redeploy

If you've already added environment variables:

1. **Option A:** Push a new commit
   ```bash
   git commit --allow-empty -m "Trigger redeploy"
   git push
   ```

2. **Option B:** Redeploy from Vercel Dashboard
   - Deployments → Latest → ⋯ → Redeploy

## ✅ Verify It's Working

After redeploy, check:
1. Build status shows ✅ **Ready**
2. Visit: `https://aphomerenovation.vercel.app/`
3. Should see the homepage (not 404)

## 📋 Checklist

- [ ] Checked Vercel build logs
- [ ] Added all environment variables
- [ ] Set variables for Production environment
- [ ] Redeployed after adding variables
- [ ] Verified build status is "Ready"
- [ ] Tested homepage loads correctly

## 🆘 Still Getting 404?

1. **Check Build Status:**
   - If build failed → Fix errors shown in logs
   - If build succeeded → Check runtime logs

2. **Check Runtime Logs:**
   - Vercel Dashboard → Project → Logs
   - Look for runtime errors

3. **Test API Routes:**
   - Try: `https://aphomerenovation.vercel.app/api/auth/check`
   - Should return: `{"authenticated":false}`

4. **Verify Domain:**
   - Settings → Domains
   - Make sure domain is correctly configured

## 💡 Pro Tip

The build logs will tell you exactly what's wrong. Always check them first!

