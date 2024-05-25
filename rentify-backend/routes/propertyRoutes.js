const express = require("express");
const { validateProperty } = require("../middleware/validation");
const {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  likeProperty,
  expressInterest,
} = require("../controllers/propertyController");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", getProperties);
router.get("/:id", getPropertyById);
router.post("/", auth, validateProperty, createProperty);
router.patch("/:id", auth, validateProperty, updateProperty);
router.delete("/:id", auth, deleteProperty);
router.post("/:id/like", auth, likeProperty);
router.post("/:id/interest", auth, expressInterest);

module.exports = router;
