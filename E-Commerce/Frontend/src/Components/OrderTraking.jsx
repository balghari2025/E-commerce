import React, { useState } from "react";

const OrderTracking = () => {
  const [orderId, setOrderId] = useState("");

  const handleTrackOrder = (e) => {
    e.preventDefault();

    if (!orderId.trim()) {
      alert("Please enter a valid Order ID");
      return;
    }

    // Future: API call here
    alert(`Tracking details for Order ID: ${orderId}`);
  };

  return (
    <div className="px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4">
        📦 Order Tracking
      </h1>

      <p className="text-center text-gray-600 mb-8">
        Enter your Order ID below to track your order status.
      </p>

      {/* Tracking Form */}
      <form
        onSubmit={handleTrackOrder}
        className="bg-white border rounded-lg shadow p-6"
      >
        <label className="block text-sm font-semibold mb-2">
          Order ID
        </label>

        <input
          type="text"
          placeholder="e.g. ORD-123456"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="w-full border rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Track Order
        </button>
      </form>

      {/* Info Section */}
      <div className="mt-8 text-sm text-gray-600">
        <p>📌 Your Order ID can be found in:</p>
        <ul className="list-disc list-inside mt-2">
          <li>Order confirmation email or SMS</li>
          <li>Your account order history</li>
        </ul>
      </div>
    </div>
  );
};

export default OrderTracking;
