// frontend/src/components/NetWorth.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Typography, Card, CardContent } from "@mui/material";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartJSTooltip,
  Legend as ChartJSLegend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import moment from "moment";
// Register necessary chart components
ChartJS.register(
  ArcElement,
  ChartJSTooltip,
  ChartJSLegend,
  CategoryScale,
  LinearScale,
  BarElement
);

const COLOR_PALETTE = [
  "#75d856",
  "#b04b38",
  "#f00099",
  "#55897f",
  "#e5e3de",
  "#d9c1a8",
  "#5f7580",
  "#8625b6",
  "#0662f4",
  "#d88c40",
  "#3ef81d",
  "#260137",
  "#3e8c26",
  "#8d6d1d",
  "#c2e3c2",
  "#18d915",
  "#ca31a8",
  "#98c76f",
  "#83aace",
  "#d8a1c5",
];

const NetWorth = () => {
  const [data, setData] = useState([]);
  const [actualNetWorth, setActualNetWorth] = useState([]);
  const [predictedNetWorth, setPredictedNetWorth] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/net-worth/")
      .then((response) => {
        const responseData = response.data;

        // Prepare data for actual and predicted net worth
        const actualNetWorthData = responseData.map((entry) => ({
          ...entry,
          predictedNetWorth: null, // Set predicted net worth to null
        }));

        const predictedNetWorthData = responseData.map((entry) => ({
          ...entry,
          NetWorth: null, // Set actual net worth to null
          "Net Worth": entry.status === "predicted" ? entry["Net Worth"] : null,
        }));

        setData(responseData);
        setActualNetWorth(actualNetWorthData);
        setPredictedNetWorth(predictedNetWorthData);
      })
      .catch((error) => {
        console.error("Error fetching net worth data:", error);
      });
  }, []);

  if (!data.length) return <div>Loading...</div>;

  return (
    <Card elevation={3} sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Net Worth Over Time
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />

            {/* Actual Net Worth Line */}
            <Line
              type="monotone"
              dataKey="Net Worth"
              stroke="#1976d2"
              strokeWidth={2}
              dot={false}
              name="Actual Net Worth"
              isAnimationActive={false}
            />

            {/* Predicted Net Worth Line */}
            <Line
              type="monotone"
              dataKey="Predicted Net Worth"
              stroke="#1976d2"
              strokeWidth={2}
              dot={false}
              strokeDasharray="5 5"
              name="Predicted Net Worth"
              isAnimationActive={false}
            />

            {/* Cash Line */}
            <Line
              type="monotone"
              dataKey="Cash"
              stroke="#4caf50"
              strokeWidth={2}
              dot={false}
              name="Cash"
              isAnimationActive={false}
            />

            {/* Savings Line */}
            <Line
              type="monotone"
              dataKey="Savings"
              stroke="#9c27b0"
              strokeWidth={2}
              dot={false}
              name="Savings"
              isAnimationActive={false}
            />

            {/* Investments Line */}
            <Line
              type="monotone"
              dataKey="Investments"
              stroke="#ff9800"
              strokeWidth={2}
              dot={false}
              name="Investments"
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

function PlotCurrentInvestments(){
  const [investmentData, setInvestmentData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/net-worth-investment/")
      .then((response) => {
        const responseData = response.data;
        setInvestmentData(responseData);
      })
      .catch((error) => {
        console.error("Error fetching investment data:", error);
      });
  }, []);
  if (!investmentData) return <div>Loading...</div>;
  
  console.log(investmentData);
  const data = {
    labels: investmentData.categories,
    datasets: [
      {
        data: investmentData.amounts,
        backgroundColor: COLOR_PALETTE,
      },
    ],
  };
  console.log(data);
  return (
    <div>
      <h2>Current Investments</h2>
      <Pie data={data} />
    </div>
  );
}


export {NetWorth, PlotCurrentInvestments};
