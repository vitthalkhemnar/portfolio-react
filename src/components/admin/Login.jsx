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
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light px-3">
      <div
        className="card border-0 shadow-lg p-4 p-md-5"
        style={{ maxWidth: "420px", width: "100%", borderRadius: "20px" }}
      >
        <div className="text-center mb-4">
          <img
            src="/v-logo2.png"
            alt="Logo"
            style={{ width: "48px", height: "48px" }}
            className="mb-2"
          />
          <h4 className="fw-bold mb-1">Admin Portal</h4>
          <p className="text-muted small mb-0">Sign in to manage your portfolio</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 small" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label small fw-semibold text-secondary">
              Admin Email
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-envelope text-muted"></i>
              </span>
              <input
                type="email"
                className="form-control border-start-0 ps-0"
                placeholder="admin@portfolio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label small fw-semibold text-secondary">
              Password
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-lock text-muted"></i>
              </span>
              <input
                type="password"
                className="form-control border-start-0 ps-0"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold rounded-3 mb-3 shadow-sm"
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <div className="bg-light p-2 rounded text-center small text-muted mb-3 border">
          <small>
            Default: <code>admin@portfolio.com</code> / <code>admin</code>
          </small>
        </div>

        <div className="text-center">
          <Link to="/" className="text-decoration-none small text-secondary">
            <i className="bi bi-arrow-left me-1"></i> Return to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
