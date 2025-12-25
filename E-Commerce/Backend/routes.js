import express from "express";
import { createOrder, getOrders } from "./controller.js";

const router = express.Router();

router.post("/", createOrder);   // For saving order
router.get("/", getOrders);      // For viewing all orders

export default router;
