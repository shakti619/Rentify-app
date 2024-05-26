const Property = require("../models/Property");
const nodemailer = require("nodemailer");
const { validationResult } = require("express-validator");
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey("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")

exports.getProperties = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const properties = await Property.find({})
      .skip(skip)
      .limit(limit)
      .populate("owner", "firstName lastName email");
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
    const property = await Property.findById(req.params.id).populate(
      "owner",
      "firstName lastName email"
    );
    if (!property) {
      return res.status(404).send({ error: "Property not found" });
    }

    if (!req.user) {
      return res.status(401).send({ error: "Unauthorized access" });
    }

    res.send(property);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.createProperty = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const property = new Property({
      ...req.body,
      owner: req.user._id,
    });
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
    const property = await Property.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!property) {
      return res
        .status(404)
        .send({ error: "Property not found or unauthorized" });
    }
    res.send(property);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "Bad Request" });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!property) {
      return res
        .status(404)
        .send({ error: "Property not found or unauthorized" });
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

    property.likes = (property.likes || 0) + 1;
    await property.save();

    res.send({ likes: property.likes });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.expressInterest = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('owner');
    if (!property) {
      return res.status(404).send({ error: 'Property not found' });
    }

    if (!req.user) {
      return res.status(401).send({ error: 'Unauthorized access' });
    }

    const buyerEmail = "solanki.shakti619@gmail.com";
    const sellerEmail = 'nsnarender5511@gmail.com';

    const mailOptionsBuyer = {
      from: "nshnarender1998@gmail.com",
      to: buyerEmail,
      subject: 'Property Interest Confirmation',
      text: `You have expressed interest in the property "${property.title}". Contact details of the seller: ${sellerEmail}`,
    };

    const mailOptionsSeller = {
      from: "nshnarender1998@gmail.com",
      to: sellerEmail,
      subject: 'New Interest in Your Property',
      text: `A buyer has expressed interest in your property "${property.title}". Contact details of the buyer: ${buyerEmail}`,
    };

    await sgMail.send(mailOptionsBuyer);
    await sgMail.send(mailOptionsSeller);

    res.send({ message: 'Interest expressed and emails sent' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Server Error' });
  }
};





// Get properties for the seller
exports.getSellerProperties = async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user._id });
    res.send(properties);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server Error" });
  }
};
