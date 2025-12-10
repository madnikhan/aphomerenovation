import Link from "next/link";
import { Wrench, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Boarding & Sealing Services UK - Protect Your Property",
  description: "Professional boarding and sealing services across the UK. Quality materials and expert installation for weather protection and property enhancement.",
};

export default function BoardingPage() {
  return (
    <div className="pt-20 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          <div className="flex items-center justify-center w-20 h-20 bg-[#e8eaf0] rounded-lg mb-6">
            <Wrench className="w-10 h-10 text-[#202845]" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 text-center">
            Boarding & Sealing Services
          </h1>
          <p className="text-xl text-gray-600 text-center">
            Professional boarding and sealing to protect and enhance your property
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Service Overview</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Our boarding and sealing services provide essential protection for your
            property using quality materials and expert installation techniques.
            We ensure long-lasting results that stand up to the UK weather.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            Services
          </h3>
          <ul className="space-y-3 mb-8">
            {[
              "Weather protection boarding",
              "Gap sealing and insulation",
              "Quality materials and installation",
              "Long-lasting, durable results",
              "Expert craftsmanship",
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-r from-[#202845] to-[#15192b] rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Protect Your Property?</h2>
          <p className="text-xl text-[#e8eaf0] mb-8">
            Get a free quote for your boarding and sealing project
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

