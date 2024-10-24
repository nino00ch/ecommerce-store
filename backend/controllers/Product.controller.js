import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
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
// Create a product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;

    let cloudinaryResponse = null;

    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
      const product = await product.create({
        name,
        description,
        price,
        image: cloudinaryResponse?.secure_url
          ? cloudinaryResponse.secure_url
          : "",
        category,
      });
    }
    res.status(201).json(product);
  } catch (error) {
    console.log("Error in createProduct controller:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
// Delete the product with the id specified not only from the database  also the image from  the cloudinary
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Dotid because in the path there are :id

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0]; //this will get the id of the image

      try {
        await cloudinary.uploader.destroy("publicId / ${publicId}");
        console.log("Image deleted from cloudinary");
      } catch (error) {
        console.log("Error deleting image from cloudinary:", error.message);
      }
    }
    await product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in deleteProduct controller:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
// see the recommendations
export const getRecommendedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $sample: { size: 3 } },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          price: 1,
        },
      },
    ]);
    res.json({ products });
  } catch (error) {
    console.log("Error in getRecommendedProducts controller:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
// search products by category
export const getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    res.json({ products });
  } catch (error) {
    console.log("Error in getProductsByCategory controller:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
//update products feautred and an-feautred ,, stock it in the cache or delete it or add it
export const toggleFeaturedProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      product.isFeatured = !product.isFeatured;
      const updatedProduct = await product.save();
      // Update the cache redis
      await updateFeaturedProductsCache();
      res.json(updatedProduct);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log("Error in toggleFeaturedProduct controller:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

async function updateFeaturedProductsCache() {
  try {
    //the lean() method is used to return a plain JS object instead of full mongoose doc
    const featuredProducts = await Product.find({ featured: true }).lean();
    await redis.set("featured_products", JSON.stringify(featuredProducts));
  } catch (error) {
    console.log(
      "Error updating featured products cache function :",
      error.message
    );
  }
}
