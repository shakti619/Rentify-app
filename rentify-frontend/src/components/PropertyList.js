import React, { useEffect, useState } from "react";
import {
  fetchProperties,
  fetchSellerProperties,
  deleteProperty,
} from "../services/api";
import PropertyCard from "./PropertyCard";
import PropertyForm from "./PropertyForm";
import { Row, Col, Button, Alert, Modal } from "react-bootstrap";

const PropertyList = ({ isSeller }) => {
  const [properties, setProperties] = useState([]);
  const [buyerEmail, setBuyerEmail] = useState("");
  const [editingProperty, setEditingProperty] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProperties = async () => {
      try {
        const response = isSeller
          ? await fetchSellerProperties()
          : await fetchProperties();
        if (Array.isArray(response)) {
          console.log("API Response is an array:", response);
          setProperties(response);
        } else if (response && response.properties) {
          console.log("API Response:", response);
          setProperties(response.properties);
        } else {
          console.error("Unexpected response format:", response);
          setError("Unexpected response format");
        }
      } catch (error) {
        console.error("Failed to fetch properties:", error);
        setError("Failed to fetch properties");
      }
    };

    // Set buyer email based on logged-in user
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (userInfo && userInfo.email) {
      setBuyerEmail(userInfo.email);
    } else {
      console.warn("No user info found in local storage or email is missing");
      setError("No user info found in local storage or email is missing");
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
      setError("Failed to delete property");
    }
  };

  const handleSave = (savedProperty) => {
    if (editingProperty._id) {
      setProperties(
        properties.map((property) =>
          property._id === savedProperty._id ? savedProperty : property
        )
      );
    } else {
      setProperties([...properties, savedProperty]);
    }
    setEditingProperty({});
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setEditingProperty({});
    setShowModal(false);
  };

  const handleShowModal = (property = {}) => {
    setEditingProperty(property);
    setShowModal(true);
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      {isSeller && (
        <Button onClick={() => handleShowModal({})} className="mb-3">
          Add Property
        </Button>
      )}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProperty._id ? "Edit Property" : "Add Property"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PropertyForm property={editingProperty} onSave={handleSave} />
        </Modal.Body>
      </Modal>
      <Row>
        {properties.length > 0 ? (
          properties.map((property) => (
            <Col key={property._id} sm={12} md={6} lg={4} xl={3}>
              <PropertyCard
                property={property}
                buyerEmail={buyerEmail}
                isSeller={isSeller}
                onEdit={() => handleShowModal(property)}
                onDelete={() => handleDelete(property._id)}
              />
            </Col>
          ))
        ) : (
          <Col>
            <Alert variant="info">No properties found.</Alert>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default PropertyList;
