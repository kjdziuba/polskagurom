// src/components/Profil.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";

function Profil(){
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProfileData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("/api/profile");
            setProfileData(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    return (
        <div>
        <h2>Spending Breakdown (Last Month)</h2>
      </div>
    );
}

export default Profil;