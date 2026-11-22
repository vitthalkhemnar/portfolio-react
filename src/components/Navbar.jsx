import { useState } from "react";
import "./Navbar.css";
import { useSelector } from "react-redux";
import analyticsService from "../services/analyticsService";

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

            <div className="d-flex align-items-center ms-2">
              <a
                href={profile.resumeUrl || "/Vitthal Khemnar - Resume.pdf"}
                download="Vitthal_Khemnar_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-nav-resume d-flex align-items-center gap-1"
                onClick={() => analyticsService.logResumeDownload("navbar_desktop")}
                title="Download Resume PDF"
              >
                <i className="bi bi-download"></i> Resume
              </a>
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

        <div className="pt-3 border-top mt-auto" style={{ borderColor: "var(--border-subtle)" }}>
          <a
            href={profile.resumeUrl || "/Vitthal Khemnar - Resume.pdf"}
            download="Vitthal_Khemnar_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-clean-secondary rounded-pill py-2 text-center w-100 justify-content-center d-flex align-items-center gap-2"
            onClick={() => {
              toggleSidebar();
              analyticsService.logResumeDownload("navbar_mobile");
            }}
            title="Download Resume PDF"
          >
            <i className="bi bi-download"></i> Download Resume
          </a>
        </div>
      </div>

      {sidebarOpen && <div className="mobile-overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Navbar;
