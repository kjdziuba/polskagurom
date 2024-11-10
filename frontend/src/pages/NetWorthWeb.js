import React from "react";
import {NetWorth, PlotCurrentInvestments} from "../components/NetWorth";

function NetWorthWeb() {
  return (
    <div className="container">
      <h1 className="text-center my-4">Net Worth</h1>
      <div className="row">
        <div className="col-md-6">
          <NetWorth />
        </div>
        <div className="col-md-6">
          <PlotCurrentInvestments/>
      </div>
    </div>
  </div>
  );
}

export default NetWorthWeb;
