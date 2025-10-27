const Home = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="container d-flex p-0" style={{ maxWidth: "50%" }}>
          <div className="content flex-fill p-4 d-flex flex-column justify-content-center">
            <div className="fw-bold fs-1">
              <p className="role">
                Back-End Java Developer{" "}
                <span role="img" aria-label="wave">
                  👋
                </span>
              </p>
            </div>
            <div className="summary">
              <p>
                Hi, I'm Vitthal Khemnar. A passionate Back-end Java Developer
                based in Pune, India.
              </p>
            </div>
            <div className="profiles d-flex justify-content-start gap-2">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-dark"
              >
                <i
                  className="bi bi-linkedin"
                  style={{ fontSize: "1.25rem" }}
                  //   style={{ fontSize: "2rem", color: "#0A66C2" }}
                ></i>
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-dark"
              >
                <i
                  className="bi bi-github"
                  style={{ fontSize: "1.25rem" }}
                  //   style={{ fontSize: "2rem", color: "#000" }}
                ></i>
              </a>
            </div>

            <div className="d-flex align-items-center mt-4 flex-wrap">
              {/* Title + vertical line */}
              <p className="fw-bold mb-0 me-2">Tech Stack</p>
              <div
                style={{
                  width: "2px",
                  height: "25px",
                  backgroundColor: "black",
                  marginRight: "10px",
                }}
              ></div>

              {/* Icons */}
              <div className="d-flex align-items-center gap-3 flex-wrap">
                <img
                  src="/icons/java.png"
                  alt="Java"
                  style={{ width: "35px" }}
                />
                <img
                  src="/icons/spring.png"
                  alt="Spring Boot"
                  style={{ width: "30px" }}
                />
                <img src="/icons/git.png" alt="Git" style={{ width: "30px" }} />
                <img
                  src="/icons/react.png"
                  alt="React"
                  style={{ width: "30px" }}
                />
                <img
                  src="/icons/mysql.png"
                  alt="SQL"
                  style={{ width: "30px" }}
                />
                 <img
                  src="/icons/mongo.png"
                  alt="Mongo"
                  style={{ width: "35px" }}
                />
              </div>
            </div>
          </div>
          <div className="picture flex-fill p-4 d-flex flex-column justify-content-center align-items-center text-center">
            <div
              className="rounded-circle overflow-hidden d-flex justify-content-center align-items-center mb-3"
              style={{
                width: "20vw", // 20% of the viewport width
                height: "20vw", // keeps it perfectly circular
                maxWidth: "250px", // prevents it from growing too large on big screens
                maxHeight: "250px",
                minWidth: "120px", // ensures it's not too small on mobile
                minHeight: "120px",
                backgroundColor: "#fff",
                boxShadow: "0 0 10px rgba(0,0,0,0.2)",
              }}
            >
              <img
                src="/images/vitthal-image.jpeg"
                alt="profile"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Exercitationem rem fugiat suscipit veniam nulla, qui beatae
              corporis recusandae impedit laborum, delectus optio iste harum,
              eum cumque ex enim culpa dolores!
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
