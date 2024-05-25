import React, { useState } from "react";
import axios from "axios";

const PropertyForm = ({ property = {}, onSave }) => {
  const [formData, setFormData] = useState({
    title: property.title || "",
    description: property.description || "",
    price: property.price || "",
    location: property.location || "",
    area: property.area || "",
    bedrooms: property.bedrooms || "",
    bathrooms: property.bathrooms || "",
    hospitalsNearby: property.hospitalsNearby || "",
    collegesNearby: property.collegesNearby || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = property._id ? "patch" : "post";
      const url = property._id
        ? `/api/properties/${property._id}`
        : "/api/properties";
      const res = await axios[method](url, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      onSave(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      ></textarea>
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
      />
      <input
        type="text"
        name="area"
        placeholder="Area"
        value={formData.area}
        onChange={handleChange}
      />
      <input
        type="number"
        name="bedrooms"
        placeholder="Bedrooms"
        value={formData.bedrooms}
        onChange={handleChange}
      />
      <input
        type="number"
        name="bathrooms"
        placeholder="Bathrooms"
        value={formData.bathrooms}
        onChange={handleChange}
      />
      <input
        type="text"
        name="hospitalsNearby"
        placeholder="Hospitals Nearby"
        value={formData.hospitalsNearby}
        onChange={handleChange}
      />
      <input
        type="text"
        name="collegesNearby"
        placeholder="Colleges Nearby"
        value={formData.collegesNearby}
        onChange={handleChange}
      />
      <button type="submit">
        {property._id ? "Update Property" : "Add Property"}
      </button>
    </form>
  );
};

export default PropertyForm;
