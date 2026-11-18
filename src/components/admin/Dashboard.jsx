import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../../services/authService";
import {
  setProfile,
  addProject,
  updateProject,
  deleteProject,
  addCompany,
  updateCompany,
  deleteCompany,
  resetToDefaultData
} from "../../redux/profile/profileSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.profile);

  // Route protection
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  const [activeTab, setActiveTab] = useState("overview");
  const [successMsg, setSuccessMsg] = useState("");

  // Profile Form state
  const [profileForm, setProfileForm] = useState({
    name: profileState.name || "",
    role: profileState.role || "",
    experience: profileState.experience || "",
    location: profileState.location || "",
    email: profileState.email || "",
    whatsappNo: profileState.whatsappNo || "",
    linkedInUrl: profileState.linkedInUrl || "",
    githubUrl: profileState.githubUrl || "",
    aboutMe: profileState.aboutMe || "",
    resumeUrl: profileState.resumeUrl || "/Vitthal Khemnar - Resume.pdf",
    skillsText: (profileState.skills || []).join(", ")
  });

  // Keep form in sync if state updates
  useEffect(() => {
    setProfileForm({
      name: profileState.name || "",
      role: profileState.role || "",
      experience: profileState.experience || "",
      location: profileState.location || "",
      email: profileState.email || "",
      whatsappNo: profileState.whatsappNo || "",
      linkedInUrl: profileState.linkedInUrl || "",
      githubUrl: profileState.githubUrl || "",
      aboutMe: profileState.aboutMe || "",
      resumeUrl: profileState.resumeUrl || "/Vitthal Khemnar - Resume.pdf",
      skillsText: (profileState.skills || []).join(", ")
    });
  }, [profileState]);

  // Project Modal / Form State
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [projectForm, setProjectForm] = useState({
    name: "",
    description: "",
    techStack: "",
    image: "/images/aboutme.jpeg",
    demoLink: "",
    githubLink: ""
  });

  // Company Modal / Form State
  const [companyModalOpen, setCompanyModalOpen] = useState(false);
  const [editingCompanyId, setEditingCompanyId] = useState(null);
  const [companyForm, setCompanyForm] = useState({
    company: "",
    role: "",
    duration: "",
    location: "",
    description: "",
    technologies: ""
  });

  const showNotification = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  // Profile save
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    const skillsArray = profileForm.skillsText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const updated = {
      name: profileForm.name,
      role: profileForm.role,
      experience: profileForm.experience,
      location: profileForm.location,
      email: profileForm.email,
      whatsappNo: profileForm.whatsappNo,
      linkedInUrl: profileForm.linkedInUrl,
      githubUrl: profileForm.githubUrl,
      aboutMe: profileForm.aboutMe,
      resumeUrl: profileForm.resumeUrl,
      skills: skillsArray
    };

    dispatch(setProfile(updated));
    showNotification("Profile details saved successfully!");
  };

  // Projects CRUD
  const openNewProjectModal = () => {
    setEditingProjectId(null);
    setProjectForm({
      name: "",
      description: "",
      techStack: "",
      image: "/images/aboutme.jpeg",
      demoLink: "",
      githubLink: ""
    });
    setProjectModalOpen(true);
  };

  const openEditProjectModal = (proj) => {
    setEditingProjectId(proj.id);
    setProjectForm({
      name: proj.name,
      description: proj.description,
      techStack: Array.isArray(proj.techStack) ? proj.techStack.join(", ") : proj.techStack,
      image: proj.image || "/images/aboutme.jpeg",
      demoLink: proj.demoLink || "",
      githubLink: proj.githubLink || ""
    });
    setProjectModalOpen(true);
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    const techArray = projectForm.techStack
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingProjectId) {
      dispatch(
        updateProject({
          id: editingProjectId,
          ...projectForm,
          techStack: techArray
        })
      );
      showNotification("Project updated successfully!");
    } else {
      dispatch(
        addProject({
          id: "proj-" + Date.now(),
          ...projectForm,
          techStack: techArray
        })
      );
      showNotification("New project added successfully!");
    }
    setProjectModalOpen(false);
  };

  const handleDeleteProject = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      dispatch(deleteProject(id));
      showNotification("Project deleted.");
    }
  };

  // Companies CRUD
  const openNewCompanyModal = () => {
    setEditingCompanyId(null);
    setCompanyForm({
      company: "",
      role: "",
      duration: "",
      location: "",
      description: "",
      technologies: ""
    });
    setCompanyModalOpen(true);
  };

  const openEditCompanyModal = (comp) => {
    setEditingCompanyId(comp.id);
    setCompanyForm({
      company: comp.company,
      role: comp.role,
      duration: comp.duration,
      location: comp.location || "",
      description: comp.description,
      technologies: Array.isArray(comp.technologies) ? comp.technologies.join(", ") : comp.technologies || ""
    });
    setCompanyModalOpen(true);
  };

  const handleSaveCompany = (e) => {
    e.preventDefault();
    const techArray = companyForm.technologies
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingCompanyId) {
      dispatch(
        updateCompany({
          id: editingCompanyId,
          ...companyForm,
          technologies: techArray
        })
      );
      showNotification("Company experience updated!");
    } else {
      dispatch(
        addCompany({
          id: "comp-" + Date.now(),
          ...companyForm,
          technologies: techArray
        })
      );
      showNotification("New company experience added!");
    }
    setCompanyModalOpen(false);
  };

  const handleDeleteCompany = (id) => {
    if (window.confirm("Are you sure you want to delete this company entry?")) {
      dispatch(deleteCompany(id));
      showNotification("Company entry deleted.");
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm("Reset all portfolio data to default original settings?")) {
      dispatch(resetToDefaultData());
      showNotification("Reset all portfolio data to defaults.");
    }
  };

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      {/* Top Navbar */}
      <header className="navbar navbar-dark bg-dark px-3 px-md-4 py-2 shadow-sm">
        <div className="d-flex align-items-center gap-2">
          <img src="/v-logo2.png" alt="Logo" style={{ width: "30px", height: "30px" }} />
          <span className="navbar-brand fw-bold fs-5 mb-0">Portfolio Admin</span>
        </div>
        <div className="d-flex align-items-center gap-2">
          <Link
            to="/"
            target="_blank"
            className="btn btn-sm btn-outline-light rounded-pill px-3"
          >
            <i className="bi bi-box-arrow-up-right me-1"></i> View Live Site
          </Link>
          <button
            onClick={handleLogout}
            className="btn btn-sm btn-danger rounded-pill px-3"
          >
            <i className="bi bi-box-arrow-right me-1"></i> Logout
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="container-fluid flex-grow-1 p-3 p-md-4">
        {successMsg && (
          <div className="alert alert-success alert-dismissible fade show shadow-sm" role="alert">
            <i className="bi bi-check-circle-fill me-2"></i>
            {successMsg}
            <button
              type="button"
              className="btn-close"
              onClick={() => setSuccessMsg("")}
            ></button>
          </div>
        )}

        <div className="row g-4">
          {/* Sidebar Nav */}
          <div className="col-12 col-md-3 col-lg-2">
            <div className="card border-0 shadow-sm rounded-3 p-2 bg-white">
              <div className="nav flex-column nav-pills gap-1">
                <button
                  className={`nav-link text-start py-2 px-3 fw-semibold rounded-2 ${
                    activeTab === "overview" ? "active" : "text-dark"
                  }`}
                  onClick={() => setActiveTab("overview")}
                >
                  <i className="bi bi-grid-1x2 me-2"></i> Overview
                </button>
                <button
                  className={`nav-link text-start py-2 px-3 fw-semibold rounded-2 ${
                    activeTab === "profile" ? "active" : "text-dark"
                  }`}
                  onClick={() => setActiveTab("profile")}
                >
                  <i className="bi bi-person me-2"></i> Profile & Bio
                </button>
                <button
                  className={`nav-link text-start py-2 px-3 fw-semibold rounded-2 ${
                    activeTab === "projects" ? "active" : "text-dark"
                  }`}
                  onClick={() => setActiveTab("projects")}
                >
                  <i className="bi bi-laptop me-2"></i> Projects ({profileState.projects?.length || 0})
                </button>
                <button
                  className={`nav-link text-start py-2 px-3 fw-semibold rounded-2 ${
                    activeTab === "companies" ? "active" : "text-dark"
                  }`}
                  onClick={() => setActiveTab("companies")}
                >
                  <i className="bi bi-briefcase me-2"></i> Companies ({profileState.companies?.length || 0})
                </button>
                <button
                  className={`nav-link text-start py-2 px-3 fw-semibold rounded-2 ${
                    activeTab === "resume" ? "active" : "text-dark"
                  }`}
                  onClick={() => setActiveTab("resume")}
                >
                  <i className="bi bi-file-earmark-pdf me-2"></i> Resume & Skills
                </button>
                <hr className="my-2" />
                <button
                  className="nav-link text-start py-2 px-3 fw-semibold rounded-2 text-danger"
                  onClick={handleResetDefaults}
                >
                  <i className="bi bi-arrow-counterclockwise me-2"></i> Reset Defaults
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content Area */}
          <div className="col-12 col-md-9 col-lg-10">
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="d-flex flex-column gap-4">
                <div className="row g-3">
                  <div className="col-12 col-sm-6 col-lg-3">
                    <div className="card border-0 shadow-sm p-3 rounded-3 bg-white">
                      <div className="text-muted small">Total Projects</div>
                      <div className="fs-2 fw-bold text-primary">
                        {profileState.projects?.length || 0}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-lg-3">
                    <div className="card border-0 shadow-sm p-3 rounded-3 bg-white">
                      <div className="text-muted small">Companies Worked</div>
                      <div className="fs-2 fw-bold text-success">
                        {profileState.companies?.length || 0}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-lg-3">
                    <div className="card border-0 shadow-sm p-3 rounded-3 bg-white">
                      <div className="text-muted small">Skills Listed</div>
                      <div className="fs-2 fw-bold text-info">
                        {profileState.skills?.length || 0}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-lg-3">
                    <div className="card border-0 shadow-sm p-3 rounded-3 bg-white">
                      <div className="text-muted small">Deployment Status</div>
                      <div className="fs-5 fw-bold text-dark mt-2">
                        <span className="badge bg-success-subtle text-success border border-success-subtle">
                          Serverless Static
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card border-0 shadow-sm p-4 rounded-3 bg-white">
                  <h5 className="fw-bold mb-3">Quick Actions</h5>
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      className="btn btn-primary rounded-pill px-3"
                      onClick={openNewProjectModal}
                    >
                      <i className="bi bi-plus-lg me-1"></i> Add Project
                    </button>
                    <button
                      className="btn btn-outline-primary rounded-pill px-3"
                      onClick={openNewCompanyModal}
                    >
                      <i className="bi bi-plus-lg me-1"></i> Add Company Experience
                    </button>
                    <button
                      className="btn btn-outline-secondary rounded-pill px-3"
                      onClick={() => setActiveTab("profile")}
                    >
                      <i className="bi bi-pencil me-1"></i> Edit Profile Info
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <div className="card border-0 shadow-sm p-4 rounded-3 bg-white">
                <h5 className="fw-bold mb-4">Edit Profile & Contact Details</h5>
                <form onSubmit={handleProfileSubmit}>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-semibold">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={profileForm.name}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-semibold">Professional Title / Role</label>
                      <input
                        type="text"
                        className="form-control"
                        value={profileForm.role}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, role: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-semibold">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        value={profileForm.email}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, email: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-semibold">WhatsApp Number (e.g. 918767841958)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={profileForm.whatsappNo}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, whatsappNo: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-semibold">Location</label>
                      <input
                        type="text"
                        className="form-control"
                        value={profileForm.location}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, location: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-semibold">Experience (e.g. 1+ Years)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={profileForm.experience}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, experience: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-semibold">LinkedIn Profile URL</label>
                      <input
                        type="url"
                        className="form-control"
                        value={profileForm.linkedInUrl}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, linkedInUrl: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-semibold">GitHub Profile URL</label>
                      <input
                        type="url"
                        className="form-control"
                        value={profileForm.githubUrl}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, githubUrl: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold">About Me Bio</label>
                      <textarea
                        className="form-control"
                        rows="4"
                        value={profileForm.aboutMe}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, aboutMe: e.target.value })
                        }
                      ></textarea>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button type="submit" className="btn btn-primary rounded-pill px-4">
                      <i className="bi bi-check-lg me-1"></i> Save Profile Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* PROJECTS TAB */}
            {activeTab === "projects" && (
              <div className="card border-0 shadow-sm p-4 rounded-3 bg-white">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold mb-0">Manage Projects</h5>
                  <button
                    className="btn btn-primary rounded-pill px-3"
                    onClick={openNewProjectModal}
                  >
                    <i className="bi bi-plus-lg me-1"></i> Add Project
                  </button>
                </div>

                {profileState.projects?.length === 0 ? (
                  <div className="text-center text-muted py-5">
                    No projects found. Click "Add Project" to create one.
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table align-middle table-hover">
                      <thead className="table-light">
                        <tr>
                          <th>Name</th>
                          <th>Tech Stack</th>
                          <th>Demo Link</th>
                          <th>GitHub</th>
                          <th className="text-end">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {profileState.projects?.map((proj) => (
                          <tr key={proj.id}>
                            <td className="fw-semibold">{proj.name}</td>
                            <td>
                              <span className="small text-muted">
                                {Array.isArray(proj.techStack)
                                  ? proj.techStack.join(", ")
                                  : proj.techStack}
                              </span>
                            </td>
                            <td>
                              {proj.demoLink ? (
                                <a
                                  href={proj.demoLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-decoration-none small"
                                >
                                  Live <i className="bi bi-box-arrow-up-right"></i>
                                </a>
                              ) : (
                                <span className="text-muted small">—</span>
                              )}
                            </td>
                            <td>
                              {proj.githubLink ? (
                                <a
                                  href={proj.githubLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-decoration-none small"
                                >
                                  Code <i className="bi bi-github"></i>
                                </a>
                              ) : (
                                <span className="text-muted small">—</span>
                              )}
                            </td>
                            <td className="text-end">
                              <button
                                className="btn btn-sm btn-outline-primary rounded-pill me-2"
                                onClick={() => openEditProjectModal(proj)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger rounded-pill"
                                onClick={() => handleDeleteProject(proj.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* COMPANIES TAB */}
            {activeTab === "companies" && (
              <div className="card border-0 shadow-sm p-4 rounded-3 bg-white">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold mb-0">Manage Companies & Experience</h5>
                  <button
                    className="btn btn-primary rounded-pill px-3"
                    onClick={openNewCompanyModal}
                  >
                    <i className="bi bi-plus-lg me-1"></i> Add Experience
                  </button>
                </div>

                {profileState.companies?.length === 0 ? (
                  <div className="text-center text-muted py-5">
                    No company experience found. Click "Add Experience" to create one.
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table align-middle table-hover">
                      <thead className="table-light">
                        <tr>
                          <th>Company</th>
                          <th>Role</th>
                          <th>Duration</th>
                          <th>Location</th>
                          <th className="text-end">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {profileState.companies?.map((comp) => (
                          <tr key={comp.id}>
                            <td className="fw-semibold">{comp.company}</td>
                            <td>{comp.role}</td>
                            <td>
                              <span className="badge bg-light text-dark border">
                                {comp.duration}
                              </span>
                            </td>
                            <td className="small text-muted">{comp.location}</td>
                            <td className="text-end">
                              <button
                                className="btn btn-sm btn-outline-primary rounded-pill me-2"
                                onClick={() => openEditCompanyModal(comp)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger rounded-pill"
                                onClick={() => handleDeleteCompany(comp.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* RESUME & SKILLS TAB */}
            {activeTab === "resume" && (
              <div className="card border-0 shadow-sm p-4 rounded-3 bg-white">
                <h5 className="fw-bold mb-4">Resume & Skills Management</h5>
                <form onSubmit={handleProfileSubmit}>
                  <div className="mb-4">
                    <label className="form-label small fw-semibold">
                      Resume PDF Link / Path
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={profileForm.resumeUrl}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, resumeUrl: e.target.value })
                      }
                      placeholder="/Vitthal Khemnar - Resume.pdf or https://..."
                    />
                    <div className="form-text small">
                      You can keep this pointing to a local file in <code>public/</code> or paste any cloud storage URL (Google Drive / Firebase Storage / Dropbox direct link).
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label small fw-semibold">
                      Skills & Tech Stack (comma-separated)
                    </label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={profileForm.skillsText}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, skillsText: e.target.value })
                      }
                      placeholder="Java, Spring Boot, MySQL, ReactJS..."
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary rounded-pill px-4">
                    <i className="bi bi-check-lg me-1"></i> Save Resume & Skills
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PROJECT MODAL */}
      {projectModalOpen && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-3">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">
                  {editingProjectId ? "Edit Project" : "Add New Project"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setProjectModalOpen(false)}
                ></button>
              </div>
              <form onSubmit={handleSaveProject}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Project Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={projectForm.name}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={projectForm.description}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, description: e.target.value })
                      }
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">
                      Tech Stack (comma-separated)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="React, Redux, Node.js"
                      value={projectForm.techStack}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, techStack: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Image URL / Path</label>
                    <input
                      type="text"
                      className="form-control"
                      value={projectForm.image}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, image: e.target.value })
                      }
                      placeholder="/images/aboutme.jpeg"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Live Demo Link</label>
                    <input
                      type="url"
                      className="form-control"
                      value={projectForm.demoLink}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, demoLink: e.target.value })
                      }
                      placeholder="https://..."
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">GitHub Repo Link</label>
                    <input
                      type="url"
                      className="form-control"
                      value={projectForm.githubLink}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, githubLink: e.target.value })
                      }
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary rounded-pill"
                    onClick={() => setProjectModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary rounded-pill px-4">
                    Save Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* COMPANY MODAL */}
      {companyModalOpen && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-3">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">
                  {editingCompanyId ? "Edit Company Experience" : "Add Company Experience"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setCompanyModalOpen(false)}
                ></button>
              </div>
              <form onSubmit={handleSaveCompany}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Company Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={companyForm.company}
                      onChange={(e) =>
                        setCompanyForm({ ...companyForm, company: e.target.value })
                      }
                      placeholder="e.g. ANMsoft Technologies"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Role / Job Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={companyForm.role}
                      onChange={(e) =>
                        setCompanyForm({ ...companyForm, role: e.target.value })
                      }
                      placeholder="e.g. Java Backend Developer"
                      required
                    />
                  </div>
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Duration</label>
                      <input
                        type="text"
                        className="form-control"
                        value={companyForm.duration}
                        onChange={(e) =>
                          setCompanyForm({ ...companyForm, duration: e.target.value })
                        }
                        placeholder="e.g. 2023 - Present"
                        required
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Location</label>
                      <input
                        type="text"
                        className="form-control"
                        value={companyForm.location}
                        onChange={(e) =>
                          setCompanyForm({ ...companyForm, location: e.target.value })
                        }
                        placeholder="e.g. Pune, India"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Description / Key Accomplishments</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={companyForm.description}
                      onChange={(e) =>
                        setCompanyForm({ ...companyForm, description: e.target.value })
                      }
                      placeholder="Describe your responsibilities, APIs built, achievements..."
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Technologies (comma-separated)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={companyForm.technologies}
                      onChange={(e) =>
                        setCompanyForm({ ...companyForm, technologies: e.target.value })
                      }
                      placeholder="Core Java, Spring Boot, MySQL..."
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary rounded-pill"
                    onClick={() => setCompanyModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary rounded-pill px-4">
                    Save Experience
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
