import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/product.route.js";
// Middleware
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // allows to parse the body of the request

app.use(cookieParser()); // Parse cookies

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err)); // Improved error logging

// app.use("/api", authRoutes);

//api routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port  ${PORT}`);
});
