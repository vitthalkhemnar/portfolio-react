const About = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container d-flex p-0" style={{ maxWidth: "50%" }}>
        {/* LEFT SIDE - Profile Image */}
        <div className="picture flex-fill p-4 d-flex flex-column justify-content-center align-items-center text-center">
          <div
            className="overflow-hidden d-flex justify-content-center align-items-center mb-3"
            style={{
              width: "20vw",
              height: "20vw",
              maxWidth: "250px",
              maxHeight: "250px",
              minWidth: "120px",
              minHeight: "120px",
              backgroundColor: "#fff",
              boxShadow: "0 0 10px rgba(0,0,0,0.2)",
              borderRadius: "20px", // rounded corners
            }}
          >
            <img
              src="/images/aboutme.jpeg"
              alt="profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "20px", // ensures the image itself is rounded
              }}
            />
          </div>
        </div>

        {/* RIGHT SIDE - About Text */}
        <div className="content flex-fill p-4 d-flex flex-column justify-content-center">
          <div className="fw-bold fs-6 mb-3">
            <p
              className="role text-primary m-0 text-uppercase"
            >
              About Me
            </p>
          </div>

          <div className="fw-bold fs-4 mb-3">
            <p className="heading m-0">
              A dedicated Back-end Developer based in Pune, India.
            </p>
          </div>

          <div className="summary text-dark">
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
