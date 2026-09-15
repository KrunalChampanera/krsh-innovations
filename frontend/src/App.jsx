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
import AdminPanelModal from "./components/AdminPanelModal";
import Footer from "./components/Footer";

function App() {
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [preselectedService, setPreselectedService] = useState("");
  const [dbStatus, setDbStatus] = useState(null);
  const [newInquiriesCount, setNewInquiriesCount] = useState(0);
  const [galleryRefreshTrigger, setGalleryRefreshTrigger] = useState(0);

  // Poll backend health & inquiries count
  const checkStatus = async () => {
    try {
      const res = await fetch("/api/health");
      const data = await res.json();
      if (data && data.database) {
        setDbStatus(data.database);
      }

      const inqRes = await fetch("/api/inquiries");
      const inqData = await inqRes.json();
      if (inqData && inqData.data) {
        const newCount = inqData.data.filter((i) => (i.status || "new") === "new").length;
        setNewInquiriesCount(newCount);
      }
    } catch (err) {
      console.log("Backend offline or booting:", err.message);
    }
  };

  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 20000);
    return () => clearInterval(interval);
  }, []);

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

  return (
    <div className="app-container min-vh-100 d-flex flex-column">
      {/* Top Glassmorphic Navigation Bar */}
      <NavigationBar
        onOpenEstimator={() => handleScrollToEstimator()}
        onOpenAdmin={() => setShowAdminModal(true)}
        dbStatus={dbStatus}
        inquiriesCount={newInquiriesCount}
      />

      {/* Hero Section with Upgraded Interactive 3D Three.js Visuals */}
      <Hero3D onGetStarted={handleGetStarted} />

      {/* Stats Counter (Screenshot 5 Exact Elevation) */}
      <StatsSection />

      {/* Services Grid with 3D Hover (Screenshot 2 & 3 Elevation) */}
      <ServicesSection onSelectServiceForQuote={handleScrollToEstimator} />

      {/* Dynamic Case Studies & Project Gallery */}
      <PortfolioGallery
        onOpenAdmin={() => setShowAdminModal(true)}
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
      <Footer />

      {/* Dedicated Backend Admin Panel (Gallery Photos & Inquiries Management) */}
      <AdminPanelModal
        show={showAdminModal}
        onHide={() => {
          setShowAdminModal(false);
          checkStatus();
        }}
        onGalleryUpdated={() => setGalleryRefreshTrigger((prev) => prev + 1)}
        dbStatus={dbStatus}
      />
    </div>
  );
}

export default App;
