import { useSelector } from "react-redux";

const Footer = () => {
  const profile = useSelector((state) => state.profile);

  return (
    <footer
      className="d-flex flex-column flex-md-row justify-content-between align-items-center p-3"
      style={{ backgroundColor: "#000", color: "#fff" }}
    >
      {/* Left side: copyright text */}
      <div className="mb-2 mb-md-0 text-center text-md-start">
        &copy; 2025 {profile.name}. All rights reserved.
      </div>

      {/* Right side: social icons */}
      <div className="d-flex gap-3 justify-content-center">
        {/* LinkedIn */}
        <a
          href={profile.linkedInUrl}
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
          href={profile.githubUrl}
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
