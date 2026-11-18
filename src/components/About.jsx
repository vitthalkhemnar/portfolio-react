import { useSelector } from "react-redux";

const About = () => {
  const profile = useSelector((state) => state.profile);

  const highlights = [
    {
      icon: "bi-layers-fill",
      color: "text-primary",
      title: "Clean Architecture & OOP",
      desc: "Deep grasp of SOLID principles, Design Patterns, and decoupled Service-Repository layers."
    },
    {
      icon: "bi-speedometer2",
      color: "text-warning",
      title: "Database Optimization",
      desc: "Expertise in Hibernate ORM, indexing, execution plans, and transaction management in MySQL."
    },
    {
      icon: "bi-cpu-fill",
      color: "text-success",
      title: "Resilient Microservices",
      desc: "Building independent, fault-tolerant services communicating via high-throughput RESTful endpoints."
    },
    {
      icon: "bi-shield-lock-fill",
      color: "text-danger",
      title: "Security & Standards",
      desc: "Implementing JWT authentication, CORS, input validation, and OpenAPI / Swagger contracts."
    }
  ];

  return (
    <div className="py-5 px-3">
      <div className="container py-4" style={{ maxWidth: "1100px" }}>
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="section-tag mb-2">About The Developer</span>
          <h2 className="section-title fs-2 mt-2">Passionate About Robust Backend Engineering</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
            Focused on writing readable, testable, and highly performant Java code that powers mission-critical systems.
          </p>
        </div>

        {/* Content Row */}
        <div className="row align-items-center g-5 mb-5">
          {/* LEFT SIDE - Profile Image Card */}
          <div className="col-12 col-md-5 d-flex justify-content-center">
            <div
              className="position-relative"
              style={{ maxWidth: "360px", width: "100%" }}
            >
              <div
                className="overflow-hidden shadow-lg"
                style={{
                  borderRadius: "24px",
                  border: "4px solid #ffffff",
                  height: "380px"
                }}
              >
                <img
                  src="/images/aboutme.jpeg"
                  alt="Vitthal Khemnar"
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
              <div
                className="position-absolute bottom-0 start-50 translate-middle-x bg-white shadow-sm px-4 py-2 rounded-pill border text-nowrap"
                style={{ marginBottom: "-15px" }}
              >
                <span className="small fw-bold text-dark">
                  <i className="bi bi-geo-alt-fill text-danger me-1"></i> {profile.location || "Pune, India"}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Biography & Approach */}
          <div className="col-12 col-md-7 text-center text-md-start">
            <h4 className="fw-bold mb-3 text-dark">
              Java Backend Developer with a Passion for Distributed Systems
            </h4>

            <p className="text-secondary mb-4" style={{ lineHeight: "1.8", fontSize: "1.05rem" }}>
              {profile.aboutMe ||
                "I am a Java Backend Developer with professional experience at ANMsoft Technologies. My expertise includes Core Java, Spring Boot, Spring Data JPA, Hibernate, and Microservices architecture. I focus on writing clean, scalable code and delivering robust APIs."}
            </p>

            <div className="p-3 rounded-3 bg-white border shadow-sm mb-4">
              <div className="row g-3 text-center">
                <div className="col-4 border-end">
                  <div className="fs-3 fw-bold text-primary">{profile.experience || "1+ Yrs"}</div>
                  <div className="small text-muted">Experience</div>
                </div>
                <div className="col-4 border-end">
                  <div className="fs-3 fw-bold text-success">100%</div>
                  <div className="small text-muted">Clean Code</div>
                </div>
                <div className="col-4">
                  <div className="fs-3 fw-bold text-warning">REST</div>
                  <div className="small text-muted">API Standards</div>
                </div>
              </div>
            </div>

            <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-md-start">
              <a
                href="#experience"
                className="btn btn-outline-primary rounded-pill px-4 fw-semibold"
              >
                Work History <i className="bi bi-arrow-down-short"></i>
              </a>
              <a
                href="#contact"
                className="btn btn-light rounded-pill px-4 fw-semibold border"
              >
                Let's Connect
              </a>
            </div>
          </div>
        </div>

        {/* Engineering Pillars Grid */}
        <div className="row g-4 pt-4">
          {highlights.map((item, idx) => (
            <div key={idx} className="col-12 col-sm-6 col-lg-3">
              <div className="card h-100 p-4 border-0 shadow-sm rounded-4 hover-card bg-white">
                <div className="fs-2 mb-3">
                  <i className={`bi ${item.icon} ${item.color}`}></i>
                </div>
                <h6 className="fw-bold text-dark mb-2">{item.title}</h6>
                <p className="text-muted small mb-0" style={{ lineHeight: "1.6" }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
