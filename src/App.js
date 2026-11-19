import { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Portfolio from "./components/Portfolio";
import Dashboard from "./components/admin/Dashboard";
import Login from "./components/admin/Login";
import ErrorBoundary from "./components/ErrorBoundary";
import { setFullData } from "./redux/profile/profileSlice";
import { dataService } from "./services/dataService";

function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 text-center px-3">
      <h1 className="display-1 fw-bold text-primary">404</h1>
      <h3 className="mb-3 text-dark">Page Not Found</h3>
      <p className="text-muted mb-4">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="btn-clean-primary">
        <i className="bi bi-house"></i> Back to Portfolio
      </Link>
    </div>
  );
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // 1. Instant load from localStorage / default data
    const saved = dataService.loadData();
    dispatch(setFullData(saved));

    // 2. Asynchronously sync latest updates from Cloud Firestore if connected
    dataService
      .fetchCloudData()
      .then((cloudData) => {
        if (cloudData) {
          dispatch(setFullData(cloudData));
        }
      })
      .catch((err) => {
        console.warn("Cloud data fetch warning on mount:", err);
      });
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <Routes>
        {/* Default portfolio page */}
        <Route path="/" element={<Portfolio />} />

        {/* Admin section */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />

        {/* 404 fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;