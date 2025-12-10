# AK Home Renovation - Professional House Refurbishment Website

A modern, SEO-friendly website for AK Home Renovation, offering professional house refurbishment and renovation services across the United Kingdom.

## Features

- ✅ **SEO Optimized** - Complete metadata, structured data, sitemap, and robots.txt
- ✅ **Modern Design** - Beautiful, responsive UI with Tailwind CSS
- ✅ **Booking System** - Complete booking form with date picker and time slots
- ✅ **Payment Integration** - Online payment support (Stripe ready) and cash payment option
- ✅ **Service Pages** - Detailed pages for all services
- ✅ **Contact Forms** - Multiple contact points for customer inquiries
- ✅ **Mobile Responsive** - Fully responsive design for all devices
- ✅ **Fast Performance** - Built with Next.js 16 for optimal performance

## Services Offered

- Chimney Removal
- Plastering & Skimming
- Painting & Decoration
- Partition Installation
- Boarding & Sealing
- Whole House Renovation
- Maintenance

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Date Picker**: React DatePicker
- **Payment**: Stripe (ready for integration)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd akhomerenovation
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_API_URL=http://localhost:3000
CONTACT_EMAIL=info@akhomerenovation.co.uk
CONTACT_PHONE=+44-XXX-XXX-XXXX
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
akhomerenovation/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── book/              # Booking page
│   ├── contact/           # Contact page
│   ├── services/          # Services pages
│   ├── layout.tsx         # Root layout with SEO
│   ├── page.tsx           # Homepage
│   ├── sitemap.ts         # Sitemap generation
│   └── robots.ts          # Robots.txt
├── components/            # React components
│   ├── Navbar.tsx         # Navigation bar
│   ├── Footer.tsx         # Footer component
│   ├── Hero.tsx           # Hero section
│   ├── ServiceCard.tsx    # Service card component
│   ├── BookingForm.tsx    # Booking form
│   └── PaymentModal.tsx   # Payment modal
└── public/                # Static assets
```

## Payment Integration

The website is set up for Stripe integration. To enable payments:

1. Sign up for a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe dashboard
3. Add them to your `.env.local` file
4. Create API routes in `app/api/` for payment processing

Currently, the payment modal is a UI mockup. You'll need to:
- Create API routes for creating payment intents
- Integrate Stripe Elements for secure card input
- Handle payment confirmation

## SEO Features

- Complete metadata for all pages
- Structured data (JSON-LD) for business information
- Sitemap.xml generation
- Robots.txt configuration
- Semantic HTML structure
- Open Graph and Twitter Card support

## Customization

### Update Contact Information

Edit the following files:
- `components/Footer.tsx` - Footer contact info
- `components/Navbar.tsx` - Phone number in mobile menu
- `app/layout.tsx` - Structured data
- `app/contact/page.tsx` - Contact page details

### Update Services

Add or modify services in:
- `app/page.tsx` - Homepage services list
- `app/services/page.tsx` - Services listing page
- `app/services/[service-name]/page.tsx` - Individual service pages

### Styling

The website uses Tailwind CSS. Customize colors and styles in:
- `app/globals.css` - Global styles
- Individual component files - Component-specific styles

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Self-hosted with Node.js

## Production Checklist

Before going live:

- [ ] Update all contact information (phone, email, address)
- [ ] Add real Stripe API keys
- [ ] Update domain in `app/layout.tsx` metadata
- [ ] Update sitemap URL in `app/robots.ts`
- [ ] Add Google Analytics (if needed)
- [ ] Set up email service for contact forms
- [ ] Test booking system end-to-end
- [ ] Test payment flow
- [ ] Add real images/photos
- [ ] Set up Google Search Console
- [ ] Submit sitemap to search engines

## Support

For questions or support, please contact: info@akhomerenovation.co.uk

## License

This project is proprietary and confidential.
