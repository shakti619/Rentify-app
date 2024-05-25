const Property = require("../models/Property");
const nodemailer = require("nodemailer");
const { check, validationResult } = require("express-validator");

exports.getProperties = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const properties = await Property.find({}).skip(skip).limit(limit);
    const count = await Property.countDocuments({});
    res.send({
      properties,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server Error" });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).send({ error: "Property not found" });
    }
    res.send(property);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server Error" });
  }
};

exports.createProperty = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).send(property);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "Bad Request" });
  }
};

exports.updateProperty = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!property) {
      return res.status(404).send({ error: "Property not found" });
    }
    res.send(property);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "Bad Request" });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).send({ error: "Property not found" });
    }
    res.send({ message: "Property deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server Error" });
  }
};

exports.likeProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).send({ error: "Property not found" });
    }
    property.likes += 1;
    await property.save();
    res.send(property);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server Error" });
  }
};

exports.expressInterest = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate("owner");
    if (!property) {
      return res.status(404).send({ error: "Property not found" });
    }

    const { email } = req.body;
    const sellerEmail = property.owner.email;

    if (!email) {
      return res.status(400).send({ error: "Buyer email is required" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptionsBuyer = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Property Interest Confirmation",
      text: `You have expressed interest in the property "${property.title}". Contact details of the seller: ${sellerEmail}`,
    };

    const mailOptionsSeller = {
      from: process.env.EMAIL_USER,
      to: sellerEmail,
      subject: "New Interest in Your Property",
      text: `A buyer has expressed interest in your property "${property.title}". Contact details of the buyer: ${email}`,
    };

    await transporter.sendMail(mailOptionsBuyer);
    await transporter.sendMail(mailOptionsSeller);

    res.send({ message: "Interest expressed and emails sent" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server Error" });
  }
};
