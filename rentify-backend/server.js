const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const propertyRoutes = require("./routes/propertyRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/rentify";

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Rentify API");
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "Healthy" });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("An error occurred:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
