// src/components/Notifications.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/notifications/")
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });
  }, []);

  const handleBuyStock = (symbol) => {
    // Implement the action to buy the stock
    alert(`Initiating purchase of ${symbol} stock.`);
  };

  if (!notifications.length) return <div>Loading...</div>;

  return (
    <Card elevation={3} sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Notifications
        </Typography>
        <List>
          {notifications.map((notification, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemText
                primary={notification.message}
                secondary={new Date(notification.timestamp).toLocaleString()}
              />
              {notification.significant && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleBuyStock(notification.symbol)}
                >
                  Buy {notification.symbol}
                </Button>
              )}
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default Notifications;
