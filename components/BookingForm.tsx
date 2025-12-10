"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import { CheckCircle2, Phone, MessageCircle, Calendar } from "lucide-react";

interface BookingData {
  name: string;
  email: string;
  phone: string;
  address: string;
  postcode: string;
  service: string;
  date: Date | null;
  time: string;
  description: string;
}

const services = [
  "Chimney Removal",
  "Plastering & Skimming",
  "Painting & Decoration",
  "Partition Installation",
  "Boarding & Sealing",
  "Whole House Renovation",
  "Maintenance",
  "Other",
];

const timeSlots = [
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

export default function BookingForm() {
  const [formData, setFormData] = useState<BookingData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    postcode: "",
    service: "",
    date: null,
    time: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date: Date | null) => {
    setFormData({
      ...formData,
      date,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitBooking();
  };

  const submitBooking = async () => {
    setIsSubmitting(true);
    
    // Simulate API call - replace with actual API endpoint
    try {
      // Here you would send the booking data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log("Booking submitted:", formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("There was an error submitting your booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Booking Confirmed!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for your service booking request! We'll contact you within 24 hours to discuss your project, provide a detailed quote, and confirm the booking details.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          A confirmation email has been sent to {formData.email}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:+447466113917"
            className="inline-flex items-center justify-center bg-[#202845] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1a1f36] transition-colors"
          >
            <Phone className="mr-2 w-5 h-5" />
            Call Us Now
          </a>
          <a
            href={`https://wa.me/447466113917?text=${encodeURIComponent(`Hi, I just submitted a booking request for ${formData.service}. Name: ${formData.name}, Phone: ${formData.phone}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#25D366] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#20BA5A] transition-colors"
          >
            <MessageCircle className="mr-2 w-5 h-5" />
            WhatsApp Us
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202845] focus:border-transparent"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202845] focus:border-transparent"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202845] focus:border-transparent"
              placeholder="+44 7XXX XXXXXX"
            />
          </div>
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
              Service Required *
            </label>
            <select
              id="service"
              name="service"
              required
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202845] focus:border-transparent"
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            Address *
          </label>
          <input
            type="text"
            id="address"
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202845] focus:border-transparent"
            placeholder="Street address"
          />
        </div>

        <div>
          <label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-2">
            Postcode *
          </label>
          <input
            type="text"
            id="postcode"
            name="postcode"
            required
            value={formData.postcode}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202845] focus:border-transparent"
            placeholder="SW1A 1AA"
          />
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Date *
            </label>
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              minDate={new Date()}
              dateFormat="dd/MM/yyyy"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202845] focus:border-transparent"
              placeholderText="Select a date"
              required
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Time *
            </label>
            <select
              id="time"
              name="time"
              required
              value={formData.time}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202845] focus:border-transparent"
            >
              <option value="">Select a time</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Project Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202845] focus:border-transparent"
            placeholder="Please provide details about your project..."
          />
        </div>

        {/* Info Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start">
            <Calendar className="w-6 h-6 text-[#202845] mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What Happens Next?</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• We'll review your booking request and contact you within 24 hours</li>
                <li>• We'll discuss your project requirements and provide a detailed quote</li>
                <li>• Once you're happy with the quote, we'll confirm the booking date</li>
                <li>• Payment terms will be discussed and agreed upon before work begins</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#202845] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#1a1f36] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed inline-flex items-center justify-center"
        >
          {isSubmitting ? (
            "Submitting..."
          ) : (
            <>
              <Calendar className="mr-2 w-5 h-5" />
              Request Service Booking
            </>
          )}
        </button>

        {/* Alternative Contact Options */}
        <div className="text-center pt-4 border-t">
          <p className="text-sm text-gray-600 mb-4">Or contact us directly:</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+447466113917"
              className="inline-flex items-center justify-center bg-white border-2 border-[#202845] text-[#202845] px-6 py-3 rounded-lg font-semibold hover:bg-[#202845] hover:text-white transition-colors"
            >
              <Phone className="mr-2 w-5 h-5" />
              Call Us
            </a>
            <a
              href={`https://wa.me/447466113917?text=${encodeURIComponent("Hi, I'm interested in your renovation services. Can you provide more information?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#25D366] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#20BA5A] transition-colors"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </form>
    </>
  );
}

