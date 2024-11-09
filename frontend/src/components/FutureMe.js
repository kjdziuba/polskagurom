// frontend/src/components/FutureMe.js

import React, { useState } from "react";
import axios from "axios";

function FutureMe() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = () => {
    axios
      .post("http://localhost:5000/api/future-me/", { message }) // Change to your backend API when DEPLOYING
      .then((res) => {
        setResponse(res.data.response);
      })
      .catch((error) => {
        console.error("Error communicating with Future Me:", error);
      });
  };

  return (
    <div>
      <h2>Future Me</h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask Future Me a question..."
        rows="4"
        cols="50"
      />
      <br />
      <button onClick={handleSend}>Send</button>
      {response && (
        <div>
          <h3>Future Me says:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default FutureMe;
