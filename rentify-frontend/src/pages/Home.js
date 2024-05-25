import React from "react";
import { Container, Button, Badge } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

import "../components/styles.css"; // Import the CSS file for styling

const Home = () => {
  return (
    <div className="home-bg">
      <div className="home-content">
        <div className="welcome-text">
          <h1>
            <Badge bg="dark">Welcome to Rentify</Badge>
          </h1>
          <p>Your destination for finding your dream rental property.</p>
        </div>
        <div className="marketing-line">
          <p>Find your perfect rental property with Rentify.</p>
        </div>

        <Link to="/properties" className="go-to-properties-button">
          <Button variant="dark">
            Go to Properties <BsArrowRight className="icon" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
