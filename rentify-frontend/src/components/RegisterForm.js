import React, { useState } from "react";
import { registerUser } from "../services/api";
import { BsFillPersonFill, BsEnvelope, BsPhone, BsLock } from "react-icons/bs"; // Importing icons from React Icons
import { Form, Button } from "react-bootstrap"; // Importing Form and Button components from react-bootstrap
import "./styles.css"; // Importing custom CSS for RegisterForm

function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "buyer", // Default role is buyer
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      console.log(formData);
      window.location.href = "/login";
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="register-form">
      <Form.Group controlId="formBasicFirstName">
        <Form.Label>
          <BsFillPersonFill /> First Name
        </Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          placeholder="Enter first name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBasicLastName">
        <Form.Label>
          <BsFillPersonFill /> Last Name
        </Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          placeholder="Enter last name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </Form.Group>

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

      <Form.Group controlId="formBasicPhoneNumber">
        <Form.Label>
          <BsPhone /> Phone Number
        </Form.Label>
        <Form.Control
          type="tel"
          name="phoneNumber"
          placeholder="Enter phone number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>
          <BsLock /> Password
        </Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBasicRole">
        <Form.Label>Select Role</Form.Label>
        <Form.Control
          as="select"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </Form.Control>
      </Form.Group>

      {error && <p className="error-message">{error}</p>}
      <Button variant="primary" type="submit" className="submit-button">
        Register
      </Button>
    </Form>
  );
}

export default RegisterForm;
