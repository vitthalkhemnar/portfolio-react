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
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#project" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top shadow-sm custom-navbar">
        <div className="container px-3 px-md-4">
          {/* Brand */}
          <a
            className="navbar-brand fw-bold d-flex align-items-center gap-2"
            href="#home"
          >
            <div className="logo-badge">
              <span className="font-mono fw-bold">VK</span>
            </div>
            <div>
              <span className="brand-name">{profile.name || "Vitthal Khemnar"}</span>
              <span className="d-none d-sm-block brand-sub">Java Backend Engineer</span>
            </div>
          </a>

          {/* Right Actions */}
          <div className="d-flex align-items-center gap-3">
            {/* Desktop Navigation Links */}
            <ul className="navbar-nav d-none d-lg-flex flex-row align-items-center gap-3 ms-auto mb-0">
              {navLinks.map((link) => (
                <li className="nav-item" key={link.href}>
                  <a className="nav-link custom-nav-link" href={link.href}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Quick Resume Link & Admin Link */}
            <div className="d-none d-md-flex align-items-center gap-2">
              <a
                href={profile.resumeUrl || "/Vitthal Khemnar - Resume.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-dark rounded-pill px-3 fw-semibold"
              >
                <i className="bi bi-file-earmark-pdf me-1 text-danger"></i> Resume
              </a>
              <Link
                to="/admin"
                className="btn btn-sm btn-primary rounded-pill px-3 fw-semibold"
                title="Admin Dashboard"
              >
                <i className="bi bi-shield-lock me-1"></i> Admin
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              className="btn btn-light d-lg-none rounded-circle p-2 shadow-sm border"
              type="button"
              onClick={toggleSidebar}
              aria-label="Toggle Navigation"
            >
              <i className="bi bi-list fs-5"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="d-flex justify-content-between align-items-center pb-3 border-bottom mb-3">
          <div className="d-flex align-items-center gap-2">
            <div className="logo-badge">
              <span className="font-mono fw-bold">VK</span>
            </div>
            <span className="fw-bold fs-6">{profile.name || "Vitthal Khemnar"}</span>
          </div>
          <button className="btn btn-close" onClick={toggleSidebar} aria-label="Close menu"></button>
        </div>

        <ul className="sidebar-nav">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={toggleSidebar} className="sidebar-link">
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="pt-4 border-top mt-auto d-flex flex-column gap-2">
          <a
            href={profile.resumeUrl || "/Vitthal Khemnar - Resume.pdf"}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-dark w-100 rounded-pill py-2"
            onClick={toggleSidebar}
          >
            <i className="bi bi-file-earmark-pdf me-1 text-danger"></i> View Resume
          </a>
          <Link
            to="/admin"
            onClick={toggleSidebar}
            className="btn btn-primary w-100 rounded-pill py-2"
          >
            <i className="bi bi-shield-lock me-1"></i> Admin Panel
          </Link>
        </div>
      </div>

      {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Navbar;
