// frontend/src/components/Spending.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend,CategoryScale, LinearScale, BarElement } from "chart.js";

// Register necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

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

  const categories = ['Rent', 'Food', 'Utilities', 'Entertainment'];
  const data = {
    labels: spendingHistory.map(entry => entry.date),
    datasets: categories.map((category, index) => ({
      label: category,
      data: spendingHistory.map(entry => entry.amount[index]),
      backgroundColor: [
        '#FF6384', // Rent
        '#36A2EB', // Food
        '#FFCE56', // Utilities
        '#4BC0C0', // Entertainment
      ][index],
      borderColor: [
        '#FF6384', // Rent
        '#36A2EB', // Food
        '#FFCE56', // Utilities
        '#4BC0C0', // Entertainment
      ][index],
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