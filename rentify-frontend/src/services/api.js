import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const register = (userData) =>
  axios.post(`${API_URL}/users/register`, userData);
export const login = (userData) =>
  axios.post(`${API_URL}/users/login`, userData);
export const getProperties = () => axios.get(`${API_URL}/properties`);
export const createProperty = (propertyData) =>
  axios.post(`${API_URL}/properties`, propertyData);
export const likeProperty = (propertyId) =>
  axios.post(`${API_URL}/properties/${propertyId}/like`);
