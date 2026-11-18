const Skills = () => {
  const categories = [
    {
      title: "Backend & Core Java",
      icon: "bi-cup-hot",
      skills: [
        "Core Java (OOP, Collections, Streams)",
        "Spring Boot",
        "Spring Data JPA",
        "Hibernate ORM",
        "Microservices Architecture",
        "RESTful Web Services",
        "Spring Security"
      ]
    },
    {
      title: "Databases & DevOps",
      icon: "bi-database",
      skills: [
        "MySQL",
        "PostgreSQL",
        "MongoDB",
        "Docker",
        "Git & GitHub",
        "Maven",
        "Postman",
        "OpenAPI / Swagger"
      ]
    },
    {
      title: "Frontend & Full Stack",
      icon: "bi-laptop",
      skills: [
        "ReactJS",
        "Redux Toolkit",
        "JavaScript (ES6+)",
        "Bootstrap 5",
        "HTML5 & CSS3"
      ]
    }
  ];

  return (
    <div className="py-5 px-3 bg-light">
      <div className="container py-4" style={{ maxWidth: "960px" }}>
        <div className="text-center mb-5">
          <span className="section-badge">Expertise</span>
          <h2 className="section-heading">Skills & Technologies</h2>
          <p className="section-desc">
            The core tools and frameworks I use to build scalable backend services.
          </p>
        </div>

        <div className="row g-4">
          {categories.map((cat, idx) => (
            <div key={idx} className="col-12 col-md-4">
              <div className="clean-card p-4 h-100 bg-white">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <i className={`bi ${cat.icon} text-primary fs-5`}></i>
                  <h6 className="fw-bold mb-0 text-dark">{cat.title}</h6>
                </div>
                <div className="d-flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="badge bg-light text-secondary border px-3 py-2 fw-normal"
                      style={{ fontSize: "0.85rem", borderRadius: "8px" }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
