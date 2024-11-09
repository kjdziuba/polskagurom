import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

function NetWorth() {
  const [netWorthData, setNetWorthData] = useState({});

  useEffect(() => {
    axios
      .get("/api/net-worth/")
      .then((response) => {
        setNetWorthData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the net worth data!", error);
      });
  }, []);

  const chartData = {
    labels: netWorthData.dates,
    datasets: [
      {
        label: "Net Worth",
        data: netWorthData.values,
        fill: false,
        backgroundColor: "blue",
        borderColor: "blue",
      },
    ],
  };

  return (
    <div>
      <h2>Net Worth</h2>
      <Line data={chartData} />
      {/* Additional UI components */}
    </div>
  );
}

export default NetWorth;
