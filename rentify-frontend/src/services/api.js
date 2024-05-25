const API_URL = "http://localhost:5000/api"; // Ensure the correct backend URL

export const fetchProperties = async () => {
  const response = await fetch(`${API_URL}/properties`);
  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }
  return await response.json();
};

export const fetchPropertyById = async (id) => {
  const response = await fetch(`${API_URL}/properties/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch property");
  }
  return await response.json();
};

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error("Failed to register user");
  }
  return await response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error("Failed to login");
  }
  return await response.json();
};

export const likeProperty = async (id) => {
  const response = await fetch(`${API_URL}/properties/${id}/like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to like property");
  }
  return await response.json();
};

export const expressInterest = async (id, email) => {
  const response = await fetch(`${API_URL}/properties/${id}/interest`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  });
  if (!response.ok) {
    throw new Error("Failed to express interest");
  }
  return await response.json();
};
