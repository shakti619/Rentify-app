// controllers/userController.js
const User = require("../models/User");

exports.registerUser = async (req, res) => {
  try {
    console.log("Received payload:", req.body); // Log the received payload

    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error (e.g., email already in use)
      return res.status(400).send({ message: "Email already in use" });
    }
    console.error("Error during user registration:", err); // Log the error
    res.status(400).send({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getUserRole = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).send({ message: "User not authenticated" });
    }
    const userRole = req.user.isSeller ? "Seller" : "Buyer";
    res.json({ role: userRole });
  } catch (error) {
    console.error("Error fetching user role:", error);
    res.status(500).send("Server error");
  }
};

// Add this function to get the authenticated user's information
exports.getMe = async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    console.error("Error fetching user information:", error);
    res.status(500).send("Server error");
  }
};
