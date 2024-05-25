// Register.js
import React from "react";
import RegisterForm from "../components/RegisterForm";
import { Container, Row, Col } from "react-bootstrap";

const Register = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="register-container">
            <h1 className="text-center mb-4">Register</h1>
            <RegisterForm />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
