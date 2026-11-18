import { useSelector } from "react-redux";
import { calculateTotalExperience } from "../utils/experienceCalculator";

const About = () => {
  const profile = useSelector((state) => state.profile);
  const companies = useSelector((state) => state.profile.companies) || [];
  const calculatedExp = calculateTotalExperience(companies);

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
                border: "1px solid rgba(255, 255, 255, 0.1)",
                background: "#111827"
              }}
            >
              <img
                src="/images/aboutme.jpeg"
                alt="Vitthal Khemnar"
                className="w-100 h-100 object-fit-cover"
              />
            </div>
          </div>

          <div className="col-12 col-md-8 text-center text-md-start">
            <p className="fs-6 mb-3" style={{ color: "#94a3b8", lineHeight: "1.8" }}>
              {profile.aboutMe ||
                "I am a Java Backend Developer with professional experience at ANMsoft Technologies. My expertise includes Core Java, Spring Boot, Spring Data JPA, Hibernate, and Microservices architecture."}
            </p>
            <p className="fs-6 mb-0" style={{ color: "#94a3b8", lineHeight: "1.8" }}>
              I focus on writing clean, maintainable code, designing scalable REST APIs, and optimizing database performance. I value clear communication, strong fundamentals in Object-Oriented Programming, and team collaboration.
            </p>
          </div>
        </div>

        {/* 3 Simple Stat Cards */}
        <div className="row g-3 text-center">
          <div className="col-12 col-md-4">
            <div className="clean-card p-4 h-100">
              <div className="fs-3 fw-bold text-white mb-1">{calculatedExp}</div>
              <div className="small" style={{ color: "#94a3b8" }}>Experience (Calculated)</div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="clean-card p-4 h-100">
              <div className="fs-3 fw-bold text-white mb-1">Spring Boot</div>
              <div className="small" style={{ color: "#94a3b8" }}>Microservices & APIs</div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="clean-card p-4 h-100">
              <div className="fs-3 fw-bold text-white mb-1">{profile.location || "Pune, India"}</div>
              <div className="small" style={{ color: "#94a3b8" }}>Current Location</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
