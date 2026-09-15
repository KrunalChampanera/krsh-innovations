import React, { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import {
  Layers,
  ArrowRight,
  Code,
  ShoppingCart,
  Server,
  Terminal,
  Smartphone,
  Compass,
  ChevronRight
} from "lucide-react";

const NavigationBar = ({ onOpenAdmin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const closeTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 140);
  };

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`navbar-glass py-2 py-lg-3 ${scrolled ? "shadow-sm" : ""}`}
    >
      <Container className="d-flex align-items-center justify-content-between">
        {/* Brand Logo */}
        <Navbar.Brand href="#home" className="d-flex align-items-center m-0 p-0">
          <img
            src="/logo-horizontal.png"
            alt="Krsh Innovations"
            style={{
              height: "46px",
              width: "auto",
              maxWidth: "230px",
              objectFit: "contain"
            }}
          />
        </Navbar.Brand>

        {/* Mobile Toggler */}
        <Navbar.Toggle
          aria-controls="main-navbar-nav"
          className="border-0 shadow-none p-1"
        >
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>

        {/* Navbar Content */}
        <Navbar.Collapse id="main-navbar-nav" className="justify-content-end">
          {/* Main Navigation Links */}
          <Nav className="mx-auto align-items-lg-center my-3 my-lg-0 main-nav-links">
            <Nav.Link href="#home" className="nav-item-link">
              Home
            </Nav.Link>

            {/* Services Dropdown with Smooth Hover & Crisp Typography */}
            <div
              className="position-relative d-inline-block"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <NavDropdown
                title="Services"
                id="services-dropdown"
                show={dropdownOpen}
                onToggle={(isOpen) => setDropdownOpen(isOpen)}
                className="nav-item-link-dropdown"
              >
                {/* 1. WordPress Dev */}
                <NavDropdown.Item href="#services" className="dropdown-service-item" onClick={() => setDropdownOpen(false)}>
                  <div className="dropdown-service-icon" style={{ background: "#ccfbf1", color: "#0d9488" }}>
                    <Code size={18} />
                  </div>
                  <div>
                    <div className="dropdown-service-title">WordPress & Web Development</div>
                    <div className="dropdown-service-desc">React 18 & Headless CMS solutions</div>
                  </div>
                </NavDropdown.Item>

                {/* 2. E-Commerce */}
                <NavDropdown.Item href="#services" className="dropdown-service-item" onClick={() => setDropdownOpen(false)}>
                  <div className="dropdown-service-icon" style={{ background: "#ffe4e6", color: "#e11d48" }}>
                    <ShoppingCart size={18} />
                  </div>
                  <div>
                    <div className="dropdown-service-title">E-Commerce Development</div>
                    <div className="dropdown-service-desc">High-converting stores & Stripe checkout</div>
                  </div>
                </NavDropdown.Item>

                {/* 3. PHP & Laravel */}
                <NavDropdown.Item href="#services" className="dropdown-service-item" onClick={() => setDropdownOpen(false)}>
                  <div className="dropdown-service-icon" style={{ background: "#dbeafe", color: "#2563eb" }}>
                    <Server size={18} />
                  </div>
                  <div>
                    <div className="dropdown-service-title">PHP & Laravel Engineering</div>
                    <div className="dropdown-service-desc">Enterprise backend & MySQL architectures</div>
                  </div>
                </NavDropdown.Item>

                {/* 4. JavaScript & Node.js */}
                <NavDropdown.Item href="#services" className="dropdown-service-item" onClick={() => setDropdownOpen(false)}>
                  <div className="dropdown-service-icon" style={{ background: "#fef3c7", color: "#d97706" }}>
                    <Terminal size={18} />
                  </div>
                  <div>
                    <div className="dropdown-service-title">JavaScript & Node.js</div>
                    <div className="dropdown-service-desc">React 18, Express APIs & microservices</div>
                  </div>
                </NavDropdown.Item>

                {/* 5. Website Maintenance & Flutter */}
                <NavDropdown.Item href="#services" className="dropdown-service-item" onClick={() => setDropdownOpen(false)}>
                  <div className="dropdown-service-icon" style={{ background: "#f3e8ff", color: "#9333ea" }}>
                    <Smartphone size={18} />
                  </div>
                  <div>
                    <div className="dropdown-service-title">Website Maintenance & Flutter</div>
                    <div className="dropdown-service-desc">24/7 Monitoring & iOS/Android apps</div>
                  </div>
                </NavDropdown.Item>

                {/* 6. Web Consultancy */}
                <NavDropdown.Item href="#services" className="dropdown-service-item" onClick={() => setDropdownOpen(false)}>
                  <div className="dropdown-service-icon" style={{ background: "#e0e7ff", color: "#4338ca" }}>
                    <Compass size={18} />
                  </div>
                  <div>
                    <div className="dropdown-service-title">Web Consultancy</div>
                    <div className="dropdown-service-desc">Python AI, cloud DevOps & fractional CTO</div>
                  </div>
                </NavDropdown.Item>

                <NavDropdown.Divider className="my-1" />

                <NavDropdown.Item
                  href="#services"
                  onClick={() => setDropdownOpen(false)}
                  className="dropdown-service-item text-primary py-2 d-flex justify-content-between align-items-center"
                >
                  <span className="small fw-semibold">Explore All 6 Core Services</span>
                  <ChevronRight size={15} />
                </NavDropdown.Item>
              </NavDropdown>
            </div>

            <Nav.Link href="#portfolio" className="nav-item-link">
              Case Studies
            </Nav.Link>

            <Nav.Link href="#tech-stack" className="nav-item-link">
              Technologies
            </Nav.Link>

            <Nav.Link href="#why-us" className="nav-item-link">
              Why Us
            </Nav.Link>

            <Nav.Link href="#contact" className="nav-item-link">
              Contact Us
            </Nav.Link>
          </Nav>

          {/* Right Action: Clean Medium "Get Started" Button */}
          <div className="d-flex align-items-center gap-2 mt-2 mt-lg-0">
            <a
              href="#contact"
              className="btn-nav-action"
            >
              <span>Get Started</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
