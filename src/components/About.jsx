import React from "react";

const About = () => {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 px-3">
      <div
        className="d-flex flex-column flex-md-row align-items-center justify-content-center w-100"
        style={{ maxWidth: "900px" }}
      >
        {/* LEFT SIDE - Profile Image */}
        <div className="picture flex-fill d-flex justify-content-center mb-4 mb-md-0 px-3">
          <div
            className="overflow-hidden d-flex justify-content-center align-items-center"
            style={{
              width: "40vw",
              height: "40vw",
              maxWidth: "350px",
              maxHeight: "250px",
              minWidth: "220px",
              minHeight: "120px",
              backgroundColor: "#fff",
              border: "1px solid black",
              boxShadow: "0 0 10px rgba(0,0,0,0.2)",
              borderRadius: "20px",
            }}
          >
            <img
              src="/images/aboutme.jpeg"
              alt="profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "20px",
              }}
            />
          </div>
        </div>

        {/* RIGHT SIDE - About Text */}
        <div className="content flex-fill px-3 d-flex flex-column justify-content-center text-center text-md-start">
          <div className="fw-bold fs-6 mb-2">
            <p className="role text-primary m-0 text-uppercase">About Me</p>
          </div>

          <div className="fw-bold fs-4 mb-3">
            <p className="heading m-0">
              A dedicated Back-end Developer based in Pune, India.
            </p>
          </div>

          <div className="summary text-dark fs-6">
            <p>
              I'm <strong>Vitthal Khemnar</strong>, a passionate Back-End Java
              Developer with expertise in Spring Boot, REST APIs, and
              Microservices. I enjoy designing scalable back-end systems and
              continuously improving my skills to build efficient solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
