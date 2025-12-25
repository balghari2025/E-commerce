import React, { useState } from "react";
import { ShoppingCart, Mail, Phone, Home, User } from "lucide-react";
import { useCart } from "./CartProvider";
import axios from "axios";

const parsePrice = (price) => {
  if (!price) return 0;
  const cleaned = String(price).replace(/[^\d.]/g, "");
  const v = parseFloat(cleaned);
  return Number.isFinite(v) ? v : 0;
};

const formatCurrency = (v) => `Rs. ${Math.round(v).toLocaleString()}`;

const OrderNow = () => {
  const { items: cartItemsFromContext = [], totalPrice: contextTotal } = useCart() || {};
  const cartItems = Array.isArray(cartItemsFromContext) ? cartItemsFromContext : [];
  const computedTotal = cartItems.reduce((acc, it) => acc + parsePrice(it.price) * (it.quantity || 1), 0);
  const cartTotal = Number.isFinite(parseFloat(contextTotal)) ? Number(contextTotal) : computedTotal;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const required = Object.values(formData).every((v) => v.trim() !== "");
    if (!required) return alert("⚠️ Please fill all fields before placing your order.");

    const payload = {
      customerName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      postalCode: formData.postalCode,
      country: formData.country,
      totalAmount: cartTotal,
      orderDate: new Date().toISOString(),
      items: cartItems.map((it) => ({
        productId: it.id,
        productName: it.name,
        quantity: it.quantity || 1,
        price: parsePrice(it.price),
      })),
    };

    try {
      const res = await axios.post("http://localhost:5001/api/orders", payload);
      console.log("✅ Order saved:", res.data);
      setOrderPlaced(true);
    } catch (err) {
      console.error("❌ Failed to place order:", err.response?.data || err.message);
      alert("Order failed: " + (err.response?.data?.message || "Bad Request"));
    }
  };

  if (orderPlaced)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-center px-4">
        <ShoppingCart size={60} className="text-green-600 mb-4" />
        <h2 className="text-2xl font-bold text-green-700">Order Placed Successfully!</h2>
        <p className="text-gray-600 mt-2">
          Thank you, {formData.fullName}! Your order of <strong>{cartItems.length}</strong> item(s) worth{" "}
          <strong>{formatCurrency(cartTotal)}</strong> has been placed.
        </p>
        <button
          onClick={() => setOrderPlaced(false)}
          className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Place Another Order
        </button>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">🛒 Order Now</h2>

        {/* Cart Summary */}
        <div className="mb-6 border rounded-xl p-4 bg-green-50">
          <h3 className="text-lg font-semibold text-green-800 mb-3">Your Cart Summary</h3>
          {cartItems.length > 0 ? (
            <ul className="space-y-2 text-gray-700">
              {cartItems.map((item, i) => {
                const unit = parsePrice(item.price);
                const qty = item.quantity || 1;
                const line = unit * qty;
                return (
                  <li key={i} className="flex justify-between items-center border-b pb-2">
                    <span>{item.name} × {qty}</span>
                    <span>{formatCurrency(line)}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
          <div className="mt-3 flex justify-between font-semibold text-green-700 text-lg">
            <span>Total:</span>
            <span>{formatCurrency(cartTotal)}</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <Input name="fullName" icon={<User />} label="Full Name" value={formData.fullName} onChange={handleChange} />
            <Input name="email" icon={<Mail />} label="Email" value={formData.email} onChange={handleChange} />
          </div>
          <Input name="phone" icon={<Phone />} label="Phone Number" value={formData.phone} onChange={handleChange} />
          <Input name="address" icon={<Home />} label="Full Address" value={formData.address} onChange={handleChange} />
          <div className="grid md:grid-cols-3 gap-4">
            <Input name="city" label="City" value={formData.city} onChange={handleChange} />
            <Input name="postalCode" label="Postal Code" value={formData.postalCode} onChange={handleChange} />
            <Input name="country" label="Country" value={formData.country} onChange={handleChange} />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <ShoppingCart size={20} />
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

const Input = ({ name, label, icon, ...rest }) => (
  <div>
    <label className="block text-gray-600 mb-1">{label}</label>
    <div className="flex items-center border rounded-lg px-3">
      {icon && <span className="text-gray-400 mr-2">{icon}</span>}
      <input name={name} {...rest} className="w-full py-2 outline-none" />
    </div>
  </div>
);

export default OrderNow;
