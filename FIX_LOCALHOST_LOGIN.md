# Fix "Server configuration error" on Localhost

## ✅ Fixed!

I've added `ADMIN_PASSWORD=admin123` to your `.env.local` file.

## 🔄 Next Step: Restart Dev Server

**IMPORTANT:** You must restart your development server for the new environment variable to load.

### How to Restart:

1. **Stop the current server:**
   - Press `Ctrl + C` in the terminal where `npm run dev` is running

2. **Start it again:**
   ```bash
   npm run dev
   ```

3. **Try logging in again:**
   - Go to: `http://localhost:3000/quote-builder`
   - Enter password: `admin123`
   - Should work now! ✅

## 📋 Understanding Environment Variables

### Client-Side Variables (Browser)
- **Prefix:** `NEXT_PUBLIC_`
- **Example:** `NEXT_PUBLIC_FIREBASE_API_KEY`
- **Used in:** React components, client-side code
- **Accessible:** In browser (visible in source code)

### Server-Side Variables (API Routes)
- **Prefix:** None (no `NEXT_PUBLIC_`)
- **Example:** `ADMIN_PASSWORD`, `RESEND_API_KEY`
- **Used in:** API routes (`/app/api/*`)
- **Accessible:** Only on server (hidden from browser)

## 🔍 Why You Had This Error

Your `.env.local` had:
- ✅ `NEXT_PUBLIC_ADMIN_PASSWORD` (client-side)
- ❌ `ADMIN_PASSWORD` (server-side) ← **Missing!**

The login API route (`/app/api/auth/login/route.ts`) runs on the **server**, so it needs `ADMIN_PASSWORD` (without `NEXT_PUBLIC_`).

## 📝 Current `.env.local` Setup

```env
# Client-side (browser)
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_ADMIN_PASSWORD=admin123

# Server-side (API routes)
ADMIN_PASSWORD=admin123  ← Added this!
RESEND_API_KEY=...
```

## ⚠️ Important Notes

1. **Restart Required:** Environment variables are only loaded when the server starts
2. **Same Value:** Both `NEXT_PUBLIC_ADMIN_PASSWORD` and `ADMIN_PASSWORD` can have the same value
3. **Security:** Server-side variables are safer (not exposed to browser)

## 🚀 Quick Fix Summary

1. ✅ Added `ADMIN_PASSWORD=admin123` to `.env.local`
2. ⏳ **Restart dev server** (`Ctrl + C`, then `npm run dev`)
3. ✅ Try login again

After restarting, the error should be gone!

