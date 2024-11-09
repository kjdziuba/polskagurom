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
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title">Financial News Summary</h2>
        <p>{newsSummary}</p>
      </div>
    </div>
  );
}

export default News;
