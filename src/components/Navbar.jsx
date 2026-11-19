import { useState } from "react";
import "./Navbar.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const profile = useSelector((state) => state.profile);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#project" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav className="minimal-navbar fixed-top">
        <div className="container d-flex align-items-center justify-content-between px-3 px-md-4">
          {/* Brand */}
          <a className="brand-link d-flex align-items-center gap-2" href="#home">
            <span className="brand-dot"></span>
            <span className="brand-title">{profile.name || "Portfolio"}</span>
          </a>

          {/* Desktop Nav */}
          <div className="d-none d-md-flex align-items-center gap-4">
            <ul className="navbar-nav flex-row gap-4 mb-0">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a className="nav-item-link" href={link.href}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="d-flex align-items-center gap-2 ms-2">
              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-nav-resume"
                >
                  Resume
                </a>
              )}
              <Link
                to="/admin"
                className="btn-nav-admin"
                title="Admin Dashboard"
              >
                <i className="bi bi-shield-lock"></i>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="btn-mobile-menu d-md-none"
            onClick={toggleSidebar}
            aria-label="Toggle navigation"
          >
            <i className="bi bi-list fs-4"></i>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${sidebarOpen ? "open" : ""}`}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <span className="fw-semibold">{profile.name || "Portfolio"}</span>
          <button
            className="btn-close btn-close-white"
            onClick={toggleSidebar}
            aria-label="Close"
          ></button>
        </div>

        <ul className="list-unstyled d-flex flex-column gap-3 mb-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={toggleSidebar}
                className="mobile-nav-link"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="pt-3 border-top mt-auto d-flex flex-column gap-2" style={{ borderColor: "var(--border-subtle)" }}>
          {profile.resumeUrl && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-clean-secondary rounded-pill py-2 text-center"
              onClick={toggleSidebar}
            >
              View Resume
            </a>
          )}
          <Link
            to="/admin"
            className="btn-clean-primary rounded-pill py-2 text-center fw-semibold justify-content-center"
            onClick={toggleSidebar}
          >
            Admin Panel
          </Link>
        </div>
      </div>

      {sidebarOpen && <div className="mobile-overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Navbar;
