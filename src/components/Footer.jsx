import React from "react";

const Footer = () => {
  return (
    <footer
      className="d-flex flex-column flex-md-row justify-content-between align-items-center p-3"
      style={{ backgroundColor: "#000", color: "#fff" }}
    >
      {/* Left side: copyright text */}
      <div className="mb-2 mb-md-0 text-center text-md-start">
        &copy; 2025 Vitthal Khemnar. All rights reserved.
      </div>

      {/* Right side: social icons */}
      <div className="d-flex gap-3 justify-content-center">
        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/vitthal-khemnar"
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none"
        >
          <i
            className="bi bi-linkedin"
            style={{ fontSize: "1.2rem", color: "#fff" }}
          ></i>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/vitthalkhemnar"
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none"
        >
          <i
            className="bi bi-github"
            style={{ fontSize: "1.2rem", color: "#fff" }}
          ></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
