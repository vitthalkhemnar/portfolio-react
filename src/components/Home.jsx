import "./Home.css";
import { useSelector } from "react-redux";
import { calculateTotalExperience } from "../utils/experienceCalculator";

const Home = () => {
  const profile = useSelector((state) => state.profile);
  const companies = useSelector((state) => state.profile.companies) || [];
  const calculatedExp = calculateTotalExperience(companies);

  const currentCompany =
    companies.find((c) => c.isCurrent)?.company ||
    (companies[0] ? companies[0].company : "");

  const displaySkills =
    profile.skills && profile.skills.length > 0
      ? profile.skills.slice(0, 6)
      : ["Core Java", "Spring Boot", "Microservices", "Hibernate", "MySQL", "Docker"];

  const role = profile.role || "Java Backend Developer";
  const name = profile.name || "Vitthal Khemnar";

  return (
    <section className="hero-section d-flex align-items-center">
      <div className="container py-5">
        <div className="row align-items-center g-5 py-4">
          {/* Left Column (Bio & Intro) */}
          <div className="col-12 col-lg-7 text-center text-lg-start">
            <div className="d-inline-flex align-items-center gap-2 mb-3 px-3 py-1 rounded-pill hero-status-pill">
              <span className="hero-status-dot"></span>
              <span className="small text-muted fw-medium">Available for Backend Roles</span>
            </div>

            <h1 className="hero-heading mb-3">
              {role} building clean, resilient systems.
            </h1>

            <p className="hero-description mb-4">
              I'm <strong className="text-dark fw-semibold">{name}</strong>, a {role.toLowerCase()} with {calculatedExp} of professional experience{currentCompany ? ` at ${currentCompany}` : ""}. {profile.summary || "I specialize in Core Java, Spring Boot, and scalable microservices architecture."}
            </p>

            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start gap-3 mb-4">
              <a href="#project" className="btn-clean-primary">
                View Projects <i className="bi bi-arrow-down-short"></i>
              </a>

              <a
                href={profile.resumeUrl || "/Vitthal Khemnar - Resume.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-clean-secondary"
              >
                <i className="bi bi-file-earmark-pdf"></i> Download Resume
              </a>

              <div className="d-flex align-items-center gap-2 ms-lg-2">
                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-social-link"
                    title="GitHub"
                    aria-label="GitHub Profile"
                  >
                    <i className="bi bi-github"></i>
                  </a>
                )}
                {profile.linkedInUrl && (
                  <a
                    href={profile.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-social-link"
                    title="LinkedIn"
                    aria-label="LinkedIn Profile"
                  >
                    <i className="bi bi-linkedin"></i>
                  </a>
                )}
                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="hero-social-link"
                    title="Email"
                    aria-label="Send Email"
                  >
                    <i className="bi bi-envelope"></i>
                  </a>
                )}
              </div>
            </div>

            {/* Clean Tech Pills */}
            {displaySkills.length > 0 && (
              <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start gap-2 pt-2">
                <span className="small text-muted me-1">Core Stack:</span>
                {displaySkills.map((tech) => (
                  <span key={tech} className="clean-chip">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right Column (Minimal Clean Photo) */}
          <div className="col-12 col-lg-5 d-flex justify-content-center">
            <div className="hero-photo-wrapper">
              <img
                src="/images/vitthal-image.jpeg"
                alt={name}
                className="hero-photo-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
