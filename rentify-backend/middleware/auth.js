const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  console.log("request Recived to create property  " + req.body);
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).send({ error: "Authorization header missing" });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, "process.env.JWT_SECRET");
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
    if (err.name === "JsonWebTokenError") {
      return res.status(401).send({ error: "Invalid token" });
    }
    if (err.name === "TokenExpiredError") {
      return res.status(401).send({ error: "Token expired" });
    }
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = auth;
