import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import { Layers, ArrowRight, ShieldCheck } from "lucide-react";

const NavigationBar = ({ onOpenAdmin }) => {
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
      className={`navbar-glass py-2 py-lg-3 ${scrolled ? "shadow-sm" : ""}`}
    >
      <Container className="d-flex align-items-center justify-content-between">
        {/* Brand Logo & Name */}
        <Navbar.Brand href="#home" className="d-flex align-items-center gap-2 m-0 p-0">
          <div className="brand-badge">
            <Layers size={22} className="text-white flex-shrink-0" />
            <span className="brand-text">Krsh.Innovations</span>
          </div>
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
          {/* Main Navigation Links matching Drop Techno Lab reference */}
          <Nav className="mx-auto align-items-lg-center my-3 my-lg-0 main-nav-links">
            <Nav.Link href="#home" className="nav-item-link">
              Home
            </Nav.Link>

            <NavDropdown
              title="Services"
              id="services-dropdown"
              className="nav-item-link-dropdown"
            >
              <NavDropdown.Item href="#services" className="py-2">
                <strong className="d-block text-dark">WordPress & Web Development</strong>
                <span className="small text-muted">React 18 & Full-stack CMS</span>
              </NavDropdown.Item>
              <NavDropdown.Item href="#services" className="py-2">
                <strong className="d-block text-dark">E-Commerce Development</strong>
                <span className="small text-muted">High-converting stores & Stripe checkout</span>
              </NavDropdown.Item>
              <NavDropdown.Item href="#services" className="py-2">
                <strong className="d-block text-dark">PHP & Laravel Engineering</strong>
                <span className="small text-muted">Enterprise backend & MySQL databases</span>
              </NavDropdown.Item>
              <NavDropdown.Item href="#services" className="py-2">
                <strong className="d-block text-dark">JavaScript & Node.js</strong>
                <span className="small text-muted">React 18, Express APIs & microservices</span>
              </NavDropdown.Item>
              <NavDropdown.Item href="#services" className="py-2">
                <strong className="d-block text-dark">Website Maintenance & Flutter</strong>
                <span className="small text-muted">24/7 Support & Cross-platform apps</span>
              </NavDropdown.Item>
              <NavDropdown.Item href="#services" className="py-2">
                <strong className="d-block text-dark">Web Consultancy</strong>
                <span className="small text-muted">Python AI, DevOps & Cloud scaling</span>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#services" className="text-primary fw-semibold small">
                Explore All 6 Services &rarr;
              </NavDropdown.Item>
            </NavDropdown>

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

          {/* Right Action: Clean Single "Get Started" Button matching reference */}
          <div className="d-flex align-items-center gap-2 mt-2 mt-lg-0">
            <Button
              variant="primary"
              href="#contact"
              className="btn-get-started d-inline-flex align-items-center justify-content-center fw-semibold text-white shadow-sm border-0"
              style={{ background: "#00a2ea" }}
            >
              <span>Get Started</span>
              <ArrowRight size={16} className="ms-1" />
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
