const User = require("../models/User");

exports.registerUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res
        .status(401)
        .send({ error: "Login failed! Check authentication credentials" });
    }
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getUserRole = async (req, res) => {
  try {
    const userRole = req.user.isSeller ? "Seller" : "Buyer";
    console.log("Logged-in user information:", req.user); // Log user information to the console
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
