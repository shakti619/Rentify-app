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
          setProperties(response);
        } else if (response && response.properties) {
          setProperties(response.properties);
        } else {
          setError("Unexpected response format");
        }
      } catch (error) {
        setError("Failed to fetch properties");
      }
    };

    // Set buyer email based on logged-in user
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (userInfo && userInfo.email) {
      setBuyerEmail(userInfo.email);
    } else {
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

  const showSellerProperties = async () => {
    try {
      const response = await fetchSellerProperties();
      setProperties(response);
    } catch (error) {
      setError("Failed to fetch seller properties");
    }
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      {isSeller && (
        <div className="mb-3">
          <Button onClick={() => handleShowModal({})}>Add Property</Button>
          <Button onClick={showSellerProperties} className="ml-2">
            Show My Properties
          </Button>
        </div>
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
