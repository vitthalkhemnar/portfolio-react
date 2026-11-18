import { useSelector } from "react-redux";

const Skills = () => {
  const profile = useSelector((state) => state.profile);

  // Dynamic skills list from Redux/Admin
  const allSkills = profile.skills || [];

  const backendKeywords = ["java", "spring", "hibernate", "jpa", "microservice", "rest", "api", "security", "backend"];
  const dbToolsKeywords = ["sql", "mongo", "docker", "git", "maven", "postman", "swagger", "database", "redis", "linux", "cloud", "aws"];

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

  const rawCategories = [
    {
      title: "Backend & Core Architecture",
      icon: "bi-cup-hot",
      skills: backendSkills
    },
    {
      title: "Databases & DevOps Tools",
      icon: "bi-database",
      skills: dbToolsSkills
    },
    {
      title: "Full Stack & Practices",
      icon: "bi-laptop",
      skills: otherSkills
    }
  ];

  // If categorization leaves any empty, provide a balanced distribution of allSkills
  const categories = rawCategories.filter((c) => c.skills.length > 0);
  const displayCategories =
    categories.length > 0
      ? categories
      : allSkills.length > 0
      ? [
          {
            title: "Technical Skills",
            icon: "bi-stars",
            skills: allSkills
          }
        ]
      : [];

  if (displayCategories.length === 0) {
    return null;
  }

  return (
    <div className="py-5 px-3">
      <div className="container py-3" style={{ maxWidth: "960px" }}>
        {/* Clean Section Header */}
        <div className="text-center mb-5">
          <h2 className="section-heading">Skills & Technologies</h2>
          <p className="section-desc">
            The core tools, languages, and frameworks used in daily development.
          </p>
        </div>

        <div className="row g-4">
          {displayCategories.map((cat, idx) => (
            <div key={idx} className="col-12 col-md-4">
              <div className="clean-card p-4 h-100">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <i className={`bi ${cat.icon} text-primary fs-5`}></i>
                  <h6 className="fw-bold mb-0 text-dark">{cat.title}</h6>
                </div>
                <div className="d-flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="clean-chip">
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
