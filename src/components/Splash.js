import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Splash = () => {

  // change css on load
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
        <Link to="/products" className="link-style">
          <div className="splash-button">
            Visit Our Products <i className="fas fa-chevron-right"></i>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Splash;
