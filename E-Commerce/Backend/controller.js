import Order from "./Order.js";

// ✅ Save new order (FIXED VERSION)
export const createOrder = async (req, res) => {
  try {
    console.log("📥 Receiving order data:", req.body);
    
    const { userInfo, cartItems, total } = req.body;
    
    // Validate required fields
    if (!userInfo || !userInfo.name || !userInfo.email) {
      return res.status(400).json({ 
        message: "Name and email are required", 
        error: "Missing required fields" 
      });
    }
    
    // Prepare order data in correct format
    const orderData = {
      customerName: userInfo.name,
      email: userInfo.email,
      phone: userInfo.phone || "Not provided",
      address: userInfo.address || "Not provided",
      city: userInfo.city || "Not provided",
      postalCode: userInfo.postalCode || "Not provided",
      country: userInfo.country || "Not provided",
      totalAmount: total,
      paymentMethod: "Credit Card",
      orderStatus: "Pending",
      items: cartItems.map(item => ({
        productId: item.id ? item.id.toString() : "temp_id",
        productName: item.name || "Product",
        quantity: item.quantity || 1,
        price: item.price || 0
      }))
    };
    
    console.log("📝 Order data to save:", orderData);
    
    const order = new Order(orderData);
    const saved = await order.save();
    
    console.log("✅ Order saved successfully:", saved._id);
    
    res.status(201).json({ 
      success: true,
      message: "Order saved successfully", 
      orderId: saved._id,
      data: saved 
    });
    
  } catch (err) {
    console.error("❌ Order save failed:", err.message);
    res.status(500).json({ 
      success: false,
      message: "Server error", 
      error: err.message 
    });
  }
};

// ✅ Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch orders", 
      error: err.message 
    });
  }
};