import Link from "next/link";
import { Building2, Paintbrush, Hammer, Wrench, Home, CheckCircle2, ArrowRight, Phone } from "lucide-react";

export const metadata = {
  title: "Pricing - AK Home Renovation Services",
  description: "Transparent pricing for all our house refurbishment services. Competitive rates for chimney removal, plastering, painting, partitions, boarding, and complete renovations across the UK.",
};

const pricingPlans = [
  {
    icon: Building2,
    title: "Chimney Removal",
    startingFrom: "£500",
    description: "Professional chimney removal and repair services with comprehensive pricing options for all project sizes.",
    packages: [
      {
        name: "Full Chimney Removal (Including Skimming)",
        options: [
          { label: "Single Room Full Size", price: "£900", includes: "including skimming" },
          { label: "Small Size Chimney", price: "£500", includes: "including skimming" },
          { label: "Upstairs + Downstairs", price: "£1,800", includes: "including skimming & support" },
          { label: "With Materials", price: "£2,200", includes: "including skimming, support & materials" },
        ],
      },
      {
        name: "Multiple Chimney Projects",
        options: [
          { label: "4 Chimneys in 4 Rooms (Full Package)", price: "£3,500", includes: "including skimming, materials, everything" },
        ],
      },
      {
        name: "Chimney Removal Only (No Plastering)",
        options: [
          { label: "Full Size Chimney", price: "£600", includes: "removal only" },
          { label: "Small Size Chimney", price: "£500", includes: "removal only" },
        ],
      },
      {
        name: "Roof-Level Removal",
        options: [
          { label: "2 Chimneys (Upstairs + Downstairs)", price: "£3,000", includes: "roof-level removal" },
          { label: "4 Chimneys", price: "£4,000", includes: "everything included, skip not included" },
        ],
      },
    ],
    features: [
      "Professional chimney removal",
      "Structural support where needed",
      "Wall skimming and finishing",
      "Clean-up and debris removal",
      "Quality assurance checks",
    ],
    note: "Skip hire is customer's responsibility",
  },
  {
    icon: Paintbrush,
    title: "Plastering & Skimming",
    startingFrom: "£80",
    description: "Expert wall skimming and plastering work for smooth, professional finishes that transform your space.",
    packages: [
      {
        name: "Standard Skimming",
        options: [
          { label: "Single Room", price: "£80-£150", includes: "per room" },
          { label: "Multiple Rooms", price: "£70-£130", includes: "per room (discounted)" },
          { label: "Ceiling Skimming", price: "£100-£200", includes: "per ceiling" },
        ],
      },
      {
        name: "Full Plastering",
        options: [
          { label: "Small Room (up to 12m²)", price: "£200-£350", includes: "full plastering" },
          { label: "Medium Room (12-20m²)", price: "£350-£500", includes: "full plastering" },
          { label: "Large Room (20m²+)", price: "£500-£800", includes: "full plastering" },
        ],
      },
    ],
    features: [
      "Wall preparation and cleaning",
      "Professional skimming application",
      "Smooth finish and sanding",
      "Quality control checks",
      "Clean-up after completion",
    ],
  },
  {
    icon: Paintbrush,
    title: "Painting & Decoration",
    startingFrom: "£150",
    description: "Professional painting and decoration services for interior and exterior work.",
    packages: [
      {
        name: "Interior Painting",
        options: [
          { label: "Single Room", price: "£150-£300", includes: "walls and ceiling" },
          { label: "Multiple Rooms", price: "£120-£250", includes: "per room (discounted)" },
          { label: "Full House Interior", price: "£1,200-£2,500", includes: "all rooms" },
        ],
      },
      {
        name: "Exterior Painting",
        options: [
          { label: "Small Property", price: "£800-£1,500", includes: "exterior walls" },
          { label: "Medium Property", price: "£1,500-£2,500", includes: "exterior walls" },
          { label: "Large Property", price: "£2,500-£4,000", includes: "exterior walls" },
        ],
      },
    ],
    features: [
      "Color consultation",
      "Surface preparation",
      "Premium paint materials",
      "Professional application",
      "Protection of furniture and flooring",
    ],
  },
  {
    icon: Hammer,
    title: "Partition Installation",
    startingFrom: "£200",
    description: "Create new spaces with custom partition installation services.",
    packages: [
      {
        name: "Standard Partitions",
        options: [
          { label: "Single Partition (up to 3m)", price: "£200-£400", includes: "basic partition" },
          { label: "Multiple Partitions", price: "£180-£350", includes: "per partition (discounted)" },
          { label: "Soundproof Partition", price: "£400-£800", includes: "with soundproofing" },
        ],
      },
      {
        name: "Custom Partitions",
        options: [
          { label: "Glass Partition", price: "£500-£1,200", includes: "per partition" },
          { label: "Sliding Partition", price: "£600-£1,500", includes: "per partition" },
        ],
      },
    ],
    features: [
      "Custom designs",
      "Various materials available",
      "Soundproofing options",
      "Quick installation",
      "Professional finish",
    ],
  },
  {
    icon: Wrench,
    title: "Boarding & Sealing",
    startingFrom: "£100",
    description: "Professional boarding and sealing services to protect and enhance your property.",
    packages: [
      {
        name: "Boarding Services",
        options: [
          { label: "Small Area (up to 10m²)", price: "£100-£200", includes: "boarding only" },
          { label: "Medium Area (10-20m²)", price: "£200-£400", includes: "boarding only" },
          { label: "Large Area (20m²+)", price: "£400-£800", includes: "boarding only" },
        ],
      },
      {
        name: "Sealing Services",
        options: [
          { label: "Gap Sealing", price: "£80-£150", includes: "per area" },
          { label: "Weatherproofing", price: "£150-£300", includes: "per area" },
        ],
      },
    ],
    features: [
      "Weather protection",
      "Quality materials",
      "Expert installation",
      "Long-lasting results",
      "Professional finish",
    ],
  },
  {
    icon: Home,
    title: "Whole House Renovation",
    startingFrom: "£5,000",
    description: "Complete house renovation services from design to completion.",
    packages: [
      {
        name: "Renovation Packages",
        options: [
          { label: "Small House (1-2 bedrooms)", price: "£5,000-£15,000", includes: "full renovation" },
          { label: "Medium House (3-4 bedrooms)", price: "£15,000-£35,000", includes: "full renovation" },
          { label: "Large House (5+ bedrooms)", price: "£35,000+", includes: "full renovation" },
        ],
      },
    ],
    features: [
      "End-to-end project management",
      "Design consultation",
      "All trades coordinated",
      "Quality guarantee",
      "Timeline commitment",
      "Regular progress updates",
    ],
    note: "Prices vary based on scope and requirements. Free consultation available.",
  },
];

