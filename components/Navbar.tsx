"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, Mail } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/book", label: "Book Now" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#202845] shadow-lg"
          : "bg-[#202845]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
            <div className="h-16 sm:h-20 w-16 sm:w-20 flex items-center justify-center overflow-hidden relative">
              <img 
                src="/logo.png" 
                alt="AK Home Renovation" 
                className="h-[140%] w-[140%] object-cover object-center scale-110" 
                style={{ objectPosition: 'center center' }}
              />
            </div>
            <span className="text-base sm:text-xl font-bold text-white">
              AK Home Renovation
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-white/80 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book"
              className="bg-white text-[#202845] px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-white hover:bg-white/10"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-[#202845] border-t border-white/10">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-white hover:bg-white/10 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <a
                href="tel:+447466113917"
                className="flex items-center px-4 py-2 text-white hover:bg-white/10 rounded-md"
              >
                <Phone size={18} className="mr-2" />
                Call Us
              </a>
              <a
                href="mailto:info@akhomerenovation.co.uk"
                className="flex items-center px-4 py-2 text-white hover:bg-white/10 rounded-md"
              >
                <Mail size={18} className="mr-2" />
                Email Us
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

