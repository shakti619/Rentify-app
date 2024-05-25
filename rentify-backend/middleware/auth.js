const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).send({ error: "Authorization header missing" });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
