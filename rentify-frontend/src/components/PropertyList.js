import React, { useEffect, useState } from "react";
import { getProperties } from "../services/api";
import PropertyCard from "./PropertyCard";
import { Row, Col } from "react-bootstrap";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await getProperties();
        setProperties(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div>
      {properties.map((property) => (
        <Col sm={12} md={6} lg={4} xl={3}>
          <PropertyCard key={property._id} property={property} />
        </Col>
      ))}
    </div>
  );
};

export default PropertyList;
