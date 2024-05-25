// RegisterForm.js
import React, { useState } from "react";
import { register } from "../services/api";
import { BsFillPersonFill, BsEnvelope, BsPhone, BsLock } from "react-icons/bs"; // Importing icons from React Icons
import { Form, Button } from "react-bootstrap"; // Importing Form and Button components from react-bootstrap
import "./styles.css"; // Importing custom CSS for RegisterForm

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "buyer", // or 'seller'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData);
      console.log(response.data);
      // Handle registration success
    } catch (error) {
      console.error(error);
      // Handle registration error
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
          type="text"
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

      <Button variant="primary" type="submit" className="submit-button">
        Register
      </Button>
    </Form>
  );
};

export default RegisterForm;
