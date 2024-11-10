import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";

function FutureMe() {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (defaultMessage) => {
    const msg = defaultMessage || message;
    if (msg.trim() === "") return;

    // Immediately add the user's message to the conversation and clear the input
    if (!msg.toLowerCase().includes("this is from the user")) {
      setConversation((prevConversation) => [
        ...prevConversation,
        { user: msg, bot: "" },
      ]);
    } else {
      setConversation((prevConversation) => [
        ...prevConversation,
        { user: "", bot: "" },
      ]);
    }
    setMessage(""); // Clear the message input
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/future-me/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: msg }),
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!window.futureMeInitialized) {
      handleSend(
        "This is from the user, explain who you are, summarize the current financial situation and how better it is in the future. explain what you can assist with"
      );
      window.futureMeInitialized = true;
    }
  }, []);

  return (
    <Box>
      <Paper elevation={3} sx={{ padding: 2, mb: 2 }}>
        <Typography variant="h5" gutterBottom>
          Future Me Assistant
        </Typography>
        <Box
          sx={{
            maxHeight: "400px",
            overflowY: "auto",
            mb: 2,
            padding: 1,
            backgroundColor: "#fafafa",
          }}
        >
          {conversation.map((chat, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="body1" color="textPrimary">
                <strong>You:</strong> {chat.user}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>Future Me:</strong>{" "}
                <ReactMarkdown>{chat.bot}</ReactMarkdown>
              </Typography>
            </Box>
          ))}
        </Box>
        <TextField
          fullWidth
          multiline
          minRows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask Future Me a question..."
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSend()}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Send"}
        </Button>
      </Paper>
    </Box>
  );
}

export default FutureMe;
