import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import HorizontalCarousel from "./common/HorizontalCarousel";

const ExperienceCard = ({ item, idx }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef(null);
  const cardOffsetFromViewportTop = useRef(null);

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
  const hasResponsibilities = responsibilities.length > 0;
  const needsReadMore = isLongDesc || hasResponsibilities;

  const handleToggleExpand = () => {
    if (isExpanded) {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        // Only scroll if the card top has scrolled out of view above the navbar
        if (rect.top < 75) {
          cardRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
          });
        }
      }
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  };

  return (
    <div ref={cardRef} key={item.id || idx} className="clean-card p-4 p-md-5 w-100 d-flex flex-column">
      {/* Header: Role, Company, Location, Duration */}
      <div className="experience-card-header d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 mb-3">
        <div className="min-w-0 flex-grow-1">
          <h5 className="fw-bold mb-1 text-white text-break">
            {role}{" "}
            {company && (
              <span className="fw-medium" style={{ color: "var(--primary)" }}>
                @ {company}
              </span>
            )}
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

      {/* Description / Summary */}
      {description && (
        <div className="experience-card-desc-wrapper mb-2">
          <p className="experience-card-desc mb-0" style={{ color: "var(--text-body)", lineHeight: "1.8" }}>
            {isExpanded || !isLongDesc
              ? description
              : `${description.slice(0, 175).trim()}...`}
          </p>
        </div>
      )}

      {/* Expandable Key Responsibilities & Impact */}
      {hasResponsibilities && (
        <div className={`card-expandable-wrapper ${isExpanded ? "is-expanded" : ""}`}>
          <div className="card-expandable-inner">
            <div className="mb-3">
              <div className="fw-semibold small text-white mb-1">
                Key Responsibilities & Impact:
              </div>
              <ul
                className="small ps-3 mb-0"
                style={{ color: "var(--text-body)", lineHeight: "1.7" }}
              >
                {responsibilities.map((resp, rIdx) => (
                  <li key={rIdx}>{resp.replace(/^[•-]\s*/, "")}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Read More / Show Less Toggle Button */}
      {needsReadMore && (
        <div className="mb-3">
          <button
            type="button"
            className={`btn-read-more ${isExpanded ? "is-expanded" : ""}`}
            onClick={handleToggleExpand}
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? "Show less" : "Read more"}</span>
            <i className="bi bi-chevron-down btn-read-more-icon"></i>
          </button>
        </div>
      )}

      {/* Technologies pinned to card bottom */}
      {technologies.length > 0 && (
        <div
          className="experience-card-skills d-flex flex-wrap gap-2 pt-3 mt-auto"
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
      <div className="container py-3" style={{ maxWidth: "1000px" }}>
        {companies.length === 0 ? (
          <div>
            <div className="text-center mb-5">
              <span className="section-eyebrow">{"// 03. EXPERIENCE"}</span>
              <h2 className="section-heading">Work Experience</h2>
              <p className="section-desc">
                {profile.experienceSubtitle ||
                  "Professional journey, impact, and engineering milestones."}
              </p>
            </div>
            <div className="clean-card p-5 text-center text-muted">
              <p className="mb-0">Experience details will be updated soon.</p>
            </div>
          </div>
        ) : (
          <>
            {/* Desktop View: Original vertical stack with centered header (Don't change anything for desktop) */}
            <div className="d-none d-md-block">
              <div className="text-center mb-5">
                <span className="section-eyebrow">{"// 03. EXPERIENCE"}</span>
                <h2 className="section-heading">Work Experience</h2>
                <p className="section-desc">
                  {profile.experienceSubtitle ||
                    "Professional journey, impact, and engineering milestones."}
                </p>
              </div>
              <div className="d-flex flex-column gap-4 mx-auto" style={{ maxWidth: "780px" }}>
                {companies.map((item, idx) => (
                  <ExperienceCard key={item.id || idx} item={item} idx={idx} />
                ))}
              </div>
            </div>

            {/* Mobile View: Swipeable horizontal carousel with peek & controls */}
            <div className="d-block d-md-none">
              <HorizontalCarousel
                items={companies}
                eyebrow="// 03. EXPERIENCE"
                title="Work Experience"
                subtitle={
                  profile.experienceSubtitle ||
                  "Professional journey, impact, and engineering milestones."
                }
                badgeText={`${companies.length} Roles`}
                itemClassName="experience-card-item"
                renderItem={(item, idx) => <ExperienceCard item={item} idx={idx} />}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Experience;
