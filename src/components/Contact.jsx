import { useSelector } from "react-redux";

const Contact = () => {
  const profile = useSelector((state) => state.profile);

  return (
    <div className="py-5 px-3">
      <div className="container py-3" style={{ maxWidth: "800px" }}>
        {/* Clean Section Header */}
        <div className="text-center mb-5">
          <h2 className="section-heading">Get In Touch</h2>
          <p className="section-desc">
            Feel free to reach out for career opportunities, consulting, or technical discussions.
          </p>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-12 col-md-4">
            <a
              href={`mailto:${profile.email || "vitthalkkhemnar@gmail.com"}`}
              className="text-decoration-none d-block h-100"
            >
              <div className="clean-card p-4 text-center h-100">
                <i className="bi bi-envelope text-primary fs-3 mb-2 d-block"></i>
                <h6 className="fw-bold mb-1 text-dark">Email</h6>
                <p className="small mb-0 text-break text-muted">
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
              className="text-decoration-none d-block h-100"
            >
              <div className="clean-card p-4 text-center h-100">
                <i className="bi bi-whatsapp text-primary fs-3 mb-2 d-block"></i>
                <h6 className="fw-bold mb-1 text-dark">WhatsApp</h6>
                <p className="small mb-0 text-muted">
                  +{profile.whatsappNo || "918767841958"}
                </p>
              </div>
            </a>
          </div>

          <div className="col-12 col-md-4">
            <div className="clean-card p-4 text-center h-100">
              <i className="bi bi-geo-alt text-primary fs-3 mb-2 d-block"></i>
              <h6 className="fw-bold mb-1 text-dark">Location</h6>
              <p className="small mb-0 text-muted">
                {profile.location || "Pune, India"}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex justify-content-center gap-3 pt-3">
          {profile.githubUrl && (
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-clean-secondary"
            >
              <i className="bi bi-github"></i> GitHub
            </a>
          )}
          {profile.linkedInUrl && (
            <a
              href={profile.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-clean-primary"
            >
              <i className="bi bi-linkedin"></i> LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;