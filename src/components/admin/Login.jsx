import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = authService.login(email, password);
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
      style={{ backgroundColor: "var(--bg-main)" }}
    >
      <div
        className="clean-card p-4 p-md-5 shadow-lg"
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
          <p className="small mb-0" style={{ color: "#94a3b8" }}>
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
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  color: "#94a3b8"
                }}
              >
                <i className="bi bi-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control border-start-0 ps-0 text-white"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderColor: "rgba(255, 255, 255, 0.15)"
                }}
                placeholder="admin@portfolio.com"
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
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  color: "#94a3b8"
                }}
              >
                <i className="bi bi-lock"></i>
              </span>
              <input
                type="password"
                className="form-control border-start-0 ps-0 text-white"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderColor: "rgba(255, 255, 255, 0.15)"
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
          className="p-2 rounded text-center small mb-3"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            color: "#94a3b8"
          }}
        >
          <small>
            Default: <code>admin@portfolio.com</code> / <code>admin</code>
          </small>
        </div>

        <div className="text-center">
          <Link to="/" className="text-decoration-none small text-white-50 hover-text-white">
            <i className="bi bi-arrow-left me-1"></i> Return to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
