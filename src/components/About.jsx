import { useSelector } from "react-redux";

const About = () => {
  const profile = useSelector((state) => state.profile);

  return (
    <section
      id="about"
      className="d-flex align-items-center justify-content-center px-3"
      style={{
        minHeight: "100vh", // makes it take full page height
        paddingTop: "80px", // creates balanced spacing from top
        paddingBottom: "80px",
      }}
    >
      <div className="container" style={{ maxWidth: "1000px" }}>
        {/* Heading */}
        <div className="fw-bold fs-6 mb-3 text-center text-md-start">
          <p className="role text-primary m-0 text-uppercase">About Me</p>
        </div>

        {/* Content Row */}
        <div className="row align-items-center justify-content-center g-4">
          {/* LEFT SIDE - Profile Image */}
          <div className="col-12 col-md-5 d-flex justify-content-center">
            <div
              className="overflow-hidden"
              style={{
                width: "100%",
                maxWidth: "350px",
                height: "250px",
                backgroundColor: "#fff",
                borderRadius: "20px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src="/images/aboutme.jpeg"
                alt="profile"
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
                A dedicated {profile.role} based in {profile.location}.
              </p>
            </div>

            <div className="summary text-dark fs-6">
              <p className="m-0">{profile.aboutMe}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
