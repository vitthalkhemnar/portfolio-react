import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "aos/dist/aos.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

// Ignore third-party browser extension errors (e.g. MetaMask, wallet extensions)
if (typeof window !== "undefined") {
  const isExtensionError = (msg, src) => {
    const m = String(msg || "").toLowerCase();
    const s = String(src || "").toLowerCase();
    return (
      s.includes("chrome-extension://") ||
      s.includes("moz-extension://") ||
      m.includes("metamask") ||
      m.includes("failed to connect to metamask")
    );
  };

  const originalOnError = window.onerror;
  window.onerror = (message, source, lineno, colno, error) => {
    if (isExtensionError(message, source) || isExtensionError(error?.message, error?.stack)) {
      return true;
    }
    return originalOnError ? originalOnError(message, source, lineno, colno, error) : false;
  };

  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    const msg = typeof reason === "string" ? reason : reason?.message || "";
    const stack = reason?.stack || "";
    if (isExtensionError(msg, stack)) {
      event.preventDefault();
    }
  });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
