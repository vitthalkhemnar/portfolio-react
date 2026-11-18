import { useSelector } from "react-redux";

const Experience = () => {
  const companies = useSelector((state) => state.profile.companies) || [];

  return (
    <div
      className="d-flex align-items-center justify-content-center px-3"
      style={{
        minHeight: "70vh",
        paddingTop: "60px",
        paddingBottom: "60px",
      }}
    >
      <div className="container" style={{ maxWidth: "1000px" }}>
        {/* Section Heading */}
        <div className="fw-bold fs-6 mb-4 text-center text-md-start">
          <p className="role text-primary m-0 text-uppercase">Experience & Companies</p>
        </div>

        {companies.length === 0 ? (
          <div className="text-center text-muted py-5">
            <i className="bi bi-briefcase fs-1 d-block mb-2"></i>
            <p>No company experience listed yet. Add entries via the Admin Panel.</p>
          </div>
        ) : (
          <div className="d-flex flex-column gap-4">
            {companies.map((item) => (
              <div
                key={item.id}
                className="card border-0 shadow-sm p-4 hover-card"
                style={{
                  borderRadius: "16px",
                  transition: "all 0.3s ease",
                  borderLeft: "5px solid #0d6efd"
                }}
              >
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
                  <div>
                    <h5 className="fw-bold mb-1 text-dark">
                      {item.role}{" "}
                      <span className="text-primary fw-semibold">@ {item.company}</span>
                    </h5>
                    {item.location && (
                      <span className="text-muted small">
                        <i className="bi bi-geo-alt me-1"></i>
                        {item.location}
                      </span>
                    )}
                  </div>
                  <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill mt-2 mt-md-0 fw-semibold">
                    {item.duration}
                  </span>
                </div>

                <p className="text-secondary mb-3" style={{ lineHeight: "1.7" }}>
                  {item.description}
                </p>

                {item.technologies && item.technologies.length > 0 && (
                  <div className="d-flex flex-wrap gap-2 pt-2">
                    {item.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="badge bg-light text-dark border px-2 py-1 small rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Experience;
