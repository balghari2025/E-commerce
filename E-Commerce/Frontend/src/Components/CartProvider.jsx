// CartContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const CART_KEY = "shifa_cart_v1";
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch (err) {
      console.error("Cart save failed:", err);
    }
  }, [items]);

  // Add product (if exists -> increment qty)
  const addToCart = (product, qty = 1) => {
    if (!product || typeof product.id === "undefined") {
      console.warn("addToCart: product must have an id");
      return;
    }
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx === -1) {
        return [...prev, { ...product, quantity: Number(qty) }];
      } else {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: Number(copy[idx].quantity) + Number(qty) };
        return copy;
      }
    });
  };

  const updateQuantity = (id, qty) => {
    if (qty < 1) return;
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: Number(qty) } : p)));
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => setItems([]);

  const totalItems = useMemo(() => items.reduce((s, it) => s + Number(it.quantity), 0), [items]);
  const subtotal = useMemo(() => items.reduce((s, it) => s + Number(it.price) * Number(it.quantity), 0), [items]);

  return (
    <>


      <CartContext.Provider value={{ items, totalItems, subtotal, addToCart, updateQuantity, removeFromCart, clearCart }}>
        {children}
      </CartContext.Provider>
    </>
  );
}

// Hook for convenience
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
export default CartProvider;