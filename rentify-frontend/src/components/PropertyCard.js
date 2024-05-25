import React from "react";
import { likeProperty } from "../services/api";
import { Card, Button, Row, Col } from "react-bootstrap";
import { FaThumbsUp, FaHandshake } from "react-icons/fa";

const PropertyCard = ({ property }) => {
  const handleLike = async () => {
    try {
      await likeProperty(property._id);
      // Handle like success (e.g., update UI)
    } catch (error) {
      console.error(error);
    }
  };

  const handleInterest = () => {
    // Handle interest action
  };

  return (
    <Card className="my-3 p-3 rounded">
      <Card.Img src={property.Img} variant="top" />
      <Card.Body>
        <Card.Title>{property.title}</Card.Title>
        <Card.Text>{property.description}</Card.Text>
        <Card.Text>{property.location}</Card.Text>
        <Card.Text>Bedrooms: {property.bedrooms}</Card.Text>
        <Card.Text>Bathrooms: {property.bathrooms}</Card.Text>
        <Card.Text>Rent: ${property.rent}</Card.Text>
        <Row>
          <Col md={6} className="text-left">
            <Button variant="success" onClick={handleInterest}>
              <FaHandshake /> I am Interested
            </Button>
          </Col>
          <Col md={6} className="text-right">
            <Button variant="primary" onClick={handleLike}>
              <FaThumbsUp /> Like
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PropertyCard;
