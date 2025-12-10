# SEO Setup Guide

## Required Images

### 1. Open Graph Image (`/public/og-image.jpg`)
Create an Open Graph image with the following specifications:
- **Dimensions**: 1200x630 pixels (recommended)
- **Format**: JPG or PNG
- **Content**: Should include:
  - Company logo
  - Company name: "AK Home Renovation"
  - Tagline: "Professional House Refurbishment Services UK"
  - Visual elements related to home renovation
  - Brand colors (#202845)

You can create this using:
- Canva (free templates available)
- Adobe Photoshop/Illustrator
- Online OG image generators
- Or hire a designer

### 2. Favicon
The favicon is currently set to use `/logo.png`. For best results:
- Create a 32x32 pixel favicon.ico file
- Create 16x16, 32x32, and 180x180 pixel versions
- Place in `/public/` directory

## Google Search Console Setup

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property: `https://akhomerenovation.co.uk`
3. Verify ownership using one of these methods:
   - HTML file upload
   - HTML tag (add to layout.tsx verification section)
   - Domain name provider
4. Submit your sitemap: `https://akhomerenovation.co.uk/sitemap.xml`

## Google Analytics Setup

1. Create a Google Analytics 4 property
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
4. Add Google Analytics script to `app/layout.tsx` (optional)

## Bing Webmaster Tools

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your site
3. Verify ownership
4. Submit sitemap

## Additional SEO Checklist

- [x] Meta titles and descriptions on all pages
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] Structured data (JSON-LD)
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Canonical URLs
- [x] Mobile-friendly design
- [x] Fast page load times
- [x] HTTPS (ensure SSL certificate)
- [ ] Create og-image.jpg (1200x630px)
- [ ] Set up Google Search Console
- [ ] Set up Google Analytics
- [ ] Set up Bing Webmaster Tools
- [ ] Add Google verification code to layout.tsx
- [ ] Submit sitemap to search engines

## Page Speed Optimization

- Images are optimized
- Videos are properly compressed
- CSS and JS are minified (Next.js handles this)
- Consider using Next.js Image component for all images

## Content SEO

- All pages have unique, descriptive titles
- All pages have unique meta descriptions
- Headings (H1, H2, H3) are properly structured
- Alt text on all images
- Internal linking between pages
- External links to authoritative sources

## Local SEO

- [x] Business address in structured data
- [x] Phone number in structured data
- [x] Geographic targeting (UK)
- [ ] Google Business Profile setup
- [ ] Local citations and directories

