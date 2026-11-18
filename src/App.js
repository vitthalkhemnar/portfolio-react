import { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Portfolio from "./components/Portfolio";
import Dashboard from "./components/admin/Dashboard";
import Login from "./components/admin/Login";
import { setFullData } from "./redux/profile/profileSlice";
import { dataService } from "./services/dataService";

function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 text-center px-3">
      <h1 className="display-1 fw-bold text-primary">404</h1>
      <h3 className="mb-3">Page Not Found</h3>
      <p className="text-muted mb-4">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary rounded-pill px-4">
        <i className="bi bi-house me-1"></i> Back to Portfolio
      </Link>
    </div>
  );
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load persisted portfolio data on initial mount
    const saved = dataService.loadData();
    dispatch(setFullData(saved));
  }, [dispatch]);

  return (
    <Routes>
      {/* Default portfolio page */}
      <Route path="/" element={<Portfolio />} />

      {/* Admin section */}
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />

      {/* 404 fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;