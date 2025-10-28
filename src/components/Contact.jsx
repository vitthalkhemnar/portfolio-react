import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="py-5 px-3">
      <div className="container" style={{ maxWidth: "900px" }}>
        {/* Heading */}
        <div className="fw-bold fs-6 mb-3 text-start">
          <p className="role text-primary m-0 text-uppercase">Contact</p>
        </div>

        {/* Contact Boxes */}
        <div className="row g-3">
          {/* Location */}
          <div className="col-12 col-md-4">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Pune,India"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-black"
            >
              <div
                className="d-flex align-items-center p-3 rounded border border-dark"
                style={{ cursor: "pointer", backgroundColor: "#f8f9fa" }}
              >
                <i className="bi bi-geo-alt-fill text-dark me-3 fs-4"></i>
                <div>
                  <p className="mb-0 fw-bold">Location</p>
                  <p className="m-0">Pune, India</p>
                </div>
              </div>
            </a>
          </div>

          {/* Email */}
          <div className="col-12 col-md-4">
            <a
              href="mailto:vitthalkkhemnar@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-black"
            >
              <div
                className="d-flex align-items-center p-3 rounded border border-dark"
                style={{ cursor: "pointer", backgroundColor: "#f8f9fa" }}
              >
                <i className="bi bi-envelope-fill text-dark me-3 fs-4"></i>
                <div>
                  <p className="mb-0 fw-bold">Email</p>
                  <p className="m-0">vitthalkkhemnar@gmail.com</p>
                </div>
              </div>
            </a>
          </div>

          {/* WhatsApp */}
          <div className="col-12 col-md-4">
            <a
              href="https://wa.me/918767841958"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-black"
            >
              <div
                className="d-flex align-items-center p-3 rounded border border-dark"
                style={{ cursor: "pointer", backgroundColor: "#f8f9fa" }}
              >
                <i className="bi bi-whatsapp text-dark me-3 fs-4"></i>
                <div>
                  <p className="mb-0 fw-bold">WhatsApp</p>
                  <p className="m-0">+91 8767841958</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
