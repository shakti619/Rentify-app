// controllers/propertyController.js
const Property = require("../models/Property");
const User = require("../models/User");
const { sendInterestEmail } = require("./userController");

exports.createProperty = async (req, res) => {
  const { title, description, location, bedrooms, bathrooms, rent, seller } =
    req.body;
  try {
    const property = new Property({
      title,
      description,
      location,
      bedrooms,
      bathrooms,
      rent,
      seller,
    });
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate("seller");
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.likeProperty = async (req, res) => {
  const { id } = req.params;
  try {
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }
    property.likes += 1;
    await property.save();
    res.json(property);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.showInterest = async (req, res) => {
  const { propertyId, buyerEmail } = req.body;
  try {
    const property = await Property.findById(propertyId).populate("seller");
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }
    const sellerEmail = property.seller.email;
    sendInterestEmail(sellerEmail, buyerEmail);
    res.status(200).json({ message: "Interest email sent to seller" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
