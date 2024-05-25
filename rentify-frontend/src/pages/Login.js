// Login.js
import React from "react";
import LoginForm from "../components/LoginForm";
import { Container, Row, Col } from "react-bootstrap";

const Login = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="login-container">
            <h1 className="text-center mb-4">Login</h1>
            <LoginForm />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
