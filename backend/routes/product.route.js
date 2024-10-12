import express from "express";
import {
  getAllProducts,
  getFeaturedProducts,
} from "../controllers/Product.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts); //both ;first one be checked then they call getAllProducts fct
router.get("/featured", getFeaturedProducts);
// router.post("/", protectRoute, adminRoute, createProduct);
export default router;
