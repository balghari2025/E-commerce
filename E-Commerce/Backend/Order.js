import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, default: "Not provided" },
    postalCode: { type: String, default: "Not provided" },
    country: { type: String, default: "Not provided" },
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, default: "Credit Card" },
    orderStatus: { type: String, default: "Pending" },
    orderDate: { type: Date, default: Date.now },
    items: [itemSchema],
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;