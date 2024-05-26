import React, { useState } from "react";
import { likeProperty, expressInterest } from "../services/api";
import { Card, Button, Row, Col } from "react-bootstrap";
import { FaThumbsUp, FaHandshake, FaEdit, FaTrash } from "react-icons/fa";

const PropertyCard = ({ property, buyerEmail, isSeller, onEdit, onDelete }) => {
  const [likes, setLikes] = useState(property.likes);

  const handleLike = async () => {
    try {
      await likeProperty(property._id);
      setLikes(likes + 1);
    } catch (error) {
      console.error("Error liking property:", error);
    }
  };

  const handleInterest = async () => {
    try {
      await expressInterest(property._id, buyerEmail);
      alert("Interest expressed and email sent");
    } catch (error) {
      console.error("Error expressing interest:", error);
    }
  };

  return (
    <Card className="my-3 p-3 rounded">
      <Card.Img src={property.image} variant="top" />
      <Card.Body>
        <Card.Title>{property.title}</Card.Title>
        <Card.Text>{property.description}</Card.Text>
        <Card.Text>{property.location}</Card.Text>
        <Card.Text>Bedrooms: {property.bedrooms}</Card.Text>
        <Card.Text>Bathrooms: {property.bathrooms}</Card.Text>
        <Card.Text>Rent: ${property.rent}</Card.Text>
        <Card.Text>Likes: {likes}</Card.Text>
        <Row>
          {isSeller ? (
            <>
              <Col md={6} className="text-left">
                <Button variant="warning" onClick={onEdit}>
                  <FaEdit /> Edit
                </Button>
              </Col>
              <Col md={6} className="text-right">
                <Button variant="danger" onClick={onDelete}>
                  <FaTrash /> Delete
                </Button>
              </Col>
            </>
          ) : (
            <>
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
            </>
          )}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PropertyCard;
