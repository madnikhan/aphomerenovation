"use client";

import { useState } from "react";
import { X, CreditCard, Lock } from "lucide-react";

interface PaymentModalProps {
  bookingData: any;
  onSuccess: () => void;
  onClose: () => void;
}

export default function PaymentModal({ bookingData, onSuccess, onClose }: PaymentModalProps) {
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    // In production, this would integrate with Stripe or another payment processor
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Here you would:
      // 1. Create a payment intent with Stripe
      // 2. Process the payment
      // 3. Handle success/error
      
      onSuccess();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 md:p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <div className="mb-6">
          <div className="flex items-center justify-center w-16 h-16 bg-[#e8eaf0] rounded-full mx-auto mb-4">
            <Lock className="w-8 h-8 text-[#202845]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Secure Payment
          </h2>
          <p className="text-gray-600 text-center text-sm">
            Your payment information is encrypted and secure
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              required
              value={cardData.cardName}
              onChange={(e) =>
                setCardData({ ...cardData, cardName: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202845] focus:border-transparent"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Number
            </label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                required
                maxLength={19}
                value={cardData.cardNumber}
                onChange={(e) =>
                  setCardData({
                    ...cardData,
                    cardNumber: formatCardNumber(e.target.value),
                  })
                }
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202845] focus:border-transparent"
                placeholder="1234 5678 9012 3456"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                required
                maxLength={5}
                value={cardData.expiryDate}
                onChange={(e) =>
                  setCardData({
                    ...cardData,
                    expiryDate: formatExpiryDate(e.target.value),
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202845] focus:border-transparent"
                placeholder="MM/YY"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVV
              </label>
              <input
                type="text"
                required
                maxLength={4}
                value={cardData.cvv}
                onChange={(e) =>
                  setCardData({
                    ...cardData,
                    cvv: e.target.value.replace(/\D/g, ""),
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202845] focus:border-transparent"
                placeholder="123"
              />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Service:</span>
              <span className="font-medium">{bookingData.service}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Amount:</span>
              <span className="font-bold text-lg">Quote on confirmation</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-[#202845] text-white py-4 rounded-lg font-semibold hover:bg-[#1a1f36] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isProcessing ? "Processing..." : "Pay Securely"}
          </button>

          <p className="text-xs text-gray-500 text-center">
            By continuing, you agree to our terms and conditions. Your payment
            is processed securely.
          </p>
        </form>
      </div>
    </div>
  );
}

