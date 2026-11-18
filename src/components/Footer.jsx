import { useSelector } from "react-redux";

const Footer = () => {
  const profile = useSelector((state) => state.profile);
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="d-flex flex-column flex-md-row justify-content-between align-items-center px-4 py-3"
      style={{ backgroundColor: "#111", color: "#fff" }}
    >
      {/* Left side: copyright text */}
      <div className="mb-2 mb-md-0 text-center text-md-start small text-secondary">
        &copy; {currentYear} <strong className="text-white">{profile.name || "Vitthal Khemnar"}</strong>. All rights reserved.
      </div>

      {/* Right side: social icons */}
      <div className="d-flex gap-3 justify-content-center">
        {profile.linkedInUrl && (
          <a
            href={profile.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none text-light"
            aria-label="LinkedIn"
          >
            <i className="bi bi-linkedin" style={{ fontSize: "1.2rem" }}></i>
          </a>
        )}

        {profile.githubUrl && (
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none text-light"
            aria-label="GitHub"
          >
            <i className="bi bi-github" style={{ fontSize: "1.2rem" }}></i>
          </a>
        )}
      </div>
    </footer>
  );
};

export default Footer;
