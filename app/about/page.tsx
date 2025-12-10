import { Award, Users, Target, Shield, CheckCircle2, TrendingUp } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About Us - AK Home Renovation",
  description: "Learn about AK Home Renovation - professional house refurbishment services across the UK. Quality workmanship, experienced team, and customer satisfaction.",
};

const values = [
  {
    icon: Award,
    title: "Quality First",
    description: "We never compromise on quality. Every project is completed to the highest standards using premium materials.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Our skilled craftsmen bring years of experience and expertise to every project we undertake.",
  },
  {
    icon: Target,
    title: "Customer Focused",
    description: "Your satisfaction is our priority. We work closely with you to bring your vision to life.",
  },
  {
    icon: Shield,
    title: "Fully Insured",
    description: "We're fully insured and certified, giving you peace of mind throughout your project.",
  },
];

const stats = [
  { number: "10+", label: "Years Experience" },
  { number: "500+", label: "Projects Completed" },
  { number: "98%", label: "Customer Satisfaction" },
  { number: "UK-Wide", label: "Service Coverage" },
];

export default function AboutPage() {
  return (
    <div className="pt-20 pb-20 bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#202845] to-[#15192b] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              About AK Home Renovation
            </h1>
            <p className="text-xl text-[#e8eaf0] leading-relaxed">
              Transforming homes across the United Kingdom with expert craftsmanship,
              quality materials, and exceptional service since 2014.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  AK Home Renovation was founded with a simple mission: to provide
                  exceptional house refurbishment and renovation services across the
                  United Kingdom. What started as a small local business has grown into
                  a trusted name in home improvement.
                </p>
                <p>
                  Over the years, we've completed hundreds of projects, from simple
                  painting jobs to complete house renovations. Our commitment to quality,
                  professionalism, and customer satisfaction has earned us a reputation
                  for excellence.
                </p>
                <p>
                  Today, we're proud to serve customers throughout the UK, bringing
                  expertise, reliability, and outstanding results to every project we
                  undertake.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us?</h3>
              <ul className="space-y-4">
                {[
                  "10+ years of industry experience",
                  "Fully insured and certified",
                  "Competitive pricing",
                  "Free quotes and consultations",
                  "Quality guaranteed",
                  "UK-wide coverage",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#202845] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-[#e8eaf0] rounded-lg flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-[#202845]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#202845] to-[#15192b]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-xl text-[#e8eaf0] mb-8">
            Get a free quote and let's bring your renovation dreams to life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="bg-white text-[#202845] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block"
            >
              Book a Consultation
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors inline-block"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

