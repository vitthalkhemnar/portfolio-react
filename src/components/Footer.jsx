import { useSelector } from "react-redux";

const Footer = () => {
  const profile = useSelector((state) => state.profile);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white pt-5 pb-4 px-3 border-top border-secondary">
      <div className="container" style={{ maxWidth: "1100px" }}>
        <div className="row g-4 align-items-center justify-content-between mb-4">
          <div className="col-12 col-md-6 text-center text-md-start">
            <h5 className="fw-bold mb-1 text-white">
              {profile.name || "Vitthal Khemnar"}
            </h5>
            <p className="text-secondary small mb-0">
              {profile.role || "Java Backend Developer"} &bull; Spring Boot, Microservices & APIs
            </p>
          </div>

          <div className="col-12 col-md-6 text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              {profile.linkedInUrl && (
                <a
                  href={profile.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline-light rounded-circle p-2"
                  style={{ width: "38px", height: "38px" }}
                  aria-label="LinkedIn"
                >
                  <i className="bi bi-linkedin"></i>
                </a>
              )}
              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline-light rounded-circle p-2"
                  style={{ width: "38px", height: "38px" }}
                  aria-label="GitHub"
                >
                  <i className="bi bi-github"></i>
                </a>
              )}
              <a
                href={`mailto:${profile.email || "vitthalkkhemnar@gmail.com"}`}
                className="btn btn-sm btn-outline-light rounded-circle p-2"
                style={{ width: "38px", height: "38px" }}
                aria-label="Email"
              >
                <i className="bi bi-envelope-fill"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-3 border-top border-secondary d-flex flex-column flex-md-row justify-content-between align-items-center text-secondary small">
          <div>
            &copy; {currentYear} <span className="text-white">{profile.name || "Vitthal Khemnar"}</span>. All rights reserved.
          </div>
          <div className="mt-2 mt-md-0 font-mono">
            <span>Powered by </span>
            <span className="text-warning">Java & Spring</span>
            <span> mindset &bull; </span>
            <span className="text-info">Serverless Static</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
