import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center p-4 bg-light">
          <div
            className="clean-card p-4 p-md-5 text-center shadow-sm"
            style={{ maxWidth: "520px", width: "100%" }}
          >
            <div className="mb-3 text-danger fs-1">
              <i className="bi bi-exclamation-triangle"></i>
            </div>
            <h4 className="fw-bold text-dark mb-2">Something went wrong</h4>
            <p className="text-muted small mb-4">
              An unexpected error occurred while rendering this page. You can try refreshing the page or returning to the home screen.
            </p>
            <div className="d-flex justify-content-center gap-2">
              <button
                onClick={this.handleReload}
                className="btn-clean-primary"
              >
                <i className="bi bi-arrow-clockwise"></i> Reload Page
              </button>
              <a href="/" className="btn-clean-secondary">
                Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
