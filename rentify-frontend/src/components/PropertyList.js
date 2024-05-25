import React, { useEffect, useState } from "react";
import {
  fetchProperties,
  fetchSellerProperties,
  deleteProperty,
} from "../services/api";
import PropertyCard from "./PropertyCard";
import PropertyForm from "./PropertyForm";
import { Row, Col, Button } from "react-bootstrap";

const PropertyList = ({ isSeller }) => {
  const [properties, setProperties] = useState([]);
  const [buyerEmail, setBuyerEmail] = useState("");
  const [editingProperty, setEditingProperty] = useState(null);

  useEffect(() => {
    const getProperties = async () => {
      try {
        const response = isSeller
          ? await fetchSellerProperties()
          : await fetchProperties();
        if (response && response.properties) {
          setProperties(response.properties); // Adjust according to your API response structure if necessary
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      }
    };

    // Set buyer email based on logged-in user
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && userInfo.email) {
      setBuyerEmail(userInfo.email);
    } else {
      console.warn("No user info found in local storage or email is missing");
    }

    getProperties();
  }, [isSeller]);

  const handleDelete = async (propertyId) => {
    try {
      await deleteProperty(propertyId);
      setProperties(
        properties.filter((property) => property._id !== propertyId)
      );
    } catch (error) {
      console.error("Failed to delete property:", error);
    }
  };

  const handleSave = (savedProperty) => {
    if (editingProperty) {
      setProperties(
        properties.map((property) =>
          property._id === savedProperty._id ? savedProperty : property
        )
      );
    } else {
      setProperties([...properties, savedProperty]);
    }
    setEditingProperty(null);
  };

  return (
    <div>
      {isSeller && (
        <Button onClick={() => setEditingProperty({})} className="mb-3">
          Add Property
        </Button>
      )}
      {editingProperty && (
        <PropertyForm property={editingProperty} onSave={handleSave} />
      )}
      <Row>
        {properties.map((property) => (
          <Col key={property._id} sm={12} md={6} lg={4} xl={3}>
            <PropertyCard
              property={property}
              buyerEmail={buyerEmail}
              isSeller={isSeller}
              onEdit={() => setEditingProperty(property)}
              onDelete={() => handleDelete(property._id)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PropertyList;
