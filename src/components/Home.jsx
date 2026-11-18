import "./Home.css";
import { useSelector } from "react-redux";

const Home = () => {
  const profile = useSelector((state) => state.profile);

  return (
    <div className="home-hero-wrapper min-vh-100 d-flex align-items-center">
      <div className="container py-5 mt-5">
        <div className="row align-items-center g-5">
          {/* ===== Left Column (Text & Intro) ===== */}
          <div className="col-12 col-lg-7 text-center text-lg-start">
            {/* Status Pill */}
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill status-pill mb-3">
              <span className="pulse-dot"></span>
              <span className="font-mono small fw-semibold text-dark">
                spring-boot:status = <span className="text-success">UP (200 OK)</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-title mb-3">
              Building Scalable Backend Systems with{" "}
              <span className="text-java-gradient">Java & Spring Boot</span>
            </h1>

            {/* Intro paragraph */}
            <p className="hero-lead mb-4 text-secondary">
              Hi, I'm <strong className="text-dark">{profile.name || "Vitthal Khemnar"}</strong>. A dedicated{" "}
              <strong className="text-dark">{profile.role || "Java Backend Developer"}</strong> based in{" "}
              {profile.location || "Pune, India"}. I design and engineer resilient microservices, high-performance RESTful APIs, and optimized database architectures.
            </p>

            {/* Action Buttons */}
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start gap-3 mb-4">
              <a
                href={profile.resumeUrl || "/Vitthal Khemnar - Resume.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2 shadow-sm"
              >
                <i className="bi bi-cloud-arrow-down-fill"></i> Download Resume
              </a>

              <a
                href="#project"
                className="btn btn-outline-dark rounded-pill px-4 py-2 fw-semibold"
              >
                View Projects
              </a>

              {/* Social Icons */}
              <div className="d-flex align-items-center gap-2 ms-lg-2">
                {profile.linkedInUrl && (
                  <a
                    href={profile.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    title="LinkedIn"
                    aria-label="LinkedIn Profile"
                  >
                    <i className="bi bi-linkedin"></i>
                  </a>
                )}
                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    title="GitHub"
                    aria-label="GitHub Profile"
                  >
                    <i className="bi bi-github"></i>
                  </a>
                )}
                <a
                  href={`mailto:${profile.email || "vitthalkkhemnar@gmail.com"}`}
                  className="social-btn"
                  title="Email"
                  aria-label="Send Email"
                >
                  <i className="bi bi-envelope-fill"></i>
                </a>
              </div>
            </div>

            {/* Core Tech Stack Icons */}
            <div className="tech-stack-row pt-3 border-top d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start gap-3">
              <span className="font-mono small fw-bold text-muted text-uppercase me-2">
                Ecosystem:
              </span>
              <div className="d-flex align-items-center gap-3 flex-wrap justify-content-center">
                <span className="tech-badge" title="Java">
                  <img src="/icons/java.png" alt="Java" style={{ width: "24px" }} />
                  <span className="small fw-semibold">Java 17/21</span>
                </span>
                <span className="tech-badge" title="Spring Boot">
                  <img src="/icons/spring.png" alt="Spring Boot" style={{ width: "20px" }} />
                  <span className="small fw-semibold">Spring Boot</span>
                </span>
                <span className="tech-badge" title="Microservices">
                  <i className="bi bi-diagram-3-fill text-primary"></i>
                  <span className="small fw-semibold">Microservices</span>
                </span>
                <span className="tech-badge" title="MySQL">
                  <img src="/icons/mysql.png" alt="MySQL" style={{ width: "22px" }} />
                  <span className="small fw-semibold">MySQL</span>
                </span>
                <span className="tech-badge" title="Docker">
                  <i className="bi bi-box-seam text-info"></i>
                  <span className="small fw-semibold">Docker</span>
                </span>
              </div>
            </div>
          </div>

          {/* ===== Right Column (Code Window & Profile Card) ===== */}
          <div className="col-12 col-lg-5">
            <div className="d-flex flex-column gap-4 align-items-center">
              {/* Profile Card with Glass Border */}
              <div className="hero-avatar-wrapper position-relative">
                <div className="hero-avatar-circle">
                  <img
                    src="/images/vitthal-image.jpeg"
                    alt={profile.name || "Vitthal Khemnar"}
                    className="w-100 h-100 object-fit-cover rounded-circle shadow"
                  />
                </div>
                {/* Floating Experience Badge */}
                <div className="floating-badge shadow-sm">
                  <i className="bi bi-award-fill text-warning fs-5"></i>
                  <div>
                    <div className="fw-bold small">{profile.experience || "1+ Years"}</div>
                    <div className="text-muted" style={{ fontSize: "0.7rem" }}>Industry Experience</div>
                  </div>
                </div>
              </div>

              {/* Java REST Controller Code Widget */}
              <div className="java-code-window w-100 text-start">
                <div className="window-header">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                  <span className="window-title">VitthalController.java</span>
                </div>
                <div className="p-3">
                  <div style={{ color: "#f59e0b" }}>@RestController</div>
                  <div style={{ color: "#f59e0b" }}>@RequestMapping<span style={{ color: "#e2e8f0" }}>(&quot;/api/v1/engineer&quot;)</span></div>
                  <div><span style={{ color: "#38bdf8" }}>public class</span> <span style={{ color: "#4ade80" }}>VitthalController</span> &#123;</div>
                  <div className="ms-3 my-1" style={{ color: "#f59e0b" }}>@GetMapping<span style={{ color: "#e2e8f0" }}>(&quot;/skills&quot;)</span></div>
                  <div className="ms-3">
                    <span style={{ color: "#38bdf8" }}>public</span> <span style={{ color: "#4ade80" }}>ResponseEntity</span>&lt;List&lt;String&gt;&gt; getStack() &#123;
                  </div>
                  <div className="ms-4 text-secondary">
                    <span style={{ color: "#c084fc" }}>return</span> ResponseEntity.ok(
                  </div>
                  <div className="ms-5" style={{ color: "#fcd34d" }}>
                    List.of(&quot;Java&quot;, &quot;Spring Boot&quot;, &quot;JPA/Hibernate&quot;, &quot;Microservices&quot;)
                  </div>
                  <div className="ms-4">);</div>
                  <div className="ms-3">&#125;</div>
                  <div>&#125;</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
