// frontend/src/App.js

import React from "react";
import { Chart, CategoryScale, LinearScale } from "chart.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import SpendingWeb from "./pages/SpendingWeb";
import NewsWeb from "./pages/NewsWeb";
import NotificationsWeb from "./pages/NotificationsWeb";
import NetWorthWeb from "./pages/NetWorthWeb";
import FutureMeWeb from "./pages/FutureMeWeb";
import HomeWeb from "./pages/HomeWeb";
import { useAuth0 } from "@auth0/auth0-react";
import HeroImage from "./assets/hero_image.jpeg";

Chart.register(CategoryScale, LinearScale);

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <NavigationBar />
      <div
        className="hero-section"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${HeroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
      >
        <div className="text-center text-white">
          <h1 className="display-3 mb-4">Timewise Finance</h1>
          <p className="lead">Take control of your financial future</p>
        </div>
      </div>
      {!isAuthenticated ? (
        <div className="container text-center">
          <h2>Please log in to access the dashboard.</h2>
        </div>
      ) : (
        <div className="container">
          <Routes>
            <Route path="/" element={<HomeWeb />} />
            <Route path="/networth" element={<NetWorthWeb />} />
            <Route path="/spending" element={<SpendingWeb />} />
            <Route path="/news" element={<NewsWeb />} />
            <Route path="/notifications" element={<NotificationsWeb />} />
            <Route path="/futureme" element={<FutureMeWeb />} />
          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;
