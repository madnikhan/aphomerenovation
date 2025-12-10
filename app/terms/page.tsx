import { Metadata } from "next";
import { FileText, Scale, AlertTriangle, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service - AK Home Renovation",
  description: "Terms of Service for AK Home Renovation. Read our terms and conditions for using our services.",
};

export default function TermsOfServicePage() {
  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          <div className="flex items-center justify-center w-20 h-20 bg-[#e8eaf0] rounded-lg mb-6">
            <FileText className="w-10 h-10 text-[#202845]" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 text-center">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 text-center">
            Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Scale className="w-6 h-6 mr-2 text-[#202845]" />
              1. Agreement to Terms
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By accessing or using the services of AK Home Renovation ("we", "our", or "us"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
            <p className="text-gray-700 leading-relaxed">
              These terms apply to all users of our services, including clients, visitors, and anyone who accesses our website or uses our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Services Provided</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              AK Home Renovation provides professional house refurbishment and renovation services across the United Kingdom, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
              <li>Chimney removal</li>
              <li>Plastering and skimming</li>
              <li>Painting and decoration</li>
              <li>Partition installation</li>
              <li>Boarding and sealing</li>
              <li>Whole house renovation</li>
              <li>Home maintenance services</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              All services are subject to site survey and may vary based on actual requirements and conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <CheckCircle2 className="w-6 h-6 mr-2 text-[#202845]" />
              3. Quotes and Pricing
            </h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">3.1 Quotes</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              All quotes provided are estimates based on the information provided and are valid for 30 days from the date of issue. Final pricing may vary based on:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
              <li>Site survey findings</li>
              <li>Actual requirements and conditions</li>
              <li>Changes to project scope</li>
              <li>Unforeseen circumstances or complications</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">3.2 Pricing</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              All prices are quoted in British Pounds (GBP) and are exclusive of VAT unless otherwise stated. We reserve the right to adjust prices if:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
              <li>The project scope changes</li>
              <li>Additional work is requested</li>
              <li>Unforeseen complications arise</li>
              <li>Material costs change significantly</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Booking and Payment Terms</h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">4.1 Booking</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              To secure a booking, a deposit may be required. The deposit amount will be specified in your quote. Bookings are subject to availability and confirmation.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">4.2 Payment Terms</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              Our standard payment terms are:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
              <li>30% deposit required to secure booking</li>
              <li>Balance payable upon completion of work</li>
              <li>Payment methods: Bank transfer, cash, or as otherwise agreed</li>
              <li>Payment is due within 7 days of invoice date unless otherwise agreed</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">4.3 Late Payment</h3>
            <p className="text-gray-700 leading-relaxed">
              Late payments may incur interest charges at a rate of 8% per annum above the Bank of England base rate, in accordance with the Late Payment of Commercial Debts (Interest) Act 1998.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Work Performance</h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">5.1 Standards</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              We commit to performing all work to professional standards and in accordance with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
              <li>UK building regulations</li>
              <li>Health and safety requirements</li>
              <li>Industry best practices</li>
              <li>Any specifications agreed in writing</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">5.2 Timelines</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              We will provide estimated completion dates, but these are subject to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
              <li>Weather conditions (for exterior work)</li>
              <li>Material availability</li>
              <li>Unforeseen complications</li>
              <li>Client availability for access</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">5.3 Access and Cooperation</h3>
            <p className="text-gray-700 leading-relaxed">
              The client must provide reasonable access to the work site and cooperate with our team. Delays caused by lack of access or client unavailability may result in additional charges.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2 text-[#202845]" />
              6. Warranties and Guarantees
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We provide the following warranties:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
              <li><strong>Workmanship:</strong> All work is guaranteed for 12 months from completion date, subject to normal wear and tear</li>
              <li><strong>Materials:</strong> Materials are covered by manufacturer warranties where applicable</li>
              <li><strong>Insurance:</strong> We maintain full public liability insurance</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Warranties do not cover damage caused by misuse, neglect, or modifications made by third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cancellation and Refunds</h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">7.1 Cancellation by Client</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              If you cancel a booking:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
              <li>More than 7 days before work commences: Full refund of deposit</li>
              <li>Less than 7 days before work commences: Deposit may be retained</li>
              <li>After work has commenced: Payment for work completed plus any materials ordered</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">7.2 Cancellation by Us</h3>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to cancel or postpone work due to circumstances beyond our control. In such cases, we will provide as much notice as possible and refund any deposits paid.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Liability and Insurance</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We maintain comprehensive insurance coverage including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
              <li>Public liability insurance</li>
              <li>Employer's liability insurance</li>
              <li>Professional indemnity insurance</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-3">
              Our liability is limited to the value of the work performed. We are not liable for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
              <li>Consequential or indirect losses</li>
              <li>Loss of profit or business</li>
              <li>Damage to existing structures not caused by our negligence</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Disputes and Complaints</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              If you have any concerns or complaints about our services:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4 ml-4">
              <li>Contact us immediately to discuss the issue</li>
              <li>We will investigate and respond within 7 working days</li>
              <li>We will work with you to resolve any issues fairly</li>
            </ol>
            <p className="text-gray-700 leading-relaxed">
              If we cannot resolve a dispute, you may refer it to an alternative dispute resolution scheme or seek legal advice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed">
              All content on our website, including text, graphics, logos, and images, is the property of AK Home Renovation and is protected by UK and international copyright laws. You may not reproduce, distribute, or use our content without written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms of Service are governed by and construed in accordance with the laws of England and Wales. Any disputes arising from these terms or our services will be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after changes are posted constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              For questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2"><strong>AK Home Renovation</strong></p>
              <p className="text-gray-700 mb-2">55 Colmore Row, Birmingham B3 2AA</p>
              <p className="text-gray-700 mb-2">United Kingdom</p>
              <p className="text-gray-700 mb-2">Phone: <a href="tel:+447466113917" className="text-[#202845] hover:underline">+44 7466 113917</a></p>
              <p className="text-gray-700">Email: <a href="mailto:info@akhomerenovation.co.uk" className="text-[#202845] hover:underline">info@akhomerenovation.co.uk</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

