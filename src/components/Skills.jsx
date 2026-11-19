import { useSelector } from "react-redux";

const DEFAULT_SKILL_DOMAINS = [
  {
    id: "backend",
    title: "Backend & Architecture",
    icon: "bi-server",
    skills: ["Java", "Spring Boot", "Microservices", "RESTful APIs", "Hibernate / JPA", "Distributed Systems"]
  },
  {
    id: "database",
    title: "Databases & Caching",
    icon: "bi-database",
    skills: ["PostgreSQL", "MySQL", "Redis", "Database Indexing", "Data Modeling"]
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    icon: "bi-cloud-check",
    skills: ["Docker", "Kubernetes", "AWS (EC2, S3)", "CI/CD Pipelines", "Maven / Gradle"]
  },
  {
    id: "tools-frontend",
    title: "Frontend & Engineering Tools",
    icon: "bi-tools",
    skills: ["React", "JavaScript", "Git & GitHub", "Postman", "Linux", "JUnit & Mockito"]
  }
];

const Skills = () => {
  const profile = useSelector((state) => state.profile);

  const rawCategories =
    Array.isArray(profile.skillCategories) && profile.skillCategories.length > 0
      ? profile.skillCategories
      : DEFAULT_SKILL_DOMAINS;

  const categories = rawCategories.map((cat, idx) => {
    const catObj = typeof cat === "object" && cat !== null ? cat : {};
    return {
      id: catObj.id || `cat-${idx}`,
      title: catObj.title || catObj.name || `Domain ${idx + 1}`,
      icon: catObj.icon || "bi-stars",
      skills: Array.isArray(catObj.skills) ? catObj.skills : []
    };
  });

  return (
    <div className="py-5 px-3">
      <div className="container py-3" style={{ maxWidth: "1000px" }}>
        {/* Unified Section Header */}
        <div className="text-center mb-5">
          <span className="section-eyebrow">{"// 02. SKILLS"}</span>
          <h2 className="section-heading">Skills & Technologies</h2>
          <p className="section-desc">
            Architectural domains, core frameworks, distributed systems, and modern engineering tools.
          </p>
        </div>

        {/* Categorized 2-Column Responsive Grid */}
        <div className="row g-4">
          {categories.map((domain, dIdx) => (
            <div key={domain.id || dIdx} className="col-12 col-md-6">
              <div className="clean-card p-4 p-md-4 h-100 d-flex flex-column">
                {/* Domain Card Header */}
                <div
                  className="d-flex align-items-center justify-content-between pb-3 mb-3"
                  style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{
                        width: "42px",
                        height: "42px",
                        background: "rgba(255, 107, 0, 0.12)",
                        color: "var(--primary)",
                        border: "1px solid rgba(255, 107, 0, 0.35)",
                        fontSize: "1.2rem",
                        boxShadow: "0 0 12px rgba(255, 107, 0, 0.2)"
                      }}
                    >
                      <i className={`bi ${domain.icon || "bi-stars"}`}></i>
                    </div>
                    <div>
                      <h5 className="fw-bold text-white mb-0 text-break">{domain.title}</h5>
                      <small className="text-muted">{domain.skills.length} core technologies</small>
                    </div>
                  </div>
                  <span
                    className="badge rounded-pill"
                    style={{
                      background: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      color: "#e4e4e7",
                      fontSize: "0.74rem",
                      padding: "5px 10px"
                    }}
                  >
                    Domain {dIdx + 1}
                  </span>
                </div>

                {/* Skills Chips */}
                {domain.skills.length === 0 ? (
                  <div className="text-muted small py-3">No skills configured in this domain.</div>
                ) : (
                  <div className="d-flex flex-wrap gap-2 mt-auto pt-1">
                    {domain.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="clean-chip d-inline-flex align-items-center gap-2 px-3 py-2"
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: "500"
                        }}
                      >
                        <span
                          className="rounded-circle d-inline-block flex-shrink-0"
                          style={{
                            width: "6px",
                            height: "6px",
                            backgroundColor: "var(--primary)",
                            boxShadow: "0 0 6px rgba(255, 107, 0, 0.6)"
                          }}
                        ></span>
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
