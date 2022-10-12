import React from "react";
import loader from "./../img/loading.gif";

const Loading = () => {
  return (
    <div className="loading-overlay">
      <img src={loader} alt="loading" />
    </div>
  );
};

export default Loading;
