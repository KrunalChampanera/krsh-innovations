import React, { useState, useEffect } from "react";
import NavigationBar from "./components/Navbar";
import Hero3D from "./components/Hero3D";
import StatsSection from "./components/StatsSection";
import ServicesSection from "./components/ServicesSection";
import PortfolioGallery from "./components/PortfolioGallery";
import TechStackSection from "./components/TechStackSection";
import WhyChooseUs from "./components/WhyChooseUs";
import ProjectEstimator from "./components/ProjectEstimator";
import ContactSection from "./components/ContactSection";
import AdminDashboard from "./components/AdminDashboard";
import Footer from "./components/Footer";

function App() {
  const [currentView, setCurrentView] = useState(() => {
    return window.location.hash === "#admin" ? "admin" : "site";
  });
  const [preselectedService, setPreselectedService] = useState("");
  const [dbStatus, setDbStatus] = useState(null);
  const [galleryRefreshTrigger, setGalleryRefreshTrigger] = useState(0);

  // Sync with window hash changes
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#admin") {
        setCurrentView("admin");
      } else {
        setCurrentView("site");
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Poll backend health status
  const checkStatus = async () => {
    try {
      const res = await fetch("/api/health");
      const data = await res.json();
      if (data && data.database) {
        setDbStatus(data.database);
      }
    } catch (err) {
      console.log("Backend offline or booting:", err.message);
    }
  };

  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenAdmin = () => {
    window.location.hash = "#admin";
    setCurrentView("admin");
  };

  const handleBackToSite = () => {
    window.location.hash = "";
    setCurrentView("site");
    setGalleryRefreshTrigger((prev) => prev + 1);
  };

  const handleScrollToEstimator = (serviceTitle) => {
    if (serviceTitle) {
      setPreselectedService(serviceTitle);
    }
    const elem = document.getElementById("estimator");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleGetStarted = () => {
    const elem = document.getElementById("contact");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 1. IF ADMIN VIEW: Render Dedicated Full-Screen Admin Panel
  if (currentView === "admin") {
    return (
      <AdminDashboard
        onBackToSite={handleBackToSite}
        dbStatus={dbStatus}
      />
    );
  }

  // 2. IF CLIENT VIEW: Render Clean, Perfect Public Website
  return (
    <div className="app-container min-vh-100 d-flex flex-column">
      {/* Top Floating Admin Quick Switch Strip (Discreet) */}
      <div
        className="bg-dark text-white-50 px-3 py-1 d-flex justify-content-between align-items-center small border-bottom border-secondary"
        style={{ fontSize: "11px", zIndex: 1050 }}
      >
        <div className="d-flex align-items-center gap-2">
          <span
            className={`rounded-circle ${dbStatus?.isMySQL ? "bg-success" : "bg-primary"}`}
            style={{ width: "6px", height: "6px" }}
          ></span>
          <span>{dbStatus?.isMySQL ? "MySQL 8.0 Active" : "Local Storage Active"}</span>
          <span>•</span>
          <span>Krsh.Innovations@gmail.com</span>
        </div>

        <div>
          <button
            onClick={handleOpenAdmin}
            className="btn btn-link text-info text-decoration-none p-0 fw-semibold"
            style={{ fontSize: "11px" }}
          >
            🔐 Open Backend Admin Panel &rarr;
          </button>
        </div>
      </div>

      {/* Top Glassmorphic Navigation Bar - Clean Single-Line */}
      <NavigationBar
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Hero Section with Upgraded Interactive 3D Three.js Visuals */}
      <Hero3D onGetStarted={handleGetStarted} />

      {/* Stats Counter (Screenshot 5 Exact Elevation) */}
      <StatsSection />

      {/* Services Grid with 3D Hover (Screenshot 2 & 3 Elevation) */}
      <ServicesSection onSelectServiceForQuote={handleScrollToEstimator} />

      {/* Dynamic Case Studies & Project Gallery */}
      <PortfolioGallery
        onOpenAdmin={handleOpenAdmin}
        refreshTrigger={galleryRefreshTrigger}
      />

      {/* Deep Dive into Core Tech Stacks */}
      <TechStackSection />

      {/* Why Choose Us with 3D Phone Mockup (Screenshot 4 Elevation) */}
      <WhyChooseUs />

      {/* Interactive Project Cost Estimator & Quote Submission */}
      <ProjectEstimator preselectedService={preselectedService} />

      {/* Contact Section submitting to MySQL */}
      <ContactSection />

      {/* Footer */}
      <Footer onOpenAdmin={handleOpenAdmin} />
    </div>
  );
}

export default App;
