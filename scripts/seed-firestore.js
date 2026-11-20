const fs = require("fs");
const path = require("path");
const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc } = require("firebase/firestore");

// 1. Read .env.local for Firebase keys
const envPath = path.resolve(__dirname, "..", ".env.local");
if (!fs.existsSync(envPath)) {
  console.error("Error: .env.local file not found.");
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, "utf8");
const config = {};
envContent.split("\n").forEach((line) => {
  const [k, ...rest] = line.split("=");
  if (k && rest.length) {
    const val = rest.join("=").trim();
    if (k.includes("API_KEY")) config.apiKey = val;
    if (k.includes("AUTH_DOMAIN")) config.authDomain = val;
    if (k.includes("PROJECT_ID")) config.projectId = val;
    if (k.includes("STORAGE_BUCKET")) config.storageBucket = val;
    if (k.includes("MESSAGING_SENDER_ID")) config.messagingSenderId = val;
    if (k.includes("APP_ID")) config.appId = val;
  }
});

if (!config.apiKey || !config.projectId) {
  console.error("Error: Invalid Firebase configuration in .env.local.");
  process.exit(1);
}

const app = initializeApp(config);
const db = getFirestore(app);

const SEED_DATA = {
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
        title: "DevOps & Cloud Tools",
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

async function seed() {
  console.log("Writing complete portfolio data to Cloud Firestore document 'portfolio/main'...");
  try {
    const docRef = doc(db, "portfolio", "main");
    await setDoc(docRef, SEED_DATA);
    console.log("SUCCESS: Portfolio data seeded to Cloud Firestore 'portfolio/main'!");
    process.exit(0);
  } catch (err) {
    console.error("Firestore write failed:", err.message);
    process.exit(1);
  }
}

seed();
