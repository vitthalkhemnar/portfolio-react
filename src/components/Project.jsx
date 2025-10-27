import React, { useState } from "react";

const Project = () => {
  const [projects] = useState([
    {
      id: 1,
      name: "Bug Tracker",
      techStack: ["Java", "Spring Boot", "ReactJS"],
      description:
        "A full-stack project management system for tracking and resolving software bugs efficiently with real-time updates. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      image: "/images/bugtracker.jpeg",
    },
    {
      id: 2,
      name: "Payment Gateway Monitor",
      techStack: ["Java", "Spring Boot", "Kafka"],
      description:
        "A real-time transaction monitoring and fraud detection platform ensuring secure payment gateway operations. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      image: "/images/paymentgateway.jpeg",
    },
    {
      id: 3,
      name: "AI Analytics Dashboard",
      techStack: ["Python", "Flask", "ReactJS", "MongoDB"],
      description:
        "An intelligent analytics dashboard providing insights using machine learning and interactive visualizations. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      image: "/images/analytics.jpeg",
    },
  ]);

  return (
    <section id="portfolio" className="d-flex justify-content-center py-5 px-3">
      <div
        className="container"
        style={{
          maxWidth: "900px",
          width: "100%",
        }}
      >
        {/* Portfolio Heading - same as Contact */}
        <div className="fw-bold fs-6 mb-3 text-start">
          <p className="role text-primary m-0 text-uppercase">Portfolio</p>
        </div>

        {/* Optional Subheading */}
        <div className="fw-bold mb-4 text-start">
          <p className="m-0">
            Check out my projects!{" "}
            <span role="img" aria-label="projects">
              💻
            </span>
          </p>
        </div>

        {/* Project Cards */}
        {projects.map((proj, index) => (
          <div
            key={proj.id}
            className={`d-flex flex-column flex-md-row align-items-center mb-5 ${
              index % 2 !== 0 ? "flex-md-row-reverse" : ""
            }`}
          >
            {/* Project Image */}
            <div className="d-flex justify-content-center mb-3 mb-md-0 px-3 flex-fill">
              <div
                className="overflow-hidden"
                style={{
                  width: "40vw",
                  height: "40vw",
                  maxWidth: "300px",
                  maxHeight: "300px",
                  minWidth: "120px",
                  minHeight: "120px",
                  backgroundColor: "#fff",
                  boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                  borderRadius: "20px",
                }}
              >
                <img
                  src={proj.image}
                  alt={proj.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "20px",
                  }}
                />
              </div>
            </div>

            {/* Project Content */}
            <div className="d-flex flex-column justify-content-center text-center text-md-start px-3 flex-fill">
              <h3 className="fw-bold mb-3">{proj.name}</h3>
              <p className="mb-3 text-dark">{proj.description}</p>
              <p className="fw-bold mb-3 text-primary">
                {proj.techStack.join(", ")}
              </p>

              <div className="d-flex justify-content-center justify-content-md-start gap-3">
                {/* Live Demo */}
                <a
                  href="https://your-live-demo-link.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  <i
                    className="bi bi-rocket-takeoff"
                    style={{ fontSize: "1.4rem", color: "grey" }}
                    title="Live Demo"
                  ></i>
                </a>

                {/* Source Code */}
                <a
                  href="https://github.com/your-repo-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  <i
                    className="bi bi-github"
                    style={{ fontSize: "1.4rem", color: "grey" }}
                    title="Source Code"
                  ></i>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Project;