import React from "react";

const ShippingDelivery = () => {
  return (
    <div className="px-6 py-12 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        🚚 Shipping & Delivery
      </h1>

      {/* Shipping Info */}
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">
            📦 Shipping Coverage
          </h2>
          <p className="text-gray-700">
            We deliver our products across Pakistan. Remote areas may require
            additional delivery time depending on courier availability.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            ⏱️ Delivery Time
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Major cities: 2–4 working days</li>
            <li>Other cities & rural areas: 4–7 working days</li>
            <li>Delivery time may vary during sales or public holidays</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            💰 Shipping Charges
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Flat shipping rate may apply at checkout</li>
            <li>Free shipping on orders above a specific amount (if applicable)</li>
            <li>Exact shipping cost is shown before order confirmation</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            📍 Order Tracking
          </h2>
          <p className="text-gray-700">
            Once your order is dispatched, you will receive a tracking number
            via SMS or email to track your shipment.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            ❗ Important Notes
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Please ensure your delivery address and phone number are correct</li>
            <li>Cash on Delivery (COD) is available in selected areas</li>
            <li>Orders cannot be changed once shipped</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ShippingDelivery;
