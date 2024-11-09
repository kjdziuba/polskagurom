// frontend/src/components/NetWorth.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary chart components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

function NetWorth() {
  const [netWorthData, setNetWorthData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/net-worth/")
      .then((response) => {
        setNetWorthData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching net worth data:", error);
      });
  }, []);

  if (!netWorthData) return <div>Loading...</div>;

  const data = {
    labels: netWorthData.dates,
    datasets: [
      {
        label: "Net Worth",
        data: netWorthData.values,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category",
      },
      y: {
        type: "linear",
      },
    },
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title">Net Worth Over Time</h2>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default NetWorth;
