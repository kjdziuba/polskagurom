import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

function FutureMe() {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);

  const handleSend = async () => {
    if (message.trim() === "") return;

    // Immediately add the user's message to the conversation and clear the input
    setConversation((prevConversation) => [
      ...prevConversation,
      { user: message, bot: "" },
    ]);
    setMessage(""); // Clear the message input

    try {
      const response = await fetch("http://localhost:5000/api/future-me/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.body) throw new Error("Readable stream not supported");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let assistantReply = "";

      // Read stream chunks as they come
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        assistantReply += decoder.decode(value, { stream: true });

        setConversation((prevConversation) => {
          const newConversation = [...prevConversation];
          const lastIndex = newConversation.length - 1;
          newConversation[lastIndex].bot = assistantReply;
          return newConversation;
        });
      }

      reader.releaseLock();
    } catch (error) {
      console.error("Error communicating with Future Me:", error);
    }
  };

  return (
    <>
      <div className="chat-container">
        {conversation.map((chat, index) => (
          <div key={index} className="chat-message">
            <p>
              <strong>You:</strong> {chat.user}
            </p>
            <div>
              <strong>Future Me:</strong>
              <ReactMarkdown>{chat.bot}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
      <textarea
        className="form-control"
        rows="3"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask Future Me a question..."
      ></textarea>
      <button className="btn btn-primary mt-2" onClick={handleSend}>
        Send
      </button>
    </>
  );
}

export default FutureMe;
