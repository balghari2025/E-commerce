import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./connect_db.js";
import orderRoutes from "./routes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("🚀 Backend connected successfully!"));
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
