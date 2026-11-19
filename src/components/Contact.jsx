import { useSelector } from "react-redux";

const Contact = () => {
  const profile = useSelector((state) => state.profile);

  const email = profile.email || "";
  const whatsappNo = profile.whatsappNo || "";
  const cleanWhatsApp = whatsappNo ? whatsappNo.replace(/[^0-9]/g, "") : "";
  const location = profile.location || "";
  const githubUrl = profile.githubUrl || "";
  const linkedInUrl = profile.linkedInUrl || "";

  return (
    <div className="py-5 px-3">
      <div className="container py-3" style={{ maxWidth: "860px" }}>
        {/* Unified Section Header */}
        <div className="text-center mb-5">
          <span className="section-eyebrow">{"// 05. CONTACT"}</span>
          <h2 className="section-heading">Get In Touch</h2>
          <p className="section-desc">
            Open for career opportunities, engineering consultations, or technical discussions.
          </p>
        </div>

        <div className="row g-4 mb-4 justify-content-center">
          {email && (
            <div className="col-12 col-sm-6 col-md-4">
              <a
                href={`mailto:${email}`}
                className="text-decoration-none d-block h-100"
              >
                <div className="clean-card p-4 text-center h-100">
                  <i className="bi bi-envelope fs-3 mb-2 d-block" style={{ color: "var(--primary)" }}></i>
                  <h6 className="fw-bold mb-1 text-white">Email</h6>
                  <p className="small mb-0 text-break" style={{ color: "var(--text-body)" }}>
                    {email}
                  </p>
                </div>
              </a>
            </div>
          )}

          {cleanWhatsApp && (
            <div className="col-12 col-sm-6 col-md-4">
              <a
                href={`https://wa.me/${cleanWhatsApp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none d-block h-100"
              >
                <div className="clean-card p-4 text-center h-100">
                  <i className="bi bi-whatsapp fs-3 mb-2 d-block" style={{ color: "var(--primary)" }}></i>
                  <h6 className="fw-bold mb-1 text-white">WhatsApp</h6>
                  <p className="small mb-0" style={{ color: "var(--text-body)" }}>
                    +{cleanWhatsApp}
                  </p>
                </div>
              </a>
            </div>
          )}

          {location && (
            <div className="col-12 col-sm-6 col-md-4">
              <div className="clean-card p-4 text-center h-100">
                <i className="bi bi-geo-alt fs-3 mb-2 d-block" style={{ color: "var(--primary)" }}></i>
                <h6 className="fw-bold mb-1 text-white">Location</h6>
                <p className="small mb-0" style={{ color: "var(--text-body)" }}>
                  {location}
                </p>
              </div>
            </div>
          )}

          {!email && !cleanWhatsApp && !location && (
            <div className="col-12 text-center text-muted py-4">
              <p className="mb-0">Contact details can be added through the admin dashboard.</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {(githubUrl || linkedInUrl) && (
          <div className="d-flex flex-wrap justify-content-center gap-3 pt-3">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-clean-secondary"
              >
                <i className="bi bi-github"></i> GitHub
              </a>
            )}
            {linkedInUrl && (
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-clean-primary"
              >
                <i className="bi bi-linkedin"></i> LinkedIn
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;