import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import AdminDashboard from "./components/AdminDashboard";

function AdminApp() {
  const [dbStatus, setDbStatus] = useState(null);

  useEffect(() => {
    const checkDb = async () => {
      try {
        const res = await fetch("/api/health");
        const data = await res.json();
        if (data && data.database) {
          setDbStatus(data.database);
        }
      } catch (e) {
        console.error("Health check error:", e);
      }
    };
    checkDb();
    const interval = setInterval(checkDb, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AdminDashboard
      dbStatus={dbStatus}
      onBackToSite={() => window.open("http://localhost:5180", "_blank")}
    />
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AdminApp />
  </React.StrictMode>
);
