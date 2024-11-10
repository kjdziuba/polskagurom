// src/components/News.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Grid,
} from "@mui/material";

function News() {
  const [newsData, setNewsData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/news/")
      .then((response) => {
        setNewsData(JSON.parse(response.data.summary));
        console.log(newsData);
      })
      .catch((error) => {
        console.error("Error fetching news summary:", error);
      });
  }, []);

  if (!newsData)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Personalized News Summary
      </Typography>
      <Grid container spacing={2}>
        {Object.entries(newsData).map(([symbol, content]) => (
          <Grid item xs={12} md={6} key={symbol}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h5">{symbol}</Typography>
                <Typography variant="subtitle1">Summary:</Typography>
                <Typography variant="body2">{content.summary}</Typography>
                <Typography variant="subtitle1">Impact:</Typography>
                <Typography variant="body2">{content.impact}</Typography>
                <Typography variant="subtitle1">Advice:</Typography>
                <Typography variant="body2">{content.advice}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default News;
