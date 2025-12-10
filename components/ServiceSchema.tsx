import { Metadata } from "next";

interface ServiceSchemaProps {
  name: string;
  description: string;
  provider: {
    name: string;
    url: string;
    telephone: string;
    email: string;
  };
  areaServed?: string[];
  serviceType: string;
  offers?: {
    price?: string;
    priceCurrency?: string;
  };
}

export default function ServiceSchema({
  name,
  description,
  provider,
  areaServed = ["United Kingdom"],
  serviceType,
  offers,
}: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "HomeImprovementContractor",
      "@id": "https://akhomerenovation.co.uk/#organization",
      name: provider.name,
      url: provider.url,
      telephone: provider.telephone,
      email: provider.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "55 Colmore Row",
        addressLocality: "Birmingham",
        addressRegion: "West Midlands",
        postalCode: "B3 2AA",
        addressCountry: "GB",
      },
    },
    areaServed: areaServed.map((area) => ({
      "@type": "Country" as const,
      name: area,
    })),
    serviceType,
    ...(offers && {
      offers: {
        "@type": "Offer" as const,
        price: offers.price,
        priceCurrency: offers.priceCurrency || "GBP",
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

