import { useSelector } from "react-redux";

const Project = () => {
  const projects = useSelector((state) => state.profile.projects) || [];

  return (
    <div className="py-5 px-3 bg-light">
      <div className="container py-3" style={{ maxWidth: "960px" }}>
        {projects.length === 0 ? (
          <div className="clean-card p-5 text-center text-muted">
            <p className="mb-0">No projects added yet.</p>
          </div>
        ) : (
          <div className="row g-4">
            {projects.map((proj) => {
              const techList = Array.isArray(proj.techStack)
                ? proj.techStack
                : typeof proj.techStack === "string"
                ? proj.techStack.split(",").map((t) => t.trim()).filter(Boolean)
                : [];

              return (
                <div key={proj.id} className="col-12 col-md-6 d-flex">
                  <div className="clean-card p-4 p-md-4 flex-fill d-flex flex-column bg-white">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h5 className="fw-bold text-dark mb-1">{proj.name}</h5>
                        {proj.category && (
                          <span className="badge bg-light text-primary border small fw-normal">
                            {proj.category}
                          </span>
                        )}
                      </div>
                      <div className="d-flex gap-2">
                        {proj.githubLink && (
                          <a
                            href={proj.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-secondary hover-text-dark"
                            title="GitHub Repository"
                          >
                            <i className="bi bi-github fs-5"></i>
                          </a>
                        )}
                        {proj.demoLink && (
                          <a
                            href={proj.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-secondary hover-text-dark"
                            title="Live Demo"
                          >
                            <i className="bi bi-arrow-up-right-circle fs-5"></i>
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="text-secondary small mb-3 flex-grow-1" style={{ lineHeight: "1.7" }}>
                      {proj.description}
                    </p>

                    {proj.keyFeatures && (
                      <div className="mb-3">
                        <ul className="text-secondary small ps-3 mb-0" style={{ lineHeight: "1.6" }}>
                          {(Array.isArray(proj.keyFeatures)
                            ? proj.keyFeatures
                            : proj.keyFeatures.split("\n").filter(Boolean)
                          ).map((feat, fIdx) => (
                            <li key={fIdx}>{feat.replace(/^[•-]\s*/, "")}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {techList.length > 0 && (
                      <div className="d-flex flex-wrap gap-1 pt-3 border-top mt-auto">
                        {techList.map((tech, idx) => (
                          <span
                            key={idx}
                            className="badge bg-light text-secondary border px-2 py-1 small fw-normal"
                            style={{ borderRadius: "6px", fontSize: "0.78rem" }}
                          >
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
