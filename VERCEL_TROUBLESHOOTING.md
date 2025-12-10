# Vercel 404 Error Troubleshooting Guide

## Issue: 404 NOT_FOUND Error

If you're seeing a 404 error after deployment, here are the most common causes and solutions:

## 🔍 Common Causes

### 1. Build Failed (Most Common)

**Check Vercel Build Logs:**
1. Go to Vercel Dashboard
2. Click on your project
3. Go to **Deployments** tab
4. Click on the latest deployment
5. Check the **Build Logs** for errors

**Common Build Errors:**
- Missing environment variables
- TypeScript errors
- Import errors
- Missing dependencies

### 2. Missing Environment Variables

**Required Environment Variables:**
```
ADMIN_PASSWORD=your_password
RESEND_API_KEY=re_...
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=...
```

**How to Add:**
1. Vercel Dashboard → Project → Settings → Environment Variables
2. Add each variable
3. **Redeploy** after adding variables

### 3. Build Configuration Issues

**Check:**
- Framework: Should be auto-detected as "Next.js"
- Build Command: `npm run build`
- Output Directory: `.next` (auto-detected)
- Install Command: `npm install`

### 4. API Route Issues

If API routes are causing build failures:
- Check that all server-side code is in API routes or Server Components
- Ensure `cookies()` from `next/headers` is only used in Server Components/API routes

## 🛠️ Quick Fixes

### Fix 1: Check Build Logs

1. Go to Vercel Dashboard
2. Find your deployment
3. Check the build logs
4. Look for error messages

### Fix 2: Redeploy

1. Go to Vercel Dashboard
2. Click **Redeploy** on the latest deployment
3. Or push a new commit to trigger redeploy

### Fix 3: Verify Environment Variables

1. Go to Settings → Environment Variables
2. Verify all required variables are set
3. Make sure they're set for **Production** environment
4. Redeploy after adding variables

### Fix 4: Check Domain Configuration

1. Go to Settings → Domains
2. Verify your domain is correctly configured
3. Check DNS settings if using custom domain

## 🔧 Debugging Steps

### Step 1: Check Deployment Status

```bash
# If using Vercel CLI
vercel logs
```

Or check in Vercel Dashboard → Deployments

### Step 2: Test Build Locally

```bash
npm run build
npm start
```

If local build fails, fix those errors first.

### Step 3: Check Runtime Logs

1. Vercel Dashboard → Project → Logs
2. Look for runtime errors
3. Check for missing environment variables

### Step 4: Verify API Routes

Test API routes directly:
- `https://aphomerenovation.vercel.app/api/auth/check`
- Should return `{"authenticated":false}` if working

## 📋 Deployment Checklist

- [ ] All environment variables are set in Vercel
- [ ] Build completes successfully (check logs)
- [ ] No TypeScript errors
- [ ] No import errors
- [ ] API routes are accessible
- [ ] Static pages are generated

## 🚨 Common Error Messages

### "Module not found"
- **Fix:** Check imports, ensure all dependencies are in `package.json`

### "Environment variable not found"
- **Fix:** Add missing variables in Vercel dashboard

### "Build failed"
- **Fix:** Check build logs for specific error

### "404 on all routes"
- **Fix:** Usually means build failed or routing issue

## 📞 Next Steps

1. **Check Vercel Build Logs** - This will show the exact error
2. **Verify Environment Variables** - Make sure all are set
3. **Redeploy** - After fixing issues
4. **Check Runtime Logs** - For runtime errors

## 🔗 Useful Links

- Vercel Dashboard: https://vercel.com/dashboard
- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment

## 💡 Quick Test

Try accessing these URLs to diagnose:
- `https://aphomerenovation.vercel.app/` - Should show homepage
- `https://aphomerenovation.vercel.app/api/auth/check` - Should return JSON
- `https://aphomerenovation.vercel.app/about` - Should show about page

If all return 404, the build likely failed.


