import "./Home.css";
import { useSelector } from "react-redux";

const Home = () => {
  const profile = useSelector((state) => state.profile);

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 px-3">
      <div
        className="d-flex flex-column flex-md-row align-items-center justify-content-center w-100"
        style={{ maxWidth: "900px" }}
      >
        {/* ===== Left Section (Text) ===== */}
        <div className="text-center text-md-start mb-4 mb-md-0 flex-fill px-3">
          <div className="fw-bold fs-2 fs-md-1 mb-3">
            <p className="role mb-0">
              {profile.role || "Backend Developer"}{" "}
              <span role="img" aria-label="wave">
                👋
              </span>
            </p>
          </div>

          <div className="summary mb-3">
            <p className="m-0">
              Hi, I'm <strong>{profile.name || "Vitthal Khemnar"}</strong>. A passionate{" "}
              {profile.role || "Java Back-End Developer"} based in {profile.location || "Pune, India"}.
            </p>
          </div>

          {/* Social Icons & CV */}
          <div className="d-flex flex-column align-items-center align-items-md-start gap-3 mb-4">
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              {profile.linkedInUrl && (
                <a
                  href={profile.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-link"
                  aria-label="LinkedIn"
                >
                  <i className="bi bi-linkedin"></i>
                </a>
              )}

              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-link"
                  aria-label="GitHub"
                >
                  <i className="bi bi-github"></i>
                </a>
              )}
            </div>

            {/* Download CV Button */}
            <a
              href={profile.resumeUrl || "/Vitthal Khemnar - Resume.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              <button className="download-btn d-flex align-items-center gap-2">
                Download CV
                <i className="bi bi-cloud-arrow-down"></i>
              </button>
            </a>
          </div>

          {/* Tech Stack */}
          <div className="d-flex align-items-center justify-content-center justify-content-md-start flex-wrap mt-4 pt-2">
            <p className="fw-bold mb-0 me-3">Tech Stack</p>
            <div className="d-flex align-items-center gap-3 flex-wrap justify-content-center justify-content-md-start">
              <img src="/icons/java.png" alt="Java" title="Java" style={{ width: "35px" }} />
              <img
                src="/icons/spring.png"
                alt="Spring Boot"
                title="Spring Boot"
                style={{ width: "25px" }}
              />
              <img src="/icons/git.png" alt="Git" title="Git" style={{ width: "25px" }} />
              <img
                src="/icons/react.png"
                alt="React"
                title="React"
                style={{ width: "25px" }}
              />
              <img src="/icons/mysql.png" alt="MySQL" title="MySQL" style={{ width: "25px" }} />
              <img
                src="/icons/mongo.png"
                alt="MongoDB"
                title="MongoDB"
                style={{ width: "28px" }}
              />
            </div>
          </div>
        </div>

        {/* ===== Right Section (Image) ===== */}
        <div className="d-flex justify-content-center flex-fill px-3">
          <div
            className="overflow-hidden d-flex justify-content-center align-items-center"
            style={{
              width: "40vw",
              height: "40vw",
              maxWidth: "350px",
              maxHeight: "350px",
              minWidth: "120px",
              minHeight: "120px",
            }}
          >
            <img
              src="/images/vitthal-image.jpeg"
              alt="profile"
              className="animated-image"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                border: "3px solid rgba(180, 180, 180, 0.8)",
                boxShadow: "0 0 12px rgba(200, 200, 200, 0.4)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
