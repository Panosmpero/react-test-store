import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Splash = () => {
  useEffect(() => {
    document.getElementById("banner").className = "banner";
    Object.assign(document.getElementById("main-header").style, {
      width: "100%",
      opacity: "1",
    });
  }, []);
  return (
    <>
      <div id="banner">
        <div id="main-header">
          <h1 className="header-title">Mobile Phone Company</h1>
          <div className="header-text">The Best Mobiles</div>
        </div>
        <div className="splash-button">
          <Link to="/products" className="link-style">
            Visit Our Products <i className="fas fa-chevron-right"></i>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Splash;
