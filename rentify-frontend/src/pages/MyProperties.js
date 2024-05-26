// Properties.js
import React, { useEffect, useState } from "react";
import PropertyList from "../components/PropertyList";
import { fetchUserRole } from "../services/api"; // Import the function from your api.js file

const MyProperties = () => {

    return (
        <div>
            <h1>Properties</h1>
            <PropertyList isSeller={true} />
        </div>
    );
};

export default MyProperties;
