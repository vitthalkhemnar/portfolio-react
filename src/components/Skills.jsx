import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { DEFAULT_PORTFOLIO_DATA } from "../services/dataService";

const FALLBACK_SKILLS_BY_CATEGORY = {
  "Backend & Microservices": [
    "Core Java (8/17/21)",
    "Spring Boot",
    "Spring Data JPA",
    "Hibernate",
    "Microservices Architecture",
    "RESTful APIs",
    "Spring Security"
  ],
  "Databases & Storage": [
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Query Optimization"
  ],
  "DevOps & Cloud Tools": [
    "Docker",
    "Git & GitHub",
    "Maven",
    "Postman",
    "Linux"
  ],
  "Frontend & Full Stack": [
    "ReactJS",
    "JavaScript (ES6+)",
    "HTML5 / CSS3",
    "Bootstrap 5",
    "Redux Toolkit"
  ]
};

const Skills = () => {
  const profile = useSelector((state) => state.profile);

  const masterDefaults = DEFAULT_PORTFOLIO_DATA.profile.skillCategories;

  // Retrieve skill categories from Redux or fall back to master defaults
  const hasValidReduxCategories =
    Array.isArray(profile.skillCategories) &&
    profile.skillCategories.length > 0 &&
    profile.skillCategories.every(
      (c) => typeof c === "object" && c !== null && (c.title || c.name)
    );

  const rawCategories = hasValidReduxCategories
    ? profile.skillCategories
    : masterDefaults;

  // Guarantee every category has its proper domain title, icon, and skills
  const categories = (rawCategories || []).map((cat, idx) => {
    const defaultCat = masterDefaults[idx] || masterDefaults[idx % masterDefaults.length];
    const catObj = typeof cat === "object" && cat !== null ? cat : {};
    const title = catObj.title || catObj.name || catObj.category || defaultCat.title;
    const icon = catObj.icon || defaultCat.icon;
    const defaultForCat = FALLBACK_SKILLS_BY_CATEGORY[title] || defaultCat.skills;
    const skills =
      Array.isArray(catObj.skills) && catObj.skills.length > 0
        ? catObj.skills
        : defaultForCat;

    return {
      id: catObj.id || defaultCat.id || `cat-${idx}`,
      title,
      icon,
      skills
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

  const currentCategory = categories[activeIndex] || categories[0] || {
    title: "Backend & Microservices",
    icon: "bi-cup-hot",
    skills: FALLBACK_SKILLS_BY_CATEGORY["Backend & Microservices"]
  };

  const allSkills =
    categories.flatMap((cat) => cat.skills || []).length > 0
      ? categories.flatMap((cat) => cat.skills || [])
      : DEFAULT_PORTFOLIO_DATA.profile.skills;

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
          <div className="clean-card p-4 p-md-5 mb-4 skills-carousel-card">
            {/* Header of Active Category */}
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 pb-3 mb-4 border-bottom">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "48px",
                    height: "48px",
                    background: "var(--primary-soft)",
                    color: "var(--primary)",
                    fontSize: "1.35rem",
                    flexShrink: 0
                  }}
                >
                  <i className={`bi ${currentCategory.icon || "bi-stars"}`}></i>
                </div>
                <div>
                  <h4 className="fw-bold mb-0 text-dark">
                    {currentCategory.title}
                  </h4>
                  <span className="small text-muted">
                    {currentCategory.skills?.length || 0} technologies in active production use
                  </span>
                </div>
              </div>

              {/* Prev / Next Controls */}
              <div className="d-flex align-items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "36px", height: "36px" }}
                  aria-label="Previous skill category"
                  title="Previous Category"
                >
                  <i className="bi bi-chevron-left"></i>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "36px", height: "36px" }}
                  aria-label="Next skill category"
                  title="Next Category"
                >
                  <i className="bi bi-chevron-right"></i>
                </button>
              </div>
            </div>

            {/* Skills Pills in Active Category */}
            <div
              key={currentCategory.id || activeIndex}
              className="skills-slide-enter"
            >
              <div className="d-flex flex-wrap gap-2 pt-1">
                {currentCategory.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="clean-chip d-inline-flex align-items-center gap-2 px-3 py-2 fs-6"
                    style={{
                      background: "var(--bg-chip)",
                      border: "1px solid var(--border-subtle)",
                      color: "var(--text-heading)",
                      fontWeight: "500",
                      borderRadius: "9999px"
                    }}
                  >
                    <i className="bi bi-check2 text-primary"></i>
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Carousel Footer: Dot Indicators & Counter */}
            <div className="d-flex justify-content-between align-items-center pt-4 mt-4 border-top">
              <div className="d-flex align-items-center gap-1">
                {categories.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => setActiveIndex(dotIdx)}
                    className="p-0 border-0 rounded-circle"
                    style={{
                      width: dotIdx === activeIndex ? "22px" : "8px",
                      height: "8px",
                      borderRadius: "4px",
                      background:
                        dotIdx === activeIndex ? "var(--primary)" : "#cbd5e1",
                      transition: "all 0.25s ease",
                      cursor: "pointer"
                    }}
                    aria-label={`Slide ${dotIdx + 1}`}
                  ></button>
                ))}
              </div>
              <span className="small text-muted fw-medium">
                Category {activeIndex + 1} of {categories.length}
              </span>
            </div>
          </div>
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
      </div>
    </div>
  );
};

export default Skills;
