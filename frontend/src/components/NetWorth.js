import React, { useEffect, useRef } from "react";
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import axios from "axios";

Chart.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const NetWorth = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Destroy the existing chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }

    axios
      .get("/api/net-worth/")
      .then((response) => {
        const netWorthData = response.data;

        chartInstanceRef.current = new Chart(ctx, {
          type: "line",
          data: {
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
          },
          options: {
            scales: {
              x: {
                type: "category",
              },
              y: {
                type: "linear",
              },
            },
          },
        });
      })
      .catch((error) => {
        console.error("There was an error fetching the net worth data!", error);
      });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef}></canvas>;
};

export default NetWorth;
