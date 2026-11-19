import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <div
          className="p-2 rounded text-center small mb-3 border text-muted"
          style={{
            background: "var(--bg-chip)",
            borderColor: "var(--border-subtle)"
          }}
        >
          {authService.isFirebaseAuthActive() ? (
            <small className="text-success fw-medium">
              <i className="bi bi-shield-lock-fill me-1"></i>
              Connected to Firebase Authentication
            </small>
          ) : (
            <small className="text-muted">
              <i
                className="bi bi-info-circle me-1"
                style={{ color: "var(--primary)" }}
              ></i>
              Connect Firebase in <code>.env.local</code> to authenticate
            </small>
          )}
        </div>

        <div className="text-center">
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
