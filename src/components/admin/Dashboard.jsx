import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../../services/authService";
import { calculateTotalExperience } from "../../utils/experienceCalculator";
import {
  setProfile,
  addProject,
  updateProject,
  deleteProject,
  addCompany,
  updateCompany,
  deleteCompany
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

  const calculatedExp = calculateTotalExperience(profileState.companies || []);

  // Profile Form state
  const [profileForm, setProfileForm] = useState({
    name: profileState.name || "",
    role: profileState.role || "",
    location: profileState.location || "",
    email: profileState.email || "",
    whatsappNo: profileState.whatsappNo || "",
    linkedInUrl: profileState.linkedInUrl || "",
    githubUrl: profileState.githubUrl || "",
    aboutMe: profileState.aboutMe || "",
    resumeUrl: profileState.resumeUrl || "/Vitthal Khemnar - Resume.pdf",
    skillsText: (profileState.skills || []).join(", ")
  });

  // Sync profile form when Redux updates
  useEffect(() => {
    setProfileForm({
      name: profileState.name || "",
      role: profileState.role || "",
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

  // Project Form state (Detailed)
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [projectForm, setProjectForm] = useState({
    name: "",
    category: "Microservices",
    status: "Completed",
    description: "",
    keyFeatures: "",
    techStack: "",
    demoLink: "",
    githubLink: "",
    image: "/images/aboutme.jpeg"
  });
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  // Company Form state (Detailed)
  const [editingCompanyId, setEditingCompanyId] = useState(null);
  const [companyForm, setCompanyForm] = useState({
    company: "",
    role: "",
    employmentType: "Full-time",
    locationType: "On-site",
    location: "",
    startDate: "2023-08",
    endDate: "",
    isCurrent: true,
    description: "",
    responsibilities: "",
    technologies: ""
  });
  const [companyModalOpen, setCompanyModalOpen] = useState(false);

  // Skill Add input
  const [newSkillInput, setNewSkillInput] = useState("");

  const showNotification = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  // Profile Save
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    const skillsArray = profileForm.skillsText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const updated = {
      name: profileForm.name,
      role: profileForm.role,
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
      category: "Microservices",
      status: "Completed",
      description: "",
      keyFeatures: "",
      techStack: "",
      demoLink: "",
      githubLink: "",
      image: "/images/aboutme.jpeg"
    });
    setProjectModalOpen(true);
  };

  const openEditProjectModal = (proj) => {
    setEditingProjectId(proj.id);
    setProjectForm({
      name: proj.name || "",
      category: proj.category || "Microservices",
      status: proj.status || "Completed",
      description: proj.description || "",
      keyFeatures: Array.isArray(proj.keyFeatures)
        ? proj.keyFeatures.join("\n")
        : proj.keyFeatures || "",
      techStack: Array.isArray(proj.techStack)
        ? proj.techStack.join(", ")
        : proj.techStack || "",
      demoLink: proj.demoLink || "",
      githubLink: proj.githubLink || "",
      image: proj.image || "/images/aboutme.jpeg"
    });
    setProjectModalOpen(true);
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    const techArray = projectForm.techStack
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const featuresArray = projectForm.keyFeatures
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    const projectData = {
      name: projectForm.name,
      category: projectForm.category,
      status: projectForm.status,
      description: projectForm.description,
      keyFeatures: featuresArray,
      techStack: techArray,
      demoLink: projectForm.demoLink,
      githubLink: projectForm.githubLink,
      image: projectForm.image
    };

    if (editingProjectId) {
      dispatch(
        updateProject({
          id: editingProjectId,
          ...projectData
        })
      );
      showNotification("Project updated successfully!");
    } else {
      dispatch(
        addProject({
          id: "proj-" + Date.now(),
          ...projectData
        })
      );
      showNotification("New detailed project added!");
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
      employmentType: "Full-time",
      locationType: "On-site",
      location: "",
      startDate: "2023-08",
      endDate: "",
      isCurrent: true,
      description: "",
      responsibilities: "",
      technologies: ""
    });
    setCompanyModalOpen(true);
  };

  const openEditCompanyModal = (comp) => {
    setEditingCompanyId(comp.id);
    setCompanyForm({
      company: comp.company || "",
      role: comp.role || "",
      employmentType: comp.employmentType || "Full-time",
      locationType: comp.locationType || "On-site",
      location: comp.location || "",
      startDate: comp.startDate || "",
      endDate: comp.endDate || "",
      isCurrent: comp.isCurrent !== undefined ? comp.isCurrent : comp.endDate === "Present" || !comp.endDate,
      description: comp.description || "",
      responsibilities: Array.isArray(comp.responsibilities)
        ? comp.responsibilities.join("\n")
        : comp.responsibilities || "",
      technologies: Array.isArray(comp.technologies)
        ? comp.technologies.join(", ")
        : comp.technologies || ""
    });
    setCompanyModalOpen(true);
  };

  const handleSaveCompany = (e) => {
    e.preventDefault();
    const respArray = companyForm.responsibilities
      .split("\n")
      .map((r) => r.trim())
      .filter(Boolean);

    const techArray = companyForm.technologies
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const durationComputed = `${companyForm.startDate || ""} - ${
      companyForm.isCurrent ? "Present" : companyForm.endDate || ""
    }`;

    const companyData = {
      company: companyForm.company,
      role: companyForm.role,
      employmentType: companyForm.employmentType,
      locationType: companyForm.locationType,
      location: companyForm.location,
      startDate: companyForm.startDate,
      endDate: companyForm.isCurrent ? "Present" : companyForm.endDate,
      isCurrent: companyForm.isCurrent,
      duration: durationComputed,
      description: companyForm.description,
      responsibilities: respArray,
      technologies: techArray
    };

    if (editingCompanyId) {
      dispatch(
        updateCompany({
          id: editingCompanyId,
          ...companyData
        })
      );
      showNotification("Company experience updated!");
    } else {
      dispatch(
        addCompany({
          id: "comp-" + Date.now(),
          ...companyData
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

  // Skills quick add / remove
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillInput.trim()) return;
    const currentSkills = profileState.skills || [];
    if (currentSkills.includes(newSkillInput.trim())) {
      showNotification("Skill already exists in list.");
      return;
    }
    const updatedSkills = [...currentSkills, newSkillInput.trim()];
    dispatch(setProfile({ skills: updatedSkills }));
    setNewSkillInput("");
    showNotification(`Added skill: "${newSkillInput.trim()}"`);
  };

  const handleDeleteSkill = (skillToRemove) => {
    const updatedSkills = (profileState.skills || []).filter((s) => s !== skillToRemove);
    dispatch(setProfile({ skills: updatedSkills }));
    showNotification(`Removed skill: "${skillToRemove}"`);
  };

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: "var(--bg-page)" }}>
      {/* Responsive Top Navbar */}
      <header className="navbar navbar-dark bg-dark px-3 px-md-4 py-2 shadow-sm d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2">
          <span className="brand-dot"></span>
          <span className="navbar-brand fw-bold fs-6 fs-md-5 mb-0">Control Center</span>
        </div>
        <div className="d-flex align-items-center gap-2">
          <Link
            to="/"
            target="_blank"
            className="btn btn-sm btn-outline-light rounded-pill px-2 px-sm-3"
            title="View Live Site"
          >
            <i className="bi bi-box-arrow-up-right me-1"></i>
            <span className="d-none d-sm-inline">Live Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="btn btn-sm btn-danger rounded-pill px-2 px-sm-3"
            title="Logout"
          >
            <i className="bi bi-box-arrow-right me-1"></i>
            <span className="d-none d-sm-inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="container-fluid flex-grow-1 p-2 p-sm-3 p-md-4">
        {successMsg && (
          <div className="alert alert-success alert-dismissible fade show shadow-sm mb-3" role="alert">
            <i className="bi bi-check-circle-fill me-2"></i>
            {successMsg}
            <button
              type="button"
              className="btn-close"
              onClick={() => setSuccessMsg("")}
            ></button>
          </div>
        )}

        <div className="row g-3 g-md-4">
          {/* Responsive Navigation: Horizontal scroll on mobile, Vertical on desktop */}
          <div className="col-12 col-md-3 col-lg-2">
            <div className="card border-0 shadow-sm rounded-3 p-2 bg-white">
              <div
                className="nav flex-row flex-md-column nav-pills gap-1 overflow-auto flex-nowrap pb-1 pb-md-0"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                <button
                  className={`nav-link text-nowrap text-start py-2 px-3 fw-semibold rounded-2 ${
                    activeTab === "overview" ? "active" : "text-dark"
                  }`}
                  onClick={() => setActiveTab("overview")}
                >
                  <i className="bi bi-grid-1x2 me-2"></i> Overview
                </button>
                <button
                  className={`nav-link text-nowrap text-start py-2 px-3 fw-semibold rounded-2 ${
                    activeTab === "profile" ? "active" : "text-dark"
                  }`}
                  onClick={() => setActiveTab("profile")}
                >
                  <i className="bi bi-person me-2"></i> Profile
                </button>
                <button
                  className={`nav-link text-nowrap text-start py-2 px-3 fw-semibold rounded-2 ${
                    activeTab === "projects" ? "active" : "text-dark"
                  }`}
                  onClick={() => setActiveTab("projects")}
                >
                  <i className="bi bi-laptop me-2"></i> Projects ({profileState.projects?.length || 0})
                </button>
                <button
                  className={`nav-link text-nowrap text-start py-2 px-3 fw-semibold rounded-2 ${
                    activeTab === "companies" ? "active" : "text-dark"
                  }`}
                  onClick={() => setActiveTab("companies")}
                >
                  <i className="bi bi-briefcase me-2"></i> Experience ({profileState.companies?.length || 0})
                </button>
                <button
                  className={`nav-link text-nowrap text-start py-2 px-3 fw-semibold rounded-2 ${
                    activeTab === "skills" ? "active" : "text-dark"
                  }`}
                  onClick={() => setActiveTab("skills")}
                >
                  <i className="bi bi-stars me-2"></i> Skills ({profileState.skills?.length || 0})
                </button>
                <button
                  className={`nav-link text-nowrap text-start py-2 px-3 fw-semibold rounded-2 ${
                    activeTab === "resume" ? "active" : "text-dark"
                  }`}
                  onClick={() => setActiveTab("resume")}
                >
                  <i className="bi bi-file-earmark-pdf me-2"></i> Resume Link
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content Area */}
          <div className="col-12 col-md-9 col-lg-10">
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="d-flex flex-column gap-3 gap-md-4">
                <div className="row g-2 g-sm-3">
                  <div className="col-6 col-lg-3">
                    <div className="card border-0 shadow-sm p-3 rounded-3 bg-white h-100">
                      <div className="text-muted small">Calculated Experience</div>
                      <div className="fs-3 fs-md-2 fw-bold text-success">{calculatedExp}</div>
                      <div className="small text-muted d-none d-sm-block">Auto-computed</div>
                    </div>
                  </div>
                  <div className="col-6 col-lg-3">
                    <div className="card border-0 shadow-sm p-3 rounded-3 bg-white h-100">
                      <div className="text-muted small">Total Projects</div>
                      <div className="fs-3 fs-md-2 fw-bold text-primary">
                        {profileState.projects?.length || 0}
                      </div>
                      <div className="small text-muted d-none d-sm-block">In showcase</div>
                    </div>
                  </div>
                  <div className="col-6 col-lg-3">
                    <div className="card border-0 shadow-sm p-3 rounded-3 bg-white h-100">
                      <div className="text-muted small">Companies Worked</div>
                      <div className="fs-3 fs-md-2 fw-bold text-warning">
                        {profileState.companies?.length || 0}
                      </div>
                      <div className="small text-muted d-none d-sm-block">Verified roles</div>
                    </div>
                  </div>
                  <div className="col-6 col-lg-3">
                    <div className="card border-0 shadow-sm p-3 rounded-3 bg-white h-100">
                      <div className="text-muted small">Skills Indexed</div>
                      <div className="fs-3 fs-md-2 fw-bold text-info">
                        {profileState.skills?.length || 0}
                      </div>
                      <div className="small text-muted d-none d-sm-block">On matrix</div>
                    </div>
                  </div>
                </div>

                <div className="card border-0 shadow-sm p-3 p-md-4 rounded-3 bg-white">
                  <h5 className="fw-bold mb-3">Quick Actions</h5>
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      className="btn btn-primary rounded-pill px-3 px-sm-4"
                      onClick={openNewProjectModal}
                    >
                      <i className="bi bi-plus-lg me-1"></i> Add Project
                    </button>
                    <button
                      className="btn btn-outline-primary rounded-pill px-3 px-sm-4"
                      onClick={openNewCompanyModal}
                    >
                      <i className="bi bi-plus-lg me-1"></i> Add Experience
                    </button>
                    <button
                      className="btn btn-outline-secondary rounded-pill px-3 px-sm-4"
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
              <div className="card border-0 shadow-sm p-3 p-md-4 rounded-3 bg-white">
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 mb-4">
                  <h5 className="fw-bold mb-0">Detailed Profile & Biography</h5>
                  <span className="badge bg-light text-secondary border px-3 py-2">
                    Experience: <strong>{calculatedExp}</strong>
                  </span>
                </div>

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
                      <label className="form-label small fw-semibold">Professional Title / Headline</label>
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
                    <div className="col-12 col-md-4">
                      <label className="form-label small fw-semibold">Primary Location</label>
                      <input
                        type="text"
                        className="form-control"
                        value={profileForm.location}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, location: e.target.value })
                        }
                        placeholder="e.g. Pune, Maharashtra, India"
                      />
                    </div>
                    <div className="col-12 col-md-4">
                      <label className="form-label small fw-semibold">Contact Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={profileForm.email}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, email: e.target.value })
                        }
                        placeholder="yourname@gmail.com"
                      />
                    </div>
                    <div className="col-12 col-md-4">
                      <label className="form-label small fw-semibold">WhatsApp Number (with country code)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={profileForm.whatsappNo}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, whatsappNo: e.target.value })
                        }
                        placeholder="918767841958"
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
                        placeholder="https://www.linkedin.com/in/..."
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
                        placeholder="https://github.com/..."
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold">About Me Narrative</label>
                      <textarea
                        className="form-control"
                        rows="4"
                        value={profileForm.aboutMe}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, aboutMe: e.target.value })
                        }
                        placeholder="Describe your background, Java backend expertise, problem-solving mindset, and impact..."
                      ></textarea>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button type="submit" className="btn btn-primary rounded-pill px-4 w-100 w-sm-auto">
                      <i className="bi bi-check-lg me-1"></i> Save Profile Details
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* PROJECTS TAB */}
            {activeTab === "projects" && (
              <div className="card border-0 shadow-sm p-3 p-md-4 rounded-3 bg-white">
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 mb-4">
                  <div>
                    <h5 className="fw-bold mb-0">Manage Projects</h5>
                    <p className="text-muted small mb-0">Add architecture highlights, tech stack, and repository links</p>
                  </div>
                  <button
                    className="btn btn-primary rounded-pill px-3"
                    onClick={openNewProjectModal}
                  >
                    <i className="bi bi-plus-lg me-1"></i> Add Project
                  </button>
                </div>

                {profileState.projects?.length === 0 ? (
                  <div className="text-center text-muted py-5">
                    No projects found. Click &quot;Add Project&quot; to add your first project.
                  </div>
                ) : (
                  <>
                    {/* Mobile Card View (d-md-none) */}
                    <div className="d-flex flex-column gap-3 d-md-none">
                      {profileState.projects?.map((proj) => (
                        <div key={proj.id} className="border rounded-3 p-3 bg-light">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <h6 className="fw-bold mb-0 text-dark">{proj.name}</h6>
                            <span className="badge bg-white text-primary border small">
                              {proj.category || "Backend"}
                            </span>
                          </div>
                          <p className="text-muted small mb-2 text-truncate-2">
                            {proj.description}
                          </p>
                          <div className="small text-muted mb-3">
                            <strong>Stack:</strong>{" "}
                            {Array.isArray(proj.techStack) ? proj.techStack.join(", ") : proj.techStack}
                          </div>
                          <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                            <div className="d-flex gap-2">
                              {proj.demoLink && (
                                <a href={proj.demoLink} target="_blank" rel="noopener noreferrer" className="small">
                                  Demo <i className="bi bi-box-arrow-up-right"></i>
                                </a>
                              )}
                              {proj.githubLink && (
                                <a href={proj.githubLink} target="_blank" rel="noopener noreferrer" className="small">
                                  Code <i className="bi bi-github"></i>
                                </a>
                              )}
                            </div>
                            <div className="d-flex gap-1">
                              <button
                                className="btn btn-sm btn-outline-primary rounded-pill px-2 py-1"
                                onClick={() => openEditProjectModal(proj)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger rounded-pill px-2 py-1"
                                onClick={() => handleDeleteProject(proj.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Desktop Table View (d-none d-md-block) */}
                    <div className="table-responsive d-none d-md-block">
                      <table className="table align-middle table-hover">
                        <thead className="table-light">
                          <tr>
                            <th>Title</th>
                            <th>Category</th>
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
                                <span className="badge bg-light text-primary border">
                                  {proj.category || "Backend"}
                                </span>
                              </td>
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
                  </>
                )}
              </div>
            )}

            {/* COMPANIES TAB */}
            {activeTab === "companies" && (
              <div className="card border-0 shadow-sm p-3 p-md-4 rounded-3 bg-white">
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 mb-4">
                  <div>
                    <h5 className="fw-bold mb-0">Manage Work Experience</h5>
                    <p className="text-muted small mb-0">Dates automatically calculate total experience across the site</p>
                  </div>
                  <button
                    className="btn btn-primary rounded-pill px-3"
                    onClick={openNewCompanyModal}
                  >
                    <i className="bi bi-plus-lg me-1"></i> Add Experience
                  </button>
                </div>

                {profileState.companies?.length === 0 ? (
                  <div className="text-center text-muted py-5">
                    No experience records found. Click &quot;Add Experience&quot; to add your position.
                  </div>
                ) : (
                  <>
                    {/* Mobile Card View (d-md-none) */}
                    <div className="d-flex flex-column gap-3 d-md-none">
                      {profileState.companies?.map((comp) => (
                        <div key={comp.id} className="border rounded-3 p-3 bg-light">
                          <div className="d-flex justify-content-between align-items-start mb-1">
                            <h6 className="fw-bold mb-0 text-dark">{comp.company}</h6>
                            <span className="badge bg-white text-dark border small">
                              {comp.duration || comp.startDate}
                            </span>
                          </div>
                          <div className="text-muted small mb-2">
                            {comp.role} &bull; {comp.location || "Remote"}
                          </div>
                          <div className="d-flex justify-content-end gap-1 pt-2 border-top">
                            <button
                              className="btn btn-sm btn-outline-primary rounded-pill px-2 py-1"
                              onClick={() => openEditCompanyModal(comp)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger rounded-pill px-2 py-1"
                              onClick={() => handleDeleteCompany(comp.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Desktop Table View (d-none d-md-block) */}
                    <div className="table-responsive d-none d-md-block">
                      <table className="table align-middle table-hover">
                        <thead className="table-light">
                          <tr>
                            <th>Company</th>
                            <th>Role</th>
                            <th>Duration / Dates</th>
                            <th>Type</th>
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
                                  {comp.duration || `${comp.startDate} - ${comp.isCurrent ? "Present" : comp.endDate}`}
                                </span>
                              </td>
                              <td className="small text-muted">{comp.employmentType || "Full-time"}</td>
                              <td className="small text-muted">{comp.location || "—"}</td>
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
                  </>
                )}
              </div>
            )}

            {/* SKILLS TAB */}
            {activeTab === "skills" && (
              <div className="card border-0 shadow-sm p-3 p-md-4 rounded-3 bg-white">
                <h5 className="fw-bold mb-2">Manage Skills & Technologies</h5>
                <p className="text-muted small mb-4">
                  Add, edit, or remove skills. Changes update the skills matrix on the live site immediately.
                </p>

                {/* Quick Add Form */}
                <form onSubmit={handleAddSkill} className="mb-4">
                  <div className="row g-2 align-items-center">
                    <div className="col-12 col-sm-8 col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Redis, Kafka, Kubernetes, Spring Cloud..."
                        value={newSkillInput}
                        onChange={(e) => setNewSkillInput(e.target.value)}
                      />
                    </div>
                    <div className="col-12 col-sm-4 col-md-3">
                      <button type="submit" className="btn btn-primary rounded-pill px-4 w-100">
                        <i className="bi bi-plus-lg me-1"></i> Add Skill
                      </button>
                    </div>
                  </div>
                </form>

                {/* Active Skills List with Delete Button */}
                <h6 className="fw-bold text-dark mb-3">Active Skills ({profileState.skills?.length || 0}):</h6>
                <div className="d-flex flex-wrap gap-2 mb-4">
                  {(profileState.skills || []).map((skill, index) => (
                    <span
                      key={index}
                      className="badge bg-light text-dark border px-3 py-2 rounded-pill d-inline-flex align-items-center gap-2"
                      style={{ fontSize: "0.88rem" }}
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        className="btn-close"
                        style={{ fontSize: "0.6rem" }}
                        aria-label="Remove skill"
                        onClick={() => handleDeleteSkill(skill)}
                      ></button>
                    </span>
                  ))}
                </div>

                {/* Bulk Edit textarea */}
                <form onSubmit={handleProfileSubmit}>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Bulk Edit Skills (comma-separated)</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={profileForm.skillsText}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, skillsText: e.target.value })
                      }
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-outline-primary rounded-pill px-4 w-100 w-sm-auto">
                    Save Bulk Skills
                  </button>
                </form>
              </div>
            )}

            {/* RESUME TAB */}
            {activeTab === "resume" && (
              <div className="card border-0 shadow-sm p-3 p-md-4 rounded-3 bg-white">
                <h5 className="fw-bold mb-2">Resume PDF Management</h5>
                <p className="text-muted small mb-4">
                  Update the resume link downloaded by visitors when clicking &quot;Download Resume&quot;.
                </p>

                <form onSubmit={handleProfileSubmit}>
                  <div className="mb-4">
                    <label className="form-label small fw-semibold">
                      Resume PDF Link / URL
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={profileForm.resumeUrl}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, resumeUrl: e.target.value })
                      }
                      placeholder="/Vitthal Khemnar - Resume.pdf or https://drive.google.com/..."
                    />
                    <div className="form-text small mt-2">
                      Points to <code>public/Vitthal Khemnar - Resume.pdf</code> by default. You can also paste any public cloud storage direct link (Google Drive, Dropbox, AWS S3, Firebase).
                    </div>
                  </div>

                  <div className="d-flex flex-wrap align-items-center gap-2">
                    <button type="submit" className="btn btn-primary rounded-pill px-4">
                      Save Resume Link
                    </button>
                    <a
                      href={profileForm.resumeUrl || "/Vitthal Khemnar - Resume.pdf"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-secondary rounded-pill px-4"
                    >
                      <i className="bi bi-box-arrow-up-right me-1"></i> Test Resume Link
                    </a>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FULLY RESPONSIVE PROJECT MODAL */}
      {projectModalOpen && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg modal-fullscreen-sm-down">
            <div className="modal-content border-0 shadow-lg rounded-3">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">
                  {editingProjectId ? "Edit Project Details" : "Add Detailed Project"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setProjectModalOpen(false)}
                ></button>
              </div>
              <form onSubmit={handleSaveProject}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-semibold">Project Title</label>
                      <input
                        type="text"
                        className="form-control"
                        value={projectForm.name}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, name: e.target.value })
                        }
                        placeholder="e.g. Distributed Payment Gateway"
                        required
                      />
                    </div>
                    <div className="col-12 col-sm-6 col-md-3">
                      <label className="form-label small fw-semibold">Category</label>
                      <select
                        className="form-select"
                        value={projectForm.category}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, category: e.target.value })
                        }
                      >
                        <option value="Microservices">Microservices</option>
                        <option value="REST API">REST API</option>
                        <option value="Full Stack">Full Stack</option>
                        <option value="System Design">System Design</option>
                        <option value="Cloud Native">Cloud Native</option>
                      </select>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3">
                      <label className="form-label small fw-semibold">Status</label>
                      <select
                        className="form-select"
                        value={projectForm.status}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, status: e.target.value })
                        }
                      >
                        <option value="Completed">Completed</option>
                        <option value="In Production">In Production</option>
                        <option value="In Progress">In Progress</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold">Project Overview / Description</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={projectForm.description}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, description: e.target.value })
                        }
                        placeholder="Explain the business problem, backend architecture, and core functionality..."
                        required
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold">
                        Key Architecture Highlights / Features (1 per line)
                      </label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={projectForm.keyFeatures}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, keyFeatures: e.target.value })
                        }
                        placeholder="• High-throughput reactive architecture&#10;• JWT role-based security layer&#10;• Optimized relational database queries"
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold">Tech Stack (comma-separated)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={projectForm.techStack}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, techStack: e.target.value })
                        }
                        placeholder="Java 17, Spring Boot, MySQL, Docker, REST API"
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-semibold">Live Demo Link (optional)</label>
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
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-semibold">GitHub Repository Link</label>
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
                </div>
                <div className="modal-footer d-flex justify-content-end gap-2 flex-wrap">
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

      {/* FULLY RESPONSIVE COMPANY MODAL */}
      {companyModalOpen && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg modal-fullscreen-sm-down">
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
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-semibold">Company Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={companyForm.company}
                        onChange={(e) =>
                          setCompanyForm({ ...companyForm, company: e.target.value })
                        }
                        placeholder="e.g. Acme Tech Solutions"
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
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
                    <div className="col-12 col-sm-6 col-md-4">
                      <label className="form-label small fw-semibold">Employment Type</label>
                      <select
                        className="form-select"
                        value={companyForm.employmentType}
                        onChange={(e) =>
                          setCompanyForm({ ...companyForm, employmentType: e.target.value })
                        }
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                      <label className="form-label small fw-semibold">Workplace Type</label>
                      <select
                        className="form-select"
                        value={companyForm.locationType}
                        onChange={(e) =>
                          setCompanyForm({ ...companyForm, locationType: e.target.value })
                        }
                      >
                        <option value="On-site">On-site</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Remote">Remote</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-4">
                      <label className="form-label small fw-semibold">Location (City, Country)</label>
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
                    <div className="col-12 col-sm-6 col-md-4">
                      <label className="form-label small fw-semibold">Start Date (YYYY-MM or Year)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={companyForm.startDate}
                        onChange={(e) =>
                          setCompanyForm({ ...companyForm, startDate: e.target.value })
                        }
                        placeholder="2023-08"
                        required
                      />
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                      <label className="form-label small fw-semibold">End Date</label>
                      <input
                        type="text"
                        className="form-control"
                        value={companyForm.isCurrent ? "Present" : companyForm.endDate}
                        onChange={(e) =>
                          setCompanyForm({ ...companyForm, endDate: e.target.value })
                        }
                        placeholder="2024-05"
                        disabled={companyForm.isCurrent}
                      />
                    </div>
                    <div className="col-12 col-md-4 d-flex align-items-center pt-2 pt-md-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="isCurrentCheck"
                          checked={companyForm.isCurrent}
                          onChange={(e) =>
                            setCompanyForm({ ...companyForm, isCurrent: e.target.checked })
                          }
                        />
                        <label className="form-check-label small fw-semibold" htmlFor="isCurrentCheck">
                          Currently working here
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold">Role Summary</label>
                      <textarea
                        className="form-control"
                        rows="2"
                        value={companyForm.description}
                        onChange={(e) =>
                          setCompanyForm({ ...companyForm, description: e.target.value })
                        }
                        placeholder="High-level summary of your role and contributions..."
                        required
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold">
                        Key Responsibilities & Accomplishments (1 per line)
                      </label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={companyForm.responsibilities}
                        onChange={(e) =>
                          setCompanyForm({ ...companyForm, responsibilities: e.target.value })
                        }
                        placeholder="• Engineered scalable microservices with Spring Boot and Spring Data JPA&#10;• Designed normalized relational database schemas in MySQL&#10;• Collaborated in an Agile Scrum environment with sprint velocity tracking"
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold">Technologies Used (comma-separated)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={companyForm.technologies}
                        onChange={(e) =>
                          setCompanyForm({ ...companyForm, technologies: e.target.value })
                        }
                        placeholder="Core Java, Spring Boot, MySQL, REST APIs, Git"
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer d-flex justify-content-end gap-2 flex-wrap">
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
