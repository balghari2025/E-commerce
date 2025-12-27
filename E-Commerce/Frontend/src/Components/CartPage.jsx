import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "./CartProvider";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { items, removeFromCart, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const subtotal = items.reduce((acc, item) => {
  const raw = item.price || "0";
  const str = typeof raw === "string" ? raw : String(raw);
  const price = parseInt(str.replace(/[^\d]/g, ""), 10) || 0;
  return acc + price * (item.quantity || 1);
}, 0);


  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  // animation variants same as before...
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }, exit: { opacity: 0, x: -100 } };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-gray-900 mb-2">
            🛒 Your Shopping Cart
          </motion.h1>
          <p className="text-gray-600">Review and manage your items</p>
        </div>

        {items.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <button type="button" className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2 mx-auto"
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={20} />
              Back to Shop
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column (items) unchanged... */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Cart Items ({items.length})</h2>
                  <button onClick={clearCart} className="text-gray-500 hover:text-red-600 transition-colors duration-200 flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:border-red-300">
                    <Trash2 size={18} /> Clear Cart
                  </button>
                </div>

                <AnimatePresence>
                  <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                    {items.map((item) => (
                      <motion.div key={item.id} variants={itemVariants} layout exit="exit" className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200">
                        <div className="flex items-center gap-4 flex-1">
                          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg border" />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                            <p className="text-green-600 font-medium text-lg">{item.price}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                            <button onClick={() => updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))} className="p-1 rounded-md hover:bg-gray-200 transition-colors" aria-label="Decrease quantity">
                              <Minus size={16} />
                            </button>
                            <span className="px-3 py-1 font-medium min-w-8 text-center">{item.quantity || 1}</span>
                            <button onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)} className="p-1 rounded-md hover:bg-gray-200 transition-colors" aria-label="Increase quantity">
                              <Plus size={16} />
                            </button>
                          </div>

                          <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200" aria-label="Remove item">
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Order Summary - Right Column */}
            <div className="lg:col-span-1">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>₨ {subtotal.toLocaleString()}</span></div>
                  <div className="flex justify-between text-gray-600"><span>Tax (10%)</span><span>₨ {tax.toLocaleString()}</span></div>
                  <div className="border-t pt-4 flex justify-between text-lg font-semibold text-gray-900"><span>Total</span><span>₨ {total.toLocaleString()}</span></div>
                </div>

                {/* Using button + navigate to ensure route change */}
                <button
                  type="button"
                  onClick={() => navigate("/order-now")}
                  className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={20} />
                  Order Now
                </button>

                <p className="text-center text-gray-500 text-sm mt-4">Free shipping and returns</p>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
