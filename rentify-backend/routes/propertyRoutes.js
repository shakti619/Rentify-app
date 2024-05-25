// routes/propertyRoutes.js
const express = require("express");
const {
  createProperty,
  getProperties,
  likeProperty,
  showInterest,
} = require("../controllers/propertyController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, createProperty);
router.get("/", getProperties);
router.post("/:id/like", auth, likeProperty);
router.post("/interest", auth, showInterest);

module.exports = router;
