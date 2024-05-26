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

// Route to get properties posted by the logged-in seller

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

router.get("/seller/properties", auth, async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user._id });
    res.status(200).send(properties);
  } catch (err) {
    console.error("Error fetching seller properties:", err);
    res.status(500).send({ error: "Server Error" });
  }
});

module.exports = router;
