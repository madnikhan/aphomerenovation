import Link from "next/link";
import { Building2, CheckCircle2, ArrowRight, Clock, Shield, Award } from "lucide-react";
import ServiceSchema from "@/components/ServiceSchema";

export const metadata = {
  title: "Chimney Removal Services UK - Professional & Safe | AK Home Renovation",
  description: "Professional chimney removal services across the UK. Safe, compliant, and expert removal with full structural assessment and building regulation compliance. Free quotes available.",
  keywords: [
    "chimney removal",
    "chimney removal services UK",
    "professional chimney removal",
    "chimney removal Birmingham",
    "safe chimney removal",
    "building regulation compliance",
    "structural assessment",
  ],
  openGraph: {
    title: "Chimney Removal Services UK - Professional & Safe",
    description: "Professional chimney removal services across the UK. Safe, compliant, and expert removal with full structural assessment.",
    type: "website",
    url: "https://akhomerenovation.co.uk/services/chimney-removal",
  },
};

export default function ChimneyRemovalPage() {
  return (
    <>
      <ServiceSchema
        name="Chimney Removal Services"
        description="Professional and safe chimney removal services across the United Kingdom. Full structural assessment, building regulation compliance, and expert removal with complete clean-up."
        provider={{
          name: "AK Home Renovation",
          url: "https://akhomerenovation.co.uk",
          telephone: "+44 7466 113917",
          email: "info@akhomerenovation.co.uk",
        }}
        areaServed={["United Kingdom"]}
        serviceType="Chimney Removal"
      />
      <div className="pt-20 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          <div className="flex items-center justify-center w-20 h-20 bg-[#e8eaf0] rounded-lg mb-6">
            <Building2 className="w-10 h-10 text-[#202845]" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 text-center">
            Chimney Removal Services
          </h1>
          <p className="text-xl text-gray-600 text-center">
            Professional and safe chimney removal services across the United Kingdom
          </p>
        </div>

        {/* Image Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8 overflow-hidden">
          <div className="relative w-full h-64 md:h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
            {/* Placeholder SVG Illustration - Replace with actual image */}
            <svg
              viewBox="0 0 400 300"
              className="w-full h-full max-w-md"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* House structure */}
              <rect x="50" y="150" width="300" height="120" fill="#d1d5db" stroke="#9ca3af" strokeWidth="2" />
              <polygon points="50,150 200,50 350,150" fill="#9ca3af" stroke="#6b7280" strokeWidth="2" />
              
              {/* Chimney before removal */}
              <rect x="280" y="80" width="40" height="70" fill="#6b7280" stroke="#4b5563" strokeWidth="2" />
              <rect x="285" y="75" width="30" height="10" fill="#4b5563" />
              
              {/* Removal indicator (dashed lines) */}
              <line x1="320" y1="80" x2="340" y2="60" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="320" y1="120" x2="340" y2="100" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
              
              {/* Removed chimney (faded) */}
              <rect x="340" y="60" width="40" height="50" fill="#ef4444" fillOpacity="0.3" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
              
              {/* Tools */}
              <rect x="100" y="200" width="60" height="8" fill="#374151" rx="2" transform="rotate(45 130 204)" />
              <circle cx="130" cy="204" r="5" fill="#1f2937" />
              
              {/* Text */}
              <text x="200" y="280" textAnchor="middle" fill="#6b7280" fontSize="14" fontFamily="Arial">
                Professional Chimney Removal
              </text>
            </svg>
            
            {/* Alternative: If you have an image, uncomment and use this instead */}
            {/* 
            <img 
              src="/chimney-removal.jpg" 
              alt="Chimney removal service" 
              className="w-full h-full object-cover"
            />
            */}
          </div>
          <p className="text-sm text-gray-500 text-center mt-4">
            Professional chimney removal with structural integrity and safety as our priority
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Service Overview</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Our professional chimney removal service handles all aspects from initial
            planning to final completion. We ensure structural integrity, compliance
            with building regulations, and a clean, professional finish.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            Whether you're removing an unused chimney to create more space or need
            structural modifications, our expert team will guide you through the
            entire process safely and efficiently.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            What's Included
          </h3>
          <ul className="space-y-3 mb-8">
            {[
              "Full structural assessment and survey",
              "Building regulation compliance checks",
              "Safe removal process with proper support",
              "Professional disposal of materials",
              "Complete clean-up and site restoration",
              "Final inspection and certification",
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Why Choose Our Service
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-[#f0f2f7] rounded-lg">
              <Shield className="w-8 h-8 text-[#202845] mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Fully Insured</h4>
              <p className="text-sm text-gray-600">
                Comprehensive insurance coverage for your peace of mind
              </p>
            </div>
            <div className="p-6 bg-[#f0f2f7] rounded-lg">
              <Award className="w-8 h-8 text-[#202845] mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Expert Team</h4>
              <p className="text-sm text-gray-600">
                Experienced professionals with years of expertise
              </p>
            </div>
            <div className="p-6 bg-[#f0f2f7] rounded-lg">
              <Clock className="w-8 h-8 text-[#202845] mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Timely Completion</h4>
              <p className="text-sm text-gray-600">
                Projects completed on schedule and within budget
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#202845] to-[#15192b] rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-[#e8eaf0] mb-8">
            Book a free consultation and get a quote for your chimney removal project
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
    </>
  );
}

