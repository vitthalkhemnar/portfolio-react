import { useSelector } from "react-redux";

const Skills = () => {
  const profile = useSelector((state) => state.profile);

  // Dynamic skills list from Redux/Admin
  const allSkills = profile.skills && profile.skills.length > 0
    ? profile.skills
    : [
        "Core Java",
        "Spring Boot",
        "Spring Data JPA",
        "Hibernate ORM",
        "Microservices",
        "REST APIs",
        "Spring Security",
        "MySQL",
        "PostgreSQL",
        "MongoDB",
        "Docker",
        "Git & GitHub",
        "Maven",
        "Postman",
        "ReactJS"
      ];

  const backendKeywords = ["java", "spring", "hibernate", "jpa", "microservice", "rest", "api", "security"];
  const dbToolsKeywords = ["sql", "mongo", "docker", "git", "maven", "postman", "swagger", "database", "redis", "linux"];

  const backendSkills = [];
  const dbToolsSkills = [];
  const otherSkills = [];

  allSkills.forEach((skill) => {
    const sLower = skill.toLowerCase();
    if (backendKeywords.some((k) => sLower.includes(k))) {
      backendSkills.push(skill);
    } else if (dbToolsKeywords.some((k) => sLower.includes(k))) {
      dbToolsSkills.push(skill);
    } else {
      otherSkills.push(skill);
    }
  });

  const categories = [
    {
      title: "Backend & Core Java",
      icon: "bi-cup-hot",
      skills: backendSkills.length > 0 ? backendSkills : allSkills.slice(0, 7)
    },
    {
      title: "Databases & Tools",
      icon: "bi-database",
      skills: dbToolsSkills.length > 0 ? dbToolsSkills : allSkills.slice(7, 13)
    },
    {
      title: "Full Stack & Practices",
      icon: "bi-laptop",
      skills: otherSkills.length > 0 ? otherSkills : ["ReactJS", "Redux Toolkit", "JavaScript", "Bootstrap", "Agile / Scrum"]
    }
  ];

  return (
    <div className="py-5 px-3 bg-light">
      <div className="container py-3" style={{ maxWidth: "960px" }}>
        {/* Clean Section Header */}
        <div className="text-center mb-5">
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
                  <i className={`bi ${cat.icon} text-accent fs-5`}></i>
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
