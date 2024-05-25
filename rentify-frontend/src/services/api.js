import axios from "axios";

const API_URL = "http://localhost:5000/api";

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
      // Handle unauthorized errors
      console.error("Unauthorized access - possibly invalid token");
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

export const fetchPropertyById = async (id) => {
  try {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch property", error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/users/register", userData);
    return response.data;
  } catch (error) {
    console.error("Failed to register user", error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/users/login", credentials);
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

export default api;
