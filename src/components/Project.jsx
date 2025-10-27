import React, { useState } from "react";

const Project = () => {
  const [projects] = useState([
    {
      id: 1,
      name: "Bug Tracker",
      techStack: ["Java", "Spring Boot", "ReactJS"],
      description:
        "A full-stack project management system for tracking and resolving software bugs efficiently with real-time updates. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, libero quae unde velit odit doloremque voluptatem pariatur soluta laborum accusantium saepe labore. Dolor cupiditate ipsam in nisi exercitationem dolorum corrupti!",
      image: "/images/bugtracker.jpeg",
    },
    {
      id: 2,
      name: "Payment Gateway Monitor",
      techStack: ["Java", "Spring Boot", "Kafka"],
      description:
        "A real-time transaction monitoring and fraud detection platform ensuring secure payment gateway operations. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, libero quae unde velit odit doloremque voluptatem pariatur soluta laborum accusantium saepe labore. Dolor cupiditate ipsam in nisi exercitationem dolorum corrupti!",
      image: "/images/paymentgateway.jpeg",
    },
    {
      id: 3,
      name: "AI Analytics Dashboard",
      techStack: ["Python", "Flask", "ReactJS", "MongoDB"],
      description:
        "An intelligent analytics dashboard providing insights using machine learning and interactive visualizations. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, libero quae unde velit odit doloremque voluptatem pariatur soluta laborum accusantium saepe labore. Dolor cupiditate ipsam in nisi exercitationem dolorum corrupti!",
      image: "/images/analytics.jpeg",
    },
  ]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center py-5">
      {/* Page Heading */}
      <div
        className="container p-4"
        style={{
          maxWidth: "50%",
        }}
      >
        <div className="fw-bold fs-6 mb-0">
          <p className="role text-primary m-0 text-uppercase">Portfolio</p>
        </div>
      </div>

      {/* Project Cards */}
      {projects.map((proj, index) => (
        <div
          key={proj.id}
          className="container d-flex p-0 my-4"
          style={{
            maxWidth: "50%",
            flexDirection: index % 2 === 0 ? "row" : "row-reverse", // alternate layout
          }}
        >
          {/* LEFT / RIGHT - Project Image */}
          <div className="picture flex-fill p-4 d-flex flex-column justify-content-center align-items-center text-center">
            <div
              className="overflow-hidden d-flex justify-content-center align-items-center mb-3"
              style={{
                width: "20vw",
                height: "20vw",
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

          {/* RIGHT / LEFT - Project Content */}
          <div className="content flex-fill p-4 d-flex flex-column justify-content-center">
            {/* <div className="fw-bold fs-6 mb-3">
              <p className="role text-primary m-0 text-uppercase">
                {proj.name}
              </p>
            </div> */}

            <div className="fw-bold fs-4 mb-3">
              <p className="heading m-0">{proj.name}</p>
            </div>

            <div className="summary text-dark">
              <p>{proj.description}</p>
            </div>

            <div className="fw-bold mb-3 text-primary">
              <p className="heading m-0">{proj.techStack.join(", ")}</p>
            </div>

            <div className="d-flex gap-3">
              {/* Live Demo */}
              <a
                href="https://your-live-demo-link.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                <i
                  className="bi bi-rocket-takeoff"
                  style={{ fontSize: "1.2rem", color: "grey" }}
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
                  style={{ fontSize: "1.2rem", color: "grey"}}
                  title="Source Code"
                ></i>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Project;
