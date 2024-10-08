import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

// Middleware
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // allows to parse the body of the request

// Connect to MongoDB
// mongoose
//   .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase")
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err)); // Improved error logging

// app.use("/api", authRoutes);

//api routes
app.use("/api/auth", authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port  ${PORT}`);

  connectDB();
});
