import React from "react";
import News from "../components/News";

function NewsWeb() {
  return (
    <div className="container">
      <h1 className="text-center my-4">News</h1>
      <div className="row">
        <div className="col-md-6">
          <News />
        </div>
      </div>
    </div>
  );
}

export default NewsWeb;
