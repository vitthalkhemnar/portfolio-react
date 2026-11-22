import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

const ANALYTICS_COLLECTION = "analytics_events";
const LOCAL_STORAGE_EVENTS_KEY = "portfolio_analytics_events_fallback";
const VISITOR_ID_KEY = "portfolio_visitor_id";
const SESSION_ID_KEY = "portfolio_session_id";
const GEO_CACHE_KEY = "portfolio_geo_cache";
const SESSION_VISIT_LOGGED_KEY = "portfolio_visit_logged_session";

// Generate or retrieve persistent visitor ID
const getVisitorId = () => {
  try {
    let id = localStorage.getItem(VISITOR_ID_KEY);
    if (!id) {
      id = "v_" + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
      localStorage.setItem(VISITOR_ID_KEY, id);
    }
    return id;
  } catch {
    return "v_anon_" + Math.random().toString(36).substring(2, 8);
  }
};

// Generate or retrieve session ID (expires when browser tab closes)
const getSessionId = () => {
  try {
    let id = sessionStorage.getItem(SESSION_ID_KEY);
    if (!id) {
      id = "s_" + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
      sessionStorage.setItem(SESSION_ID_KEY, id);
    }
    return id;
  } catch {
    return "s_anon_" + Math.random().toString(36).substring(2, 8);
  }
};

// Parse User-Agent into clean device, OS, and browser
const parseUserAgent = () => {
  const ua = navigator.userAgent || "";
  let browser = "Unknown";
  let os = "Unknown";
  let device = "Desktop";

  // Device detection
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    device = "Tablet";
  } else if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(
      ua
    )
  ) {
    device = "Mobile";
  }

  // OS detection
  if (/Windows/i.test(ua)) os = "Windows";
  else if (/Macintosh|Mac OS X/i.test(ua)) os = "macOS";
  else if (/iPhone|iPad|iPod/i.test(ua)) os = "iOS";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/Linux/i.test(ua)) os = "Linux";
  else if (/CrOS/i.test(ua)) os = "Chrome OS";

  // Browser detection
  if (/Edg\//i.test(ua)) browser = "Edge";
  else if (/OPR\/|Opera/i.test(ua)) browser = "Opera";
  else if (/Chrome\/|CriOS/i.test(ua)) browser = "Chrome";
  else if (/Firefox\/|FxiOS/i.test(ua)) browser = "Firefox";
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = "Safari";

  return { browser, os, device };
};

// Fetch IP and Geo metadata with caching & multiple fallbacks
const getGeoLocation = async () => {
  try {
    const cached = sessionStorage.getItem(GEO_CACHE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch {
    // ignore sessionStorage errors
  }

  const fallbackGeo = {
    ip: "Anonymous",
    city: "Unknown",
    region: "",
    country: "Unknown",
    countryCode: "",
    flag: "🌐",
    isp: "ISP / Network"
  };

  try {
    // Primary: ipwho.is (fast, HTTPS, CORS-friendly, zero-auth)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch("https://ipwho.is/", {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.success !== false) {
        const geo = {
          ip: data.ip || "Anonymous",
          city: data.city || "Unknown",
          region: data.region || "",
          country: data.country || "Unknown",
          countryCode: data.country_code || "",
          flag: data.flag?.emoji || "🌐",
          isp: data.connection?.isp || data.connection?.org || "Network"
        };
        try {
          sessionStorage.setItem(GEO_CACHE_KEY, JSON.stringify(geo));
        } catch {
          // ignore
        }
        return geo;
      }
    }
  } catch (err) {
    // Primary failed or timed out, try secondary fallback
  }

  try {
    // Secondary: freeipapi.com
    const controller2 = new AbortController();
    const timeoutId2 = setTimeout(() => controller2.abort(), 3000);
    const res2 = await fetch("https://freeipapi.com/api/json", {
      signal: controller2.signal
    });
    clearTimeout(timeoutId2);

    if (res2.ok) {
      const data2 = await res2.json();
      const geo = {
        ip: data2.ipAddress || "Anonymous",
        city: data2.cityName || "Unknown",
        region: data2.regionName || "",
        country: data2.countryName || "Unknown",
        countryCode: data2.countryCode || "",
        flag: data2.countryCode
          ? String.fromCodePoint(
              ...data2.countryCode
                .toUpperCase()
                .split("")
                .map((char) => 127397 + char.charCodeAt(0))
            )
          : "🌐",
        isp: "Network"
      };
      try {
        sessionStorage.setItem(GEO_CACHE_KEY, JSON.stringify(geo));
      } catch {
        // ignore
      }
      return geo;
    }
  } catch {
    // Fallback to timeZone / locale info
  }

  // Final fallback using browser timezone
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz) {
      fallbackGeo.region = tz;
    }
  } catch {
    // ignore
  }

  return fallbackGeo;
};

// Build standard event payload
const createEventPayload = async (type, target, metadata = {}) => {
  const { browser, os, device } = parseUserAgent();
  const geo = await getGeoLocation();

  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10); // YYYY-MM-DD

  return {
    type, // 'visit', 'resume_download', 'demo_click', 'repo_click'
    target: target || "portfolio",
    metadata: metadata || {},
    visitor: {
      visitorId: getVisitorId(),
      sessionId: getSessionId(),
      ip: geo.ip,
      city: geo.city,
      region: geo.region,
      country: geo.country,
      countryCode: geo.countryCode,
      flag: geo.flag,
      isp: geo.isp,
      browser,
      os,
      device,
      screen: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
      language: navigator.language || "en",
      referrer: document.referrer || "Direct"
    },
    date: dateStr,
    timestamp: serverTimestamp(),
    clientTime: now.toISOString()
  };
};

