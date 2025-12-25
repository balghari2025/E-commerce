import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 
const connectDB = async () => {
  try {
    const uri = process.env.ATLAS_URI;
    if (!uri) throw new Error("MongoDB URI not found in .env file");
    await mongoose.connect(uri);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ Connection Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
