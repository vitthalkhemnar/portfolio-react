import { useSelector } from "react-redux";

const About = () => {
  const profile = useSelector((state) => state.profile);

  return (
    <div
      className="d-flex align-items-center justify-content-center px-3"
      style={{
        minHeight: "80vh",
        paddingTop: "60px",
        paddingBottom: "60px",
      }}
    >
      <div className="container" style={{ maxWidth: "1000px" }}>
        {/* Heading */}
        <div className="fw-bold fs-6 mb-3 text-center text-md-start">
          <p className="role text-primary m-0 text-uppercase letter-spacing-1">About Me</p>
        </div>

        {/* Content Row */}
        <div className="row align-items-center justify-content-center g-4">
          {/* LEFT SIDE - Profile Image */}
          <div className="col-12 col-md-5 d-flex justify-content-center">
            <div
              className="overflow-hidden shadow-sm"
              style={{
                width: "100%",
                maxWidth: "350px",
                height: "280px",
                backgroundColor: "#fff",
                borderRadius: "20px",
              }}
            >
              <img
                src="/images/aboutme.jpeg"
                alt="About Vitthal Khemnar"
                className="w-100 h-100"
                style={{
                  objectFit: "cover",
                  borderRadius: "20px",
                }}
              />
            </div>
          </div>

          {/* RIGHT SIDE - About Text */}
          <div className="col-12 col-md-7 text-center text-md-start">
            <div className="fw-bold fs-4 mb-3">
              <p className="heading m-0">
                A dedicated {profile.role || "Java Back-End Developer"} based in {profile.location || "Pune, India"}.
              </p>
            </div>

            <div className="summary text-secondary fs-6 mb-4">
              <p className="m-0" style={{ lineHeight: "1.7" }}>
                {profile.aboutMe ||
                  "Passionate backend developer with experience in building scalable microservices, REST APIs, and database optimizations."}
              </p>
            </div>

            {/* Skills Pills */}
            {profile.skills && profile.skills.length > 0 && (
              <div>
                <h6 className="fw-bold text-dark mb-2">Key Competencies:</h6>
                <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-md-start">
                  {profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="badge bg-light text-primary border border-primary px-3 py-2 rounded-pill fw-normal"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
