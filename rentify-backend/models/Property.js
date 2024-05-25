const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      maxlength: [100, "Location cannot be more than 100 characters"],
    },
    area: {
      type: String,
      required: [true, "Area is required"],
      trim: true,
      maxlength: [100, "Area cannot be more than 100 characters"],
    },
    bedrooms: {
      type: Number,
      required: [true, "Number of bedrooms is required"],
      min: [1, "There must be at least one bedroom"],
    },
    bathrooms: {
      type: Number,
      required: [true, "Number of bathrooms is required"],
      min: [1, "There must be at least one bathroom"],
    },
    hospitalsNearby: {
      type: String,
      trim: true,
      maxlength: [200, "Hospitals nearby cannot be more than 200 characters"],
    },
    collegesNearby: {
      type: String,
      trim: true,
      maxlength: [200, "Colleges nearby cannot be more than 200 characters"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Owner is required"],
      ref: "User",
    },
    likes: {
      type: Number,
      default: 0,
      min: [0, "Likes cannot be negative"],
    },
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
