import User from "../models/user.model.js";

export const signup = async (req, res) => {
  //desktop app => postman
  try {
    const { email, password, name } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({ name, email, password });
    res.status(201).json({ user, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const login = async (req, res) => {
  res.send("Login route called");
};
export const logout = async (req, res) => {
  res.send("Logout route called");
};
//get user by name
export const getUserByName = async (req, res) => {
  const { name } = req.body;
  try {
    const user = await User.findOne({ name });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
