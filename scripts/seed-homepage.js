/**
 * seed-homepage.js
 * 
 * Standalone Node CLI script to seed real-world minimalist homepage data directly
 * into Cloud Firestore without hardcoding static data into the React app codebase.
 * 
 * Usage:
 *   node scripts/seed-homepage.js [adminEmail] [adminPassword]
 * 
 * Example:
 *   node scripts/seed-homepage.js admin@example.com mySecurePassword123
 */

const fs = require("fs");
const path = require("path");
const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc } = require("firebase/firestore");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

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
const auth = getAuth(app);

// 2. Curated real-world minimalist homepage profile
const MINIMALIST_DATA = {
  profile: {
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
  }
};

async function seed() {
  const [email, password] = process.argv.slice(2);

  if (email && password) {
    console.log(`Authenticating as ${email}...`);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Authentication successful.");
    } catch (authErr) {
      console.error("Authentication failed:", authErr.message);
      process.exit(1);
    }
  } else {
    console.log("Note: No email/password provided. Attempting write (rules must allow unauthenticated write, or pass credentials as arguments).");
    console.log("Usage: node scripts/seed-homepage.js <adminEmail> <password>");
  }

  try {
    const docRef = doc(db, "portfolio", "main");
    await setDoc(docRef, MINIMALIST_DATA, { merge: true });
    console.log("SUCCESS: Minimalist homepage data synced directly to Cloud Firestore document 'portfolio/main'!");
    process.exit(0);
  } catch (dbErr) {
    console.error("Firestore write error:", dbErr.message);
    if (dbErr.code === "permission-denied") {
      console.log("\nPermission Denied: To write to Firestore, pass your Firebase Auth credentials:");
      console.log("  node scripts/seed-homepage.js <your-admin-email> <your-admin-password>");
      console.log("OR log in to http://localhost:3000/admin and click 'Apply & Sync to Firebase'.\n");
    }
    process.exit(1);
  }
}

seed();
