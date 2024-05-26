// api.js
import axios from "axios";

const API_URL = "http://localhost:8080/api"; // Ensure this URL is correct for your backend

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access - possibly invalid token");
      // Optional: Handle token expiration, redirect to login, etc.
    }
    return Promise.reject(error);
  }
);

export const fetchProperties = async () => {
  try {
    const response = await api.get("/properties");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch properties", error);
    throw error;
  }
};

export const fetchSellerProperties = async () => {
  try {
    const response = await api.get("/properties/seller/properties");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch seller properties", error);
    throw error;
  }
};

export const fetchPropertyById = async (id) => {
  try {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch property", error);
    throw error;
  }
};

export const createProperty = async (propertyData) => {
  try {
    const response = await api.post("/properties", propertyData);
    return response.data;
  } catch (error) {
    console.error("Failed to create property", error);
    throw error;
  }
};

export const updateProperty = async (id, propertyData) => {
  try {
    const response = await api.patch(`/properties/${id}`, propertyData);
    return response.data;
  } catch (error) {
    console.error("Failed to update property", error);
    throw error;
  }
};

export const deleteProperty = async (id) => {
  try {
    const response = await api.delete(`/properties/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete property", error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/users/register", userData);
    const { user, token } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    return response.data;
  } catch (error) {
    console.error("Failed to register user", error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/users/login", credentials);
    const { user, token } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    return response.data;
  } catch (error) {
    console.error("Failed to login", error);
    throw error;
  }
};

export const likeProperty = async (id) => {
  try {
    const response = await api.post(`/properties/${id}/like`);
    return response.data;
  } catch (error) {
    console.error("Failed to like property", error);
    throw error;
  }
};

export const expressInterest = async (id, email) => {
  try {
    const response = await api.post(`/properties/${id}/interest`, { email });
    return response.data;
  } catch (error) {
    console.error("Failed to express interest", error);
    throw error;
  }
};

// Fetch user role and log user information
export const fetchUserRole = async () => {
  try {
    const response = await api.get("/users/isSeller");
    console.log("User information:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user role", error);
    throw error;
  }
};

export const fetchUserInfo = async () => {
  try {
    const response = await api.get("/users/isSeller");
    console.log("Authenticated user information:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user information", error);
    throw error;
  }
};

export default api;
