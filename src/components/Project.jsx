import { useState } from "react";
import { useSelector } from "react-redux";

const ProjectCard = ({ proj, pIdx, profile }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const name = proj.name || `Project ${pIdx + 1}`;
  const category = proj.category || "";
  const description = proj.description || "";

  const techList =
    Array.isArray(proj.techStack)
      ? proj.techStack
      : typeof proj.techStack === "string" && proj.techStack.trim()
      ? proj.techStack.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

  const githubLink = proj.githubLink || profile.githubUrl || "";
  const demoLink = proj.demoLink || "";

  const features =
    Array.isArray(proj.keyFeatures) && proj.keyFeatures.length > 0
      ? proj.keyFeatures
      : typeof proj.keyFeatures === "string" && proj.keyFeatures.trim()
      ? proj.keyFeatures.split("\n").map((f) => f.trim()).filter(Boolean)
      : [];

  // Determine if card content exceeds standard compact height
  const isLongDesc = description.length > 140;
  const hasFeatures = features.length > 0;
  const needsReadMore = isLongDesc || hasFeatures;

  const displayDescription =
    !isExpanded && isLongDesc
      ? `${description.slice(0, 135).trim()}...`
      : description;

  return (
    <div className="clean-card p-4 p-md-4 flex-fill d-flex flex-column w-100">
      {/* Header: Title, Category, and Action Links */}
      <div className="d-flex justify-content-between align-items-start gap-2 mb-2 flex-wrap flex-sm-nowrap">
        <div className="min-w-0 flex-grow-1">
          <h5 className="fw-bold text-white mb-1 text-break">{name}</h5>
          {category && (
            <span className="clean-badge-accent">
              {category}
            </span>
          )}
        </div>
        <div className="d-flex gap-2 flex-shrink-0 pt-1">
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="project-icon-link"
              title="GitHub Repository"
              aria-label={`GitHub Repository for ${name}`}
            >
              <i className="bi bi-github fs-5"></i>
            </a>
          )}
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="project-icon-link"
              title="Live Demo"
              aria-label={`Live Demo for ${name}`}
            >
              <i className="bi bi-arrow-up-right-circle fs-5"></i>
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      {description && (
        <p
          className="small mb-2"
          style={{ color: "var(--text-body)", lineHeight: "1.7" }}
        >
          {displayDescription}
        </p>
      )}

      {/* Expandable Key Features */}
      {isExpanded && hasFeatures && (
        <div className="mb-3 card-expandable-content">
          <div className="fw-semibold small text-white mb-1">Key Highlights:</div>
          <ul
            className="small ps-3 mb-0"
            style={{ color: "var(--text-body)", lineHeight: "1.6" }}
          >
            {features.map((feat, fIdx) => (
              <li key={fIdx}>{feat.replace(/^[•-]\s*/, "")}</li>
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
                Read more <i className="bi bi-chevron-down"></i>
              </>
            )}
          </button>
        </div>
      )}

      {/* Tech Stack Chips (pinned cleanly to card bottom) */}
      {techList.length > 0 && (
        <div
          className="d-flex flex-wrap gap-1 pt-3 mt-auto"
          style={{ borderTop: "1px solid var(--border-subtle)" }}
        >
          {techList.map((tech, idx) => (
            <span key={idx} className="clean-chip">
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

const Project = () => {
  const reduxProjects = useSelector((state) => state.profile.projects);
  const profile = useSelector((state) => state.profile);
  const projects = Array.isArray(reduxProjects) ? reduxProjects : [];
  const isSingle = projects.length === 1;

  return (
    <div className="py-5 px-3">
      <div className="container py-3" style={{ maxWidth: "960px" }}>
        {/* Unified Section Header */}
        <div className="text-center mb-5">
          <span className="section-eyebrow">{"// 04. PROJECTS"}</span>
          <h2 className="section-heading">Featured Projects</h2>
          <p className="section-desc">
            {profile.projectsSubtitle || "Production systems, scalable architectures, and web applications."}
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="clean-card p-5 text-center text-muted">
            <p className="mb-0">No projects added yet. Add projects through the admin dashboard.</p>
          </div>
        ) : (
          /* Centered row so single project or odd project count centers properly */
          <div className="row g-4 justify-content-center">
            {projects.map((proj, pIdx) => (
              <div
                key={proj.id || pIdx}
                className={`${
                  isSingle
                    ? "col-12 col-md-8 col-lg-7 d-flex justify-content-center"
                    : "col-12 col-md-6 d-flex"
                }`}
              >
                <ProjectCard proj={proj} pIdx={pIdx} profile={profile} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Project;
