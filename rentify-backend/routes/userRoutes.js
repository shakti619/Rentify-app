// routes/userRoutes.js
const express = require("express");
const {
  registerUser,
  loginUser,
  getUserRole,
  getMe,
} = require("../controllers/userController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/isSeller", getUserRole);
router.get("/me", getMe);

module.exports = router;
