// frontend/src/App.js

import React from "react";
import { Chart, CategoryScale, LinearScale } from "chart.js";
import NetWorth from "./components/NetWorth";
import FutureMe from "./components/FutureMe";
import Spending from "./components/Spending";
import News from "./components/News";

Chart.register(CategoryScale, LinearScale);

function App() {
  return (
    <div className="App">
      <h1>Timewise Finance</h1>
      <Spending />
      <NetWorth />
      <FutureMe />
      <News />
    </div>
  );
}

export default App;
