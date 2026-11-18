import { useSelector } from "react-redux";

const Footer = () => {
  const profile = useSelector((state) => state.profile);
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="py-4"
      style={{
        backgroundColor: "var(--bg-main)",
        borderTop: "1px solid var(--border-subtle)",
        color: "var(--text-muted)"
      }}
    >
      <div className="container d-flex flex-column flex-sm-row justify-content-between align-items-center small px-3 px-md-4">
        <div>
          &copy; {currentYear} <strong className="text-white">{profile.name || "Vitthal Khemnar"}</strong>. Built with React.
        </div>
        <div className="mt-2 mt-sm-0" style={{ color: "var(--text-muted)" }}>
          <span>{profile.role || "Java Backend Developer"} &bull; {profile.location || "Pune, India"}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
