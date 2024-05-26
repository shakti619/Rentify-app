import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHome, FaSignInAlt, FaUserPlus, FaBuilding } from "react-icons/fa";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FaHome /> Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/myProperties" className="nav-item">
              <FaBuilding /> My Properties
            </Nav.Link>
            <Nav.Link as={Link} to="/register" className="nav-item">
              <FaUserPlus /> Register
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className="nav-item">
              <FaSignInAlt /> Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
