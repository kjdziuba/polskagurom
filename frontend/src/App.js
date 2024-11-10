// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, Box, Typography, Container } from "@mui/material";
import NavigationBar from "./components/Navbar";
import SpendingWeb from "./pages/SpendingWeb";
import NewsWeb from "./pages/NewsWeb";
import NotificationsWeb from "./pages/NotificationsWeb";
import NetWorthWeb from "./pages/NetWorthWeb";
import FutureMeWeb from "./pages/FutureMeWeb";
import HomeWeb from "./pages/HomeWeb";
import { useAuth0 } from "@auth0/auth0-react";
import HeroImage from "./assets/hero_image.jpeg";
import ProfilWeb from "./pages/ProfilWeb";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <CssBaseline />
      <NavigationBar />
      <Box
        className="hero-section"
        sx={{
          backgroundImage: `url(${HeroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: { xs: 200, md: 300 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 4,
        }}
      >
        <Container maxWidth="md">
          <Box className="hero-text">
            <Typography variant="h2" component="h1" gutterBottom>
              Timewise Finance
            </Typography>
            <Typography variant="h5">
              Take control of your financial future
            </Typography>
          </Box>
        </Container>
      </Box>
      {!isAuthenticated ? (
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography variant="h5">
            Please log in to access the dashboard.
          </Typography>
        </Container>
      ) : (
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<HomeWeb />} />
            <Route path="/networth" element={<NetWorthWeb />} />
            <Route path="/spending" element={<SpendingWeb />} />
            <Route path="/news" element={<NewsWeb />} />
            <Route path="/notifications" element={<NotificationsWeb />} />
            <Route path="/futureme" element={<FutureMeWeb />} />
            <Route path="/profil" element={<ProfilWeb />} />
          </Routes>
        </Container>
      )}
    </Router>
  );
}

export default App;
