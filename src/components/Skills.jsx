import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Skills = () => {
  const profile = useSelector((state) => state.profile);

  // Retrieve skill categories directly from profile state - zero static fallback data
  const rawCategories = Array.isArray(profile.skillCategories)
    ? profile.skillCategories
    : [];

  const categories = rawCategories.map((cat, idx) => {
    const catObj = typeof cat === "object" && cat !== null ? cat : {};
    return {
      id: catObj.id || `cat-${idx}`,
      title: catObj.title || catObj.name || `Category ${idx + 1}`,
      icon: catObj.icon || "bi-stars",
      skills: Array.isArray(catObj.skills) ? catObj.skills : []
    };
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Ensure activeIndex is in range if categories change
  useEffect(() => {
    if (activeIndex >= categories.length) {
      setActiveIndex(0);
    }
  }, [categories.length, activeIndex]);

  // Auto-advance carousel every 4.5 seconds when not hovered
  useEffect(() => {
    if (categories.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categories.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [categories.length, isPaused]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + categories.length) % categories.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % categories.length);
  };

  const currentCategory = categories[activeIndex] || null;

  const allSkills =
    profile.skills && profile.skills.length > 0
      ? profile.skills
      : categories.flatMap((cat) => cat.skills || []);

  return (
    <div className="py-5 px-3">
      <div className="container py-3" style={{ maxWidth: "960px" }}>
        {/* Clean Section Header */}
        <div className="text-center mb-5">
          <h2 className="section-heading">Skills & Technologies</h2>
          <p className="section-desc">
            Explore technologies organized by architectural domain.
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="clean-card p-5 text-center text-muted">
            <p className="mb-0">No skills added yet. Configure skill categories in the admin dashboard.</p>
          </div>
        ) : (
          <>
            {/* Carousel Container */}
            <div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Category Tabs / Slide Selectors */}
              <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
                {categories.map((cat, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={cat.id || idx}
                      type="button"
                      className={`btn rounded-pill px-3 py-2 d-inline-flex align-items-center gap-2 ${
                        isActive
                          ? "btn-dark shadow-sm fw-semibold"
                          : "btn-light text-secondary border"
                      }`}
                      style={{
                        fontSize: "0.88rem",
                        transition: "all 0.2s ease"
                      }}
                      onClick={() => setActiveIndex(idx)}
                      aria-label={`View ${cat.title}`}
                    >
                      <i className={`bi ${cat.icon || "bi-stars"}`}></i>
                      <span>{cat.title}</span>
                      <span
                        className={`badge rounded-pill ${
                          isActive ? "bg-light text-dark" : "bg-white text-secondary border"
                        }`}
                        style={{ fontSize: "0.72rem" }}
                      >
                        {cat.skills?.length || 0}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Main Carousel Slide Card */}
              {currentCategory && (
                <div className="clean-card p-4 p-md-5 mb-4 skills-carousel-card">
                  {/* Header of Active Category */}
                  <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 pb-3 mb-4 border-bottom">
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: "48px",
                          height: "48px",
                          background: "var(--bg-subtle, #f1f3f5)",
                          color: "var(--text-dark, #111827)",
                          fontSize: "1.35rem"
                        }}
                      >
                        <i className={`bi ${currentCategory.icon || "bi-stars"}`}></i>
                      </div>
                      <div>
                        <h4 className="fw-bold mb-0 text-dark">
                          {currentCategory.title}
                        </h4>
                        <small className="text-muted">
                          {currentCategory.skills.length} core technologies
                        </small>
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="d-flex align-items-center gap-2 align-self-end align-self-sm-auto">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center p-0"
                        style={{ width: "38px", height: "38px" }}
                        title="Previous Category"
                        aria-label="Previous Category"
                      >
                        <i className="bi bi-chevron-left"></i>
                      </button>
                      <span className="small text-muted px-1">
                        {activeIndex + 1} / {categories.length}
                      </span>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center p-0"
                        style={{ width: "38px", height: "38px" }}
                        title="Next Category"
                        aria-label="Next Category"
                      >
                        <i className="bi bi-chevron-right"></i>
                      </button>
                    </div>
                  </div>

                  {/* Skills Grid for Current Category */}
                  {currentCategory.skills.length === 0 ? (
                    <div className="text-center text-muted py-4">
                      No skills added to this category yet.
                    </div>
                  ) : (
                    <div className="row g-3">
                      {currentCategory.skills.map((skill, sIdx) => (
                        <div key={sIdx} className="col-12 col-sm-6 col-md-4">
                          <div
                            className="p-3 rounded-3 h-100 d-flex align-items-center gap-3"
                            style={{
                              background: "var(--bg-card, #ffffff)",
                              border: "1px solid var(--border-subtle, #e5e7eb)",
                              transition: "transform 0.2s ease, box-shadow 0.2s ease"
                            }}
                          >
                            <span
                              className="rounded-circle d-inline-block flex-shrink-0"
                              style={{
                                width: "8px",
                                height: "8px",
                                backgroundColor: "var(--text-dark, #111827)"
                              }}
                            ></span>
                            <span className="fw-medium text-dark text-break">
                              {skill}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Slide Indicators (Dots) */}
                  <div className="d-flex justify-content-center gap-2 mt-4 pt-3">
                    {categories.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveIndex(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        style={{
                          width: idx === activeIndex ? "24px" : "8px",
                          height: "8px",
                          borderRadius: "4px",
                          backgroundColor:
                            idx === activeIndex
                              ? "var(--text-dark, #111827)"
                              : "var(--border-subtle, #d1d5db)",
                          border: "none",
                          padding: 0,
                          transition: "all 0.3s ease"
                        }}
                      ></button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Continuous Marquee Ribbon of All Skills */}
            {allSkills.length > 0 && (
              <div className="pt-2">
                <div className="text-center mb-3">
                  <span className="small text-muted fw-semibold text-uppercase tracking-wider">
                    Full Technical Spectrum
                  </span>
                </div>
                <div
                  className="position-relative overflow-hidden py-2"
                  style={{
                    maskImage:
                      "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                    WebkitMaskImage:
                      "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
                  }}
                >
                  <div className="skills-marquee-track">
                    {allSkills.concat(allSkills).map((skill, mIdx) => (
                      <span
                        key={mIdx}
                        className="clean-chip text-nowrap px-3 py-1"
                        style={{
                          fontSize: "0.85rem",
                          background: "#ffffff",
                          border: "1px solid var(--border-subtle)"
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Skills;
