import Link from "next/link";
import { Hammer, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Partition Installation Services UK - Create New Spaces",
  description: "Professional partition installation services across the UK. Custom solutions to maximize your property's potential with various materials and soundproofing options.",
};

export default function PartitionsPage() {
  return (
    <div className="pt-20 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          <div className="flex items-center justify-center w-20 h-20 bg-[#e8eaf0] rounded-lg mb-6">
            <Hammer className="w-10 h-10 text-[#202845]" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 text-center">
            Partition Installation Services
          </h1>
          <p className="text-xl text-gray-600 text-center">
            Create new spaces with custom partition solutions
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Service Overview</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Our partition installation services help you maximize your property's
            potential by creating new, functional spaces. We offer custom designs
            with various materials and soundproofing options.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            Features
          </h3>
          <ul className="space-y-3 mb-8">
            {[
              "Custom designs to fit your space",
              "Various materials (plasterboard, glass, wood)",
              "Soundproofing options available",
              "Quick installation with minimal disruption",
              "Professional finish and quality guarantee",
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-r from-[#202845] to-[#15192b] rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Create New Spaces?</h2>
          <p className="text-xl text-[#e8eaf0] mb-8">
            Get a free quote for your partition installation
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

