// frontend/src/components/News.js

import React, { useEffect, useState } from "react";
import axios from "axios";

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

  return (
    <div>
      <h2>Financial News Summary</h2>
      <p>{newsSummary || "Loading..."}</p>
    </div>
  );
}

export default News;
