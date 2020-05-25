import React from "react";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-wrapper">
        <div className="footer-caption">
          <h5>Account</h5>
          <h5>Services</h5>
          <h5>Company</h5>
          <h5>Community</h5>
        </div>
        <div className="footer-grid">
          <div>
            <h6 href="#">My Account</h6>
            <h6>My Cart</h6>
            <h6>My Orders</h6>
            <h6>Shipping</h6>
          </div>
          <div>
            <h6>Stores</h6>
            <h6>After Sales</h6>
            <h6>B2B</h6>
            <h6>Tracking</h6>
          </div>
          <div>
            <h6>About Us</h6>
            <h6>Careers</h6>
            <h6>Investors</h6>
            <h6>GDPR</h6>
          </div>
          <div>
            <h6>Blog</h6>
            <h6>Forum</h6>
            <h6>FAQ</h6>
          </div>
        </div>
        <div className="info" id="info">
          <div>Panos Bero 2020 &copy; </div>
          <a
            href="https://github.com/Panosmpero"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span id="code">&lt;</span>
            <i className="fab fa-github"></i>
            <span id="code">&#47;&gt;</span>
          </a>
          <div className="social-wrapper">
            <div className="social">
              <i className="fab fa-facebook-f"></i>
            </div>
            <div className="social">
              <i className="fab fa-twitter"></i>
            </div>
            <div className="social">
              <i className="fab fa-instagram"></i>
            </div>
            <div className="social">
              <i className="fab fa-linkedin-in"></i>
            </div>
            <div className="social">
              <i className="fab fa-youtube"></i>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
