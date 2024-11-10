// src/pages/About.js
import React from 'react';
import Notifications from '../components/Notifications';

function NotificationsWeb() {
  return (
    <div className="container">
      <h1 className="text-center my-4">Notifications</h1>
      <div className="row">
        <div className="col-md-6">
          <Notifications />
        </div>
      </div>
    </div>
  );
}

export default NotificationsWeb;