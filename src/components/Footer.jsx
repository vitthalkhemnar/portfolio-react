import { useSelector } from "react-redux";

const Footer = () => {
  const profile = useSelector((state) => state.profile);
  const currentYear = new Date().getFullYear();
  const name = profile.name || "";
  const role = profile.role || "";
  const location = profile.location || "";

  return (
    <footer
      className="py-4"
      style={{
        backgroundColor: "var(--bg-card)",
        borderTop: "1px solid var(--border-subtle)",
        color: "var(--text-muted)"
      }}
    >
      <div className="container d-flex flex-column flex-sm-row justify-content-between align-items-center small px-3 px-md-4">
        <div>
          &copy; {currentYear} {name && <strong className="text-dark">{name}. </strong>}All rights reserved.
        </div>
        {(role || location) && (
          <div className="mt-2 mt-sm-0 text-muted">
            <span>
              {role && location ? `${role} • ${location}` : role || location}
            </span>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
