import { useSelector } from "react-redux";
import HorizontalCarousel from "./common/HorizontalCarousel";

const DEFAULT_SKILL_DOMAINS = [
  {
    id: "backend",
    title: "Backend & Architecture",
    icon: "bi-server",
    skills: [
      "Core Java (11/17/21)",
      "Spring Boot",
      "Spring Data JPA",
      "Hibernate",
      "Microservices Architecture",
      "RESTful APIs",
      "Spring Security",
      "Distributed Systems"
    ]
  },
  {
    id: "database",
    title: "Databases & Storage",
    icon: "bi-database",
    skills: [
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Query Optimization",
      "Database Indexing"
    ]
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    icon: "bi-cloud-check",
    skills: [
      "Docker",
      "Kubernetes",
      "AWS (EC2, S3)",
      "Git & GitHub",
      "CI/CD Pipelines",
      "Maven",
      "Linux"
    ]
  },
  {
    id: "tools-frontend",
    title: "Frontend & Engineering Tools",
    icon: "bi-tools",
    skills: [
      "ReactJS",
      "JavaScript (ES6+)",
      "Postman",
      "JUnit & Mockito",
      "HTML5 / CSS3",
      "Bootstrap 5",
      "Redux Toolkit"
    ]
  }
];

/**
 * Smart Category Icon Resolver
 * Automatically infers and assigns the most appropriate icon
 * based on keywords in the category title, even for newly added categories.
 */
export const getCategoryIcon = (title = "", explicitIcon = "") => {
  if (explicitIcon && explicitIcon !== "bi-stars") {
    return explicitIcon;
  }
  const t = (title || "").toLowerCase();
  if (
    t.includes("backend") ||
    t.includes("java") ||
    t.includes("spring") ||
    t.includes("microservice") ||
    t.includes("server") ||
    t.includes("api")
  ) {
    return "bi-server";
  }
  if (
    t.includes("database") ||
    t.includes("sql") ||
    t.includes("storage") ||
    t.includes("caching") ||
    t.includes("redis") ||
    t.includes("data")
  ) {
    return "bi-database";
  }
  if (
    t.includes("cloud") ||
    t.includes("devops") ||
    t.includes("aws") ||
    t.includes("azure") ||
    t.includes("docker") ||
    t.includes("k8s") ||
    t.includes("kubernetes") ||
    t.includes("infra") ||
    t.includes("ci/cd")
  ) {
    return "bi-cloud-check";
  }
  if (
    t.includes("front") ||
    t.includes("ui") ||
    t.includes("ux") ||
    t.includes("web") ||
    t.includes("react") ||
    t.includes("client")
  ) {
    return "bi-laptop";
  }
  if (
    t.includes("security") ||
    t.includes("auth") ||
    t.includes("identity") ||
    t.includes("cyber")
  ) {
    return "bi-shield-lock";
  }
  if (
    t.includes("test") ||
    t.includes("qa") ||
    t.includes("quality") ||
    t.includes("junit")
  ) {
    return "bi-patch-check";
  }
  if (
    t.includes("architecture") ||
    t.includes("system") ||
    t.includes("distributed")
  ) {
    return "bi-diagram-3";
  }
  if (
    t.includes("tool") ||
    t.includes("utility") ||
    t.includes("engineering")
  ) {
    return "bi-tools";
  }
  if (
    t.includes("mobile") ||
    t.includes("android") ||
    t.includes("ios") ||
    t.includes("app")
  ) {
    return "bi-phone";
  }
  if (
    t.includes("ai") ||
    t.includes("ml") ||
    t.includes("machine learning") ||
    t.includes("intelligence")
  ) {
    return "bi-cpu";
  }
  return "bi-layers";
};

/**
 * Smart Skill Icon Resolver
 * Maps individual skills to recognizable micro-icons for visual clarity.
 */
export const getSkillIcon = (skillName = "") => {
  const s = (skillName || "").toLowerCase();
  if (s.includes("java")) return "bi-cup-hot";
  if (s.includes("spring")) return "bi-lightning-charge";
  if (s.includes("microservice")) return "bi-boxes";
  if (s.includes("api") || s.includes("rest")) return "bi-arrow-left-right";
  if (s.includes("hibernate") || s.includes("jpa")) return "bi-hdd-network";
  if (
    s.includes("sql") ||
    s.includes("postgres") ||
    s.includes("mysql") ||
    s.includes("mongo") ||
    s.includes("database")
  )
    return "bi-database";
  if (s.includes("redis") || s.includes("cache")) return "bi-memory";
  if (s.includes("docker") || s.includes("container")) return "bi-box-seam";
  if (s.includes("kubernetes") || s.includes("k8s")) return "bi-diagram-2";
  if (
    s.includes("aws") ||
    s.includes("cloud") ||
    s.includes("ec2") ||
    s.includes("s3")
  )
    return "bi-cloud";
  if (s.includes("git") || s.includes("github")) return "bi-git";
  if (s.includes("ci/cd") || s.includes("pipeline") || s.includes("devops"))
    return "bi-infinity";
  if (s.includes("maven") || s.includes("gradle")) return "bi-box";
  if (
    s.includes("linux") ||
    s.includes("bash") ||
    s.includes("terminal")
  )
    return "bi-terminal";
  if (s.includes("postman")) return "bi-send";
  if (s.includes("react")) return "bi-code-slash";
  if (
    s.includes("javascript") ||
    s.includes("typescript") ||
    s.includes("js") ||
    s.includes("ts")
  )
    return "bi-filetype-js";
  if (
    s.includes("html") ||
    s.includes("css") ||
    s.includes("bootstrap") ||
    s.includes("tailwind")
  )
    return "bi-layout-text-window-reverse";
  if (s.includes("security") || s.includes("jwt") || s.includes("oauth"))
    return "bi-shield-check";
  if (
    s.includes("junit") ||
    s.includes("mockito") ||
    s.includes("test")
  )
    return "bi-check2-circle";
  if (
    s.includes("kafka") ||
    s.includes("rabbit") ||
    s.includes("queue")
  )
    return "bi-broadcast";
  return null;
};

