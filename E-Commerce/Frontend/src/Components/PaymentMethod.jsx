import React, { useState } from "react";
import { 
  CreditCard, 
  Truck, 
  Building, 
  Smartphone, 
  ShieldCheck,
  Lock,
  CheckCircle,
  Wallet,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  X,
  Clock
} from "lucide-react";

const PaymentMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showFaq, setShowFaq] = useState(null);

  const paymentMethods = [
    {
      id: 1,
      title: "Cash on Delivery",
      description: "Pay in cash when your order arrives. Available in all major cities across Pakistan.",
      icon: <Truck className="h-6 w-6" />,
      color: "bg-green-50 border-green-100",
      iconColor: "text-green-600",
      features: ["No online payment needed", "Pay upon delivery", "No extra charges"],
      availability: "Available in 50+ cities",
      note: "Delivery time: 2-5 business days",
      popular: true
    },
    {
      id: 2,
      title: "Debit / Credit Cards",
      description: "Secure payments with Visa, MasterCard, and UnionPay through encrypted gateway.",
      icon: <CreditCard className="h-6 w-6" />,
      color: "bg-blue-50 border-blue-100",
      iconColor: "text-blue-600",
      features: ["Visa & MasterCard", "3D Secure", "Instant confirmation"],
      note: "No additional fees",
      cards: ["visa", "mastercard", "unionpay"]
    },
    {
      id: 3,
      title: "Bank Transfer",
      description: "Transfer payment directly from your bank account with complete transaction record.",
      icon: <Building className="h-6 w-6" />,
      color: "bg-purple-50 border-purple-100",
      iconColor: "text-purple-600",
      features: ["All major banks", "IBAN support", "Transaction receipt"],
      note: "Processing time: 1-2 hours",
      banks: ["HBL", "UBL", "MCB", "Standard Chartered"]
    },
    {
      id: 4,
      title: "Mobile Wallets",
      description: "Fast, convenient payments through Pakistan's leading mobile wallet services.",
      icon: <Smartphone className="h-6 w-6" />,
      color: "bg-orange-50 border-orange-100",
      iconColor: "text-orange-600",
      features: ["Instant processing", "24/7 availability", "Easy refunds"],
      wallets: [
        { name: "JazzCash", color: "bg-red-500" },
        { name: "Easypaisa", color: "bg-green-500" },
        { name: "SadaPay", color: "bg-black" },
        { name: "NayaPay", color: "bg-purple-500" }
      ]
    }
  ];

  const securityFeatures = [
    {
      id: 1,
      title: "SSL Encryption",
      description: "256-bit SSL encryption protects all transactions",
      icon: <Lock className="h-5 w-5" />
    },
    {
      id: 2,
      title: "PCI DSS Compliant",
      description: "Fully compliant with Payment Card Industry standards",
      icon: <ShieldCheck className="h-5 w-5" />
    },
    {
      id: 3,
      title: "Data Protection",
      description: "Your payment data is never stored on our servers",
      icon: <CheckCircle className="h-5 w-5" />
    },
    {
      id: 4,
      title: "24/7 Monitoring",
      description: "Round-the-clock fraud detection and prevention",
      icon: <AlertCircle className="h-5 w-5" />
    }
  ];

  const faqItems = [
    {
      id: 1,
      question: "Is Cash on Delivery available in my city?",
      answer: "COD is available in all major cities. During checkout, our system automatically checks availability for your specific delivery address."
    },
    {
      id: 2,
      question: "Are there extra charges for card payments?",
      answer: "No, we don't charge any additional fees for debit or credit card payments. The price shown at checkout is the final amount."
    },
    {
      id: 3,
      question: "How long do bank transfers take to confirm?",
      answer: "Bank transfers typically take 1-2 hours during business hours. Orders are processed immediately after payment verification."
    },
    {
      id: 4,
      question: "Can I change my payment method after ordering?",
      answer: "You can change your payment method within 30 minutes of placing your order by contacting our customer support."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="py-12">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Payment Methods
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Choose from secure and convenient payment options. All transactions are protected with industry-leading security.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  <span>100% Secure Payments</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-500" />
                  <span>Instant Confirmation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12">
        {/* Payment Methods Grid */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Wallet className="h-8 w-8 text-gray-700" />
            <h2 className="text-2xl font-bold text-gray-900">Available Payment Options</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`bg-white rounded-xl border ${method.color} p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer ${selectedMethod === method.id ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${method.iconColor} bg-white border`}>
                      {method.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{method.title}</h3>
                      {method.popular && (
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full mt-1">
                          Most Popular
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>

                <p className="text-gray-600 mb-4">{method.description}</p>

                {method.features && (
                  <div className="mb-4">
                    <div className="space-y-2">
                      {method.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {method.cards && (
                  <div className="flex gap-2 mb-4">
                    {method.cards.map((card) => (
                      <div
                        key={card}
                        className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-medium text-gray-700"
                      >
                        {card.charAt(0).toUpperCase() + card.slice(1)}
                      </div>
                    ))}
                  </div>
                )}

                {method.wallets && (
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {method.wallets.map((wallet) => (
                      <div
                        key={wallet.name}
                        className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                      >
                        <div className={`w-6 h-6 rounded-full ${wallet.color} flex items-center justify-center text-white text-xs font-bold`}>
                          {wallet.name.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{wallet.name}</span>
                      </div>
                    ))}
                  </div>
                )}

                {method.banks && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {method.banks.map((bank) => (
                      <span
                        key={bank}
                        className="px-3 py-1 bg-gray-100 rounded-lg text-sm text-gray-600"
                      >
                        {bank}
                      </span>
                    ))}
                  </div>
                )}

                {(method.availability || method.note) && (
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm">
                      {method.availability && (
                        <span className="text-green-600 font-medium">{method.availability}</span>
                      )}
                      {method.note && (
                        <span className="text-gray-500">{method.note}</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Security Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <ShieldCheck className="h-8 w-8 text-gray-700" />
            <h2 className="text-2xl font-bold text-gray-900">Payment Security</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityFeatures.map((feature) => (
              <div
                key={feature.id}
                className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-lg mb-4">
                  <div className="text-blue-600">
                    {feature.icon}
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Your Security is Our Priority</h4>
                <p className="text-gray-700">
                  All transactions are protected with 256-bit SSL encryption. We never store your complete 
                  payment details on our servers. All payment gateways are PCI DSS Level 1 certified, 
                  the highest level of security certification in the payments industry.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="h-8 w-8 text-gray-700" />
            <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setShowFaq(showFaq === item.id ? null : item.id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{item.question}</span>
                  <div className={`transform transition-transform ${showFaq === item.id ? 'rotate-90' : ''}`}>
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  </div>
                </button>
                
                {showFaq === item.id && (
                  <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* <div className="mt-8 text-center">
            <p className="text-gray-600">
              Need help with payment?{" "}
              <a href="/contact" className="text-blue-600 font-medium hover:text-blue-700">
                Contact our support team
              </a>{" "}
              or call +92-300-1234567
            </p>
          </div> */}
        </div>
      </div>

      {/* Footer */}
      {/* <div className="border-t border-gray-200 bg-white py-8">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-gray-600 text-sm">
                © 2024 E-Commerce Pakistan. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-sm text-gray-600">Certified by:</span>
              <div className="flex gap-4">
                <div className="px-3 py-1 bg-gray-100 rounded text-xs font-medium text-gray-700">
                  PCI DSS
                </div>
                <div className="px-3 py-1 bg-gray-100 rounded text-xs font-medium text-gray-700">
                  SSL Secure
                </div>
                <div className="px-3 py-1 bg-gray-100 rounded text-xs font-medium text-gray-700">
                  3D Secure
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default PaymentMethods;