import { useSelector } from "react-redux";

const Contact = () => {
  const profile = useSelector((state) => state.profile);

  return (
    <div className="py-5 px-3">
      <div className="container py-4" style={{ maxWidth: "1000px" }}>
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="section-tag mb-2">Initiate Contact</span>
          <h2 className="section-title fs-2 mt-2">Let's Connect & Collaborate</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
            Currently open to Java Backend Developer opportunities, full-time engineering roles, and innovative system design collaborations.
          </p>
        </div>

        {/* Contact Cards Row */}
        <div className="row g-4 justify-content-center">
          {/* Email */}
          <div className="col-12 col-sm-6 col-md-4">
            <a
              href={`mailto:${profile.email || "vitthalkkhemnar@gmail.com"}`}
              className="text-decoration-none text-dark d-block h-100"
            >
              <div className="card h-100 p-4 border-0 shadow-sm rounded-4 text-center hover-card bg-white">
                <div className="fs-1 mb-2 text-danger">
                  <i className="bi bi-envelope-check-fill"></i>
                </div>
                <h6 className="fw-bold mb-1">Email Directly</h6>
                <p className="text-secondary small mb-2 text-break">
                  {profile.email || "vitthalkkhemnar@gmail.com"}
                </p>
                <span className="small text-primary fw-semibold mt-auto">
                  Send Message <i className="bi bi-arrow-right-short"></i>
                </span>
              </div>
            </a>
          </div>

          {/* WhatsApp / Phone */}
          <div className="col-12 col-sm-6 col-md-4">
            <a
              href={`https://wa.me/${profile.whatsappNo || "918767841958"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-dark d-block h-100"
            >
              <div className="card h-100 p-4 border-0 shadow-sm rounded-4 text-center hover-card bg-white">
                <div className="fs-1 mb-2 text-success">
                  <i className="bi bi-whatsapp"></i>
                </div>
                <h6 className="fw-bold mb-1">WhatsApp / Call</h6>
                <p className="text-secondary small mb-2">
                  +{profile.whatsappNo || "918767841958"}
                </p>
                <span className="small text-success fw-semibold mt-auto">
                  Instant Chat <i className="bi bi-arrow-right-short"></i>
                </span>
              </div>
            </a>
          </div>

          {/* Location */}
          <div className="col-12 col-sm-6 col-md-4">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                profile.location || "Pune, India"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-dark d-block h-100"
            >
              <div className="card h-100 p-4 border-0 shadow-sm rounded-4 text-center hover-card bg-white">
                <div className="fs-1 mb-2 text-primary">
                  <i className="bi bi-geo-alt-fill"></i>
                </div>
                <h6 className="fw-bold mb-1">Location</h6>
                <p className="text-secondary small mb-2">
                  {profile.location || "Pune, India"}
                </p>
                <span className="small text-muted fw-semibold mt-auto">
                  View Map <i className="bi bi-arrow-right-short"></i>
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Quick Social Connect Banner */}
        <div className="mt-5 p-4 rounded-4 bg-white border shadow-sm text-center">
          <h6 className="fw-bold text-dark mb-3">Connect on Professional Networks</h6>
          <div className="d-flex justify-content-center gap-3">
            {profile.linkedInUrl && (
              <a
                href={profile.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary rounded-pill px-4 fw-semibold d-flex align-items-center gap-2"
              >
                <i className="bi bi-linkedin"></i> LinkedIn
              </a>
            )}
            {profile.githubUrl && (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-dark rounded-pill px-4 fw-semibold d-flex align-items-center gap-2"
              >
                <i className="bi bi-github"></i> GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;