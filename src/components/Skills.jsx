import { useSelector } from "react-redux";

const Skills = () => {
  const profile = useSelector((state) => state.profile);

  const defaultCategories = [
    {
      title: "Backend & Core Java",
      icon: "bi-cup-hot-fill",
      color: "text-danger",
      skills: [
        { name: "Core Java (OOP, Collections, Streams)", level: "90%" },
        { name: "Spring Boot 3", level: "85%" },
        { name: "Spring Data JPA & Hibernate", level: "85%" },
        { name: "Microservices Architecture", level: "80%" },
        { name: "RESTful Web Services", level: "90%" },
        { name: "Spring Security & JWT", level: "75%" }
      ]
    },
    {
      title: "Databases & Persistence",
      icon: "bi-database-fill",
      color: "text-primary",
      skills: [
        { name: "MySQL", level: "85%" },
        { name: "PostgreSQL", level: "80%" },
        { name: "MongoDB", level: "75%" },
        { name: "Query Optimization & Indexing", level: "80%" },
        { name: "Transaction Management (ACID)", level: "85%" }
      ]
    },
    {
      title: "Tools, DevOps & Practices",
      icon: "bi-gear-wide-connected",
      color: "text-success",
      skills: [
        { name: "Docker & Containerization", level: "75%" },
        { name: "Maven Build Tool", level: "85%" },
        { name: "Git & GitHub Version Control", level: "85%" },
        { name: "Postman & API Documentation", level: "90%" },
        { name: "Swagger / OpenAPI 3", level: "85%" },
        { name: "Agile / Scrum Methodologies", level: "90%" }
      ]
    },
    {
      title: "Frontend & Full-Stack",
      icon: "bi-laptop-fill",
      color: "text-info",
      skills: [
        { name: "ReactJS", level: "75%" },
        { name: "Redux Toolkit", level: "75%" },
        { name: "JavaScript (ES6+)", level: "80%" },
        { name: "Bootstrap 5 & Responsive UI", level: "85%" },
        { name: "HTML5 & Modern CSS3", level: "85%" }
      ]
    }
  ];

  return (
    <div className="py-5 px-3 bg-white">
      <div className="container py-4" style={{ maxWidth: "1100px" }}>
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="section-tag mb-2">Technical Arsenal</span>
          <h2 className="section-title fs-2 mt-2">Skills & Technology Matrix</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
            Comprehensive toolkit for building enterprise-grade backend services and robust cloud-native applications.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="row g-4">
          {defaultCategories.map((cat, idx) => (
            <div key={idx} className="col-12 col-md-6">
              <div className="card h-100 p-4 border-0 shadow-sm rounded-4 hover-card bg-light">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className={`fs-3 ${cat.color}`}>
                    <i className={`bi ${cat.icon}`}></i>
                  </div>
                  <h5 className="fw-bold mb-0 text-dark">{cat.title}</h5>
                </div>

                <div className="d-flex flex-column gap-3">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx}>
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-semibold small text-dark">{skill.name}</span>
                        <span className="font-mono text-muted small">{skill.level}</span>
                      </div>
                      <div
                        className="progress"
                        style={{ height: "6px", backgroundColor: "#e2e8f0" }}
                      >
                        <div
                          className="progress-bar rounded-pill"
                          role="progressbar"
                          style={{
                            width: skill.level,
                            backgroundColor: cat.color.includes("danger")
                              ? "#ea580c"
                              : cat.color.includes("primary")
                              ? "#0d6efd"
                              : cat.color.includes("success")
                              ? "#10b981"
                              : "#06b6d4"
                          }}
                          aria-valuenow={parseInt(skill.level)}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic skills pill badges from profile */}
        {profile.skills && profile.skills.length > 0 && (
          <div className="mt-5 p-4 rounded-4 bg-light border text-center">
            <span className="small text-muted font-mono text-uppercase fw-bold d-block mb-3">
              All Indexed Competencies:
            </span>
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="badge bg-white text-dark border px-3 py-2 rounded-pill fw-semibold shadow-sm"
                >
                  <i className="bi bi-check2 text-success me-1"></i> {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;