const SkillDomainCard = ({ domain, dIdx }) => {
  const resolvedCategoryIcon = getCategoryIcon(domain.title, domain.icon);

  return (
    <div className="clean-card p-4 p-md-4 h-100 w-100 d-flex flex-column">
      {/* Domain Card Header */}
      <div
        className="d-flex align-items-center justify-content-between pb-3 mb-3"
        style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}
      >
        <div className="d-flex align-items-center gap-3 min-w-0">
          <div
            className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
            style={{
              width: "44px",
              height: "44px",
              background: "rgba(255, 107, 0, 0.12)",
              color: "var(--primary)",
              border: "1px solid rgba(255, 107, 0, 0.35)",
              fontSize: "1.25rem",
              boxShadow: "0 0 14px rgba(255, 107, 0, 0.2)"
            }}
          >
            <i className={`bi ${resolvedCategoryIcon}`}></i>
          </div>
          <div className="min-w-0">
            <h5 className="fw-bold text-white mb-0 text-break">{domain.title}</h5>
            <span
              className="text-muted"
              style={{ fontSize: "0.78rem", letterSpacing: "0.02em" }}
            >
              {domain.skills.length} Technologies
            </span>
          </div>
        </div>

        <span
          className="badge rounded-pill flex-shrink-0"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color: "#d4d4d8",
            fontSize: "0.74rem",
            padding: "5px 10px",
            fontWeight: "500"
          }}
        >
          {String(dIdx + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Organized Skills Chips */}
      {domain.skills.length === 0 ? (
        <div className="text-muted small py-4 text-center">
          No skills configured in this domain.
        </div>
      ) : (
        <div className="d-flex flex-wrap gap-2 my-auto py-2">
          {domain.skills.map((skill, sIdx) => {
            const skillIcon = getSkillIcon(skill);
            return (
              <div
                key={sIdx}
                className="clean-chip d-inline-flex align-items-center gap-2 px-3 py-2"
                style={{
                  fontSize: "0.84rem",
                  fontWeight: "500",
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.09)",
                  transition: "all 0.2s ease"
                }}
              >
                {skillIcon ? (
                  <i
                    className={`bi ${skillIcon}`}
                    style={{
                      color: "var(--primary)",
                      fontSize: "0.85rem"
                    }}
                  ></i>
                ) : (
                  <span
                    className="rounded-circle d-inline-block flex-shrink-0"
                    style={{
                      width: "6px",
                      height: "6px",
                      backgroundColor: "var(--primary)",
                      boxShadow: "0 0 6px rgba(255, 107, 0, 0.7)"
                    }}
                  ></span>
                )}
                <span>{skill}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Card Footer: Enterprise Proficiency indicator */}
      <div
        className="d-flex align-items-center justify-content-between pt-3 mt-auto"
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.06)",
          fontSize: "0.76rem"
        }}
      >
        <span className="text-muted d-flex align-items-center gap-1">
          <i
            className="bi bi-shield-check"
            style={{ color: "var(--primary)" }}
          ></i>
          Production Stack
        </span>
        <span className="text-muted" style={{ opacity: 0.65 }}>
          Hands-on Enterprise
        </span>
      </div>
    </div>
  );
};

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
      icon: catObj.icon || "",
      skills: Array.isArray(catObj.skills) ? catObj.skills : []
    };
  });

  return (
    <div className="py-5 px-3">
      <div className="container py-3" style={{ maxWidth: "1000px" }}>
        {categories.length === 0 ? (
          <div>
            <div className="text-center mb-5">
              <span className="section-eyebrow">{"// 02. SKILLS"}</span>
              <h2 className="section-heading">Skills & Technologies</h2>
              <p className="section-desc">
                Architectural domains, core frameworks, distributed systems, and modern engineering tools.
              </p>
            </div>
            <div className="clean-card p-5 text-center text-muted">
              <p className="mb-0">Skills details will be updated soon.</p>
            </div>
          </div>
        ) : categories.length === 1 ? (
          <div>
            <div className="text-center mb-5">
              <span className="section-eyebrow">{"// 02. SKILLS"}</span>
              <h2 className="section-heading">Skills & Technologies</h2>
              <p className="section-desc">
                Architectural domains, core frameworks, distributed systems, and modern engineering tools.
              </p>
            </div>
            <div className="row justify-content-center">
              <div className="col-12 col-md-8 col-lg-7">
                <SkillDomainCard domain={categories[0]} dIdx={0} />
              </div>
            </div>
          </div>
        ) : (
          <HorizontalCarousel
            items={categories}
            eyebrow="// 02. SKILLS"
            title="Skills & Technologies"
            subtitle="Architectural domains, core frameworks, distributed systems, and modern engineering tools."
            badgeText={`${categories.length} Domains`}
            itemClassName="skills-card-item"
            renderItem={(domain, dIdx) => (
              <SkillDomainCard domain={domain} dIdx={dIdx} />
            )}
          />
        )}
      </div>
    </div>
  );
};

export default Skills;
