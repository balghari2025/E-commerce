import Order from "./model.js";

// ✅ Save new order
export const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const saved = await order.save();
    res.status(201).json({ message: "Order saved successfully", data: saved });
  } catch (err) {
    console.error("❌ Order save failed:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};
