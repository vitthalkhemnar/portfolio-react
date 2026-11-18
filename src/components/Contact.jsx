import { useSelector } from "react-redux";

const Contact = () => {
  const profile = useSelector((state) => state.profile);

  return (
    <div className="py-5 px-3">
      <div className="container py-4" style={{ maxWidth: "800px" }}>
        <div className="text-center mb-5">
          <span className="section-badge">Contact</span>
          <h2 className="section-heading">Get In Touch</h2>
          <p className="section-desc">
            Feel free to reach out for career opportunities, consulting, or technical discussions.
          </p>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-12 col-md-4">
            <a
              href={`mailto:${profile.email || "vitthalkkhemnar@gmail.com"}`}
              className="text-decoration-none text-dark d-block h-100"
            >
              <div className="clean-card p-4 text-center h-100">
                <i className="bi bi-envelope text-primary fs-3 mb-2 d-block"></i>
                <h6 className="fw-bold mb-1">Email</h6>
                <p className="text-secondary small mb-0 text-break">
                  {profile.email || "vitthalkkhemnar@gmail.com"}
                </p>
              </div>
            </a>
          </div>

          <div className="col-12 col-md-4">
            <a
              href={`https://wa.me/${profile.whatsappNo || "918767841958"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-dark d-block h-100"
            >
              <div className="clean-card p-4 text-center h-100">
                <i className="bi bi-whatsapp text-success fs-3 mb-2 d-block"></i>
                <h6 className="fw-bold mb-1">WhatsApp</h6>
                <p className="text-secondary small mb-0">
                  +{profile.whatsappNo || "918767841958"}
                </p>
              </div>
            </a>
          </div>

          <div className="col-12 col-md-4">
            <div className="clean-card p-4 text-center h-100">
              <i className="bi bi-geo-alt text-danger fs-3 mb-2 d-block"></i>
              <h6 className="fw-bold mb-1">Location</h6>
              <p className="text-secondary small mb-0">
                {profile.location || "Pune, India"}
              </p>
            </div>
          </div>
        </div>

        {/* Clean social buttons */}
        <div className="d-flex justify-content-center gap-3 pt-3">
          {profile.githubUrl && (
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-outline-dark rounded-pill px-4 py-2"
            >
              <i className="bi bi-github me-1"></i> GitHub
            </a>
          )}
          {profile.linkedInUrl && (
            <a
              href={profile.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-outline-primary rounded-pill px-4 py-2"
            >
              <i className="bi bi-linkedin me-1"></i> LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;