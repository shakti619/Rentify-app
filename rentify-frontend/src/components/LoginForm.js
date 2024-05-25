import React, { useState } from "react";
import { loginUser } from "../services/api";
import { BsEnvelope, BsLock } from "react-icons/bs";
import { Form, Button, Alert } from "react-bootstrap"; // Import Alert for error messages
import "./styles.css"; // Importing custom CSS for LoginForm

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(formData);
      localStorage.setItem("token", user.token);
      localStorage.setItem("userInfo", JSON.stringify(user)); // Store user info
      window.location.href = "/properties";
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to login");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="formBasicEmail">
        <Form.Label>
          <BsEnvelope /> Email
        </Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword" className="mb-3">
        <Form.Label>
          <BsLock /> Password
        </Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
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
