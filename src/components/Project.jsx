import { useSelector } from "react-redux";
import { DEFAULT_PORTFOLIO_DATA } from "../services/dataService";

const Project = () => {
  const reduxProjects = useSelector((state) => state.profile.projects);
  const profile = useSelector((state) => state.profile);

  const projects =
    reduxProjects && reduxProjects.length > 0
      ? reduxProjects
      : DEFAULT_PORTFOLIO_DATA.projects || [];

  return (
    <div className="py-5 px-3">
      <div className="container py-3" style={{ maxWidth: "960px" }}>
        {/* Clean Section Header */}
        <div className="text-center mb-5">
          <h2 className="section-heading">Featured Projects</h2>
          <p className="section-desc">
            A selection of backend systems and applications I've developed.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="clean-card p-5 text-center text-muted">
            <p className="mb-0">No projects added yet.</p>
          </div>
        ) : (
          <div className="row g-4">
            {projects.map((proj, pIdx) => {
              const name = proj.name || `Project ${pIdx + 1}`;
              const category = proj.category || "Backend / Microservices";
              const description =
                proj.description ||
                "Engineered scalable backend microservices and enterprise REST APIs with resilient architecture and optimized database performance.";

              const techList =
                Array.isArray(proj.techStack) && proj.techStack.length > 0
                  ? proj.techStack
                  : typeof proj.techStack === "string" && proj.techStack.trim()
                  ? proj.techStack.split(",").map((t) => t.trim()).filter(Boolean)
                  : ["Core Java", "Spring Boot", "MySQL", "REST APIs"];

              const githubLink =
                proj.githubLink || profile.githubUrl || "https://github.com/vitthalkhemnar";
              const demoLink = proj.demoLink || githubLink;

              const features =
                Array.isArray(proj.keyFeatures) && proj.keyFeatures.length > 0
                  ? proj.keyFeatures
                  : typeof proj.keyFeatures === "string" && proj.keyFeatures.trim()
                  ? proj.keyFeatures.split("\n").map((f) => f.trim()).filter(Boolean)
                  : [];

              return (
                <div key={proj.id || pIdx} className="col-12 col-md-6 d-flex">
                  <div className="clean-card p-4 p-md-4 flex-fill d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h5 className="fw-bold text-dark mb-1">{name}</h5>
                        {category && (
                          <span className="clean-badge-accent">
                            {category}
                          </span>
                        )}
                      </div>
                      <div className="d-flex gap-2">
                        {githubLink && (
                          <a
                            href={githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-secondary hover-text-dark"
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
                            className="text-secondary hover-text-dark"
                            title="Live Demo"
                            aria-label={`Live Demo for ${name}`}
                          >
                            <i className="bi bi-arrow-up-right-circle fs-5"></i>
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="small mb-3 flex-grow-1" style={{ color: "var(--text-body)", lineHeight: "1.7" }}>
                      {description}
                    </p>

                    {features.length > 0 && (
                      <div className="mb-3">
                        <ul className="small ps-3 mb-0" style={{ color: "var(--text-body)", lineHeight: "1.6" }}>
                          {features.map((feat, fIdx) => (
                            <li key={fIdx}>{feat.replace(/^[•-]\s*/, "")}</li>
                          ))}
                        </ul>
                      </div>
                    )}

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
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Project;
