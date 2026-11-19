import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../../services/authService";
import { dataService } from "../../services/dataService";
import {
  setProfile,
  setSkillCategories,
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

  // Profile Form state
  const [profileForm, setProfileForm] = useState({
    name: profileState.name || "",
    role: profileState.role || "",
    statusText: profileState.statusText || "",
    tagline: profileState.tagline || "",
    experience: profileState.experience || "",
    summary: profileState.summary || "",
    location: profileState.location || "",
    email: profileState.email || "",
    whatsappNo: profileState.whatsappNo || "",
    linkedInUrl: profileState.linkedInUrl || "",
    githubUrl: profileState.githubUrl || "",
    aboutMe: profileState.aboutMe || "",
    resumeUrl: profileState.resumeUrl || "",
    skillsText: (profileState.skills || []).join(", ")
  });

  // Sync profile form when Redux updates
  useEffect(() => {
    setProfileForm({
      name: profileState.name || "",
      role: profileState.role || "",
      statusText: profileState.statusText || "",
      tagline: profileState.tagline || "",
      experience: profileState.experience || "",
      summary: profileState.summary || "",
      location: profileState.location || "",
      email: profileState.email || "",
      whatsappNo: profileState.whatsappNo || "",
      linkedInUrl: profileState.linkedInUrl || "",
      githubUrl: profileState.githubUrl || "",
      aboutMe: profileState.aboutMe || "",
      resumeUrl: profileState.resumeUrl || "",
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

  // Lock body scroll when any modal is open to prevent background fighting with modal scroll
  useEffect(() => {
    if (projectModalOpen || companyModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [projectModalOpen, companyModalOpen]);

  // Categorized Skills states with full fallback
  const rawSkillCategories = (
    Array.isArray(profileState.skillCategories) ? profileState.skillCategories : []
  ).map((cat, idx) => {
    const catObj = typeof cat === "object" && cat !== null ? cat : {};
    return {
      id: catObj.id || `cat-${idx}`,
      title: catObj.title || catObj.name || `Category ${idx + 1}`,
      icon: catObj.icon || "bi-stars",
      skills: Array.isArray(catObj.skills) ? catObj.skills : []
    };
  });
  const firstCatId = rawSkillCategories[0]?.id;
  const [selectedCatId, setSelectedCatId] = useState("");
  const [newSkillInput, setNewSkillInput] = useState("");
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [newCategoryTitle, setNewCategoryTitle] = useState("");
  const [newCategoryIcon, setNewCategoryIcon] = useState("bi-cup-hot");
  const [inlineSkillInputs, setInlineSkillInputs] = useState({});

  // Auto-select first category when categories load
  useEffect(() => {
    if (!selectedCatId && firstCatId) {
      setSelectedCatId(firstCatId);
    }
  }, [firstCatId, selectedCatId]);

  const showNotification = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const [syncingCloud, setSyncingCloud] = useState(false);

  const handleLogout = async () => {
    await authService.logout();
    navigate("/login");
  };

  const handleManualCloudSync = async () => {
    if (!dataService.isCloudSyncActive()) {
      alert(
        "Firebase is not configured yet. Add your Firebase credentials in .env or .env.local to enable Cloud Firestore sync."
      );
      return;
    }
    setSyncingCloud(true);
    const currentData = {
      profile: {
        name: profileState.name,
        role: profileState.role,
        statusText: profileState.statusText,
        tagline: profileState.tagline,
        experience: profileState.experience,
        location: profileState.location,
        linkedInUrl: profileState.linkedInUrl,
        githubUrl: profileState.githubUrl,
        whatsappNo: profileState.whatsappNo,
        email: profileState.email,
        summary: profileState.summary,
        aboutMe: profileState.aboutMe,
        resumeUrl: profileState.resumeUrl,
        skillCategories: profileState.skillCategories,
        skills: profileState.skills
      },
      companies: profileState.companies,
      projects: profileState.projects
    };
    const success = await dataService.syncToCloud(currentData);
    setSyncingCloud(false);
    if (success) {
      showNotification("All portfolio data successfully synchronized to Cloud Firestore!");
    } else {
      alert("Failed to sync to Cloud Firestore. Check your connection and Firestore security rules.");
    }
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
      statusText: profileForm.statusText,
      tagline: profileForm.tagline,
      experience: profileForm.experience,
      summary: profileForm.summary,
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

  // One-click apply & sync of real-world minimalist profile to Firebase Firestore
  const handleApplyMinimalistProfile = async () => {
    const minimalProfile = {
      name: "Vitthal Khemnar",
      role: "Software Engineer",
      statusText: "Available for new opportunities",
      tagline: "Building scalable distributed systems and mission-critical backend APIs",
      summary:
        "Specializing in Java, Spring Boot, and distributed backend architecture. Over the past two years, I’ve built mission-critical travel APIs, payment workflows, and cloud-deployed applications like Bazaar, bridging rock-solid backend engineering with seamless user experiences.",
      experience: "2+ Years",
      location: "India",
      email: "vitthal@example.com",
      githubUrl: "https://github.com",
      linkedInUrl: "https://linkedin.com",
      aboutMe:
        "Backend & full-stack software engineer with deep expertise in Java, Spring Boot microservices, high-throughput APIs, and modern cloud deployment.",
      skills: [
        "Java",
        "Spring Boot",
        "Microservices",
        "REST APIs",
        "React",
        "PostgreSQL",
        "Docker",
        "AWS",
        "Git"
      ]
    };

    setProfileForm((prev) => ({
      ...prev,
      ...minimalProfile,
      skillsText: minimalProfile.skills.join(", ")
    }));

    dispatch(setProfile(minimalProfile));

    const fullUpdatedData = {
      profile: {
        ...profileState,
        ...minimalProfile
      },
      companies: profileState.companies || [],
      projects: profileState.projects || []
    };

    dataService.saveData(fullUpdatedData);
    if (dataService.isCloudSyncActive()) {
      await dataService.syncToCloud(fullUpdatedData);
    }

    showNotification("Minimalist profile applied and synced to Firebase Firestore!");
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

  // Icon presets for category creation
  const CATEGORY_ICON_PRESETS = [
    { value: "bi-cup-hot", label: "Backend / Java (Cup)" },
    { value: "bi-database", label: "Databases (Database)" },
    { value: "bi-terminal", label: "DevOps / CLI (Terminal)" },
    { value: "bi-laptop", label: "Frontend / Full Stack (Laptop)" },
    { value: "bi-cloud", label: "Cloud & Distributed (Cloud)" },
    { value: "bi-shield-check", label: "Security & Auth (Shield)" },
    { value: "bi-gear", label: "Architecture & Tools (Gear)" },
    { value: "bi-code-slash", label: "Code & Languages (Brackets)" },
    { value: "bi-stars", label: "General & Highlights (Stars)" }
  ];

  // Add skill(s) to a specific category
  const handleAddSkillToCategory = (catId, skillStr) => {
    if (!catId || !skillStr || !skillStr.trim()) return;

    const newSkills = skillStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (newSkills.length === 0) return;

    const currentCategories = profileState.skillCategories && profileState.skillCategories.length > 0
      ? profileState.skillCategories
      : [];

    const updatedCategories = currentCategories.map((cat) => {
      if (cat.id === catId) {
        const existing = cat.skills || [];
        const uniqueToAdd = newSkills.filter((s) => !existing.includes(s));
        return {
          ...cat,
          skills: [...existing, ...uniqueToAdd]
        };
      }
      return cat;
    });

    dispatch(setSkillCategories(updatedCategories));
    showNotification(`Added ${newSkills.length} skill(s) successfully!`);
  };

  // Form submit for top quick-add
  const handleTopAddSkillSubmit = (e) => {
    e.preventDefault();
    if (!selectedCatId) {
      alert("Please select or create a category first.");
      return;
    }
    handleAddSkillToCategory(selectedCatId, newSkillInput);
    setNewSkillInput("");
  };

  // Remove a skill from a specific category
  const handleRemoveSkillFromCategory = (catId, skillToRemove) => {
    const currentCategories = profileState.skillCategories || [];
    const updatedCategories = currentCategories.map((cat) => {
      if (cat.id === catId) {
        return {
          ...cat,
          skills: (cat.skills || []).filter((s) => s !== skillToRemove)
        };
      }
      return cat;
    });
    dispatch(setSkillCategories(updatedCategories));
    showNotification(`Removed "${skillToRemove}" from category.`);
  };

  // Create a brand new category
  const handleCreateNewCategory = (e) => {
    e.preventDefault();
    if (!newCategoryTitle.trim()) {
      alert("Please enter a category title.");
      return;
    }

    const newCat = {
      id: "cat-" + Date.now(),
      title: newCategoryTitle.trim(),
      icon: newCategoryIcon || "bi-stars",
      skills: []
    };

    const currentCategories = profileState.skillCategories || [];
    const updatedCategories = [...currentCategories, newCat];
    dispatch(setSkillCategories(updatedCategories));
    setSelectedCatId(newCat.id);
    setNewCategoryTitle("");
    setIsCreatingCategory(false);
    showNotification(`Created new category: "${newCat.title}"`);
  };

  // Delete an entire category
  const handleDeleteCategory = (catId, catTitle) => {
    if (window.confirm(`Are you sure you want to delete the category "${catTitle}" and all its skills?`)) {
      const currentCategories = profileState.skillCategories || [];
      const updatedCategories = currentCategories.filter((c) => c.id !== catId);
      dispatch(setSkillCategories(updatedCategories));
      if (selectedCatId === catId) {
        setSelectedCatId(updatedCategories[0]?.id || "");
      }
      showNotification(`Category "${catTitle}" deleted.`);
    }
  };

  return (
    <div className="admin-theme min-vh-100 d-flex flex-column" style={{ backgroundColor: "var(--bg-page)" }}>
      {/* Responsive Top Navbar */}
      <header
        className="navbar navbar-dark px-3 px-md-4 py-2 shadow-sm d-flex justify-content-between align-items-center"
        style={{ backgroundColor: "#0c0c0e", borderBottom: "1px solid var(--border-subtle)" }}
      >
        <div className="d-flex align-items-center gap-2">
          <span className="brand-dot"></span>
          <span className="navbar-brand fw-bold fs-6 fs-md-5 mb-0 text-white">Control Center</span>
        </div>
        <div className="d-flex align-items-center gap-2">
          {dataService.isCloudSyncActive() ? (
            <span
              className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-25 rounded-pill px-2 px-sm-3 py-1 small d-flex align-items-center gap-1"
              title="Cloud Firestore active. Edits automatically sync to cloud."
            >
              <i className="bi bi-cloud-check-fill text-success"></i>
              <span className="d-none d-md-inline">Firestore Synced</span>
            </span>
          ) : (
            <span
              className="badge bg-secondary bg-opacity-25 text-warning border border-secondary border-opacity-25 rounded-pill px-2 px-sm-3 py-1 small d-flex align-items-center gap-1"
              title="Local Mode: Edits saved to browser storage. Add Firebase keys to sync to cloud."
            >
              <i className="bi bi-hdd-fill text-warning"></i>
              <span className="d-none d-md-inline">Local Mode</span>
            </span>
          )}
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
            <div className="clean-card p-2">
              <div
                className="nav flex-row flex-md-column nav-pills gap-1 overflow-auto flex-nowrap pb-1 pb-md-0"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                <button
                  className={`nav-link text-nowrap text-start py-2 px-3 fw-semibold rounded-2 ${
                    activeTab === "overview" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("overview")}
                >
                  <i className="bi bi-grid-1x2 me-2"></i> Overview
                </button>
                <button
                  className={`nav-link text-nowrap text-start py-2 px-3 fw-semibold rounded-2 ${
                    activeTab === "profile" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("profile")}
                >
                  <i className="bi bi-person me-2"></i> Profile
                </button>
                <button
                  className={`nav-link text-nowrap text-start py-2 px-3 fw-semibold rounded-2 ${
                    activeTab === "projects" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("projects")}
                >
                  <i className="bi bi-laptop me-2"></i> Projects ({profileState.projects?.length || 0})
                </button>
                <button
                  className={`nav-link text-nowrap text-start py-2 px-3 fw-semibold rounded-2 ${
                    activeTab === "companies" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("companies")}
                >
                  <i className="bi bi-briefcase me-2"></i> Experience ({profileState.companies?.length || 0})
                </button>
                <button
                  className={`nav-link text-nowrap text-start py-2 px-3 fw-semibold rounded-2 ${
                    activeTab === "skills" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("skills")}
                >
                  <i className="bi bi-stars me-2"></i> Skills ({profileState.skills?.length || 0})
                </button>
                <button
                  className={`nav-link text-nowrap text-start py-2 px-3 fw-semibold rounded-2 ${
                    activeTab === "resume" ? "active" : ""
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
                      <div className="text-muted small">Total Experience</div>
                      <div className="fs-3 fs-md-2 fw-bold text-success">{profileState.experience || "1.5+ Years"}</div>
                      <div className="small text-muted d-none d-sm-block">Set by admin</div>
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
                    {dataService.isCloudSyncActive() && (
                      <button
                        className="btn btn-outline-success rounded-pill px-3 px-sm-4"
                        onClick={handleManualCloudSync}
                        disabled={syncingCloud}
                      >
                        <i className={`bi ${syncingCloud ? "bi-arrow-repeat spin" : "bi-cloud-upload"} me-1`}></i>
                        {syncingCloud ? "Syncing..." : "Sync All to Firestore"}
                      </button>
                    )}
                  </div>
                </div>

                {/* Cloud Sync & Firebase Status Card */}
                <div className="card border-0 shadow-sm p-3 p-md-4 rounded-3 bg-white">
                  <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-fire fs-4 text-warning"></i>
                      <div>
                        <h6 className="fw-bold mb-0">Firebase Cloud Synchronization</h6>
                        <small className="text-muted">Multi-device real-time cloud data storage</small>
                      </div>
                    </div>
                    {dataService.isCloudSyncActive() ? (
                      <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-3 py-2 rounded-pill small">
                        <i className="bi bi-check-circle-fill me-1"></i> Connected to Firestore
                      </span>
                    ) : (
                      <span className="badge bg-secondary bg-opacity-10 text-secondary border px-3 py-2 rounded-pill small">
                        <i className="bi bi-hdd me-1"></i> Local Storage Mode
                      </span>
                    )}
                  </div>

                  {dataService.isCloudSyncActive() ? (
                    <div className="bg-light p-3 rounded-3 small">
                      <p className="mb-2 text-dark">
                        <i className="bi bi-info-circle text-primary me-2"></i>
                        Your portfolio is linked to <strong>Google Cloud Firestore</strong>. Any modifications made to your projects, experience, or skills automatically synchronize with the cloud database so visitors anywhere in the world see your changes immediately.
                      </p>
                      <div className="d-flex flex-wrap gap-2 mt-2">
                        <button
                          className="btn btn-sm btn-outline-success rounded-pill"
                          onClick={handleManualCloudSync}
                          disabled={syncingCloud}
                        >
                          <i className={`bi ${syncingCloud ? "bi-arrow-repeat spin" : "bi-arrow-clockwise"} me-1`}></i>
                          {syncingCloud ? "Syncing with Firestore..." : "Force Cloud Sync"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-light p-3 rounded-3 small">
                      <p className="mb-2 text-dark">
                        <i className="bi bi-shield-exclamation text-warning me-2"></i>
                        Currently running in <strong>Local Storage Mode</strong>. All data changes are saved inside your local browser.
                      </p>
                      <p className="mb-0 text-muted">
                        To enable multi-device cloud storage and allow recruiters worldwide to view your live edits, add your Firebase keys to <code>.env.local</code>. (See <code>.env.example</code> for details).
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <div className="card border-0 shadow-sm p-3 p-md-4 rounded-3 bg-white">
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 mb-4">
                  <div>
                    <h5 className="fw-bold mb-0">Detailed Profile & Biography</h5>
                    <p className="text-muted small mb-0">Manage bio, experience, contact details, and core skills</p>
                  </div>
                  <span className="badge bg-light text-secondary border px-3 py-2">
                    Experience: <strong>{profileState.experience || "1.5+ Years"}</strong>
                  </span>
                </div>

                {/* Real-World Minimalist Profile Quick-Sync Banner */}
                <div
                  className="alert border d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 p-3 mb-4 rounded-3"
                  style={{ background: "#18181b", borderColor: "var(--border-subtle)" }}
                >
                  <div>
                    <div className="fw-semibold text-white mb-1">
                      <i className="bi bi-stars text-primary me-2"></i>
                      Real-World Minimalist Profile Template
                    </div>
                    <div className="small text-muted">
                      Apply clean, professional editorial profile copy (single role title, authentic bio, outbound links) and sync to Firebase in one click.
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm rounded-pill px-3 py-2 text-nowrap fw-semibold d-inline-flex align-items-center gap-2"
                    onClick={handleApplyMinimalistProfile}
                  >
                    <i className="bi bi-cloud-arrow-up"></i> Apply & Sync to Firebase
                  </button>
                </div>

                <form onSubmit={handleProfileSubmit}>
                  <div className="row g-3">
                    <div className="col-12 col-md-4">
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
                    <div className="col-12 col-md-4">
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
                      <label className="form-label small fw-semibold">Total Experience</label>
                      <input
                        type="text"
                        className="form-control"
                        value={profileForm.experience}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, experience: e.target.value })
                        }
                        placeholder="e.g. 1.5+ Years or 2 Years"
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-semibold">Availability Status Badge</label>
                      <input
                        type="text"
                        className="form-control"
                        value={profileForm.statusText}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, statusText: e.target.value })
                        }
                        placeholder="e.g. Available for Backend Roles"
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-semibold">Hero Heading Tagline</label>
                      <input
                        type="text"
                        className="form-control"
                        value={profileForm.tagline}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, tagline: e.target.value })
                        }
                        placeholder="e.g. building clean, resilient systems."
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
                      <label className="form-label small fw-semibold">Hero Intro Summary (Short Pitch on Home)</label>
                      <textarea
                        className="form-control"
                        rows="2"
                        value={profileForm.summary}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, summary: e.target.value })
                        }
                        placeholder="A concise 1-2 sentence pitch shown on the Home hero section..."
                      ></textarea>
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
                    <p className="text-muted small mb-0">Manage professional positions, companies, and roles</p>
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
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 mb-3">
                  <div>
                    <h5 className="fw-bold mb-1">Manage Skills & Technologies</h5>
                    <p className="text-muted small mb-0">
                      Organize skills into architectural categories. Changes immediately update the live Skills Carousel.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm rounded-pill px-3"
                    onClick={() => setIsCreatingCategory(!isCreatingCategory)}
                  >
                    <i className="bi bi-folder-plus me-1"></i>
                    {isCreatingCategory ? "Cancel New Category" : "New Category"}
                  </button>
                </div>

                {/* Create New Category Panel (collapsible) */}
                {isCreatingCategory && (
                  <div className="card border p-3 rounded-3 bg-light mb-4">
                    <h6 className="fw-bold text-dark mb-3">
                      <i className="bi bi-plus-circle me-1 text-primary"></i> Create New Skill Category
                    </h6>
                    <form onSubmit={handleCreateNewCategory}>
                      <div className="row g-2 align-items-end">
                        <div className="col-12 col-md-5">
                          <label className="form-label small fw-semibold">Category Title</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="e.g. Cloud & Distributed Systems"
                            value={newCategoryTitle}
                            onChange={(e) => setNewCategoryTitle(e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-12 col-md-4">
                          <label className="form-label small fw-semibold">Icon</label>
                          <select
                            className="form-select"
                            value={newCategoryIcon}
                            onChange={(e) => setNewCategoryIcon(e.target.value)}
                          >
                            {CATEGORY_ICON_PRESETS.map((ico) => (
                              <option key={ico.value} value={ico.value}>
                                {ico.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-12 col-md-3">
                          <button type="submit" className="btn btn-success rounded-pill px-3 w-100">
                            <i className="bi bi-check-lg me-1"></i> Save Category
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                {/* Primary Add Skill Form: Select Category & Add Skills */}
                <div className="card border p-3 rounded-3 bg-light mb-4">
                  <h6 className="fw-bold text-dark mb-2">
                    <i className="bi bi-tag me-1 text-primary"></i> Add Skills to a Category
                  </h6>
                  <form onSubmit={handleTopAddSkillSubmit}>
                    <div className="row g-2 align-items-end">
                      <div className="col-12 col-md-4">
                        <label className="form-label small fw-semibold">Select Category</label>
                        <select
                          className="form-select"
                          value={selectedCatId}
                          onChange={(e) => {
                            if (e.target.value === "__new__") {
                              setIsCreatingCategory(true);
                            } else {
                              setSelectedCatId(e.target.value);
                            }
                          }}
                          required
                        >
                          {rawSkillCategories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.title} ({cat.skills?.length || 0})
                            </option>
                          ))}
                          <option value="__new__">+ Create New Category...</option>
                        </select>
                      </div>

                      <div className="col-12 col-md-5">
                        <label className="form-label small fw-semibold">Skill Name(s)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. Kafka, Redis (comma-separated for multiple)"
                          value={newSkillInput}
                          onChange={(e) => setNewSkillInput(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-12 col-md-3">
                        <button type="submit" className="btn btn-primary rounded-pill px-3 w-100">
                          <i className="bi bi-plus-lg me-1"></i> Add to Category
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Categorized Skills Matrix Cards */}
                <h6 className="fw-bold text-dark mb-3">
                  Categorized Skills Matrix ({rawSkillCategories.length} Categories, {profileState.skills?.length || 0} Total Skills):
                </h6>

                {rawSkillCategories.length === 0 ? (
                  <div className="text-center text-muted py-4 border rounded-3 bg-light">
                    No categories created yet. Click &quot;New Category&quot; above to get started.
                  </div>
                ) : (
                  <div className="row g-3">
                    {rawSkillCategories.map((cat) => (
                      <div key={cat.id} className="col-12 col-lg-6">
                        <div className="border rounded-3 p-3 bg-white h-100 shadow-sm d-flex flex-column justify-content-between">
                          <div>
                            {/* Card Header */}
                            <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                              <div className="d-flex align-items-center gap-2">
                                <i className={`bi ${cat.icon || "bi-stars"} text-primary fs-5`}></i>
                                <span className="fw-bold text-dark">{cat.title}</span>
                                <span className="badge bg-light text-secondary border rounded-pill">
                                  {cat.skills?.length || 0}
                                </span>
                              </div>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger border-0 rounded-circle p-1"
                                title="Delete Category"
                                onClick={() => handleDeleteCategory(cat.id, cat.title)}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>

                            {/* Skills Badges */}
                            <div className="d-flex flex-wrap gap-2 mb-3">
                              {cat.skills && cat.skills.length > 0 ? (
                                cat.skills.map((skill, sIdx) => (
                                  <span
                                    key={sIdx}
                                    className="badge bg-light text-dark border px-3 py-2 rounded-pill d-inline-flex align-items-center gap-2"
                                    style={{ fontSize: "0.85rem" }}
                                  >
                                    <span>{skill}</span>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      style={{ fontSize: "0.55rem" }}
                                      aria-label={`Remove ${skill}`}
                                      onClick={() => handleRemoveSkillFromCategory(cat.id, skill)}
                                    ></button>
                                  </span>
                                ))
                              ) : (
                                <span className="text-muted small">No skills in this category yet.</span>
                              )}
                            </div>
                          </div>

                          {/* Inline Quick Add Form inside each card */}
                          <div className="pt-2 border-top mt-2">
                            <div className="input-group input-group-sm">
                              <input
                                type="text"
                                className="form-control"
                                placeholder={`Add skill to ${cat.title}...`}
                                value={inlineSkillInputs[cat.id] || ""}
                                onChange={(e) =>
                                  setInlineSkillInputs({
                                    ...inlineSkillInputs,
                                    [cat.id]: e.target.value
                                  })
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    const val = inlineSkillInputs[cat.id];
                                    if (val && val.trim()) {
                                      handleAddSkillToCategory(cat.id, val);
                                      setInlineSkillInputs({
                                        ...inlineSkillInputs,
                                        [cat.id]: ""
                                      });
                                    }
                                  }
                                }}
                              />
                              <button
                                className="btn btn-outline-primary"
                                type="button"
                                onClick={() => {
                                  const val = inlineSkillInputs[cat.id];
                                  if (val && val.trim()) {
                                    handleAddSkillToCategory(cat.id, val);
                                    setInlineSkillInputs({
                                      ...inlineSkillInputs,
                                      [cat.id]: ""
                                    });
                                  }
                                }}
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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

      {/* FULLY RESPONSIVE SMOOTH-SCROLLING PROJECT MODAL */}
      {projectModalOpen && (
        <div
          className="modal show d-block"
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            overflowY: "auto",
            zIndex: 1060
          }}
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg my-3 my-sm-4">
            <div
              className="modal-content border-0 shadow-lg rounded-3"
              style={{
                maxHeight: "90vh",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden"
              }}
            >
              <div className="modal-header border-bottom py-3 px-3 px-md-4">
                <h5 className="modal-title fw-bold mb-0">
                  {editingProjectId ? "Edit Project Details" : "Add Detailed Project"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setProjectModalOpen(false)}
                  aria-label="Close"
                ></button>
              </div>
              <form
                onSubmit={handleSaveProject}
                className="d-flex flex-column h-100 overflow-hidden m-0"
              >
                <div
                  className="modal-body p-3 p-md-4"
                  style={{
                    overflowY: "auto",
                    WebkitOverflowScrolling: "touch",
                    flex: "1 1 auto",
                    maxHeight: "calc(90vh - 130px)"
                  }}
                >
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
                <div className="modal-footer border-top bg-light py-2 px-3 px-md-4 d-flex justify-content-end gap-2 flex-wrap">
                  <button
                    type="button"
                    className="btn btn-secondary rounded-pill px-3"
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

      {/* FULLY RESPONSIVE SMOOTH-SCROLLING COMPANY MODAL */}
      {companyModalOpen && (
        <div
          className="modal show d-block"
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            overflowY: "auto",
            zIndex: 1060
          }}
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg my-3 my-sm-4">
            <div
              className="modal-content border-0 shadow-lg rounded-3"
              style={{
                maxHeight: "90vh",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden"
              }}
            >
              <div className="modal-header border-bottom py-3 px-3 px-md-4">
                <h5 className="modal-title fw-bold mb-0">
                  {editingCompanyId ? "Edit Company Experience" : "Add Company Experience"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setCompanyModalOpen(false)}
                  aria-label="Close"
                ></button>
              </div>
              <form
                onSubmit={handleSaveCompany}
                className="d-flex flex-column h-100 overflow-hidden m-0"
              >
                <div
                  className="modal-body p-3 p-md-4"
                  style={{
                    overflowY: "auto",
                    WebkitOverflowScrolling: "touch",
                    flex: "1 1 auto",
                    maxHeight: "calc(90vh - 130px)"
                  }}
                >
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
                <div className="modal-footer border-top bg-light py-2 px-3 px-md-4 d-flex justify-content-end gap-2 flex-wrap">
                  <button
                    type="button"
                    className="btn btn-secondary rounded-pill px-3"
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
