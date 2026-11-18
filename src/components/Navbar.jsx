import { useState } from "react";
import "./Navbar.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const profile = useSelector((state) => state.profile);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#project" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav className="navbar navbar-light bg-light fixed-top shadow-sm">
        <div className="container-fluid px-3 px-md-4">
          <a
            className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2"
            href="#home"
          >
            <img src="/v-logo2.png" alt="v-logo" style={{ width: "32px", height: "32px" }} />
            <span>{profile.name || "Vitthal Khemnar"}</span>
          </a>

          <div className="d-flex align-items-center gap-2">
            {/* Desktop Navigation */}
            <ul className="navbar-nav d-none d-lg-flex flex-row align-items-center ms-auto gap-4">
              {navLinks.map((link) => (
                <li className="nav-item" key={link.href}>
                  <a className="nav-link fw-semibold" href={link.href}>
                    {link.name}
                  </a>
                </li>
              ))}
              <li className="nav-item ms-2">
                <Link
                  to="/admin"
                  className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1 rounded-pill px-3"
                  title="Admin Dashboard"
                >
                  <i className="bi bi-shield-lock"></i> Admin
                </Link>
              </li>
            </ul>

            {/* Mobile Hamburger Toggle */}
            <button
              className="btn btn-outline-dark d-lg-none border-0"
              type="button"
              onClick={toggleSidebar}
              aria-label="Toggle Navigation"
            >
              <i className="bi bi-list" style={{ fontSize: "1.6rem" }}></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleSidebar} aria-label="Close menu">
          &times;
        </button>
        <ul className="sidebar-nav">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={toggleSidebar}>
                {link.name}
              </a>
            </li>
          ))}
          <li className="pt-3 border-top">
            <Link
              to="/admin"
              onClick={toggleSidebar}
              className="text-primary fw-bold d-flex align-items-center gap-2"
            >
              <i className="bi bi-shield-lock"></i> Admin Panel
            </Link>
          </li>
        </ul>
      </div>

      {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Navbar;
