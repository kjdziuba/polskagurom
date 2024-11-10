// frontend/src/components/Notifications.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
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
    // You can navigate to a purchase page or open a dialog here
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Notifications
      </Typography>
      <List>
        {notifications.map((notification, index) => (
          <ListItem key={index} sx={{ display: "flex", alignItems: "center" }}>
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
    </div>
  );
};

export default Notifications;
