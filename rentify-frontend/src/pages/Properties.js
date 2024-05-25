// Properties.js
import React, { useEffect, useState } from "react";
import PropertyList from "../components/PropertyList";
import { fetchUserRole } from "../services/api"; // Import the function from your api.js file

const Properties = () => {
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const data = await fetchUserRole();
        setIsSeller(data.role === "Seller");
      } catch (err) {
        console.error("Failed to fetch user role:", err);
      }
    };

    getUserRole();
  }, []);

  return (
    <div>
      <h1>Properties</h1>
      <PropertyList isSeller={isSeller} />
    </div>
  );
};

export default Properties;
