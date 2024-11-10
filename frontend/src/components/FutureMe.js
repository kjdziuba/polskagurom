// frontend/src/components/FutureMe.js

import React, { useState } from "react";
import axios from "axios";

function FutureMe() {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);

  const handleSend = () => {
    if (message.trim() === "") return;

    axios
      .post("http://localhost:5000/api/future-me/", { message })
      .then((res) => {
        const reply = res.data.response;
        setConversation([...conversation, { user: message, bot: reply }]);
        setMessage("");
      })
      .catch((error) => {
        console.error("Error communicating with Future Me:", error);
      });
  };

  return (
    <>
      <div className="chat-container">
        {conversation.map((chat, index) => (
          <div key={index} className="chat-message">
            <p>
              <strong>You:</strong> {chat.user}
            </p>
            <p>
              <strong>Future Me:</strong> {chat.bot}
            </p>
          </div>
        ))}
      </div>
      <textarea
        className="form-control"
        rows="3"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask Future Me a question...3"
      ></textarea>
      <button className="btn btn-primary mt-2" onClick={handleSend}>
        Send
      </button>
    </>
  );
}

export default FutureMe;
