// src/pages/SpendingWeb.js
import React from "react";
import { Chart, CategoryScale, LinearScale } from "chart.js";
import {Spending, SpendingHistogram, DetailedSpending} from "../components/Spending";


function SpendingWeb() {
  return (
    <div className="container">
    <h1 className="text-center my-4">Spending Breakdown</h1>
    <div className="row">
      <div className="col-md-6">
        <Spending />
      </div>
      <div className="col-md-6">
        <SpendingHistogram />
        </div>
    </div>
    <div className="row">
      <div className="col">
        <DetailedSpending />
      </div>
      </div>
  </div>
  );
}

export default SpendingWeb;