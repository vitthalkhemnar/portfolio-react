import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Project = () => {
  const projects = useSelector((state) => state.profile.projects) || [];

  const [startIndex, setStartIndex] = useState(0);

  const getVisibleCount = () => {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 992) return 2;
    return 3;
  };

  const [cardsPerView, setCardsPerView] = useState(getVisibleCount());

  useEffect(() => {
    const handleResize = () => setCardsPerView(getVisibleCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const total = projects.length;

  const nextSet = () => {
    if (total === 0) return;
    setStartIndex((prev) => (prev + 1) % total);
  };

  const prevSet = () => {
    if (total === 0) return;
    setStartIndex((prev) => (prev - 1 + total) % total);
  };

  const visibleProjects = [];
  if (total > 0) {
    const count = Math.min(cardsPerView, total);
    for (let i = 0; i < count; i++) {
      const item = projects[(startIndex + i) % total];
      if (item && !visibleProjects.some((p) => p.id === item.id)) {
        visibleProjects.push(item);
      }
    }
  }

  return (
    <div className="py-5 px-3 bg-white">
      <div className="container py-4 position-relative" style={{ maxWidth: "1100px" }}>
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="section-tag mb-2">Featured Work</span>
          <h2 className="section-title fs-2 mt-2">Projects & System Architectures</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
            Real-world backend applications, microservices, and dynamic full-stack solutions built for performance and reliability.
          </p>
        </div>

        {total === 0 ? (
          <div className="text-center text-muted py-5 bg-light rounded-4 border p-4">
            <i className="bi bi-folder2-open fs-1 d-block mb-2 text-primary"></i>
            <p className="mb-0">No projects found. Add projects via the Admin Panel.</p>
          </div>
        ) : (
          <div className="row justify-content-center g-4">
            {visibleProjects.map((proj) => {
              const techList = Array.isArray(proj.techStack)
                ? proj.techStack
                : typeof proj.techStack === "string"
                ? proj.techStack.split(",").map((t) => t.trim()).filter(Boolean)
                : [];

              return (
                <div key={proj.id} className="col-12 col-md-6 col-lg-4 d-flex">
                  <div className="card border-0 shadow-sm rounded-4 flex-fill hover-card bg-white d-flex flex-column overflow-hidden">
                    {/* Project Header Banner / Thumbnail */}
                    <div
                      className="p-3 d-flex justify-content-between align-items-center"
                      style={{ background: "#0f172a", color: "#e2e8f0" }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-cpu-fill text-warning fs-5"></i>
                        <span className="font-mono small text-secondary">Backend System</span>
                      </div>
                      <span className="badge bg-dark border border-secondary font-mono small">
                        Java / Spring
                      </span>
                    </div>

                    <div className="card-body p-4 d-flex flex-column text-start">
                      <h5 className="fw-bold text-dark mb-2">{proj.name}</h5>
                      <p className="text-secondary small mb-3 flex-grow-1" style={{ lineHeight: "1.7" }}>
                        {proj.description}
                      </p>

                      {/* Tech stack badges */}
                      {techList.length > 0 && (
                        <div className="d-flex flex-wrap gap-1 mb-4">
                          {techList.map((tech, idx) => (
                            <span
                              key={idx}
                              className="badge bg-light text-primary border px-2 py-1 small rounded font-mono"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Action Links */}
                      <div className="pt-3 border-top mt-auto d-flex justify-content-between align-items-center">
                        {proj.githubLink ? (
                          <a
                            href={proj.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline-dark rounded-pill px-3 d-flex align-items-center gap-1 font-mono small"
                          >
                            <i className="bi bi-github"></i> Repository
                          </a>
                        ) : (
                          <span></span>
                        )}

                        {proj.demoLink && (
                          <a
                            href={proj.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-primary rounded-pill px-3 d-flex align-items-center gap-1 font-mono small"
                          >
                            <i className="bi bi-box-arrow-up-right"></i> Live / Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Carousel Navigation Buttons */}
        {total > cardsPerView && (
          <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
            <button
              onClick={prevSet}
              className="btn btn-light rounded-circle shadow-sm border p-2"
              style={{ width: "42px", height: "42px" }}
              aria-label="Previous project"
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <span className="font-mono small text-muted">
              {startIndex + 1} / {total}
            </span>
            <button
              onClick={nextSet}
              className="btn btn-light rounded-circle shadow-sm border p-2"
              style={{ width: "42px", height: "42px" }}
              aria-label="Next project"
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Project;
