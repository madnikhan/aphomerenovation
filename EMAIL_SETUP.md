# Email Integration Setup Guide

This guide will help you set up email integration using Resend API to send quote PDFs directly to customers.

## Prerequisites

1. A Resend account (sign up at https://resend.com)
2. A verified domain (or use Resend's test domain for development)

## Step 1: Create Resend Account

1. Go to https://resend.com and sign up for a free account
2. Verify your email address

## Step 2: Get Your API Key

1. Log in to your Resend dashboard
2. Navigate to **API Keys** in the sidebar
3. Click **Create API Key**
4. Give it a name (e.g., "AK Home Renovation")
5. Copy the API key (you'll only see it once!)

## Step 3: Verify Your Domain (Recommended for Production)

### Option A: Use Your Own Domain (Recommended)

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `akhomerenovation.co.uk`)
4. Add the DNS records provided by Resend to your domain's DNS settings:
   - SPF record
   - DKIM records
   - DMARC record (optional but recommended)
5. Wait for verification (usually takes a few minutes to 24 hours)

### Option B: Use Resend Test Domain (For Development)

For testing, you can use Resend's test domain:
- From email: `onboarding@resend.dev`
- This only works for sending to your verified email address

## Step 4: Add API Key to Environment Variables

1. Open your `.env.local` file in the project root
2. Add the following line:

```env
RESEND_API_KEY=re_your_api_key_here
```

Replace `re_your_api_key_here` with your actual Resend API key.

3. Save the file
4. **Restart your development server** for the changes to take effect

## Step 5: Update Email From Address

1. Open `app/api/send-quote-email/route.ts`
2. Find this line:
   ```typescript
   from: "AK Home Renovation <quotes@akhomerenovation.co.uk>",
   ```
3. Update it to match your verified domain:
   - If using your own domain: `"AK Home Renovation <quotes@yourdomain.com>"`
   - If using test domain: `"AK Home Renovation <onboarding@resend.dev>"`

## Step 6: Test Email Sending

1. Start your development server: `npm run dev`
2. Go to `/quote-builder`
3. Create a test quote with a customer email
4. Click **"Send Email"** button
5. Check the customer's inbox (and spam folder)

## Features

### Email Functionality

- **Send Quote PDF**: Automatically generates PDF and sends it as an attachment
- **Professional Email Template**: Beautiful HTML email with quote summary
- **Auto Status Update**: Quote status automatically changes to "sent" when email is sent
- **Error Handling**: Clear error messages if email fails

### Where to Send Emails

1. **From Quote Builder** (`/quote-builder`):
   - Fill in quote details
   - Click **"Send Email"** button
   - Email is sent to the customer email address

2. **From Quotes Page** (`/quotes`):
   - Click the blue mail icon on any quote
   - You'll be redirected to quote builder to send the email

## Troubleshooting

### Error: "Failed to send email"

**Possible causes:**
1. **API Key not set**: Make sure `RESEND_API_KEY` is in `.env.local`
2. **Invalid API Key**: Verify your API key in Resend dashboard
3. **Domain not verified**: Check domain status in Resend dashboard
4. **Server not restarted**: Restart your dev server after adding API key

### Error: "Missing required fields"

- Make sure customer email is filled in
- Ensure quote number, date, and valid until are set
- At least one service must be added

### Email goes to spam

**Solutions:**
1. Verify your domain with SPF, DKIM, and DMARC records
2. Use a professional "from" address
3. Avoid spam trigger words in subject/body
4. Warm up your domain by sending emails gradually

### Test Domain Limitations

If using `onboarding@resend.dev`:
- Can only send to your verified email address
- Not suitable for production
- Upgrade to verified domain for production use

## Resend Pricing

- **Free Tier**: 3,000 emails/month, 100 emails/day
- **Pro Tier**: $20/month for 50,000 emails
- Perfect for small to medium businesses

## Security Notes

1. **Never commit `.env.local`** to git (it's already in `.gitignore`)
2. **Keep your API key secret**
3. **Use environment variables** in production (Vercel, Netlify, etc.)
4. **Rotate API keys** periodically for security

## Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add `RESEND_API_KEY` to your hosting platform's environment variables
2. Make sure your domain is verified in Resend
3. Update the "from" address in `app/api/send-quote-email/route.ts`
4. Test email sending in production

## Support

- Resend Documentation: https://resend.com/docs
- Resend Support: support@resend.com
- Check Resend dashboard for delivery status and logs

