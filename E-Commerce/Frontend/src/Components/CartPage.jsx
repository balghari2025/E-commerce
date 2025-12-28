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

  const containerVariants = { 
    hidden: { opacity: 0 }, 
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.08 } 
    } 
  };
  
  const itemVariants = { 
    hidden: { opacity: 0, y: 12 }, 
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 400, damping: 25 }
    }, 
    exit: { 
      opacity: 0, 
      x: -50,
      transition: { duration: 0.2 }
    } 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            Your Shopping Cart
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">Review and manage your items</p>
          <div className="mt-4 h-1 w-20 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full"></div>
        </motion.div>

        {items.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center"
          >
            <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50 rounded-full">
              <ShoppingBag size={48} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added any items yet.</p>
            <button 
              type="button" 
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3.5 rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2.5 mx-auto hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={20} />
              Continue Shopping
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Cart Items</h2>
                    <p className="text-gray-500 text-sm mt-1">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
                  </div>
                  <button 
                    onClick={clearCart} 
                    className="text-gray-600 hover:text-red-600 transition-all duration-200 flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 hover:border-red-200 hover:bg-red-50 text-sm font-medium"
                  >
                    <Trash2 size={16} /> Clear All
                  </button>
                </div>

                <AnimatePresence mode="popLayout">
                  <motion.div 
                    variants={containerVariants} 
                    initial="hidden" 
                    animate="visible"
                    className="space-y-3.5"
                  >
                    {items.map((item) => (
                      <motion.div 
                        key={item.id} 
                        variants={itemVariants} 
                        layout 
                        exit="exit"
                        className="group flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-gray-200 hover:shadow-md transition-all duration-300"
                      >
                        {/* Product Info Section */}
                        <div className="flex items-center gap-4 flex-1 mb-4 sm:mb-0">
                          <div className="relative">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border border-gray-100 group-hover:border-gray-200 transition-colors"
                            />
                            <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center">
                              {item.quantity || 1}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 text-base sm:text-lg truncate">
                              {item.name}
                            </h3>
                            <p className="text-green-600 font-bold text-lg sm:text-xl mt-1">
                              {item.price}
                            </p>
                            <div class="mt-2 sm:hidden">
                              <div class="flex items-center gap-3">
                                <div class="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5">
                                  <button 
                                    onClick={() => updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))} 
                                    className="p-1 rounded-md hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900"
                                    aria-label="Decrease quantity"
                                  >
                                    <Minus size={14} />
                                  </button>
                                  <span className="px-2 py-1 font-medium min-w-6 text-center text-gray-900">
                                    {item.quantity || 1}
                                  </span>
                                  <button 
                                    onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)} 
                                    className="p-1 rounded-md hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900"
                                    aria-label="Increase quantity"
                                  >
                                    <Plus size={14} />
                                  </button>
                                </div>
                                <button 
                                  onClick={() => removeFromCart(item.id)} 
                                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                  aria-label="Remove item"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Quantity Controls - Desktop */}
                        <div className="hidden sm:flex items-center gap-4">
                          <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-1.5">
                            <button 
                              onClick={() => updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))} 
                              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-3 py-1 font-semibold min-w-8 text-center text-gray-900">
                              {item.quantity || 1}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)} 
                              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900"
                              aria-label="Increase quantity"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          <button 
                            onClick={() => removeFromCart(item.id)} 
                            className="w-10 h-10 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-105"
                            aria-label="Remove item"
                          >
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
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.15, type: "spring" }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Order Summary</h2>
                <p className="text-gray-500 text-sm mb-6">Complete your purchase</p>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">₨ {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Tax (10%)</span>
                    <span className="font-medium text-gray-900">₨ {tax.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-gray-100 pt-4 mt-2 flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-gray-900 text-lg">Total</span>
                      <p className="text-gray-500 text-xs mt-1">Including all taxes</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-gray-900 text-xl">₨ {total.toLocaleString()}</span>
                      <p className="text-gray-500 text-xs mt-1">Free shipping</p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/order-now")}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <ShoppingBag size={20} />
                  Proceed to Checkout
                </button>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Secure payment • 30-day returns</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}              