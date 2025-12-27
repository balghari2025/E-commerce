import React from "react";
import { useCart } from "./CartProvider";
import { Link } from "react-router-dom";

// 🔒 SAFE price parser (string / number dono handle karega)
const parsePrice = (price) => {
  if (!price) return 0;
  const cleaned = String(price).replace(/[^\d.]/g, "");
  const value = parseFloat(cleaned);
  return Number.isFinite(value) ? value : 0;
};

const formatCurrency = (value) =>
  `Rs. ${Math.round(value).toLocaleString()}`;

const CartPage = () => {
  const { items = [], removeFromCart } = useCart();

  const total = items.reduce(
    (sum, item) =>
      sum + parsePrice(item.price) * (item.quantity || 1),
    0
  );

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">🛒 Your Cart is Empty</h2>
        <Link
          to="/"
          className="bg-black text-white px-6 py-3 rounded"
          onClick={() => window.scrollTo(0, 0)}
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

      <div className="space-y-4">
        {items.map((item) => {
          const unitPrice = parsePrice(item.price);
          const qty = item.quantity || 1;
          const lineTotal = unitPrice * qty;

          return (
            // ✅ UNIQUE key FIX
            <div
              key={item.id}
              className="flex justify-between items-center border p-4 rounded-lg"
            >
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">
                  {formatCurrency(unitPrice)} × {qty}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <p className="font-bold">
                  {formatCurrency(lineTotal)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-between items-center border-t pt-4">
        <h2 className="text-xl font-bold">Total</h2>
        <h2 className="text-xl font-bold text-green-700">
          {formatCurrency(total)}
        </h2>
      </div>

      <Link
        to="/order-now"
        className="block text-center mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
};

export default CartPage;
