// Default portfolio initial data tailored for a classic Java Backend Developer
export const DEFAULT_PORTFOLIO_DATA = {
  profile: {
    name: "Vitthal Khemnar",
    role: "Java Backend Developer",
    experience: "1.5+ Years",
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
    skillCategories: [
      {
        id: "cat-backend",
        title: "Backend & Microservices",
        icon: "bi-cup-hot",
        skills: [
          "Core Java (11/17/21)",
          "Spring Boot",
          "Spring Data JPA",
          "Hibernate",
          "Microservices Architecture",
          "RESTful APIs",
          "Spring Security"
        ]
      },
      {
        id: "cat-database",
        title: "Databases & Storage",
        icon: "bi-database",
        skills: [
          "MySQL",
          "PostgreSQL",
          "MongoDB",
          "Redis",
          "Query Optimization"
        ]
      },
      {
        id: "cat-devops",
        title: "DevOps & Cloud Tools",
        icon: "bi-terminal",
        skills: [
          "Docker",
          "Git & GitHub",
          "Maven",
          "Postman",
          "Linux"
        ]
      }
    ],
    skills: [
      "Core Java (11/17/21)",
      "Spring Boot",
      "Spring Data JPA",
      "Hibernate",
      "Microservices Architecture",
      "RESTful APIs",
      "Spring Security",
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Query Optimization",
      "Docker",
      "Git & GitHub",
      "Maven",
      "Postman",
      "Linux",
      "ReactJS",
      "JavaScript (ES6+)",
      "HTML5 / CSS3",
      "Bootstrap 5",
      "Redux Toolkit"
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
      startDate: "2024-10",
      endDate: "Present",
      isCurrent: true,
      duration: "2024 - Present",
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
        const profileObj = { ...DEFAULT_PORTFOLIO_DATA.profile, ...(parsed.profile || {}) };
        // Validate skillCategories is a non-empty array of objects with valid titles
        const isCategoriesValid =
          Array.isArray(profileObj.skillCategories) &&
          profileObj.skillCategories.length > 0 &&
          profileObj.skillCategories.every(
            (c) => typeof c === "object" && c !== null && (c.title || c.name)
          );

        if (!isCategoriesValid) {
          profileObj.skillCategories = DEFAULT_PORTFOLIO_DATA.profile.skillCategories;
        } else {
          // Normalize any category missing title, icon, or skills
          profileObj.skillCategories = profileObj.skillCategories.map((c, idx) => {
            const defaultCat = DEFAULT_PORTFOLIO_DATA.profile.skillCategories[idx] || DEFAULT_PORTFOLIO_DATA.profile.skillCategories[0];
            return {
              ...c,
              id: c.id || defaultCat.id || `cat-${idx}`,
              title: c.title || c.name || defaultCat.title,
              icon: c.icon || defaultCat.icon || "bi-stars",
              skills: Array.isArray(c.skills) && c.skills.length > 0 ? c.skills : defaultCat.skills
            };
          });
        }

        if (!profileObj.skills || profileObj.skills.length === 0) {
          profileObj.skills = profileObj.skillCategories.flatMap((c) => c.skills || []);
        }
        return {
          profile: profileObj,
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
