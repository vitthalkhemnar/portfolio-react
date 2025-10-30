import { useSelector } from "react-redux";

const Contact = () => {
  const profile = useSelector((state) => state.profile);

  return (
    <section id="contact" className="py-5 px-3">
      <div className="container" style={{ maxWidth: "1000px" }}>
        {/* 🔹 Heading */}
        <div className="fw-bold fs-6 mb-4 text-center text-md-start">
          <p className="role text-primary m-0 text-uppercase">Contact</p>
        </div>

        {/* 🔹 Contact Cards */}
        <div className="row g-4">
          {/* 🌍 Location */}
          <div className="col-12 col-md-4">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                profile.location
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-dark"
            >
              <div
                className="p-4 rounded shadow-sm border border-1 bg-white text-center h-100 hover-card"
                style={{ transition: "all 0.3s ease" }}
              >
                <div className="mb-3">
                  <i className="bi bi-geo-alt-fill fs-1 text-primary"></i>
                </div>
                <h6 className="fw-bold mb-1">Location</h6>
                <p className="m-0">{profile.location}</p>
              </div>
            </a>
          </div>

          {/* ✉️ Email */}
          <div className="col-12 col-md-4">
            <a
              href={`mailto:${profile.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-dark"
            >
              <div
                className="p-4 rounded shadow-sm border border-1 bg-white text-center h-100 hover-card"
                style={{ transition: "all 0.3s ease" }}
              >
                <div className="mb-3">
                  <i className="bi bi-envelope-fill fs-1 text-danger"></i>
                </div>
                <h6 className="fw-bold mb-1">Email</h6>
                <p className="m-0">{profile.email}</p>
              </div>
            </a>
          </div>

          {/* 💬 WhatsApp */}
          <div className="col-12 col-md-4">
            <a
              href={`https://wa.me/${profile.whatsappNo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-dark"
            >
              <div
                className="p-4 rounded shadow-sm border border-1 bg-white text-center h-100 hover-card"
                style={{ transition: "all 0.3s ease" }}
              >
                <div className="mb-3">
                  <i className="bi bi-whatsapp fs-1 text-success"></i>
                </div>
                <h6 className="fw-bold mb-1">WhatsApp</h6>
                <p className="m-0">{profile.whatsappNo}</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* 🔹 Hover Animation Style */}
      <style>{`
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.1);
        }
      `}</style>
    </section>
  );
};

export default Contact;