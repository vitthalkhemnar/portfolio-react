import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

// Clean, neutral initial schema - Zero hardcoded/static mock data
export const INITIAL_PORTFOLIO_DATA = {
  profile: {
    name: "",
    role: "",
    statusText: "",
    tagline: "",
    experience: "",
    location: "",
    email: "",
    whatsappNo: "",
    linkedInUrl: "",
    githubUrl: "",
    summary: "",
    aboutMe: "",
    resumeUrl: "",
    profileImage: "",
    aboutImage: "",
    skillCategories: [],
    skills: []
  },
  companies: [],
  projects: []
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

  profile.skillCategories = Array.isArray(profile.skillCategories)
    ? profile.skillCategories
    : [];

  profile.skills = Array.isArray(profile.skills)
    ? profile.skills
    : profile.skillCategories.flatMap((c) => c.skills || []);

  return {
    profile,
    companies: Array.isArray(raw.companies) ? raw.companies : [],
    projects: Array.isArray(raw.projects) ? raw.projects : []
  };
};

export const dataService = {
  loadData: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return sanitizePortfolioData(JSON.parse(stored));
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
        const cloudData = sanitizePortfolioData(docSnap.data());
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudData));
        } catch {
          // Ignore cache errors
        }
        return cloudData;
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
