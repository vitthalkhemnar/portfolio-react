import { useSelector } from "react-redux";
import { DEFAULT_PORTFOLIO_DATA } from "../services/dataService";

const Experience = () => {
  const reduxCompanies = useSelector((state) => state.profile.companies);
  const companies =
    reduxCompanies && reduxCompanies.length > 0
      ? reduxCompanies
      : DEFAULT_PORTFOLIO_DATA.companies || [];

  return (
    <div className="py-5 px-3">
      <div className="container py-3" style={{ maxWidth: "860px" }}>
        {/* Clean Section Header */}
        <div className="text-center mb-5">
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
            {companies.map((item, idx) => {
              const role = item.role || "Java Backend Developer";
              const company = item.company || "ANMsoft Technologies";
              const location = item.location || "Pune, India";
              const employmentType = item.employmentType || "Full-time";
              const locationType = item.locationType || "On-site";
              const duration =
                item.duration ||
                `${item.startDate || "2023"} - ${
                  item.isCurrent ? "Present" : item.endDate || "Present"
                }`;
              const description =
                item.description ||
                "Engineered scalable backend microservices and enterprise REST APIs using Core Java, Spring Boot, and Spring Data JPA. Designed normalized relational database schemas, optimized query execution plans, and implemented token-based authentication.";

              const responsibilities =
                Array.isArray(item.responsibilities) && item.responsibilities.length > 0
                  ? item.responsibilities
                  : typeof item.responsibilities === "string" && item.responsibilities.trim()
                  ? item.responsibilities.split("\n").filter(Boolean)
                  : [];

              const technologies =
                Array.isArray(item.technologies) && item.technologies.length > 0
                  ? item.technologies
                  : typeof item.technologies === "string" && item.technologies.trim()
                  ? item.technologies.split(",").map((t) => t.trim()).filter(Boolean)
                  : [];

              return (
                <div key={item.id || idx} className="clean-card p-4 p-md-5">
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
                    <div>
                      <h5 className="fw-bold mb-1 text-dark">
                        {role}{" "}
                        <span className="fw-normal text-muted">@ {company}</span>
                      </h5>
                      <div className="d-flex flex-wrap gap-2 small mt-1 text-muted">
                        {location && (
                          <span>
                            <i className="bi bi-geo-alt me-1 text-muted"></i>
                            {location}
                          </span>
                        )}
                        {employmentType && (
                          <span>&bull; {employmentType}</span>
                        )}
                        {locationType && (
                          <span>&bull; {locationType}</span>
                        )}
                      </div>
                    </div>
                    <span
                      className="badge bg-light text-secondary border px-3 py-2 mt-2 mt-md-0 fw-normal"
                      style={{
                        fontSize: "0.82rem",
                        borderRadius: "9999px"
                      }}
                    >
                      {duration}
                    </span>
                  </div>

                  <p className="mb-4" style={{ color: "var(--text-body)", lineHeight: "1.8" }}>
                    {description}
                  </p>

                  {responsibilities.length > 0 && (
                    <div className="mb-3">
                      <ul className="small ps-3 mb-0" style={{ color: "var(--text-body)", lineHeight: "1.7" }}>
                        {responsibilities.map((resp, rIdx) => (
                          <li key={rIdx}>{resp.replace(/^[•-]\s*/, "")}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {technologies.length > 0 && (
                    <div
                      className="d-flex flex-wrap gap-2 pt-3"
                      style={{ borderTop: "1px solid var(--border-subtle)" }}
                    >
                      {technologies.map((tech, tIdx) => (
                        <span key={tIdx} className="clean-chip">
                          {typeof tech === "string" ? tech.trim() : tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Experience;
