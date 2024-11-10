// frontend/src/components/Spending.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend,CategoryScale, LinearScale, BarElement } from "chart.js";
import moment from "moment";
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
  function mapCategoriesToColors(categories) {
    const categoryColorMap = {};
    categories.forEach((category, index) => {
      categoryColorMap[category] = COLOR_PALETTE[index];
    });
    return categoryColorMap;
  }


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
  console.log("Working Spending data:", spendingHistory);
  const allCategories = Array.from(new Set(spendingHistory.flatMap(entry => entry.categories)));
  const categoryColorMap = mapCategoriesToColors(allCategories);

  const data = {
    labels: spendingHistory.map(entry => entry.date),
    datasets: allCategories.map((category) => ({
      label: category,
      data: spendingHistory.map(entry => {
        const categoryIndex = entry.categories.indexOf(category);
        return categoryIndex !== -1 ? entry.amount[categoryIndex] : 0;
      }),
      backgroundColor: categoryColorMap[category],
      borderColor: categoryColorMap[category],
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

function DetailedSpending() {
  const [spendingData, setSpendingData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/specific_spending/")
      .then((response) => {
        setSpendingData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching spending data:", error);
      });
  }, []);

  if (!spendingData) return <div>Loading...</div>;


  const allMonths = Array.from(
    new Set((spendingData.map(entry => moment(entry.date).format('YYYY-MM'))))
);
const handleMonthChange = (e) => {
  setSelectedMonth(e.target.value);
};


const filterByYearMonth = (yearMonth) => {
  return spendingData.filter(record => record.date.startsWith(yearMonth));
};

const filteredSpendingData = filterByYearMonth(selectedMonth);
console.log('filteredSpendingData:', filteredSpendingData); // Debugging log



console.log('Spending data:', spendingData); // Debugging log

return (
  <div>
          <h2>Select a Month</h2>
          <select value={selectedMonth} onChange={handleMonthChange}>
              <option value="" disabled>Select an option</option>
              {allMonths.map((value, index) => (
                  <option key={index} value={value}>
                      {value}
                  </option>
              ))}
          </select>
          {selectedMonth && (
      <div>
        <h3>Spending Data for {selectedMonth}</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
          {filteredSpendingData.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.date}</td>
                  <td>{entry.title}</td>
                  <td>{entry.category}</td>
                  <td>{entry.amount}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);
}

export {Spending, SpendingHistogram, DetailedSpending};