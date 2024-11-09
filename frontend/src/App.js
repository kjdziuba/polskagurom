// frontend/src/App.js

import React from "react";
import { Chart, CategoryScale, LinearScale } from "chart.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import "./styles/style.css";
import SpendingWeb from "./pages/SpendingWeb";
import NewsWeb from "./pages/NewsWeb";
import NotificationsWeb from "./pages/NotificationsWeb";
import NetWorthWeb from "./pages/NetWorthWeb";
import FutureMeWeb from "./pages/FutureMeWeb";
import HomeWeb from "./pages/HomeWeb";

Chart.register(CategoryScale, LinearScale);

function App() {
  return (
    <Router>
      <NavigationBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomeWeb/>}/>
          <Route path="/networth" element={<NetWorthWeb/>} />
          <Route path="/spending" element={<SpendingWeb/>} />
          <Route path="/news" element={<NewsWeb/>} />
          <Route path="/notifications" element={<NotificationsWeb/>} />
          <Route path="/futureme" element={<FutureMeWeb/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
