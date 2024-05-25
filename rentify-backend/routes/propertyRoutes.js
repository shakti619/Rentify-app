const express = require("express");

const { validateProperty } = require("../middleware/validation");
const {
  getProperties,
  getPropertyById,
  getSellerProperties,
  createProperty,
  updateProperty,
  deleteProperty,
  likeProperty,
  expressInterest,
} = require("../controllers/propertyController");
const auth = require("../middleware/auth");
const router = express.Router();

// Public routes
router.get("/", getProperties);
router.get("/:id", getPropertyById);

// Authenticated routes
router.post("/", auth, validateProperty, createProperty);
router.patch("/:id", auth, validateProperty, updateProperty);
router.delete("/:id", auth, deleteProperty);
router.post("/:id/like", auth, likeProperty);
router.post("/:id/interest", auth, expressInterest);
router.get("/seller/properties", auth, getSellerProperties);

module.exports = router;
