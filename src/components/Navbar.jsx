const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="#home">
          Vitthal.dev
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item me-3">
              <a className="nav-link" href="#home">
                Home
              </a>
            </li>
            <li className="nav-item me-3">
              <a className="nav-link" href="#about">
                About
              </a>
            </li>
            <li className="nav-item me-3">
              <a className="nav-link" href="#project">
                Project
              </a>
            </li>
            <li className="nav-item me-3">
              <a className="nav-link" href="#contact">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
