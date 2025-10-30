import React, { useState } from "react";

const Project = () => {
  const projects = [
    {
      id: 1,
      name: "Portfolio Website",
      description: "A personal portfolio built using React and Bootstrap.",
      techStack: ["React", "Bootstrap", "JavaScript"],
      image: "/images/aboutme.jpeg",
      demoLink: "https://your-live-demo-link.com",
      githubLink: "https://github.com/your-repo-link",
    },
    {
      id: 2,
      name: "E-Commerce App",
      description: "A full-stack MERN app with Stripe payment integration.",
      techStack: ["MongoDB", "Express", "React", "Node.js"],
      image: "/images/aboutme.jpeg",
      demoLink: "https://your-demo.com",
      githubLink: "https://github.com/your-repo",
    },
    {
      id: 3,
      name: "Blog Platform",
      description: "A modern blog platform with markdown support.",
      techStack: ["React", "Firebase"],
      image: "/images/aboutme.jpeg",
      demoLink: "https://your-demo.com",
      githubLink: "https://github.com/your-repo",
    },
    {
      id: 4,
      name: "Task Manager",
      description: "A productivity app to manage daily tasks efficiently.",
      techStack: ["React", "Redux", "Node.js"],
      image: "/images/aboutme.jpeg",
      demoLink: "https://your-demo.com",
      githubLink: "https://github.com/your-repo",
    },
    {
      id: 5,
      name: "Weather App",
      description: "A simple weather app using OpenWeather API.",
      techStack: ["React", "API"],
      image: "/images/aboutme.jpeg",
      demoLink: "https://your-demo.com",
      githubLink: "https://github.com/your-repo",
    },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

  const nextSet = () => {
    setStartIndex((prev) => (prev + visibleCount) % projects.length);
  };

  const prevSet = () => {
    setStartIndex(
      (prev) => (prev - visibleCount + projects.length) % projects.length
    );
  };

  // Adjust visible cards dynamically based on screen width
  const getVisibleCount = () => {
    if (window.innerWidth < 768) return 1; // mobile
    if (window.innerWidth < 992) return 2; // tablet
    return 3; // desktop
  };

  const [cardsPerView, setCardsPerView] = useState(getVisibleCount());

  React.useEffect(() => {
    const handleResize = () => setCardsPerView(getVisibleCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleProjects = [];
  for (let i = 0; i < cardsPerView; i++) {
    visibleProjects.push(projects[(startIndex + i) % projects.length]);
  }

  return (
    <section
      id="portfolio"
      className="py-5 d-flex justify-content-center align-items-center min-vh-100"
    >
      <div
        className="container position-relative"
        style={{ maxWidth: "1000px" }}
      >
        {/* Heading */}
        <div className="fw-bold fs-6 mb-4 text-center text-md-start">
          <p className="role text-primary m-0 text-uppercase">Portfolio</p>
        </div>

        {/* Project Cards */}
        <div className="row justify-content-center g-4">
          {visibleProjects.map((proj) => (
            <div key={proj.id} className="col-12 col-sm-6 col-lg-4 d-flex">
              <div
                className="card border-0 shadow-sm text-center flex-fill"
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  // transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  height: "100%",
                }}
              >
                <img
                  src={proj.image}
                  alt={proj.name}
                  className="card-img-top"
                  style={{
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h6 className="fw-bold text-uppercase mb-2">{proj.name}</h6>
                  <p className="text-muted small mb-2">{proj.description}</p>
                  <p
                    className="fw-semibold mb-3 small"
                    style={{ color: "rgba(37, 178, 220, 0.9)" }}
                  >
                    {proj.techStack.join(", ")}
                  </p>

                  <div className="mt-auto d-flex justify-content-center gap-3">
                    <a
                      href={proj.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Live Demo"
                      className="text-decoration-none"
                    >
                      <i
                        className="bi bi-rocket-takeoff"
                        style={{ fontSize: "1.3rem", color: "grey" }}
                      ></i>
                    </a>
                    <a
                      href={proj.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Source Code"
                      className="text-decoration-none"
                    >
                      <i
                        className="bi bi-github"
                        style={{ fontSize: "1.3rem", color: "grey" }}
                      ></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSet}
          className="btn btn-light position-absolute top-50 start-0 translate-middle-y shadow-sm"
          style={{
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            zIndex: 2,
          }}
        >
          <i className="bi bi-chevron-left"></i>
        </button>

        <button
          onClick={nextSet}
          className="btn btn-light position-absolute top-50 end-0 translate-middle-y shadow-sm"
          style={{
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            zIndex: 2,
          }}
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
    </section>
  );
};

export default Project;
