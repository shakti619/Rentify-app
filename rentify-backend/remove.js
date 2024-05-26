const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const Property = require("./models/Property");

dotenv.config();

const removeAllData = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Delete all documents from User collection
    await User.deleteMany({});
    console.log("All users deleted.");

    // Delete all documents from Property collection
    await Property.deleteMany({});
    console.log("All properties deleted.");
  } catch (err) {
    console.error("Error deleting data:", err);
  } finally {
    mongoose.connection.close();
  }
};

removeAllData();
