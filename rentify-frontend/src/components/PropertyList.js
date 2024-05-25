import React, { useEffect, useState } from "react";
import { fetchProperties } from "../services/api";
import PropertyCard from "./PropertyCard";
import { Row, Col } from "react-bootstrap";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [buyerEmail, setBuyerEmail] = useState("buyer-email@example.com"); // This should be dynamically set based on the logged-in user

  useEffect(() => {
    const getProperties = async () => {
      try {
        const response = await fetchProperties();
        setProperties(response.properties); // Adjust according to your API response structure
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      }
    };

    getProperties();
  }, []);

  return (
    <Row>
      {properties.map((property) => (
        <Col key={property._id} sm={12} md={6} lg={4} xl={3}>
          <PropertyCard property={property} buyerEmail={buyerEmail} />
        </Col>
      ))}
    </Row>
  );
};

export default PropertyList;
