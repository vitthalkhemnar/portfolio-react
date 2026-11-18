import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Project = () => {
  const projects = useSelector((state) => state.profile.projects) || [];

  const [startIndex, setStartIndex] = useState(0);

  // Adjust visible cards dynamically based on screen width
  const getVisibleCount = () => {
    if (window.innerWidth < 768) return 1; // mobile
    if (window.innerWidth < 992) return 2; // tablet
    return 3; // desktop
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

  // Safe window slice without duplicate keys if total <= cardsPerView
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
    <div className="py-5 d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="container position-relative"
        style={{ maxWidth: "1000px" }}
      >
        {/* Heading */}
        <div className="fw-bold fs-6 mb-4 text-center text-md-start">
          <p className="role text-primary m-0 text-uppercase">Projects & Work</p>
        </div>

        {total === 0 ? (
          <div className="text-center text-muted py-5">
            <i className="bi bi-folder2-open fs-1 d-block mb-2"></i>
            <p>No projects found. Add projects via the Admin Panel.</p>
          </div>
        ) : (
          <div className="row justify-content-center g-4">
            {visibleProjects.map((proj) => (
              <div key={proj.id} className="col-12 col-sm-6 col-lg-4 d-flex">
                <div
                  className="card border-0 shadow-sm text-center flex-fill hover-card"
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    height: "100%",
                    transition: "all 0.3s ease",
                  }}
                >
                  <img
                    src={proj.image || "/images/aboutme.jpeg"}
                    alt={proj.name}
                    className="card-img-top"
                    style={{
                      height: "190px",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/aboutme.jpeg";
                    }}
                  />
                  <div className="card-body d-flex flex-column text-start">
                    <h6 className="fw-bold text-uppercase mb-2 text-dark">{proj.name}</h6>
                    <p className="text-muted small mb-3 flex-grow-1" style={{ lineHeight: "1.6" }}>
                      {proj.description}
                    </p>

                    {proj.techStack && (
                      <p
                        className="fw-semibold mb-3 small"
                        style={{ color: "#0d6efd" }}
                      >
                        {Array.isArray(proj.techStack)
                          ? proj.techStack.join(", ")
                          : proj.techStack}
                      </p>
                    )}

                    <div className="mt-auto d-flex justify-content-end gap-3 pt-2 border-top">
                      {proj.demoLink && (
                        <a
                          href={proj.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Live Demo"
                          className="btn btn-sm btn-outline-primary rounded-pill px-3 d-flex align-items-center gap-1"
                        >
                          <i className="bi bi-rocket-takeoff"></i> Demo
                        </a>
                      )}
                      {proj.githubLink && (
                        <a
                          href={proj.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Source Code"
                          className="btn btn-sm btn-outline-dark rounded-pill px-3 d-flex align-items-center gap-1"
                        >
                          <i className="bi bi-github"></i> Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Carousel Navigation Buttons - only show if more than cardsPerView */}
        {total > cardsPerView && (
          <>
            <button
              onClick={prevSet}
              className="btn btn-light position-absolute top-50 start-0 translate-middle-y shadow-sm"
              style={{
                borderRadius: "50%",
                width: "42px",
                height: "42px",
                zIndex: 2,
                marginLeft: "-15px",
              }}
              aria-label="Previous project"
            >
              <i className="bi bi-chevron-left"></i>
            </button>

            <button
              onClick={nextSet}
              className="btn btn-light position-absolute top-50 end-0 translate-middle-y shadow-sm"
              style={{
                borderRadius: "50%",
                width: "42px",
                height: "42px",
                zIndex: 2,
                marginRight: "-15px",
              }}
              aria-label="Next project"
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Project;
