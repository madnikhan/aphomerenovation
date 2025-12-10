import Link from "next/link";
import { Building2, Paintbrush, Hammer, Wrench, Home, ArrowRight } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";

export const metadata = {
  title: "Our Services - House Refurbishment & Renovation | AK Home Renovation",
  description: "Comprehensive house refurbishment services across the UK. Chimney removal, plastering, painting, decoration, partitions, boarding, sealing, and complete renovations. Free quotes available.",
  keywords: [
    "house refurbishment services",
    "home renovation services UK",
    "chimney removal",
    "plastering services",
    "painting and decoration",
    "partition installation",
    "boarding and sealing",
    "whole house renovation",
    "home improvement services",
  ],
  openGraph: {
    title: "Our Services - House Refurbishment & Renovation",
    description: "Comprehensive house refurbishment services across the UK. Quality workmanship you can trust.",
    type: "website",
    url: "https://akhomerenovation.co.uk/services",
  },
};

const services = [
  {
    icon: Building2,
    title: "Chimney Removal",
    description: "Professional and safe chimney removal services. We handle all aspects from planning to completion, ensuring structural integrity and compliance with building regulations.",
    href: "/services/chimney-removal",
    features: [
      "Full structural assessment",
      "Safe removal process",
      "Building regulation compliance",
      "Clean-up included",
    ],
  },
  {
    icon: Paintbrush,
    title: "Plastering & Skimming",
    description: "Expert plastering and skimming services for smooth, flawless walls and ceilings. Professional finish guaranteed with attention to detail.",
    href: "/services/plastering",
    features: [
      "Smooth finish guaranteed",
      "All wall types",
      "Quick drying solutions",
      "Expert craftsmen",
    ],
  },
  {
    icon: Paintbrush,
    title: "Painting & Decoration",
    description: "Transform your home with our professional painting and decoration services. Interior and exterior work available with premium materials.",
    href: "/services/painting",
    features: [
      "Interior & exterior",
      "Premium paints",
      "Color consultation",
      "Protection included",
    ],
  },
  {
    icon: Hammer,
    title: "Partition Installation",
    description: "Create new spaces with our partition installation services. Custom solutions to maximize your property's potential and functionality.",
    href: "/services/partitions",
    features: [
      "Custom designs",
      "Soundproofing options",
      "Quick installation",
      "Various materials",
    ],
  },
  {
    icon: Wrench,
    title: "Boarding & Sealing",
    description: "Professional boarding and sealing services to protect and enhance your property. Quality materials and expert installation for lasting results.",
    href: "/services/boarding",
    features: [
      "Weather protection",
      "Quality materials",
      "Expert installation",
      "Long-lasting results",
    ],
  },
  {
    icon: Home,
    title: "Whole House Renovation",
    description: "Complete house renovation services from design to completion. Transform your entire property with our comprehensive solutions.",
    href: "/services/renovation",
    features: [
      "End-to-end service",
      "Project management",
      "Quality guarantee",
      "Timeline commitment",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-20 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive house refurbishment and renovation services across the
            United Kingdom. Quality workmanship you can trust.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="p-8">
                <div className="w-16 h-16 bg-[#e8eaf0] rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-[#202845]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-600">
                      <span className="text-[#202845] mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={service.href}
                  className="inline-flex items-center text-[#202845] font-semibold hover:text-[#1a1f36] transition-colors"
                >
                  Learn More
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#202845] to-[#15192b] rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-[#e8eaf0] mb-8">
            Book a free consultation and get a quote for your project
          </p>
          <Link
            href="/book"
            className="inline-block bg-white text-[#202845] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}

