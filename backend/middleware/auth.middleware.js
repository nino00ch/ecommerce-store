import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

//protect rout
export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No access token provided" });
    }

    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        //if user does not exist
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user; //if user already exists
      next(); //call the next fct
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Unauthorized - Access token expired" });
      }
      throw error;
    }
  } catch (error) {
    console.log("Error in protectRoute middleware", error.message);
    return res
      .status(401)
      .json({ message: "Unauthorized - Invalid access token" });
  }
}; //next used to call the next function "adminRoute"

//Admin rout
export const adminRoute = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); //next fct get all products
  } else {
    return res.status(403).json({ message: "Access denied - Admin Only" });
  }
};
