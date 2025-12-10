# Vercel Deployment Guide

## ✅ Production Readiness Status

### Security Fixes Applied:
- ✅ Secure server-side authentication
- ✅ Rate limiting on email API
- ✅ Authentication check on email API
- ✅ HTTP-only cookies for sessions
- ✅ Sanitized error messages
- ✅ No exposed passwords in client code

### Remaining Steps:

## Step 1: Set Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

### Required Environment Variables:

**Server-side (Private):**
```
ADMIN_PASSWORD=your_secure_password_here
RESEND_API_KEY=re_2xLu2LPh_Luoxxd4zbKTxCGZnVkHPiBP3
```

**Client-side (Public - OK to expose):**
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyA5sXv6O0GHxqfELPaFrJf40uZXTr33Ca0
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=akhomerenovation.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=akhomerenovation
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=akhomerenovation.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1002665088466
NEXT_PUBLIC_FIREBASE_APP_ID=1:1002665088466:web:eddbb9f1f0368138bea40b
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-71T4B01QRL
```

**Important Notes:**
- Set `ADMIN_PASSWORD` to a strong password (not "admin123")
- Make sure `RESEND_API_KEY` is set correctly
- All `NEXT_PUBLIC_*` variables are exposed to the browser (this is OK for Firebase config)

## Step 2: Deploy to Vercel

### Option A: Deploy via GitHub (Recommended)

1. Connect your GitHub repository to Vercel:
   - Go to https://vercel.com/new
   - Import your repository: `madnikhan/aphomerenovation`
   - Vercel will auto-detect Next.js settings

2. Add environment variables (see Step 1)

3. Click **Deploy**

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

## Step 3: Post-Deployment Checklist

- [ ] Verify domain is connected (if using custom domain)
- [ ] Test admin login at `/quote-builder`
- [ ] Test quote creation and saving
- [ ] Test email sending functionality
- [ ] Verify Firebase connection
- [ ] Check that all pages load correctly
- [ ] Test on mobile devices

## Step 4: Domain Verification (Resend)

1. Go to https://resend.com/domains
2. Add domain: `akhomerenovation.co.uk`
3. Add DNS records to your domain
4. Wait for verification (5-30 minutes)

## Step 5: Firebase Security Rules

Update Firestore security rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Quotes - only authenticated admins can access
    match /quotes/{quoteId} {
      allow read, write: if request.auth != null;
    }
    
    // Clients - only authenticated admins can access
    match /clients/{clientId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**Note:** Currently using localStorage-based auth. For production, consider implementing Firebase Authentication for better security.

## Security Improvements Made

### Before:
- ❌ Admin password exposed in client code
- ❌ No rate limiting on API routes
- ❌ No authentication on email API
- ❌ Default password fallback

### After:
- ✅ Server-side authentication
- ✅ HTTP-only cookies
- ✅ Rate limiting (10 emails/minute per IP)
- ✅ Authentication required for email API
- ✅ No exposed passwords
- ✅ Sanitized error messages

## Troubleshooting

### "Unauthorized" Error on Email Send
- Check that you're logged in
- Verify session cookie is set
- Check browser console for errors

### Email Not Sending
- Verify `RESEND_API_KEY` is set in Vercel
- Check Resend dashboard for errors
- Verify domain is verified in Resend

### Firebase Connection Issues
- Verify all `NEXT_PUBLIC_FIREBASE_*` variables are set
- Check Firebase Console for errors
- Verify Firestore database is created

### Build Errors
- Check Vercel build logs
- Verify all environment variables are set
- Check for TypeScript errors

## Performance Optimization

Vercel automatically:
- ✅ Optimizes images
- ✅ Enables compression
- ✅ CDN distribution
- ✅ Edge caching

## Monitoring

Consider adding:
- Vercel Analytics (free tier available)
- Error tracking (Sentry, LogRocket)
- Uptime monitoring

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Resend Docs: https://resend.com/docs

