"use client";

import Link from "next/link";
import { 
  Home as HomeIcon, 
  Paintbrush, 
  Hammer, 
  Wrench, 
  Building2, 
  CheckCircle2,
  ArrowRight,
  Star,
  Award,
  Users
} from "lucide-react";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";

const services = [
  {
    icon: Building2,
    title: "Chimney Removal",
    description: "Professional and safe chimney removal services. We handle all aspects from planning to completion, ensuring structural integrity.",
    href: "/services/chimney-removal",
    video: "/Chimney_removal_professional_202512092026_quu.mp4",
  },
  {
    icon: Paintbrush,
    title: "Plastering & Skimming",
    description: "Expert plastering and skimming services for smooth, flawless walls and ceilings. Professional finish guaranteed.",
    href: "/services/plastering",
    video: "/Plastering__skimming_202512092026_5bshs.mp4",
  },
  {
    icon: Paintbrush,
    title: "Painting & Decoration",
    description: "Transform your home with our professional painting and decoration services. Interior and exterior work available.",
    href: "/services/painting",
    video: "/Painting__decoration_202512092026_e218o.mp4",
  },
  {
    icon: Hammer,
    title: "Partition Installation",
    description: "Create new spaces with our partition installation services. Custom solutions to maximize your property's potential.",
    href: "/services/partitions",
    video: "/Partition_installation_create_202512092026_sy.mp4",
  },
  {
    icon: Wrench,
    title: "Boarding & Sealing",
    description: "Professional boarding and sealing services to protect and enhance your property. Quality materials and expert installation.",
    href: "/services/boarding",
    video: "/Boarding__sealing_202512092026_5bfn6.mp4",
  },
  {
    icon: HomeIcon,
    title: "Whole House Renovation",
    description: "Complete house renovation services from design to completion. Transform your entire property with our comprehensive solutions.",
    href: "/services/renovation",
    video: "/Whole_house_renovation_202512100015_h2obs.mp4",
  },
];

const features = [
  "Fully Insured & Certified",
  "Free Quotes & Consultations",
  "10+ Years Experience",
  "UK-Wide Coverage",
  "Quality Guaranteed",
  "Competitive Pricing",
];

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "London",
    rating: 5,
    text: "Excellent service from start to finish. The team transformed our entire house beautifully. Highly professional and reliable.",
  },
  {
    name: "Michael Chen",
    location: "Manchester",
    rating: 5,
    text: "Outstanding work on our chimney removal. Clean, efficient, and completed on time. Would definitely recommend!",
  },
  {
    name: "Emma Williams",
    location: "Birmingham",
    rating: 5,
    text: "The painting and decoration work exceeded our expectations. The attention to detail was remarkable. Thank you!",
  },
];

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <CheckCircle2 className="w-8 h-8 text-[#202845] mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive house refurbishment and renovation services across
              the United Kingdom
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center text-[#202845] font-semibold hover:text-[#1a1f36] transition-colors"
            >
              View All Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-[#f0f2f7] to-[#e8eaf0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose AK Home Renovation?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We deliver exceptional results with professionalism, quality, and
              reliability
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <Award className="w-12 h-12 text-[#202845] mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Quality Guaranteed
              </h3>
              <p className="text-gray-600">
                We use only the finest materials and employ skilled craftsmen to
                ensure every project meets the highest standards.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <Users className="w-12 h-12 text-[#202845] mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Expert Team
              </h3>
              <p className="text-gray-600">
                Our experienced professionals bring years of expertise to every
                project, ensuring exceptional results.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <Star className="w-12 h-12 text-[#202845] mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Customer Satisfaction
              </h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We work closely with you to
                bring your vision to life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#202845] to-[#15192b]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Home?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Get a free quote today and let us bring your renovation dreams to
            life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="bg-white text-[#202845] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Book a Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
