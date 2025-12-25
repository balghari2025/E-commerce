import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  productId: String,
  productName: String,
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
    items: [itemSchema],
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
