import { useEffect } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../redux/profile/profileSlice";

const Home = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    const userData = {
      name: "Vitthal Khemnar",
      role: "Java Back-End Developer",
      experience: "1 year",
      skills: ["Core Java", "Spring Boot", "ReactJS"],
      location: "Pune, India",
      linkedInUrl: "https://www.linkedin.com/in/vitthalkhemnar/",
      githubUrl: "https://github.com/vitthalkhemnar",
      whatsappNo: "918767841958",
      email: "vitthalkkhemnar@gmail.com",
      summary: "",
      aboutMe:
        "I am a Java Backend Developer with 1 year of professional experience at ANMsoft Technologies. My expertise includes Core Java, Spring, Spring Boot, Spring Data JPA, Hibernate, and Microservices architecture, with a focus on problem-solving and writing clean, maintainable code. I am eager to continue enhancing my skills and contribute to impactful projects.",
    };

    dispatch(setProfile(userData));
  }, [dispatch]);

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
              {profile.role}{" "}
              <span role="img" aria-label="wave">
                👋
              </span>
            </p>
          </div>

          <div className="summary mb-3">
            <p className="m-0">
              Hi, I'm <strong>{profile.name}</strong>. A passionate{" "}
              {profile.role} based in {profile.location}.
            </p>
          </div>

          {/* Social Icons */}
          <div className="d-flex flex-column align-items-center align-items-md-start gap-3 mb-4">
            {/* Social Icons */}
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <a
                href={profile.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-link"
              >
                <i className="bi bi-linkedin"></i>
              </a>

              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-link"
              >
                <i className="bi bi-github"></i>
              </a>
            </div>

            {/* Download CV Button */}
            <a
              href="/Vitthal Khemnar - Resume.pdf"
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
            <p className="fw-bold mb-0 me-2">Tech Stack</p>
            {/* <div
              style={{
                width: "2px",
                height: "25px",
                backgroundColor: "black",
                marginRight: "10px",
                color: "rgba(0, 191, 255, 0.9)",
              }}
            ></div> */}

            <div className="d-flex align-items-center gap-3 flex-wrap justify-content-center justify-content-md-start">
              <img src="/icons/java.png" alt="Java" style={{ width: "35px" }} />
              <img
                src="/icons/spring.png"
                alt="Spring Boot"
                style={{ width: "25px" }}
              />
              <img src="/icons/git.png" alt="Git" style={{ width: "25px" }} />
              <img
                src="/icons/react.png"
                alt="React"
                style={{ width: "25px" }}
              />
              <img src="/icons/mysql.png" alt="SQL" style={{ width: "25px" }} />
              <img
                src="/icons/mongo.png"
                alt="Mongo"
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
              // backgroundColor: "#fff",
              // boxShadow: "0 0 10px rgba(0,0,0,0.2)",
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
                border: "3px solid rgba(180, 180, 180, 0.8)", // Silver-gray border
                boxShadow: "0 0 12px rgba(200, 200, 200, 0.4)", // subtle glow
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
