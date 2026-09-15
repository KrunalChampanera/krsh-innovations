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
    window.open("http://localhost:5181", "_blank");
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

  // 2. Client View: Clean, Perfect Public Agency Website (No black admin strip)
  return (
    <div className="app-container min-vh-100 d-flex flex-column">
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
