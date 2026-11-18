import { useSelector } from "react-redux";

const About = () => {
  const profile = useSelector((state) => state.profile);
  const companies = useSelector((state) => state.profile.companies) || [];
  const projects = useSelector((state) => state.profile.projects) || [];

  const currentCompany =
    companies.find((c) => c.isCurrent)?.company ||
    (companies[0] ? companies[0].company : "");

  const role = profile.role || "Java Backend Developer";
  const name = profile.name || "Vitthal Khemnar";

  const defaultAboutMe = `I am a ${role} with professional experience${
    currentCompany ? ` at ${currentCompany}` : " in enterprise software"
  }. My expertise includes Core Java, Spring Boot, Spring Data JPA, Hibernate, and Microservices architecture. I focus on developing resilient RESTful services, optimizing database query performance, and implementing secure backend systems.`;

  const aboutText = profile.aboutMe || defaultAboutMe;

  return (
    <div className="py-5 px-3">
      <div className="container py-3" style={{ maxWidth: "900px" }}>
        {/* Clean Section Header */}
        <div className="text-center mb-5">
          <h2 className="section-heading">About Me</h2>
        </div>

        <div className="row g-4 align-items-center mb-5">
          <div className="col-12 col-md-4 text-center">
            <div
              className="mx-auto overflow-hidden shadow-sm"
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "20px",
                border: "1px solid var(--border-subtle)",
                background: "#ffffff"
              }}
            >
              <img
                src="/images/aboutme.jpeg"
                alt={name}
                className="w-100 h-100 object-fit-cover"
              />
            </div>
          </div>

          <div className="col-12 col-md-8 text-center text-md-start">
            <p className="fs-6 mb-3" style={{ color: "var(--text-body)", lineHeight: "1.8" }}>
              {aboutText}
            </p>
            <p className="fs-6 mb-0" style={{ color: "var(--text-body)", lineHeight: "1.8" }}>
              I focus on writing clean, maintainable code, designing scalable REST APIs, and optimizing database performance. I value clear communication, strong fundamentals in Object-Oriented Programming, and team collaboration.
            </p>
          </div>
        </div>

        {/* 3 Dynamic Stat Cards */}
        <div className="row g-3 text-center">
          <div className="col-12 col-md-4">
            <div className="clean-card p-4 h-100">
              <div className="fs-3 fw-bold text-dark mb-1">{profile.experience || "1.5+ Years"}</div>
              <div className="small text-muted">Experience</div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="clean-card p-4 h-100">
              <div className="fs-3 fw-bold text-dark mb-1">
                {projects.length > 0 ? `${projects.length}+ Projects` : "4+ Projects"}
              </div>
              <div className="small text-muted">Built & Showcased</div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="clean-card p-4 h-100">
              <div className="fs-3 fw-bold text-dark mb-1">
                {profile.location || "Pune, Maharashtra, India"}
              </div>
              <div className="small text-muted">Primary Location</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
