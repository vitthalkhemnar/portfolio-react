import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  // If already authenticated, redirect straight to /admin
  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate("/admin");
      return;
    }
    // Check if user just returned from a Google redirect sign-in
    authService.checkRedirectResult().then((res) => {
      if (res && res.success) {
        navigate("/admin");
      }
    });
  }, [navigate]);

  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoading(true);

    try {
      const res = await authService.loginWithGoogle();
      if (res.success) {
        navigate("/admin");
      } else {
        setError(res.error || "Google sign-in failed. Please try again.");
      }
    } catch {
      setError("An unexpected error occurred during Google sign-in.");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await authService.login(email, password);
      if (res.success) {
        navigate("/admin");
      } else {
        setError(res.error || "Invalid email or password");
      }
    } catch {
      setError("An unexpected error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100 px-3"
      style={{ backgroundColor: "var(--bg-page)" }}
    >
      <div
        className="clean-card p-4 p-md-5 shadow-sm"
        style={{ maxWidth: "420px", width: "100%", borderRadius: "20px" }}
      >
        <div className="text-center mb-4">
          <img
            src="/v-logo2.png"
            alt="Logo"
            style={{ width: "48px", height: "48px" }}
            className="mb-2"
          />
          <h4 className="fw-bold mb-1 text-white">Admin Portal</h4>
          <p className="small mb-0 text-muted">
            Sign in to manage your portfolio
          </p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 small" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </div>
        )}

        {/* 1-Click Google Sign-In */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="btn w-100 d-flex align-items-center justify-content-center gap-2 py-2 mb-3 fw-semibold rounded-pill"
          style={{
            backgroundColor: "#ffffff",
            color: "#1f1f1f",
            border: "1px solid #ffffff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
            fontSize: "0.92rem",
            transition: "all 0.2s ease"
          }}
          disabled={loading || googleLoading}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          {googleLoading ? "Connecting to Google..." : "Continue with Google"}
        </button>

        {/* Divider */}
        <div className="d-flex align-items-center my-3">
          <div className="flex-grow-1" style={{ height: "1px", background: "rgba(255, 255, 255, 0.1)" }}></div>
          <span className="px-2 small text-muted">or email</span>
          <div className="flex-grow-1" style={{ height: "1px", background: "rgba(255, 255, 255, 0.1)" }}></div>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label small fw-semibold text-white">
              Admin Email
            </label>
            <div className="input-group">
              <span
                className="input-group-text border-end-0"
                style={{
                  background: "var(--bg-chip)",
                  borderColor: "var(--border-subtle)",
                  color: "var(--text-muted)"
                }}
              >
                <i className="bi bi-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control border-start-0 ps-0"
                style={{
                  background: "var(--bg-chip)",
                  borderColor: "var(--border-subtle)",
                  color: "#ffffff"
                }}
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label small fw-semibold text-white">
              Password
            </label>
            <div className="input-group">
              <span
                className="input-group-text border-end-0"
                style={{
                  background: "var(--bg-chip)",
                  borderColor: "var(--border-subtle)",
                  color: "var(--text-muted)"
                }}
              >
                <i className="bi bi-lock"></i>
              </span>
              <input
                type="password"
                className="form-control border-start-0 ps-0"
                style={{
                  background: "var(--bg-chip)",
                  borderColor: "var(--border-subtle)",
                  color: "#ffffff"
                }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-clean-primary w-100 justify-content-center py-2 mb-3"
            disabled={loading || googleLoading}
          >
            {loading ? "Authenticating..." : "Sign In with Email"}
          </button>
        </form>

        <div className="text-center pt-2">
          <Link
            to="/"
            className="text-decoration-none small hover-text-dark"
          >
            <i className="bi bi-arrow-left me-1"></i> Return to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
