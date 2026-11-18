const AUTH_KEY = "vitthal_admin_auth";

// Default admin credentials (can be customized or linked to Firebase Auth)
const DEFAULT_ADMIN = {
  email: "admin@portfolio.com",
  password: "admin"
};

export const authService = {
  login: (email, password) => {
    // Check against configured admin credentials
    const validEmail = process.env.REACT_APP_ADMIN_EMAIL || DEFAULT_ADMIN.email;
    const validPassword = process.env.REACT_APP_ADMIN_PASSWORD || DEFAULT_ADMIN.password;

    if (
      email.trim().toLowerCase() === validEmail.toLowerCase() &&
      password === validPassword
    ) {
      const session = {
        email,
        loggedInAt: new Date().toISOString(),
        token: "admin-session-" + Date.now()
      };
      localStorage.setItem(AUTH_KEY, JSON.stringify(session));
      return { success: true };
    } else {
      return { success: false, error: "Invalid email or password." };
    }
  },

  logout: () => {
    localStorage.removeItem(AUTH_KEY);
  },

  isAuthenticated: () => {
    try {
      const session = localStorage.getItem(AUTH_KEY);
      if (!session) return false;
      const parsed = JSON.parse(session);
      return !!parsed.token;
    } catch {
      return false;
    }
  },

  getSession: () => {
    try {
      const session = localStorage.getItem(AUTH_KEY);
      return session ? JSON.parse(session) : null;
    } catch {
      return null;
    }
  }
};
