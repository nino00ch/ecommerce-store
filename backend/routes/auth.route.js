import express from "express";
import {
  getUserByName,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";

const router = express.Router();
//authentication
router.get("/signup", signup);
router.get("/login", login);
router.get("/logout", logout);
router.get("/get-user-by-name", getUserByName);

// This will be the route for handling POST requests to the signup endpoint
export default router;
