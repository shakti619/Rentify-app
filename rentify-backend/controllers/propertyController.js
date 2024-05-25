const Property = require("../models/Property");
const nodemailer = require("nodemailer");

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
    res.status(500).send(err);
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
    res.status(500).send(err);
  }
};

exports.createProperty = async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).send(property);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.updateProperty = async (req, res) => {
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
    res.status(400).send(err);
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).send({ error: "Property not found" });
    }
    res.send(property);
  } catch (err) {
    res.status(500).send(err);
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
    res.status(500).send(err);
  }
};

exports.expressInterest = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate("owner");
    if (!property) {
      return res.status(404).send({ error: "Property not found" });
    }

    // Send email to the buyer
    const buyerEmail = req.body.email;
    const sellerEmail = property.owner.email;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your-email@gmail.com",
        pass: "your-email-password",
      },
    });

    const mailOptionsBuyer = {
      from: "your-email@gmail.com",
      to: buyerEmail,
      subject: "Property Interest Confirmation",
      text: `You have expressed interest in the property "${property.title}". Contact details of the seller: ${sellerEmail}`,
    };

    const mailOptionsSeller = {
      from: "your-email@gmail.com",
      to: sellerEmail,
      subject: "New Interest in Your Property",
      text: `A buyer has expressed interest in your property "${property.title}". Contact details of the buyer: ${buyerEmail}`,
    };

    await transporter.sendMail(mailOptionsBuyer);
    await transporter.sendMail(mailOptionsSeller);

    res.send({ message: "Interest expressed and emails sent" });
  } catch (err) {
    res.status(500).send(err);
  }
};
