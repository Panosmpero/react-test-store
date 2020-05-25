import React from "react";
import { Link } from "react-router-dom";

const Default = () => {
  return (
    <div className="default">
      <h1 className="text-title">
        404 <i className="fas fa-exclamation"></i>
      </h1>
      <h3>The Requested URL{window.location.pathname}</h3>
      <h3>Page Not Found...</h3>
      <Link to="/">Visit Products</Link>
    </div>
  );
};

export default Default;
