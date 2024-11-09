// frontend/src/App.js

import React from "react";
import { Chart, CategoryScale, LinearScale } from "chart.js";
import NetWorth from "./components/NetWorth";
import FutureMe from "./components/FutureMe";

Chart.register(CategoryScale, LinearScale);

function App() {
  return (
    <div className="App">
      <h1>Timewise Finance</h1>
      <NetWorth />
      <FutureMe />
    </div>
  );
}

export default App;
