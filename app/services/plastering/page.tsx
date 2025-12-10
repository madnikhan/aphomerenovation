import Link from "next/link";
import { Paintbrush, CheckCircle2, ArrowRight, Clock, Shield, Award } from "lucide-react";

export const metadata = {
  title: "Plastering & Skimming Services UK - Expert Finish",
  description: "Professional plastering and skimming services across the UK. Smooth, flawless walls and ceilings with expert craftsmanship and attention to detail.",
};

export default function PlasteringPage() {
  return (
    <div className="pt-20 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          <div className="flex items-center justify-center w-20 h-20 bg-[#e8eaf0] rounded-lg mb-6">
            <Paintbrush className="w-10 h-10 text-[#202845]" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 text-center">
            Plastering & Skimming Services
          </h1>
          <p className="text-xl text-gray-600 text-center">
            Expert plastering and skimming for smooth, flawless walls and ceilings
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Service Overview</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Our professional plastering and skimming services deliver smooth, flawless
            finishes for walls and ceilings. We work with all wall types and provide
            quick-drying solutions to minimize disruption to your daily life.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
            Services We Offer
          </h3>
          <ul className="space-y-3 mb-8">
            {[
              "Wall plastering and skimming",
              "Ceiling plastering",
              "Artex removal and re-plastering",
              "Patch repairs and restoration",
              "Quick-drying solutions available",
              "All wall types (brick, block, lath, etc.)",
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-[#f0f2f7] rounded-lg">
              <Shield className="w-8 h-8 text-[#202845] mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Quality Guaranteed</h4>
              <p className="text-sm text-gray-600">
                Smooth finish guaranteed with premium materials
              </p>
            </div>
            <div className="p-6 bg-[#f0f2f7] rounded-lg">
              <Award className="w-8 h-8 text-[#202845] mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Expert Craftsmen</h4>
              <p className="text-sm text-gray-600">
                Skilled professionals with years of experience
              </p>
            </div>
            <div className="p-6 bg-[#f0f2f7] rounded-lg">
              <Clock className="w-8 h-8 text-[#202845] mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Quick Service</h4>
              <p className="text-sm text-gray-600">
                Fast turnaround without compromising quality
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#202845] to-[#15192b] rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Walls?</h2>
          <p className="text-xl text-[#e8eaf0] mb-8">
            Get a free quote for your plastering project
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

