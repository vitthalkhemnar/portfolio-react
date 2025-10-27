import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="d-flex justify-content-center py-5 px-3">
      <div
        className="container"
        style={{
          maxWidth: "900px",
          width: "100%",
        }}
      >
        {/* Heading */}
        <div className="fw-bold fs-6 mb-3 text-start">
          <p className="role text-primary m-0 text-uppercase">Contact</p>
        </div>

        {/* Subheading */}
        <div className="fw-bold mb-4 text-start">
          <p className="m-0">
            Don't be shy! Hit me up!{" "}
            <span role="img" aria-label="wave">
              👇
            </span>
          </p>
        </div>

        {/* Contact Boxes */}
        <div className="d-flex flex-column flex-md-row gap-3">
          {/* Location */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=Pune,India"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-fill text-decoration-none"
          >
            <div
              className="d-flex align-items-center p-3 rounded border border-primary"
              style={{ cursor: "pointer", backgroundColor: "#f8f9fa" }}
            >
              <i className="bi bi-geo-alt-fill text-primary me-3 fs-4"></i>
              <div>
                <p className="mb-0 fw-bold">Location</p>
                <p className="m-0">Pune, India</p>
              </div>
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:vitthalkkhemnar@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-fill text-decoration-none"
          >
            <div
              className="d-flex align-items-center p-3 rounded border border-primary"
              style={{ cursor: "pointer", backgroundColor: "#f8f9fa" }}
            >
              <i className="bi bi-envelope-fill text-primary me-3 fs-4"></i>
              <div>
                <p className="mb-0 fw-bold">Email</p>
                <p className="m-0">vitthalkkhemnar@gmail.com</p>
              </div>
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/918767841958"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-fill text-decoration-none"
          >
            <div
              className="d-flex align-items-center p-3 rounded border border-primary"
              style={{ cursor: "pointer", backgroundColor: "#f8f9fa" }}
            >
              <i className="bi bi-whatsapp text-success me-3 fs-4"></i>
              <div>
                <p className="mb-0 fw-bold">WhatsApp</p>
                <p className="m-0">+91 8767841958</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
