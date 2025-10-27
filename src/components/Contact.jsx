const Contact = () => {
  return (
    <div className="d-flex justify-content-center align-items-center my-4 py-5">
      <div
        className="container p-4"
        style={{
          maxWidth: "50%",
          //   borderRadius: "15px",
          //   boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}
      >
        {/* Heading */}
        <div className="fw-bold fs-6 mb-4">
          <p className="role text-primary m-0 text-uppercase">Contact</p>
        </div>

        {/* Subheading */}
        <div className="fw-bold fs-5 mb-4">
          <p className="m-0">
            Don't be shy! Hit me up!{" "}
            <span role="img" aria-label="wave">
              👇
            </span>
          </p>
        </div>

        {/* Contact Details Boxes */}
        <div className="d-flex flex-row gap-3">
          {/* Location Box */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=Pune,India"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-fill"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div
              className="d-flex align-items-center p-2 rounded border border-primary"
              style={{ cursor: "pointer", backgroundColor: "#f8f9fa" }}
            >
              <i className="bi bi-geo-alt-fill text-primary me-3 fs-4"></i>
              <div>
                <p className="mb-0 fw-bold">Location</p>
                <p className="m-0">Pune, India</p>
              </div>
            </div>
          </a>

          {/* Email Box */}
          <a
            href="https://mailto:vitthalkkhemnar@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-fill"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div
              className="d-flex align-items-center p-2 rounded border border-primary"
              style={{ cursor: "pointer", backgroundColor: "#f8f9fa" }}
            >
              <i className="bi bi-envelope-fill text-primary me-3 fs-4"></i>
              <div>
                <p className="mb-0 fw-bold">Email</p>
                <p className="m-0">vitthalkkhemnar@gmail.com</p>
              </div>
            </div>
          </a>

          {/* WhatsApp Box */}
          <a
            href="https://wa.me/918767841958"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-fill"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div
              className="d-flex align-items-center p-2 rounded border border-primary"
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
    </div>
  );
};

export default Contact;
