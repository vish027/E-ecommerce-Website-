import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";

import connectDB from "./configs/db.js";
import connectCloudinary from "./configs/cloudinary.js";

// Routers
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import productRouter from "./routes/productRoute.js"; // ✅ merged
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
import { stripeWebhooks } from "./controllers/orderController.js";

// Extra Routers from second code
import AuthRouter from "./Routes/AuthRouter.js";
import ProductRouter from "./routes/ProductRouter.js";

const app = express();
const port = process.env.PORT || 4000;

// Connect DB + Cloudinary
await connectDB();
await connectCloudinary();

// Allow multiple origins
const allowedOrigins = ["http://localhost:5173", ""];

// Stripe webhook (raw body required)
app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

// Middleware
app.use(express.json());
app.use(bodyParser.json()); // ✅ kept from 2nd code
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Test routes
app.get("/", (req, res) => res.send("API is Working"));
app.get("/ping", (req, res) => res.send("PONG"));

// Main routes
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

// Extra routes from 2nd code
app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);

// Start server
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
