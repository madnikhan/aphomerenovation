import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/quote-builder/', '/login/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/quote-builder/', '/login/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/quote-builder/', '/login/'],
      },
    ],
    sitemap: 'https://akhomerenovation.co.uk/sitemap.xml',
    host: 'https://akhomerenovation.co.uk',
  }
}

