// frontend/src/App.js

import React from "react";
import { Chart, CategoryScale, LinearScale } from "chart.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NetWorth from "./components/NetWorth";
import FutureMe from "./components/FutureMe";
import Spending from "./components/Spending";
import News from "./components/News";
import Notifications from "./components/Notifications";
import NavigationBar from "./components/Navbar";
import "./styles/style.css";
import SpendingWeb from "./pages/SpendingWeb";

Chart.register(CategoryScale, LinearScale);

function App() {
  return (
    <Router>
      <NavigationBar />
      <div className="container">
        <h1 className="text-center my-4">Timewise Finance</h1>
        <Routes>
          <Route path="/networth" component={NetWorth} />
          <Route path="/spending" component={SpendingWeb} />
          <Route path="/news" component={News} />
          <Route path="/notifications" component={Notifications} />
          <Route path="/futureme" component={FutureMe} />
          <Route path="/" exact element={
            <>
              <div className="row">
                <div className="col-md-6">
                  <NetWorth />
                </div>
                <div className="col-md-6">
                  <Spending />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <News />
                </div>
                <div className="col-md-6">
                  <Notifications />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <FutureMe />
                </div>
              </div>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
