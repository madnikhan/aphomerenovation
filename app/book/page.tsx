"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, Clock, MapPin, Phone, Mail, CreditCard, Banknote } from "lucide-react";
import BookingForm from "@/components/BookingForm";

export default function BookPage() {
  return (
    <div className="pt-20 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Book Your Service
          </h1>
          <p className="text-xl text-gray-600">
            Fill out the form below and we'll get back to you within 24 hours
          </p>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <BookingForm />
        </div>

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <Calendar className="w-10 h-10 text-[#202845] mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Flexible Scheduling</h3>
            <p className="text-gray-600 text-sm">
              Choose a date and time that works best for you
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <Phone className="w-10 h-10 text-[#202845] mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Quick Response</h3>
            <p className="text-gray-600 text-sm">
              We'll confirm your booking within 24 hours
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <MapPin className="w-10 h-10 text-[#202845] mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">UK-Wide Service</h3>
            <p className="text-gray-600 text-sm">
              We cover the entire United Kingdom
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

