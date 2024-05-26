const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./db");
const User = require("./models/User");
const Property = require("./models/Property");

dotenv.config();

const seedData = async () => {
  await connectDB();

  try {
    // Sample user data
    const users = [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phoneNumber: "1234567890",
        password: "password123",
        isSeller: true,
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        phoneNumber: "0987654321",
        password: "password123",
        isSeller: false,
      },
    ];

    // Insert sample user data
    const createdUsers = await User.insertMany(users);

    // Sample property data with correct image paths
    const properties = [
      {
        title: "Luxury Apartment",
        description: "A luxurious apartment in the city center.",
        price: 1000000,
        location: "City Center",
        area: "1500 sqft",
        bedrooms: 3,
        bathrooms: 2,
        owner: createdUsers[0]._id,
        image: "/public/spacious.webp",
        likes: 10,
      },
      {
        title: "Cozy Cottage",
        description: "A cozy cottage in the countryside.",
        price: 500000,
        location: "Countryside",
        area: "1200 sqft",
        bedrooms: 2,
        bathrooms: 1,
        owner: createdUsers[1]._id,
        image: "/public/A cozy cottage.webp",
        likes: 5,
      },
      {
        title: "Modern Villa",
        description: "A modern villa with a private pool.",
        price: 2000000,
        location: "Beachside",
        area: "2500 sqft",
        bedrooms: 4,
        bathrooms: 3,
        owner: createdUsers[0]._id,
        image: "/public/modern villa.webp",
        likes: 20,
      },
      {
        title: "Urban Studio",
        description: "A compact studio in a bustling urban area.",
        price: 300000,
        location: "Downtown",
        area: "600 sqft",
        bedrooms: 1,
        bathrooms: 1,
        owner: createdUsers[1]._id,
        image: "/public/compact studio.webp",
        likes: 8,
      },
      {
        title: "Suburban House",
        description: "A spacious house in a quiet suburban neighborhood.",
        price: 750000,
        location: "Suburbs",
        area: "2000 sqft",
        bedrooms: 3,
        bathrooms: 2,
        owner: createdUsers[0]._id,
        image: "/public/home.webp",
        likes: 12,
      },
      {
        title: "Penthouse Suite",
        description: "A top-floor penthouse with panoramic views.",
        price: 3000000,
        location: "City Center",
        area: "3500 sqft",
        bedrooms: 5,
        bathrooms: 4,
        owner: createdUsers[1]._id,
        image: "/public/penthouse.webp",
        likes: 25,
      },
      {
        title: "Country Estate",
        description: "A grand estate in the heart of the countryside.",
        price: 1500000,
        location: "Countryside",
        area: "5000 sqft",
        bedrooms: 6,
        bathrooms: 5,
        owner: createdUsers[0]._id,
        image: "/public/estate.webp",
        likes: 30,
      },
      {
        title: "Downtown Condo",
        description: "A stylish condo in the downtown area.",
        price: 450000,
        location: "Downtown",
        area: "900 sqft",
        bedrooms: 2,
        bathrooms: 1,
        owner: createdUsers[1]._id,
        image: "/public/condo.webp",
        likes: 15,
      },
      {
        title: "Beachfront Bungalow",
        description: "A charming bungalow right on the beach.",
        price: 1250000,
        location: "Beachside",
        area: "1800 sqft",
        bedrooms: 3,
        bathrooms: 2,
        owner: createdUsers[0]._id,
        image: "/public/bunglow.webp",
        likes: 18,
      },
      {
        title: "Historic Townhouse",
        description: "A beautifully restored historic townhouse.",
        price: 950000,
        location: "Old Town",
        area: "1600 sqft",
        bedrooms: 3,
        bathrooms: 2,
        owner: createdUsers[1]._id,
        image: "/public/townhouse.webp",
        likes: 22,
      },
      {
        title: "Eco-Friendly Home",
        description: "A sustainable home with eco-friendly features.",
        price: 850000,
        location: "Green District",
        area: "1400 sqft",
        bedrooms: 2,
        bathrooms: 2,
        owner: createdUsers[0]._id,
        image: "/public/home.webp",
        likes: 28,
      },
      {
        title: "Mountain Cabin",
        description: "A cozy cabin with stunning mountain views.",
        price: 600000,
        location: "Mountains",
        area: "1300 sqft",
        bedrooms: 2,
        bathrooms: 1,
        owner: createdUsers[1]._id,
        image: "/public/cabin.webp",
        likes: 14,
      },
      {
        title: "Urban Loft",
        description: "A trendy loft in the heart of the city.",
        price: 700000,
        location: "City Center",
        area: "1100 sqft",
        bedrooms: 2,
        bathrooms: 2,
        owner: createdUsers[0]._id,
        image: "/public/loft.webp",
        likes: 16,
      },
    ];

    // Insert sample property data
    await Property.insertMany(properties);

    console.log("Sample data seeded successfully!");
  } catch (err) {
    console.error("Error seeding data:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedData();
