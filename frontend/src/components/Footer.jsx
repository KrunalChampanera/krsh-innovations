import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Layers, Mail, Send } from "lucide-react";

const Footer = ({ onOpenAdmin }) => {
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState(null);

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      setSubStatus({ success: true, message: data.message });
      setEmail("");
    } catch (err) {
      setSubStatus({ success: false, message: "Subscription failed. Please email us directly." });
    }
  };

  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-5 border-top border-secondary">
      <Container>
        <Row className="gy-4 mb-5">
          {/* Brand & Mission */}
          <Col lg={4} md={6}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="brand-badge" style={{ background: "#00a2ea" }}>
                <Layers size={20} className="text-white" />
                <span style={{ fontSize: "1.15rem" }}>Krsh.Innovations</span>
              </div>
            </div>

            <p className="text-secondary small mb-3" style={{ lineHeight: 1.7 }}>
              An entrepreneurial IT development startup dedicated to architecting high-performance
              web, mobile, and cloud software. We partner with founders, businesses, and agencies
              globally to convert ambitious ideas into scalable reality.
            </p>

            <div className="d-flex align-items-center gap-2 text-secondary small">
              <Mail size={16} className="text-primary" />
              <a
                href="mailto:Krsh.Innovations@gmail.com"
                className="text-info text-decoration-none fw-semibold"
              >
                Krsh.Innovations@gmail.com
              </a>
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={3} sm={6}>
            <h6 className="fw-bold text-white mb-3 text-uppercase tracking-wider small">
              Company
            </h6>
            <ul className="list-unstyled small text-secondary d-flex flex-column gap-2 mb-0">
              <li><a href="#home" className="text-secondary text-decoration-none hover-white">Home</a></li>
              <li><a href="#services" className="text-secondary text-decoration-none hover-white">Services</a></li>
              <li><a href="#portfolio" className="text-secondary text-decoration-none hover-white">Case Studies</a></li>
              <li><a href="#tech-stack" className="text-secondary text-decoration-none hover-white">Technologies</a></li>
              <li><a href="#why-us" className="text-secondary text-decoration-none hover-white">Why Us</a></li>
              <li><a href="#contact" className="text-secondary text-decoration-none hover-white">Contact Us</a></li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="btn btn-link text-info text-decoration-none p-0 small fw-semibold text-start"
                >
                  🔐 Admin Portal
                </button>
              </li>
            </ul>
          </Col>

          {/* Core Stacks */}
          <Col lg={3} md={3} sm={6}>
            <h6 className="fw-bold text-white mb-3 text-uppercase tracking-wider small">
              Core Technologies
            </h6>
            <ul className="list-unstyled small text-secondary d-flex flex-column gap-2 mb-0">
              <li>React 18 & Three.js 3D Web</li>
              <li>Node.js & Express REST APIs</li>
              <li>PHP & Laravel Architecture</li>
              <li>Google Flutter Mobile Apps</li>
              <li>MySQL & MongoDB Database Design</li>
              <li>Python Microservices & AI</li>
            </ul>
          </Col>

          {/* Newsletter Signup */}
          <Col lg={3} md={12}>
            <h6 className="fw-bold text-white mb-3 text-uppercase tracking-wider small">
              Stay Connected
            </h6>
            <p className="text-secondary small mb-3">
              Subscribe to Krsh.Innovations technical updates and startup releases.
            </p>

            {subStatus && (
              <Alert variant={subStatus.success ? "success" : "danger"} className="py-2 small">
                {subStatus.message}
              </Alert>
            )}

            <Form onSubmit={handleNewsletter} className="d-flex gap-2">
              <Form.Control
                type="email"
                placeholder="Enter work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-secondary bg-opacity-25 border-secondary text-white small rounded-3 py-2"
              />
              <Button
                type="submit"
                variant="primary"
                className="px-3 rounded-3 border-0"
                style={{ background: "#00a2ea" }}
              >
                <Send size={16} />
              </Button>
            </Form>
          </Col>
        </Row>

        <hr className="border-secondary my-4" />

        <div className="d-flex flex-wrap justify-content-between align-items-center small text-secondary gap-3">
          <div>
            &copy; {new Date().getFullYear()} <strong>Krsh.Innovations</strong>. All rights reserved.
          </div>
          <div className="d-flex align-items-center gap-3">
            <span>Built with React 18, Node.js & MySQL</span>
            <span>•</span>
            <button
              onClick={onOpenAdmin}
              className="btn btn-link text-secondary text-decoration-none p-0 small"
            >
              Admin Dashboard
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
