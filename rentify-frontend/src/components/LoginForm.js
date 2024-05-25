// LoginForm.js
import React, { useState } from "react";
import { login } from "../services/api";
import { BsEnvelope, BsLock } from "react-icons/bs"; // Importing icons from React Icons
import { Form, Button } from "react-bootstrap"; // Importing Form and Button components from react-bootstrap
import "./styles.css"; // Importing custom CSS for LoginForm

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      console.log(response.data);
      // Handle login success
    } catch (error) {
      console.error(error);
      // Handle login error
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Form.Group controlId="formBasicEmail">
        <Form.Label>
          <BsEnvelope /> Email
        </Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword" className="mb-3">
        <Form.Label>
          <BsLock /> Password
        </Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="submit-button">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
