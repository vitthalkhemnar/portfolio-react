import { useState } from "react";
import { useSelector } from "react-redux";

const ExperienceCard = ({ item, idx }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const role = item.role || "";
  const company = item.company || "";
  const location = item.location || "";
  const employmentType = item.employmentType || "";
  const locationType = item.locationType || "";
  const duration =
    item.duration ||
    (item.startDate
      ? `${item.startDate} - ${item.isCurrent ? "Present" : item.endDate || "Present"}`
      : "");
  const description = item.description || "";

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

  // Determine if card content exceeds standard compact view
  const isLongDesc = description.length > 180;
  const hasManyResp = responsibilities.length > 2;
  const needsReadMore = isLongDesc || hasManyResp;

  const displayDescription =
    !isExpanded && isLongDesc
      ? `${description.slice(0, 175).trim()}...`
      : description;

  const displayResponsibilities =
    !isExpanded && hasManyResp
      ? responsibilities.slice(0, 2)
      : responsibilities;

  return (
    <div key={item.id || idx} className="clean-card p-4 p-md-5 w-100">
      {/* Header: Role, Company, Location, Duration */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 mb-3">
        <div className="min-w-0 flex-grow-1">
          <h5 className="fw-bold mb-1 text-white text-break">
            {role} {company && <span className="fw-medium" style={{ color: "var(--primary)" }}>@ {company}</span>}
          </h5>
          <div className="d-flex flex-wrap gap-2 small mt-1 text-muted">
            {location && (
              <span>
                <i className="bi bi-geo-alt me-1 text-muted"></i>
                {location}
              </span>
            )}
            {employmentType && <span>&bull; {employmentType}</span>}
            {locationType && <span>&bull; {locationType}</span>}
          </div>
        </div>
        {duration && (
          <span
            className="badge border px-3 py-2 mt-1 mt-sm-0 fw-normal align-self-start align-self-sm-center flex-shrink-0"
            style={{
              fontSize: "0.82rem",
              borderRadius: "9999px",
              background: "rgba(255, 255, 255, 0.06)",
              borderColor: "rgba(255, 255, 255, 0.15)",
              color: "#ffffff"
            }}
          >
            {duration}
          </span>
        )}
      </div>

      {/* Description */}
      {description && (
        <p className="mb-3" style={{ color: "var(--text-body)", lineHeight: "1.8" }}>
          {displayDescription}
        </p>
      )}

      {/* Key Responsibilities */}
      {displayResponsibilities.length > 0 && (
        <div className="mb-3">
          <ul className="small ps-3 mb-0" style={{ color: "var(--text-body)", lineHeight: "1.7" }}>
            {displayResponsibilities.map((resp, rIdx) => (
              <li key={rIdx}>{resp.replace(/^[•-]\s*/, "")}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Read More / Show Less Toggle Button */}
      {needsReadMore && (
        <div className="mb-3">
          <button
            type="button"
            className="btn-read-more"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
          >
            {isExpanded ? (
              <>
                Show less <i className="bi bi-chevron-up"></i>
              </>
            ) : (
              <>
                Read more ({hasManyResp ? `+${responsibilities.length - 2} more points` : "full details"}){" "}
                <i className="bi bi-chevron-down"></i>
              </>
            )}
          </button>
        </div>
      )}

      {/* Technologies */}
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
};

const Experience = () => {
  const profile = useSelector((state) => state.profile);
  const reduxCompanies = useSelector((state) => state.profile.companies);
  const companies = Array.isArray(reduxCompanies) ? reduxCompanies : [];

  return (
    <div className="py-5 px-3">
      <div className="container py-3" style={{ maxWidth: "960px" }}>
        {/* Unified Section Header */}
        <div className="text-center mb-5">
          <span className="section-eyebrow">{"// 03. EXPERIENCE"}</span>
          <h2 className="section-heading">Work Experience</h2>
          <p className="section-desc">
            {profile.experienceSubtitle || "Professional journey, impact, and engineering milestones."}
          </p>
        </div>

        {companies.length === 0 ? (
          <div className="clean-card p-5 text-center text-muted">
            <p className="mb-0">Experience details will be updated soon.</p>
          </div>
        ) : (
          <div className="d-flex flex-column gap-4">
            {companies.map((item, idx) => (
              <ExperienceCard key={item.id || idx} item={item} idx={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Experience;
