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
} from "recharts";
import { Typography, Card, CardContent } from "@mui/material";

const NetWorth = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/net-worth/")
      .then((response) => {
        const netWorthData = response.data.dates.map((date, index) => ({
          date,
          value: response.data.values[index],
        }));
        setData(netWorthData);
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
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#1976d2"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default NetWorth;
