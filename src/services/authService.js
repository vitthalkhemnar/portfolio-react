import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, isFirebaseConfigured } from "./firebase";

const AUTH_KEY = "portfolio_admin_auth";

export const authService = {
  /**
   * Log in securely using Firebase Authentication.
   * Zero admin credentials in .env or source code.
   */
  login: async (email, password) => {
    const cleanEmail = email.trim();

    if (!isFirebaseConfigured || !auth) {
      return {
        success: false,
        error:
          "Firebase Authentication is not configured yet. Add your Firebase project keys to .env.local to sign in."
      };
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, password);
      const user = userCredential.user;
      const token = await user.getIdToken();

      const session = {
        email: user.email,
        uid: user.uid,
        provider: "firebase",
        token,
        loggedInAt: new Date().toISOString()
      };
      localStorage.setItem(AUTH_KEY, JSON.stringify(session));
      return { success: true, provider: "firebase", user };
    } catch (fbError) {
      const errorCode = fbError.code || "";
      if (
        errorCode === "auth/invalid-credential" ||
        errorCode === "auth/user-not-found" ||
        errorCode === "auth/wrong-password" ||
        errorCode === "auth/invalid-email"
      ) {
        return { success: false, error: "Invalid admin email or password." };
      }
      if (errorCode === "auth/too-many-requests") {
        return {
          success: false,
          error: "Too many failed attempts. Login is temporarily locked by Firebase. Please try again later."
        };
      }
      if (errorCode === "auth/network-request-failed") {
        return {
          success: false,
          error: "Network error connecting to Firebase. Check your internet connection."
        };
      }
      return {
        success: false,
        error: fbError.message || "Failed to authenticate with Firebase."
      };
    }
  },

  /**
   * Log out of current session.
   */
  logout: async () => {
    if (isFirebaseConfigured && auth) {
      try {
        await signOut(auth);
      } catch (e) {
        console.warn("Firebase signOut error:", e);
      }
    }
    localStorage.removeItem(AUTH_KEY);
  },

  /**
   * Checks if an active session exists.
   */
  isAuthenticated: () => {
    try {
      const session = localStorage.getItem(AUTH_KEY);
      if (!session) return false;
      const parsed = JSON.parse(session);
      return Boolean(parsed.token);
    } catch {
      return false;
    }
  },

  /**
   * Returns current session object or null.
   */
  getSession: () => {
    try {
      const session = localStorage.getItem(AUTH_KEY);
      return session ? JSON.parse(session) : null;
    } catch {
      return null;
    }
  },

  /**
   * Returns whether Firebase Auth is actively configured.
   */
  isFirebaseAuthActive: () => {
    return Boolean(isFirebaseConfigured && auth);
  }
};
