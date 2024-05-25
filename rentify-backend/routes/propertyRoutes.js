const express = require("express");
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
router.post("/", auth, createProperty);
router.patch("/:id", auth, updateProperty);
router.delete("/:id", auth, deleteProperty);
router.post("/:id/like", auth, likeProperty);
router.post("/:id/interest", auth, expressInterest);

module.exports = router;
