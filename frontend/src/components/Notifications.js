// frontend/src/components/Notifications.js

import React, { useEffect, useState } from "react";
import axios from "axios";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/notifications/")
      .then((response) => {
        setNotifications(response.data.notifications);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.length > 0 ? (
          notifications.map((note, index) => <li key={index}>{note}</li>)
        ) : (
          <li>Loading...</li>
        )}
      </ul>
    </div>
  );
}

export default Notifications;
