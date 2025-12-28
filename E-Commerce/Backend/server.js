// Backend/server.js - CORS fix
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./connect_db.js";
import orderRoutes from "./routes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ CORS FIX - Allow all origins for testing
app.use(cors({
  origin: "*", // Allow all origins
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  console.log("✅ Test route hit");
  res.send("🚀 Backend connected successfully!");
});

// Order routes
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📝 API endpoint: http://localhost:${PORT}/api/orders`);
  console.log(`🌐 CORS enabled for all origins`);
});