import { useSelector } from "react-redux";

const Experience = () => {
  const companies = useSelector((state) => state.profile.companies) || [];

  return (
    <div className="py-5 px-3">
      <div className="container py-4" style={{ maxWidth: "860px" }}>
        <div className="text-center mb-5">
          <span className="section-badge">Career</span>
          <h2 className="section-heading">Work Experience</h2>
          <p className="section-desc">
            Professional journey delivering backend microservices and APIs.
          </p>
        </div>

        {companies.length === 0 ? (
          <div className="clean-card p-5 text-center text-muted">
            <p className="mb-0">No experience records found.</p>
          </div>
        ) : (
          <div className="d-flex flex-column gap-4">
            {companies.map((item, idx) => (
              <div key={item.id || idx} className="clean-card p-4 p-md-5">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
                  <div>
                    <h5 className="fw-bold mb-1 text-dark">
                      {item.role}{" "}
                      <span className="text-primary fw-normal">@ {item.company}</span>
                    </h5>
                    {item.location && (
                      <span className="text-muted small">
                        <i className="bi bi-geo-alt me-1"></i>
                        {item.location}
                      </span>
                    )}
                  </div>
                  <span
                    className="badge bg-light text-secondary border px-3 py-2 mt-2 mt-md-0 fw-normal"
                    style={{ fontSize: "0.82rem", borderRadius: "9999px" }}
                  >
                    {item.duration}
                  </span>
                </div>

                <p className="text-secondary mb-4" style={{ lineHeight: "1.8" }}>
                  {item.description}
                </p>

                {item.technologies && (
                  <div className="d-flex flex-wrap gap-2 pt-3 border-top">
                    {(Array.isArray(item.technologies)
                      ? item.technologies
                      : item.technologies.split(",")
                    ).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="badge bg-white text-muted border px-2 py-1 small fw-normal"
                        style={{ borderRadius: "6px" }}
                      >
                        {typeof tech === "string" ? tech.trim() : tech}
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
