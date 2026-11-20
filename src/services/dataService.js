import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

// Curated default portfolio data - Vitthal Khemnar
export const INITIAL_PORTFOLIO_DATA = {
  profile: {
    name: "Vitthal Khemnar",
    role: "Java Backend Developer",
    statusText: "Available for new opportunities",
    tagline: "Building scalable distributed systems and mission-critical backend APIs",
    summary:
      "Specializing in Java, Spring Boot, and distributed backend architecture. Over the past two years, I’ve built mission-critical travel APIs, payment workflows, and cloud-deployed applications, bridging rock-solid backend engineering with seamless user experiences.",
    aboutMe:
      "I am a Java Backend Developer with professional experience at ANMsoft Technologies. My core expertise encompasses Core Java, Spring Boot, Spring Data JPA, Hibernate, and Microservices architecture. I specialize in developing resilient RESTful services, optimizing database query performance, and implementing secure, maintainable backend systems. I have a strong foundation in Object-Oriented Programming (OOP), Multithreading, and Clean Architecture principles, and I am continuously expanding my knowledge in distributed cloud systems.",
    experience: "2+ Years",
    location: "Pune, Maharashtra, India",
    email: "vitthalkkhemnar@gmail.com",
    whatsappNo: "918767841958",
    githubUrl: "https://github.com/vitthalkhemnar",
    linkedInUrl: "https://www.linkedin.com/in/vitthalkhemnar/",
    resumeUrl: "/Vitthal Khemnar - Resume.pdf",
    profileImage: "/images/aboutme.jpeg",
    aboutImage: "/images/aboutme.jpeg",
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
          "Spring Security",
          "Distributed Systems"
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
          "Query Optimization",
          "Database Indexing"
        ]
      },
      {
        id: "cat-devops",
        title: "Cloud & DevOps",
        icon: "bi-terminal",
        skills: [
          "Docker",
          "Kubernetes",
          "AWS (EC2, S3)",
          "Git & GitHub",
          "CI/CD Pipelines",
          "Maven",
          "Linux"
        ]
      },
      {
        id: "cat-tools",
        title: "Frontend & Engineering Tools",
        icon: "bi-tools",
        skills: [
          "ReactJS",
          "JavaScript (ES6+)",
          "Postman",
          "JUnit & Mockito",
          "HTML5 / CSS3",
          "Bootstrap 5",
          "Redux Toolkit"
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
      "Distributed Systems",
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Query Optimization",
      "Database Indexing",
      "Docker",
      "Kubernetes",
      "AWS (EC2, S3)",
      "Git & GitHub",
      "CI/CD Pipelines",
      "Maven",
      "Linux",
      "ReactJS",
      "JavaScript (ES6+)",
      "Postman",
      "JUnit & Mockito",
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
      technologies: [
        "Core Java",
        "Spring Boot",
        "Spring Data JPA",
        "Hibernate",
        "Microservices",
        "MySQL",
        "REST APIs",
        "Git"
      ]
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
        "100% serverless static deployment on Firebase Hosting",
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

// Aliased export for compatibility with existing imports
export const DEFAULT_PORTFOLIO_DATA = INITIAL_PORTFOLIO_DATA;

const STORAGE_KEY = "portfolio_cms_data";

export const sanitizePortfolioData = (raw) => {
  if (!raw || typeof raw !== "object") {
    return INITIAL_PORTFOLIO_DATA;
  }

  const profile = {
    ...INITIAL_PORTFOLIO_DATA.profile,
    ...(raw.profile || {})
  };

  if (!profile.name) profile.name = INITIAL_PORTFOLIO_DATA.profile.name;
  if (!profile.role) profile.role = INITIAL_PORTFOLIO_DATA.profile.role;
  if (!profile.summary) profile.summary = INITIAL_PORTFOLIO_DATA.profile.summary;
  if (!profile.aboutMe) profile.aboutMe = INITIAL_PORTFOLIO_DATA.profile.aboutMe;
  if (!profile.resumeUrl) profile.resumeUrl = INITIAL_PORTFOLIO_DATA.profile.resumeUrl;
  if (!profile.email) profile.email = INITIAL_PORTFOLIO_DATA.profile.email;
  if (!profile.githubUrl) profile.githubUrl = INITIAL_PORTFOLIO_DATA.profile.githubUrl;
  if (!profile.linkedInUrl) profile.linkedInUrl = INITIAL_PORTFOLIO_DATA.profile.linkedInUrl;
  if (!profile.whatsappNo) profile.whatsappNo = INITIAL_PORTFOLIO_DATA.profile.whatsappNo;
  if (!profile.location) profile.location = INITIAL_PORTFOLIO_DATA.profile.location;
  if (!profile.experience) profile.experience = INITIAL_PORTFOLIO_DATA.profile.experience;
  if (!profile.tagline) profile.tagline = INITIAL_PORTFOLIO_DATA.profile.tagline;
  if (!profile.statusText) profile.statusText = INITIAL_PORTFOLIO_DATA.profile.statusText;
  if (!profile.profileImage) profile.profileImage = INITIAL_PORTFOLIO_DATA.profile.profileImage;
  if (!profile.aboutImage) profile.aboutImage = INITIAL_PORTFOLIO_DATA.profile.aboutImage;

  profile.skillCategories =
    Array.isArray(profile.skillCategories) && profile.skillCategories.length > 0
      ? profile.skillCategories
      : INITIAL_PORTFOLIO_DATA.profile.skillCategories;

  profile.skills =
    Array.isArray(profile.skills) && profile.skills.length > 0
      ? profile.skills
      : profile.skillCategories.flatMap((c) => c.skills || []);

  const companies =
    Array.isArray(raw.companies) && raw.companies.length > 0
      ? raw.companies
      : INITIAL_PORTFOLIO_DATA.companies;

  const projects =
    Array.isArray(raw.projects) && raw.projects.length > 0
      ? raw.projects
      : INITIAL_PORTFOLIO_DATA.projects;

  return {
    profile,
    companies,
    projects
  };
};

export const dataService = {
  loadData: () => {
    try {
      const stored =
        localStorage.getItem(STORAGE_KEY) ||
        localStorage.getItem("vitthal_portfolio_data");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.profile && parsed.profile.name) {
          return sanitizePortfolioData(parsed);
        }
      }
    } catch (e) {
      console.warn("Error loading local portfolio data:", e);
    }
    return INITIAL_PORTFOLIO_DATA;
  },

  fetchCloudData: async () => {
    if (!isFirebaseConfigured || !db) {
      return dataService.loadData();
    }
    try {
      const docRef = doc(db, "portfolio", "main");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const raw = docSnap.data();
        if (raw && raw.profile && raw.profile.name) {
          const cloudData = sanitizePortfolioData(raw);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudData));
          } catch {
            // Ignore cache errors
          }
          return cloudData;
        }
      }
    } catch (error) {
      console.warn("Failed to fetch from Cloud Firestore:", error);
    }
    return dataService.loadData();
  },

  saveData: (data) => {
    const sanitized = sanitizePortfolioData(data);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
      if (isFirebaseConfigured && db) {
        dataService.syncToCloud(sanitized).catch((err) => {
          console.warn("Background cloud sync warning:", err);
        });
      }
      return true;
    } catch (e) {
      console.error("Failed to write to localStorage:", e);
      return false;
    }
  },

  syncToCloud: async (data) => {
    if (!isFirebaseConfigured || !db) return false;
    try {
      const sanitized = sanitizePortfolioData(data);
      const docRef = doc(db, "portfolio", "main");
      await setDoc(docRef, sanitized, { merge: true });
      return true;
    } catch (error) {
      console.error("Failed to sync to Cloud Firestore:", error);
      return false;
    }
  },

  isCloudSyncActive: () => {
    return Boolean(isFirebaseConfigured && db);
  },

  updateProfile: (profileUpdates) => {
    const current = dataService.loadData();
    const updated = {
      ...current,
      profile: { ...current.profile, ...profileUpdates }
    };
    dataService.saveData(updated);
    return updated;
  },

  updateProjects: (projects) => {
    const current = dataService.loadData();
    const updated = { ...current, projects: Array.isArray(projects) ? projects : [] };
    dataService.saveData(updated);
    return updated;
  },

  updateCompanies: (companies) => {
    const current = dataService.loadData();
    const updated = { ...current, companies: Array.isArray(companies) ? companies : [] };
    dataService.saveData(updated);
    return updated;
  }
};
