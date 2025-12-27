import React from "react";

const ReturnRefund = () => {
  return (
    <div className="px-6 py-12 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        🔄 Returns & Refund Policy
      </h1>

      <div className="space-y-6">
        {/* Return Policy */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            📦 Return Policy
          </h2>
          <p className="text-gray-700">
            We want our customers to be fully satisfied with their purchase.
            If you receive a damaged, defective, or incorrect product, you may
            request a return within <strong>7 days</strong> of delivery.
          </p>
        </section>

        {/* Eligible Items */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            ✅ Eligible for Return
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Product received in damaged condition</li>
            <li>Wrong item delivered</li>
            <li>Expired or defective product</li>
          </ul>
        </section>

        {/* Non-Eligible */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            ❌ Not Eligible for Return
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Opened or used products (unless defective)</li>
            <li>Change of mind after delivery</li>
            <li>Products without original packaging</li>
          </ul>
        </section>

        {/* Refund Policy */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            💰 Refund Policy
          </h2>
          <p className="text-gray-700">
            Once your return request is approved and the product is received,
            the refund will be processed within <strong>5–7 working days</strong>.
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>Refunds are issued via the original payment method</li>
            <li>Cash on Delivery (COD) refunds are processed via bank transfer</li>
          </ul>
        </section>

        {/* How to Request */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            📞 How to Request a Return
          </h2>
          <p className="text-gray-700">
            To request a return or refund, please contact our customer support
            with your order number and clear images of the product.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ReturnRefund;
