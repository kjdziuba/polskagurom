// frontend/src/App.js

import React from "react";
import { Chart, CategoryScale, LinearScale } from "chart.js";
import NetWorth from "./components/NetWorth";
import FutureMe from "./components/FutureMe";
import Spending from "./components/Spending";
import News from "./components/News";
import Notifications from "./components/Notifications";
import NavigationBar from "./components/Navbar";
import "./styles/style.css";

Chart.register(CategoryScale, LinearScale);

function App() {
  return (
    <>
      <NavigationBar />
      <div className="container">
        <h1 className="text-center my-4">Timewise Finance</h1>
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
      </div>
    </>
  );
}

export default App;
