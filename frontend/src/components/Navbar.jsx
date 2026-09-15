import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown, Button, Badge } from "react-bootstrap";
import { Layers, Sparkles, Shield, Database, Settings } from "lucide-react";

const NavigationBar = ({ onOpenEstimator, onOpenAdmin, dbStatus, inquiriesCount = 0 }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`navbar-glass py-3 ${scrolled ? "shadow-sm" : ""}`}
    >
      <Container>
        {/* Brand Logo & Name */}
        <Navbar.Brand href="#home" className="d-flex align-items-center gap-2">
          <div className="brand-badge">
            <Layers size={22} className="text-white" />
            <span style={{ fontSize: "1.25rem", letterSpacing: "-0.5px" }}>Krsh.Innovations</span>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" className="border-0 shadow-none">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="main-navbar">
          {/* Main Navigation Links matching reference */}
          <Nav className="mx-auto align-items-lg-center gap-lg-1 fw-medium text-secondary">
            <Nav.Link href="#home" className="px-3 text-dark">Home</Nav.Link>
            
            <NavDropdown title="Services" id="services-dropdown">
              <NavDropdown.Item href="#services" className="fw-medium py-2">
                <strong>WordPress & React Development</strong>
                <div className="small text-muted">Full-stack web & CMS solutions</div>
              </NavDropdown.Item>
              <NavDropdown.Item href="#services" className="fw-medium py-2">
                <strong>E-Commerce Development</strong>
                <div className="small text-muted">High-converting stores & Stripe checkouts</div>
              </NavDropdown.Item>
              <NavDropdown.Item href="#services" className="fw-medium py-2">
                <strong>PHP & Laravel Engineering</strong>
                <div className="small text-muted">Enterprise backend & MySQL architectures</div>
              </NavDropdown.Item>
              <NavDropdown.Item href="#services" className="fw-medium py-2">
                <strong>JavaScript & Node.js</strong>
                <div className="small text-muted">React 18, Express APIs & microservices</div>
              </NavDropdown.Item>
              <NavDropdown.Item href="#services" className="fw-medium py-2">
                <strong>Website Maintenance & Flutter</strong>
                <div className="small text-muted">24/7 Support & Cross-platform apps</div>
              </NavDropdown.Item>
              <NavDropdown.Item href="#services" className="fw-medium py-2">
                <strong>Web Consultancy</strong>
                <div className="small text-muted">Python AI, DevOps & Cloud scaling</div>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#services" className="text-primary fw-semibold">
                Explore All Services &rarr;
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="#portfolio" className="px-3 text-dark">Case Studies</Nav.Link>
            <Nav.Link href="#tech-stack" className="px-3 text-dark">Technologies</Nav.Link>
            <Nav.Link href="#why-us" className="px-3 text-dark">Why Us</Nav.Link>
            <Nav.Link href="#estimator" className="px-3 text-dark">Estimator</Nav.Link>
            <Nav.Link href="#contact" className="px-3 text-dark">Contact Us</Nav.Link>
          </Nav>

          {/* Right Actions: Admin Panel & Get Started */}
          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            {/* Admin Panel Trigger */}
            <Button
              variant="outline-dark"
              size="sm"
              className="d-flex align-items-center gap-2 rounded-pill px-3 py-2 border fw-semibold shadow-sm position-relative"
              onClick={onOpenAdmin}
              title="Open Backend Admin Panel (Manage Gallery & Contact Inquiries)"
            >
              <Settings size={15} className="text-primary" />
              <span style={{ fontSize: "0.85rem" }}>Admin Panel</span>
              {inquiriesCount > 0 && (
                <Badge bg="danger" pill style={{ fontSize: "10px" }}>
                  {inquiriesCount}
                </Badge>
              )}
            </Button>

            {/* Quick Estimate CTA */}
            <Button
              variant="primary"
              className="d-flex align-items-center gap-2 rounded-pill px-3 py-2 fw-semibold border-0 shadow-sm"
              style={{ background: "#00a2ea" }}
              onClick={onOpenEstimator}
            >
              <Sparkles size={15} />
              <span>Get Estimate</span>
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
