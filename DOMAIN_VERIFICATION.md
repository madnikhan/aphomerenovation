# Domain Verification Guide for Resend

## Your Business Email

**Email Address:** `info@akhomerenovation.co.uk`  
**Domain:** `akhomerenovation.co.uk`

## Step-by-Step Verification Process

### Step 1: Add Domain in Resend

1. Go to https://resend.com/domains
2. Click **"Add Domain"** button
3. Enter: `akhomerenovation.co.uk`
4. Click **"Add"**

### Step 2: Add DNS Records

Resend will provide you with DNS records to add. You'll need to add these to your domain's DNS settings:

#### Required Records:

1. **SPF Record** (TXT record)
   - Name: `@` or `akhomerenovation.co.uk`
   - Value: `v=spf1 include:resend.com ~all`
   - TTL: 3600 (or default)

2. **DKIM Records** (2-3 TXT records)
   - Resend will provide specific values
   - Usually named like: `resend._domainkey`
   - Add all DKIM records provided

3. **DMARC Record** (Optional but recommended)
   - Name: `_dmarc`
   - Value: `v=DMARC1; p=none; rua=mailto:info@akhomerenovation.co.uk`
   - TTL: 3600

### Step 3: Where to Add DNS Records

**If your domain is managed by:**
- **GoDaddy:** Go to DNS Management → Add Records
- **Namecheap:** Advanced DNS → Add New Record
- **Cloudflare:** DNS → Add Record
- **Google Domains:** DNS → Custom Records
- **Other providers:** Look for "DNS Management" or "DNS Settings"

### Step 4: Wait for Verification

- DNS changes can take 5 minutes to 48 hours to propagate
- Usually takes 5-30 minutes
- Resend will show verification status in the dashboard
- You'll receive an email when verification is complete

### Step 5: Test Email Sending

Once verified:
1. Go to `/quote-builder`
2. Create a test quote
3. Use any email address (not just your own)
4. Click "Send Email"
5. Check the recipient's inbox

## Troubleshooting

### "Domain not verified" Error

**Check:**
1. ✅ DNS records are added correctly
2. ✅ DNS records have propagated (use https://dnschecker.org to check)
3. ✅ All DKIM records are added (usually 2-3 records)
4. ✅ SPF record is correct
5. ✅ Waited at least 5-10 minutes after adding records

### DNS Propagation Check

Use these tools to verify your DNS records:
- https://dnschecker.org
- https://mxtoolbox.com
- https://www.whatsmydns.net

### Still Not Working?

1. **Double-check DNS records:**
   - Make sure all records match exactly what Resend provided
   - Check for typos
   - Ensure TTL is set correctly

2. **Contact Resend Support:**
   - Email: support@resend.com
   - They can help troubleshoot DNS issues

3. **Use Test Domain Temporarily:**
   - If you need to test immediately, temporarily change the "from" address to `onboarding@resend.dev`
   - Remember: test domain can only send to your verified email

## Current Configuration

**Email Route:** `app/api/send-quote-email/route.ts`  
**From Address:** `info@akhomerenovation.co.uk`  
**Status:** Waiting for domain verification

## After Verification

Once your domain is verified:
- ✅ Can send to any email address
- ✅ Professional email address
- ✅ Better deliverability
- ✅ No sending limitations (within your plan limits)

## Resend Dashboard Links

- **Domains:** https://resend.com/domains
- **Emails:** https://resend.com/emails (view sent emails)
- **API Keys:** https://resend.com/api-keys
- **Documentation:** https://resend.com/docs

## Need Help?

If you're stuck with DNS configuration:
1. Check your domain registrar's documentation
2. Contact your domain registrar's support
3. Contact Resend support: support@resend.com

