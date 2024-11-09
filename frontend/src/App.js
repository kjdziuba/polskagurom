// frontend/src/App.js

import React from "react";
import { Chart, CategoryScale, LinearScale } from "chart.js";
import NetWorth from "./components/NetWorth";
import FutureMe from "./components/FutureMe";
import Spending from "./components/Spending";
import News from "./components/News";
import Notifications from "./components/Notifications";
import NavigationBar from "./components/Navbar";

Chart.register(CategoryScale, LinearScale);

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <h1>Timewise Finance</h1>
      <Spending />
      <NetWorth />
      <FutureMe />
      <News />
      <Notifications />
    </div>
  );
}

export default App;
