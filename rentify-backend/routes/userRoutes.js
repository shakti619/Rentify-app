const express = require("express");
const {
  registerUser,
  loginUser,
  getUserRole,
} = require("../controllers/userController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Route to fetch user role, protected by auth middleware
router.get("/role", auth, getUserRole);
router.get("/me", auth, getMe);

module.exports = router;
