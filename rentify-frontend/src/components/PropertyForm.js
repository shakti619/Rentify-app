import React, { useState } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSave, FaEdit } from "react-icons/fa";

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

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      setSuccessMessage("Property added successfully!");
      setErrorMessage("");
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to add property.");
      setSuccessMessage("");
    }
  };

  return (
    <>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <form onSubmit={handleSubmit} className="container mt-4">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="area">Area</label>
          <input
            type="text"
            className="form-control"
            id="area"
            name="area"
            placeholder="Area"
            value={formData.area}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bedrooms">Bedrooms</label>
          <input
            type="number"
            className="form-control"
            id="bedrooms"
            name="bedrooms"
            placeholder="Bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bathrooms">Bathrooms</label>
          <input
            type="number"
            className="form-control"
            id="bathrooms"
            name="bathrooms"
            placeholder="Bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="hospitalsNearby">Hospitals Nearby</label>
          <input
            type="text"
            className="form-control"
            id="hospitalsNearby"
            name="hospitalsNearby"
            placeholder="Hospitals Nearby"
            value={formData.hospitalsNearby}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="collegesNearby">Colleges Nearby</label>
          <input
            type="text"
            className="form-control"
            id="collegesNearby"
            name="collegesNearby"
            placeholder="Colleges Nearby"
            value={formData.collegesNearby}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          {property._id ? (
            <>
              <FaEdit className="mr-2" /> Update Property
            </>
          ) : (
            <>
              <FaSave className="mr-2" /> Add Property
            </>
          )}
        </button>
      </form>
    </>
  );
};

export default PropertyForm;
