import { redis } from "../lib/redis.js";
import Product from "../models/Product.model.js";

// Ensure that this controller is wrapped in async and has the try-catch block
export const getAllProducts = async (req, res) => {
  try {
    // Only allow admins to fetch products
    if (req.user && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied - Admin Only" });
    }

    const products = await Product.find({}); // Find all the products
    res.json({ products });
  } catch (error) {
    console.log("Error in getAllProducts controller:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featured_products"); //check if there ara a featured stocked in redis

    if (featuredProducts) {
      return res.json(JSON.parse(featuredProducts));
    }

    // if not in redis , fetch from mongodb
    featuredProducts = await Product.find({ featured: true }).lean(); //instead of return mongodb document , its gonna be return a plain JS objects for a better performance

    if (!featuredProducts) {
      return res.status(404).json({ message: "No featured products found" });
    }
    // store in redis for future quick access
    await redis.set("featuredProducts", JSON.stringify(featuredProducts));

    res.json(featuredProducts);
  } catch (error) {
    console.log("Error in getFeaturedProducts controller:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
