// Default portfolio initial data
export const DEFAULT_PORTFOLIO_DATA = {
  profile: {
    name: "Vitthal Khemnar",
    role: "Java Back-End Developer",
    experience: "1+ Years",
    location: "Pune, India",
    linkedInUrl: "https://www.linkedin.com/in/vitthalkhemnar/",
    githubUrl: "https://github.com/vitthalkhemnar",
    whatsappNo: "918767841958",
    email: "vitthalkkhemnar@gmail.com",
    summary: "Passionate Java Backend Developer specializing in scalable microservices, REST APIs, and clean code architecture.",
    aboutMe:
      "I am a Java Backend Developer with 1 year of professional experience at ANMsoft Technologies. My expertise includes Core Java, Spring, Spring Boot, Spring Data JPA, Hibernate, and Microservices architecture, with a focus on problem-solving and writing clean, maintainable code. I am eager to continue enhancing my skills and contribute to impactful projects.",
    resumeUrl: "/Vitthal Khemnar - Resume.pdf",
    skills: [
      "Java",
      "Spring Boot",
      "Microservices",
      "Hibernate / JPA",
      "MySQL",
      "MongoDB",
      "ReactJS",
      "Git & GitHub",
      "REST APIs"
    ]
  },
  companies: [
    {
      id: "comp-1",
      company: "ANMsoft Technologies",
      role: "Java Backend Developer",
      duration: "2023 - Present",
      location: "Pune, India",
      description:
        "Developed and maintained robust backend microservices using Core Java, Spring Boot, and Spring Data JPA. Designed scalable RESTful APIs, optimized database queries with Hibernate, and collaborated with frontend teams to deliver seamless user experiences.",
      technologies: ["Core Java", "Spring Boot", "Microservices", "Hibernate", "MySQL"]
    }
  ],
  projects: [
    {
      id: "proj-1",
      name: "Portfolio Website",
      description: "A responsive personal portfolio built with React, Redux Toolkit, and Bootstrap, featuring a dynamic serverless admin panel.",
      techStack: ["React", "Redux", "Bootstrap", "JavaScript"],
      image: "/images/aboutme.jpeg",
      demoLink: "https://github.com/vitthalkhemnar/portfolio-react",
      githubLink: "https://github.com/vitthalkhemnar/portfolio-react"
    },
    {
      id: "proj-2",
      name: "E-Commerce Microservices",
      description: "A full-scale backend system with product catalog, cart, user authentication, and payment gateway integration.",
      techStack: ["Java", "Spring Boot", "Spring Cloud", "MySQL", "Docker"],
      image: "/images/aboutme.jpeg",
      demoLink: "https://github.com/vitthalkhemnar",
      githubLink: "https://github.com/vitthalkhemnar"
    },
    {
      id: "proj-3",
      name: "Task Management REST API",
      description: "Secure RESTful APIs featuring JWT authentication, role-based access control, and automated OpenAPI documentation.",
      techStack: ["Spring Boot", "Spring Security", "MySQL", "Swagger"],
      image: "/images/aboutme.jpeg",
      demoLink: "https://github.com/vitthalkhemnar",
      githubLink: "https://github.com/vitthalkhemnar"
    }
  ]
};

const STORAGE_KEY = "vitthal_portfolio_data";

export const dataService = {
  // Load data: check localStorage first, fallback to DEFAULT_PORTFOLIO_DATA
  loadData: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          profile: { ...DEFAULT_PORTFOLIO_DATA.profile, ...(parsed.profile || {}) },
          companies: parsed.companies && parsed.companies.length > 0 ? parsed.companies : DEFAULT_PORTFOLIO_DATA.companies,
          projects: parsed.projects && parsed.projects.length > 0 ? parsed.projects : DEFAULT_PORTFOLIO_DATA.projects
        };
      }
    } catch (e) {
      console.warn("Failed to read from localStorage:", e);
    }
    return DEFAULT_PORTFOLIO_DATA;
  },

  // Save full data bundle
  saveData: (data) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error("Failed to write to localStorage:", e);
      return false;
    }
  },

  // Update specific section
  updateProfile: (profile) => {
    const current = dataService.loadData();
    const updated = { ...current, profile: { ...current.profile, ...profile } };
    dataService.saveData(updated);
    return updated;
  },

  updateProjects: (projects) => {
    const current = dataService.loadData();
    const updated = { ...current, projects };
    dataService.saveData(updated);
    return updated;
  },

  updateCompanies: (companies) => {
    const current = dataService.loadData();
    const updated = { ...current, companies };
    dataService.saveData(updated);
    return updated;
  },

  resetDefaults: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn(e);
    }
    return DEFAULT_PORTFOLIO_DATA;
  }
};
