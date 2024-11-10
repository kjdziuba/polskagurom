// src/components/News.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Box,
} from "@mui/material";

function News() {
  const [newsSummary, setNewsSummary] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/news/")
      .then((response) => {
        setNewsSummary(response.data.summary);
      })
      .catch((error) => {
        console.error("Error fetching news summary:", error);
      });
  }, []);

  if (!newsSummary)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );

  // Split the summary into lines
  const newsItems = newsSummary
    .split("\n")
    .filter((item) => item.trim() !== "");

  return (
    <Card elevation={3} sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Financial News Summary
        </Typography>
        <List>
          {newsItems.map((item, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default News;
