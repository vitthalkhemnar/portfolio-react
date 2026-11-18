// Default portfolio initial data tailored for a classic Java Backend Developer
export const DEFAULT_PORTFOLIO_DATA = {
  profile: {
    name: "Vitthal Khemnar",
    role: "Java Backend Developer",
    location: "Pune, Maharashtra, India",
    linkedInUrl: "https://www.linkedin.com/in/vitthalkhemnar/",
    githubUrl: "https://github.com/vitthalkhemnar",
    whatsappNo: "918767841958",
    email: "vitthalkkhemnar@gmail.com",
    summary:
      "Passionate Java Backend Developer with professional experience in designing scalable microservices, high-throughput REST APIs, and robust database architectures using Spring Boot and Hibernate.",
    aboutMe:
      "I am a Java Backend Developer with professional experience at ANMsoft Technologies. My core expertise encompasses Core Java, Spring Boot, Spring Data JPA, Hibernate, and Microservices architecture. I specialize in developing resilient RESTful services, optimizing database query performance, and implementing secure, maintainable backend systems. I have a strong foundation in Object-Oriented Programming (OOP), Multithreading, and Clean Architecture principles, and I am continuously expanding my knowledge in distributed cloud systems.",
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
    ]
  },
  companies: [
    {
      id: "comp-1",
      company: "ANMsoft Technologies",
      role: "Java Backend Developer",
      employmentType: "Full-time",
      locationType: "On-site",
      location: "Pune, India",
      startDate: "2023-08",
      endDate: "Present",
      isCurrent: true,
      duration: "2023 - Present",
      description:
        "Engineered scalable backend microservices and enterprise REST APIs using Core Java, Spring Boot, and Spring Data JPA. Designed normalized relational database schemas in MySQL, optimized complex Hibernate queries to reduce latency, and implemented secure token-based authentication. Collaborated closely with cross-functional teams and frontend engineers in an Agile sprint environment.",
      responsibilities: [
        "Architected and maintained RESTful microservices using Spring Boot and Spring Data JPA",
        "Optimized Hibernate database execution plans and query caching, improving API throughput",
        "Implemented secure JWT role-based access control and OpenAPI documentation",
        "Participated in Agile sprint planning, daily standups, and rigorous code reviews"
      ],
      technologies: ["Core Java", "Spring Boot", "Spring Data JPA", "Hibernate", "Microservices", "MySQL", "REST APIs", "Git"]
    }
  ],
  projects: [
    {
      id: "proj-1",
      name: "E-Commerce Microservices Platform",
      category: "Microservices",
      status: "Completed",
      description:
        "A distributed backend system with decoupled microservices for product catalog, user authentication, shopping cart, and order processing. Features asynchronous communication, service discovery, and centralized configuration.",
      keyFeatures: [
        "Decoupled microservice architecture with Spring Cloud Eureka service registry",
        "Resilient API Gateway routing with client-side load balancing",
        "JWT-based distributed authentication across microservices"
      ],
      techStack: ["Java 17", "Spring Boot", "Spring Cloud", "MySQL", "Docker", "REST API"],
      image: "/images/aboutme.jpeg",
      demoLink: "https://github.com/vitthalkhemnar",
      githubLink: "https://github.com/vitthalkhemnar"
    },
    {
      id: "proj-2",
      name: "Banking & Transaction Management API",
      category: "REST API",
      status: "Completed",
      description:
        "High-integrity financial transactions REST API with ACID compliance, role-based access control with JWT authentication, audit logging, and automated OpenAPI documentation.",
      keyFeatures: [
        "ACID transactional consistency and optimistic database locking",
        "Role-based authorization and input validation sanitization",
        "Comprehensive Swagger/OpenAPI documentation and unit testing"
      ],
      techStack: ["Spring Boot", "Spring Security", "Hibernate", "PostgreSQL", "Swagger"],
      image: "/images/aboutme.jpeg",
      demoLink: "https://github.com/vitthalkhemnar",
      githubLink: "https://github.com/vitthalkhemnar"
    },
    {
      id: "proj-3",
      name: "Dynamic Portfolio & Serverless Admin Portal",
      category: "Full Stack",
      status: "Completed",
      description:
        "A modern, responsive portfolio application engineered with React, Redux Toolkit, and Bootstrap, featuring a client-side serverless CMS for real-time project, company, and resume management.",
      keyFeatures: [
        "100% serverless static deployment on Vercel/Netlify/Firebase",
        "Dynamic experience calculation derived from company history",
        "Full CRUD admin management for projects, experience, and skills"
      ],
      techStack: ["ReactJS", "Redux Toolkit", "Bootstrap 5", "JavaScript", "HTML5/CSS3"],
      image: "/images/aboutme.jpeg",
      demoLink: "https://github.com/vitthalkhemnar/portfolio-react",
      githubLink: "https://github.com/vitthalkhemnar/portfolio-react"
    },
    {
      id: "proj-4",
      name: "Employee & Task Management System",
      category: "Backend System",
      status: "Completed",
      description:
        "Enterprise task delegation service with multi-level hierarchical user management, scheduled email reminders, and complex SQL reporting queries.",
      keyFeatures: [
        "Hierarchical task assignment workflow with priority scheduling",
        "Automated background scheduled tasks using Spring @Scheduled",
        "Optimized JPA pagination and dynamic specification filtering"
      ],
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
  }
};
