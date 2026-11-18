// Default portfolio initial data tailored for a classic Java Backend Developer
export const DEFAULT_PORTFOLIO_DATA = {
  profile: {
    name: "Vitthal Khemnar",
    role: "Java Backend Developer",
    experience: "1+ Years",
    location: "Pune, Maharashtra, India",
    linkedInUrl: "https://www.linkedin.com/in/vitthalkhemnar/",
    githubUrl: "https://github.com/vitthalkhemnar",
    whatsappNo: "918767841958",
    email: "vitthalkkhemnar@gmail.com",
    summary:
      "Passionate Java Backend Developer with professional experience in designing scalable microservices, high-throughput REST APIs, and robust database architectures using Spring Boot and Hibernate.",
    aboutMe:
      "I am a Java Backend Developer with 1 year of professional experience at ANMsoft Technologies. My core expertise encompasses Core Java, Spring Boot, Spring Data JPA, Hibernate, and Microservices architecture. I specialize in developing resilient RESTful services, optimizing database query performance, and implementing secure, maintainable backend systems. I have a strong foundation in Object-Oriented Programming (OOP), Multithreading, and Clean Architecture principles, and I am continuously expanding my knowledge in distributed cloud systems.",
    resumeUrl: "/Vitthal Khemnar - Resume.pdf",
    skills: [
      "Java (8/17/21)",
      "Spring Boot",
      "Spring Data JPA",
      "Hibernate",
      "Microservices",
      "Spring Security",
      "RESTful Web Services",
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Docker",
      "Maven",
      "Git & GitHub",
      "Postman",
      "ReactJS"
    ],
    skillCategories: [
      {
        category: "Backend & Core",
        items: ["Core Java (OOP, Collections, Streams, Multithreading)", "Spring Boot 3", "Spring Data JPA", "Hibernate ORM", "Microservices Architecture", "Spring Security", "RESTful APIs"]
      },
      {
        category: "Databases & Persistence",
        items: ["MySQL", "PostgreSQL", "MongoDB", "Query Optimization", "Indexing & Transactions"]
      },
      {
        category: "Tools & DevOps",
        items: ["Docker", "Maven", "Git & GitHub", "Postman", "Swagger / OpenAPI", "Linux / Bash"]
      },
      {
        category: "Frontend & Full Stack",
        items: ["ReactJS", "JavaScript (ES6+)", "Bootstrap 5", "HTML5 & CSS3"]
      }
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
        "Engineered scalable backend microservices and enterprise REST APIs using Core Java, Spring Boot, and Spring Data JPA. Designed normalized relational database schemas in MySQL, optimized complex Hibernate queries to reduce latency, and implemented secure token-based authentication. Collaborated closely with cross-functional teams and frontend engineers in an Agile sprint environment.",
      technologies: ["Core Java", "Spring Boot", "Spring Data JPA", "Hibernate", "Microservices", "MySQL", "REST APIs", "Git"]
    }
  ],
  projects: [
    {
      id: "proj-1",
      name: "E-Commerce Microservices Platform",
      description:
        "A distributed backend system with decoupled microservices for product catalog, user authentication, shopping cart, and order processing. Features asynchronous communication, service discovery, and centralized configuration.",
      techStack: ["Java 17", "Spring Boot", "Spring Cloud", "MySQL", "Docker", "REST API"],
      image: "/images/aboutme.jpeg",
      demoLink: "https://github.com/vitthalkhemnar",
      githubLink: "https://github.com/vitthalkhemnar"
    },
    {
      id: "proj-2",
      name: "Banking & Transaction Management API",
      description:
        "High-integrity financial transactions REST API with ACID compliance, role-based access control with JWT authentication, audit logging, and automated OpenAPI documentation.",
      techStack: ["Spring Boot", "Spring Security", "Hibernate", "PostgreSQL", "Swagger"],
      image: "/images/aboutme.jpeg",
      demoLink: "https://github.com/vitthalkhemnar",
      githubLink: "https://github.com/vitthalkhemnar"
    },
    {
      id: "proj-3",
      name: "Dynamic Portfolio & Serverless Admin Portal",
      description:
        "A modern, responsive portfolio application engineered with React, Redux Toolkit, and Bootstrap, featuring a client-side serverless CMS for real-time project, company, and resume management.",
      techStack: ["ReactJS", "Redux Toolkit", "Bootstrap 5", "JavaScript", "HTML5/CSS3"],
      image: "/images/aboutme.jpeg",
      demoLink: "https://github.com/vitthalkhemnar/portfolio-react",
      githubLink: "https://github.com/vitthalkhemnar/portfolio-react"
    },
    {
      id: "proj-4",
      name: "Employee & Task Management System",
      description:
        "Enterprise task delegation service with multi-level hierarchical user management, scheduled email reminders, and complex SQL reporting queries.",
      techStack: ["Java", "Spring Boot", "MySQL", "Spring Data JPA", "Maven"],
      image: "/images/aboutme.jpeg",
      demoLink: "https://github.com/vitthalkhemnar",
      githubLink: "https://github.com/vitthalkhemnar"
    }
  ]
};

const STORAGE_KEY = "vitthal_portfolio_data";

export const dataService = {
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

  saveData: (data) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error("Failed to write to localStorage:", e);
      return false;
    }
  },

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
