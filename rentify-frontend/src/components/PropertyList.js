import React, { useEffect, useState } from "react";
import { fetchProperties } from "../services/api";
import PropertyCard from "./PropertyCard";
import { Row, Col } from "react-bootstrap";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [buyerEmail, setBuyerEmail] = useState("");

  useEffect(() => {
    const getProperties = async () => {
      try {
        const response = await fetchProperties();
        setProperties(response); // Adjust according to your API response structure if necessary
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      }
    };

    // Set buyer email based on logged-in user
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && userInfo.email) {
      setBuyerEmail(userInfo.email);
    }

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