// Save event to local storage fallback for offline / mock testing
const saveToLocalFallback = (payload) => {
  try {
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_EVENTS_KEY) || "[]");
    const localEvent = {
      ...payload,
      id: "local_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
      timestamp: { seconds: Math.floor(Date.now() / 1000) }
    };
    // Keep max 200 events in local storage
    const updated = [localEvent, ...stored].slice(0, 200);
    localStorage.setItem(LOCAL_STORAGE_EVENTS_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
};

export const analyticsService = {
  /**
   * Log page visit (deduplicated per session to prevent refresh spam)
   */
  async logVisit() {
    try {
      // Check if session visit was already logged in this tab
      const alreadyLogged = sessionStorage.getItem(SESSION_VISIT_LOGGED_KEY);
      if (alreadyLogged) {
        return;
      }
      sessionStorage.setItem(SESSION_VISIT_LOGGED_KEY, "true");

      const payload = await createEventPayload("visit", "portfolio_home", {
        path: window.location.pathname
      });

      saveToLocalFallback(payload);

      if (isFirebaseConfigured && db) {
        await addDoc(collection(db, ANALYTICS_COLLECTION), payload);
      }
    } catch (err) {
      console.warn("Analytics: visit log notice:", err);
    }
  },

  /**
   * Log Resume Download click
   * @param {string} source - e.g. 'hero', 'navbar', 'about'
   */
  async logResumeDownload(source = "unknown") {
    try {
      const payload = await createEventPayload("resume_download", "resume_pdf", {
        source,
        url: window.location.href
      });

      saveToLocalFallback(payload);

      if (isFirebaseConfigured && db) {
        await addDoc(collection(db, ANALYTICS_COLLECTION), payload);
      }
    } catch (err) {
      console.warn("Analytics: resume download log notice:", err);
    }
  },

  /**
   * Log Live Demo Link Click
   * @param {string} projectName
   * @param {string} url
   */
  async logDemoClick(projectName, url) {
    try {
      const payload = await createEventPayload("demo_click", projectName, {
        projectName,
        url: url || ""
      });

      saveToLocalFallback(payload);

      if (isFirebaseConfigured && db) {
        await addDoc(collection(db, ANALYTICS_COLLECTION), payload);
      }
    } catch (err) {
      console.warn("Analytics: demo click log notice:", err);
    }
  },

  /**
   * Log GitHub Repository Link Click
   * @param {string} projectName
   * @param {string} url
   */
  async logRepoClick(projectName, url) {
    try {
      const payload = await createEventPayload("repo_click", projectName, {
        projectName,
        url: url || ""
      });

      saveToLocalFallback(payload);

      if (isFirebaseConfigured && db) {
        await addDoc(collection(db, ANALYTICS_COLLECTION), payload);
      }
    } catch (err) {
      console.warn("Analytics: repo click log notice:", err);
    }
  },

  /**
   * Fetch events from Firestore (with local fallback if offline or not configured)
   * @param {number} maxLimit
   */
  async fetchEvents(maxLimit = 500) {
    if (isFirebaseConfigured && db) {
      try {
        const q = query(
          collection(db, ANALYTICS_COLLECTION),
          orderBy("timestamp", "desc"),
          limit(maxLimit)
        );
        const snapshot = await getDocs(q);
        const events = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          events.push({
            id: docSnap.id,
            ...data,
            // Convert Firestore Timestamp to JS Date or ISO string
            createdAt: data.timestamp?.toDate
              ? data.timestamp.toDate()
              : data.clientTime
              ? new Date(data.clientTime)
              : new Date()
          });
        });
        return events;
      } catch (err) {
        console.warn("Firestore analytics fetch failed, falling back to local:", err);
      }
    }

    // Fallback to local storage events
    try {
      const local = JSON.parse(localStorage.getItem(LOCAL_STORAGE_EVENTS_KEY) || "[]");
      return local.map((ev) => ({
        ...ev,
        createdAt: ev.clientTime ? new Date(ev.clientTime) : new Date()
      }));
    } catch {
      return [];
    }
  },

  /**
   * Delete an individual analytics event document
   * @param {string} eventId
   */
  async deleteEvent(eventId) {
    if (!eventId) return;
    if (isFirebaseConfigured && db && !eventId.startsWith("local_")) {
      try {
        await deleteDoc(doc(db, ANALYTICS_COLLECTION, eventId));
      } catch (err) {
        console.error("Failed to delete event from Firestore:", err);
      }
    }

    // Also remove from local fallback if present
    try {
      const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_EVENTS_KEY) || "[]");
      const updated = stored.filter((ev) => ev.id !== eventId);
      localStorage.setItem(LOCAL_STORAGE_EVENTS_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  },

  /**
   * Clear all analytics events (Admin action)
   */
  async clearAllEvents(eventsList = []) {
    if (isFirebaseConfigured && db) {
      for (const ev of eventsList) {
        if (ev.id && !ev.id.startsWith("local_")) {
          try {
            await deleteDoc(doc(db, ANALYTICS_COLLECTION, ev.id));
          } catch {
            // continue
          }
        }
      }
    }
    localStorage.removeItem(LOCAL_STORAGE_EVENTS_KEY);
  }
};

export default analyticsService;
