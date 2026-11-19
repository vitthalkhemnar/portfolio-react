import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  getRedirectResult,
  signOut
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "./firebase";

const AUTH_KEY = "portfolio_admin_auth";

export const authService = {
  /**
   * Log in securely using Firebase Email & Password Authentication.
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
   * Log in securely using Firebase Google Authentication.
   */
  loginWithGoogle: async () => {
    if (!isFirebaseConfigured || !auth) {
      return {
        success: false,
        error:
          "Firebase Authentication is not configured yet. Check your Firebase project keys in .env.local."
      };
    }

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account"
      });

      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      const session = {
        email: user.email,
        displayName: user.displayName || user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        provider: "google",
        token,
        loggedInAt: new Date().toISOString()
      };
      localStorage.setItem(AUTH_KEY, JSON.stringify(session));
      return { success: true, provider: "google", user };
    } catch (fbError) {
      const errorCode = fbError.code || "";
      if (
        errorCode === "auth/popup-closed-by-user" ||
        errorCode === "auth/cancelled-popup-request"
      ) {
        return { success: false, error: "Sign in popup was closed. Please try again." };
      }
      if (errorCode === "auth/popup-blocked") {
        return {
          success: false,
          error: "Sign-in popup was blocked by your browser. Please allow popups for localhost / this site."
        };
      }
      if (errorCode === "auth/unauthorized-domain") {
        return {
          success: false,
          error:
            "This domain is not authorized in Firebase. Add 'localhost' in Firebase Console -> Authentication -> Settings -> Authorized domains."
        };
      }
      if (errorCode === "auth/operation-not-allowed") {
        return {
          success: false,
          error:
            "Google sign-in is not enabled in Firebase. Enable Google provider in Firebase Console -> Authentication -> Sign-in method."
        };
      }
      return {
        success: false,
        error: fbError.message || "Failed to authenticate with Google."
      };
    }
  },

  /**
   * Checks if user just returned from a Google redirect sign-in.
   */
  checkRedirectResult: async () => {
    if (!isFirebaseConfigured || !auth) return null;
    try {
      const result = await getRedirectResult(auth);
      if (result && result.user) {
        const user = result.user;
        const token = await user.getIdToken();
        const session = {
          email: user.email,
          displayName: user.displayName || user.email,
          photoURL: user.photoURL,
          uid: user.uid,
          provider: "google",
          token,
          loggedInAt: new Date().toISOString()
        };
        localStorage.setItem(AUTH_KEY, JSON.stringify(session));
        return { success: true, provider: "google", user };
      }
      return null;
    } catch (err) {
      console.warn("Firebase redirect check warning:", err);
      return null;
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
