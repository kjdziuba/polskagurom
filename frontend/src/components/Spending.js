// frontend/src/components/Spending.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend);

function Spending() {
  const [spendingData, setSpendingData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/spending/")
      .then((response) => {
        setSpendingData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching spending data:", error);
      });
  }, []);

  if (!spendingData) return <div>Loading...</div>;

  const data = {
    labels: spendingData.categories,
    datasets: [
      {
        data: spendingData.amounts,
        backgroundColor: [
          "#FF6384", // Rent
          "#36A2EB", // Food
          "#FFCE56", // Utilities
          "#4BC0C0", // Entertainment
        ],
      },
    ],
  };

  return (
    <div>
      <h2>Spending Breakdown</h2>
      <Pie data={data} />
    </div>
  );
}

export default Spending;
