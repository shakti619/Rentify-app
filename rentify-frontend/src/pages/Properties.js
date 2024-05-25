import React, { useEffect, useState } from "react";
import PropertyList from "../components/PropertyList";
import axios from "axios";

const Properties = () => {
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const res = await axios.get("/api/users/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setIsSeller(res.data.role === "seller");
      } catch (err) {
        console.error("Failed to fetch user role:", err);
      }
    };

    fetchUserRole();
  }, []);

  return (
    <div>
      <h1>Properties</h1>
      <PropertyList isSeller={isSeller} />
    </div>
  );
};

export default Properties;