export default function PricingPage() {
  return (
    <div className="pt-20 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transparent, competitive pricing for all our house refurbishment services.
            All prices are estimates - contact us for a free, detailed quote.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="space-y-12">
          {pricingPlans.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
            >
              <div className="bg-gradient-to-r from-[#202845] to-[#15192b] p-8 text-white">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                      <service.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{service.title}</h2>
                      <p className="text-white/90">{service.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white/80 mb-1">Starting from</div>
                    <div className="text-4xl font-bold">{service.startingFrom}</div>
                  </div>
                </div>
              </div>

              <div className="p-8">
                {/* Pricing Packages */}
                <div className="space-y-6 mb-8">
                  {service.packages.map((pkg, pkgIndex) => (
                    <div key={pkgIndex} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{pkg.name}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {pkg.options.map((option, optIndex) => (
                          <div
                            key={optIndex}
                            className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-[#202845] transition-colors"
                          >
                            <div className="font-semibold text-gray-900 mb-1">{option.label}</div>
                            <div className="text-2xl font-bold text-[#202845] mb-1">{option.price}</div>
                            <div className="text-sm text-gray-600">{option.includes}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Included:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {service.features.map((feature, featIndex) => (
                      <div key={featIndex} className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Note */}
                {service.note && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> {service.note}
                    </p>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/book"
                    className="flex-1 bg-[#202845] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1a1f36] transition-colors text-center inline-flex items-center justify-center"
                  >
                    Book {service.title}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                  <a
                    href="tel:+447466113917"
                    className="flex-1 bg-white border-2 border-[#202845] text-[#202845] px-6 py-3 rounded-lg font-semibold hover:bg-[#202845] hover:text-white transition-colors text-center inline-flex items-center justify-center"
                  >
                    <Phone className="mr-2 w-5 h-5" />
                    Call for Quote
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* General Pricing Note */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Need a Custom Quote?
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            All prices are estimates and may vary based on your specific requirements, property size, and location.
            We offer free consultations and detailed quotes for all projects. Contact us today to discuss your needs!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="bg-[#202845] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1a1f36] transition-colors inline-flex items-center justify-center"
            >
              Book Free Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="bg-white border-2 border-[#202845] text-[#202845] px-8 py-4 rounded-lg font-semibold hover:bg-[#202845] hover:text-white transition-colors inline-flex items-center justify-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

