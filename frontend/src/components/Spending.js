// frontend/src/components/Spending.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend,CategoryScale, LinearScale, BarElement } from "chart.js";

// Register necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const COLOR_PALETTE = [        '#75d856',
  '#b04b38',
  '#f00099',
  '#55897f',
  '#e5e3de',
  '#d9c1a8',
  '#5f7580',
  '#8625b6',
  '#0662f4',
  '#d88c40',
  '#3ef81d',
  '#260137',
  '#3e8c26',
  '#8d6d1d',
  '#c2e3c2',
  '#18d915',
  '#ca31a8',
  '#98c76f',
  '#83aace',
  '#d8a1c5'];

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
        backgroundColor: COLOR_PALETTE,
      },
    ],
  };

  return (
    <div>
      <h2>Spending Breakdown (Last Month)</h2>
      <Pie data={data} />
    </div>
  );
}

function SpendingHistogram() {
  const [spendingHistory, setSpendingHistory] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/spending_extended/')
      .then((response) => {
        setSpendingHistory(response.data);
      })
      .catch((error) => {
        console.error('Error fetching spending history:', error);
      });
  }, []);

  if (!spendingHistory) return <div>Loading...</div>;

  const categories = spendingHistory[0].categories;
  const data = {
    labels: spendingHistory.map(entry => entry.date),
    datasets: categories.map((category, index) => ({
      label: category,
      data: spendingHistory.map(entry => entry.amount[index]),
      backgroundColor: COLOR_PALETTE [index],
      borderColor: COLOR_PALETTE [index],
      borderWidth: 1,
    })),
  };

  const options = {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        beginAtZero: true,
        stacked: true,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div>
      <h2>Spending History</h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export {Spending, SpendingHistogram};