import React, { useState } from "react";
import "./Navbar.css";
import { useSelector } from "react-redux";

const Navbar = () => {
  const profile = useSelector((state) => state.profile);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <nav className="navbar navbar-light bg-light fixed-top shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold fs-4" href="#home">
            {profile.name}
          </a>

          <button
            className="btn btn-outline-dark d-lg-none"
            type="button"
            onClick={toggleSidebar}
          >
            <i className="bi bi-list" style={{ fontSize: "1.5rem" }}></i>
          </button>

          <ul className="navbar-nav d-none d-lg-flex flex-row ms-auto gap-3">
            <li className="nav-item">
              <a className="nav-link" href="#home">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#project">
                Portfolio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleSidebar}>
          &times;
        </button>
        <ul className="sidebar-nav">
          {["home", "about", "project", "contact"].map((sec) => (
            <li key={sec}>
              <a href={`#${sec}`} onClick={toggleSidebar}>
                {sec.charAt(0).toUpperCase() + sec.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Navbar;
