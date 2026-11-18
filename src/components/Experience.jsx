import { useSelector } from "react-redux";

const Experience = () => {
  const companies = useSelector((state) => state.profile.companies) || [];

  return (
    <div className="py-5 px-3">
      <div className="container py-4" style={{ maxWidth: "1000px" }}>
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="section-tag mb-2">Career Journey</span>
          <h2 className="section-title fs-2 mt-2">Work Experience & Companies</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
            Proven track record of delivering stable backend microservices in fast-paced production environments.
          </p>
        </div>

        {companies.length === 0 ? (
          <div className="text-center text-muted py-5 bg-white rounded-4 border p-4">
            <i className="bi bi-briefcase fs-1 d-block mb-2 text-primary"></i>
            <p className="mb-0">No company experience listed yet. Add entries via the Admin Panel.</p>
          </div>
        ) : (
          <div className="position-relative ps-md-4">
            <div className="d-flex flex-column gap-4">
              {companies.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="card border-0 shadow-sm p-4 rounded-4 hover-card bg-white position-relative"
                  style={{
                    borderLeft: "6px solid #ea580c"
                  }}
                >
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
                    <div>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <span className="badge bg-dark text-white font-mono small px-2 py-1 rounded">
                          0{idx + 1}
                        </span>
                        <h4 className="fw-bold mb-0 text-dark">
                          {item.role}{" "}
                          <span className="text-primary fw-semibold">@ {item.company}</span>
                        </h4>
                      </div>
                      {item.location && (
                        <span className="text-muted small">
                          <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                          {item.location}
                        </span>
                      )}
                    </div>
                    <span className="badge bg-warning-subtle text-dark border border-warning-subtle px-3 py-2 rounded-pill mt-2 mt-md-0 fw-semibold font-mono">
                      <i className="bi bi-calendar3 me-1"></i> {item.duration}
                    </span>
                  </div>

                  <p className="text-secondary mb-3" style={{ lineHeight: "1.8", fontSize: "1rem" }}>
                    {item.description}
                  </p>

                  {item.technologies && item.technologies.length > 0 && (
                    <div className="pt-3 border-top d-flex flex-wrap align-items-center gap-2">
                      <span className="small text-muted font-mono fw-semibold me-1">Stack:</span>
                      {(Array.isArray(item.technologies)
                        ? item.technologies
                        : item.technologies.split(",")
                      ).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="badge bg-light text-dark border px-2 py-1 small rounded-pill font-mono"
                        >
                          {typeof tech === "string" ? tech.trim() : tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Experience;
