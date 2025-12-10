# Email Integration - Quick Start Guide

## ✅ API Key Added

Your Resend API key has been added to `.env.local`:
```
RESEND_API_KEY=re_2xLu2LPh_Luoxxd4zbKTxCGZnVkHPiBP3
```

## 🚀 Next Steps

### 1. Restart Your Development Server

**Important:** You must restart your dev server for the API key to take effect:

```bash
# Stop your current server (Ctrl+C)
# Then restart:
npm run dev
```

### 2. Test Email Sending

1. Go to `/quote-builder`
2. Create a test quote with:
   - Customer email address (use your own email for testing)
   - At least one service
   - Quote number, date, and valid until date
3. Click **"Send Email"** button
4. Check your inbox (and spam folder)

### 3. Current Email Configuration

**From Address:** `info@akhomerenovation.co.uk` (Your business email)

**⚠️ Important:** You need to verify your domain in Resend before emails will work!

**To verify your domain:**
1. Go to https://resend.com/domains
2. Click "Add Domain"
3. Enter: `akhomerenovation.co.uk`
4. Add the DNS records (SPF, DKIM) provided by Resend to your domain's DNS settings
5. Wait for verification (usually 5-30 minutes)

**Until domain is verified:**
- Emails may fail to send
- Use `onboarding@resend.dev` for testing (can only send to your verified email)

### 4. Production Setup (When Ready)

When you're ready to send emails to real customers:

1. **Verify Your Domain in Resend:**
   - Go to https://resend.com/domains
   - Click "Add Domain"
   - Enter: `akhomerenovation.co.uk`
   - Add the DNS records provided by Resend to your domain

2. **From Address Already Set:**
   - Already configured to use: `info@akhomerenovation.co.uk`
   - No changes needed once domain is verified

3. **Test with Real Customers:**
   - Once domain is verified, you can send to any email address
   - No more limitations!

## 📧 How to Use

### From Quote Builder:
1. Fill in quote details
2. Enter customer email
3. Click **"Send Email"** button
4. Email is sent automatically with PDF attachment

### From Quotes Page:
1. Click the blue mail icon on any quote
2. You'll be redirected to quote builder
3. Click **"Send Email"** to send

## 🔍 Troubleshooting

### "Failed to send email" Error

**Check:**
1. ✅ API key is in `.env.local` (already done)
2. ✅ Dev server was restarted after adding API key
3. ✅ You're using your verified email address (for test domain)
4. ✅ Internet connection is working

### Email Not Received

1. Check spam/junk folder
2. Verify you're using the email address you signed up with Resend
3. Check Resend dashboard for delivery status: https://resend.com/emails

### "Missing API key" Error

1. Make sure `.env.local` file exists in project root
2. Restart your dev server
3. Check that `RESEND_API_KEY` is spelled correctly

## 📊 Resend Dashboard

Monitor your emails:
- **Dashboard:** https://resend.com/emails
- **API Keys:** https://resend.com/api-keys
- **Domains:** https://resend.com/domains

## 💡 Tips

- **Free Tier:** 3,000 emails/month - perfect for getting started
- **Test First:** Always test with your own email before sending to customers
- **Domain Verification:** Takes 5-30 minutes after adding DNS records
- **Email Limits:** 100 emails/day on free tier

## 🎉 You're All Set!

Your email integration is ready to use. Just restart your dev server and start sending quotes!

