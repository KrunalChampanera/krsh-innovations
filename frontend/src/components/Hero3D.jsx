import React, { useState } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Code2,
  Smartphone,
  Server,
  Layers,
  Terminal,
  Cpu,
  ShieldCheck,
  Zap,
  Globe,
  Activity
} from "lucide-react";

const Hero3D = ({ onGetStarted }) => {
  const [activeTab, setActiveTab] = useState("web");

  return (
    <section id="home" className="hero-section position-relative overflow-hidden" style={{ minHeight: "88vh" }}>
      {/* Subtle geometric background accents matching screenshot 2/3 style */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "12%",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(2, 132, 199, 0.12) 0%, rgba(255,255,255,0) 70%)",
          zIndex: 0,
          pointerEvents: "none"
        }}
      />
      {/* Decorative tiny pink circle & cyan plus */}
      <div
        style={{
          position: "absolute",
          top: "22%",
          right: "48%",
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          border: "2px solid #f43f5e",
          opacity: 0.6,
          pointerEvents: "none"
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "35%",
          left: "4%",
          fontSize: "22px",
          color: "#06b6d4",
          fontWeight: "bold",
          opacity: 0.5,
          pointerEvents: "none"
        }}
      >
        +
      </div>

      <Container className="position-relative" style={{ zIndex: 1 }}>
        <Row className="align-items-center gy-5">
          {/* Left Column: Headings & Value Props matching Screenshot 1 */}
          <Col lg={6}>
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 mb-3 rounded-pill bg-light border border-primary-subtle shadow-sm">
              <Sparkles size={16} className="text-primary" />
              <span className="small fw-bold text-primary text-uppercase tracking-wider">
                Krsh.Innovations • IT & Startup Studio
              </span>
            </div>

            <h1 className="hero-headline text-dark mb-3">
              White Label{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #00a2ea 0%, #2563eb 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Development Agency
              </span>
            </h1>

            <p className="hero-subtitle mb-4">
              A team of highly experienced experts and skilled developers to provide you with any kind
              of web and mobile development services. We build complete, scale-ready software from
              scratch.
            </p>

            {/* Quick Tech Badge Highlights */}
            <div className="d-flex flex-wrap gap-2 mb-4">
              <span className="badge bg-light text-dark border px-3 py-2 rounded-pill fw-medium">
                ⚡ React.js 18
              </span>
              <span className="badge bg-light text-dark border px-3 py-2 rounded-pill fw-medium">
                📱 Flutter Apps
              </span>
              <span className="badge bg-light text-dark border px-3 py-2 rounded-pill fw-medium">
                🛠️ PHP & Laravel
              </span>
              <span className="badge bg-light text-dark border px-3 py-2 rounded-pill fw-medium">
                🟢 Node.js & Express
              </span>
              <span className="badge bg-light text-dark border px-3 py-2 rounded-pill fw-medium">
                🐬 MySQL & MongoDB
              </span>
              <span className="badge bg-light text-dark border px-3 py-2 rounded-pill fw-medium">
                🐍 Python AI
              </span>
            </div>

            {/* CTA Buttons: Standardized Medium Size (Same Width & Height) */}
            <div className="d-flex flex-wrap align-items-center gap-3">
              <button
                type="button"
                className="btn-krsh-primary"
                onClick={onGetStarted}
              >
                <span>Get Started</span>
                <ArrowRight size={16} />
              </button>

              <a
                href="#services"
                className="btn-krsh-secondary"
              >
                <span>Explore Services</span>
              </a>
            </div>

            {/* Trust Markers */}
            <div className="d-flex align-items-center gap-4 mt-4 pt-3 border-top border-light-subtle">
              <div className="d-flex align-items-center gap-2">
                <CheckCircle2 size={17} className="text-primary" />
                <span className="small text-muted fw-semibold">Guaranteed On-Time</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <CheckCircle2 size={17} className="text-success" />
                <span className="small text-muted fw-semibold">100% Code Ownership</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <CheckCircle2 size={17} className="text-info" />
                <span className="small text-muted fw-semibold">24/7 Dedicated Support</span>
              </div>
            </div>
          </Col>

          {/* Right Column: High-Tech Studio Architecture & System Showcase */}
          <Col lg={6} className="position-relative">
            <div className="hero-showcase-wrapper position-relative">
              {/* Outer Glow Halo */}
              <div
                style={{
                  position: "absolute",
                  inset: "-15px",
                  background: "radial-gradient(circle, rgba(0, 162, 234, 0.22) 0%, rgba(37, 99, 235, 0.1) 50%, transparent 75%)",
                  filter: "blur(20px)",
                  zIndex: 0,
                  borderRadius: "28px",
                  pointerEvents: "none"
                }}
              />

              {/* High-Tech Terminal / Architecture Window */}
              <div
                className="position-relative shadow-2xl rounded-4 overflow-hidden border border-secondary border-opacity-25"
                style={{
                  background: "linear-gradient(160deg, #0b1329 0%, #060b18 100%)",
                  boxShadow: "0 25px 60px -15px rgba(0, 162, 234, 0.25), 0 0 1px 1px rgba(255,255,255,0.1)",
                  zIndex: 1
                }}
              >
                {/* Window Header */}
                <div
                  className="d-flex align-items-center justify-content-between px-3 py-2 border-bottom border-secondary border-opacity-25"
                  style={{ background: "rgba(15, 23, 42, 0.85)", backdropFilter: "blur(8px)" }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <span className="rounded-circle" style={{ width: "11px", height: "11px", background: "#ef4444" }}></span>
                    <span className="rounded-circle" style={{ width: "11px", height: "11px", background: "#eab308" }}></span>
                    <span className="rounded-circle" style={{ width: "11px", height: "11px", background: "#22c55e" }}></span>
                    <span className="ms-2 text-secondary font-monospace" style={{ fontSize: "11px" }}>
                      krsh-cloud-v2.production
                    </span>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-25 rounded-pill px-2 py-1" style={{ fontSize: "10px" }}>
                      ● 99.99% UPTIME
                    </span>
                  </div>
                </div>

                {/* Window Body */}
                <div className="p-3 p-md-4 text-white">
                  {/* Brand & Studio Architecture Banner */}
                  <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom border-secondary border-opacity-25 flex-wrap gap-2">
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src="/logo.png"
                        alt="Krsh Innovations"
                        style={{
                          width: "48px",
                          height: "48px",
                          objectFit: "cover",
                          borderRadius: "12px",
                          background: "#ffffff",
                          padding: "2px",
                          boxShadow: "0 4px 14px rgba(0, 162, 234, 0.4)"
                        }}
                      />
                      <div>
                        <div className="fw-bold text-white fs-6 d-flex align-items-center gap-2">
                          <span>Krsh.<span style={{ color: "#00a2ea" }}>Innovations</span></span>
                          <span className="badge bg-primary bg-opacity-25 text-primary border border-primary border-opacity-25 rounded-pill px-2 py-0" style={{ fontSize: "9px" }}>
                            VERIFIED STUDIO
                          </span>
                        </div>
                        <div className="text-secondary" style={{ fontSize: "11px" }}>
                          Full-Stack Web • Mobile Apps • Custom Cloud Architecture
                        </div>
                      </div>
                    </div>

                    <div className="text-end d-none d-sm-block">
                      <div className="text-info font-monospace small fw-bold">18ms Latency</div>
                      <div className="text-secondary" style={{ fontSize: "10px" }}>Direct Founder Access</div>
                    </div>
                  </div>

                  {/* Interactive Architecture Navigation Tabs */}
                  <div className="d-flex gap-2 mb-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab("web")}
                      className={`hero-arch-tab rounded-pill px-3 py-1 d-inline-flex align-items-center gap-1 ${
                        activeTab === "web" ? "active" : ""
                      }`}
                    >
                      <Code2 size={13} className="text-white" />
                      <span className="text-white fw-semibold">Web Core</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("mobile")}
                      className={`hero-arch-tab rounded-pill px-3 py-1 d-inline-flex align-items-center gap-1 ${
                        activeTab === "mobile" ? "active" : ""
                      }`}
                    >
                      <Smartphone size={13} className="text-white" />
                      <span className="text-white fw-semibold">Mobile Engine</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("backend")}
                      className={`hero-arch-tab rounded-pill px-3 py-1 d-inline-flex align-items-center gap-1 ${
                        activeTab === "backend" ? "active" : ""
                      }`}
                    >
                      <Server size={13} className="text-white" />
                      <span className="text-white fw-semibold">Backend & DB</span>
                    </button>
                  </div>

                  {/* Architecture Tab Content Panel */}
                  <div
                    className="p-3 rounded-3 border border-secondary border-opacity-25 mb-3"
                    style={{ background: "rgba(15, 23, 42, 0.65)" }}
                  >
                    {activeTab === "web" && (
                      <div>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="text-info fw-semibold small d-flex align-items-center gap-1">
                            <Zap size={14} /> React 18 & Vite Ecosystem
                          </span>
                          <span className="badge bg-success bg-opacity-25 text-success" style={{ fontSize: "10px" }}>
                            Ultra-Fast HMR
                          </span>
                        </div>
                        <p className="text-secondary small mb-2" style={{ fontSize: "12px", lineHeight: "1.6" }}>
                          Single Page Applications, Enterprise SaaS dashboards, and responsive frontends engineered with component modularity and lightning-fast client-side state.
                        </p>
                        <div className="d-flex flex-wrap gap-2">
                          <span className="badge bg-dark border border-secondary text-light px-2 py-1" style={{ fontSize: "11px" }}>React 18</span>
                          <span className="badge bg-dark border border-secondary text-light px-2 py-1" style={{ fontSize: "11px" }}>Bootstrap 5</span>
                          <span className="badge bg-dark border border-secondary text-light px-2 py-1" style={{ fontSize: "11px" }}>Tailwind CSS</span>
                          <span className="badge bg-dark border border-secondary text-light px-2 py-1" style={{ fontSize: "11px" }}>REST / GraphQL</span>
                        </div>
                      </div>
                    )}

                    {activeTab === "mobile" && (
                      <div>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="text-info fw-semibold small d-flex align-items-center gap-1">
                            <Smartphone size={14} /> Flutter iOS & Android Engine
                          </span>
                          <span className="badge bg-info bg-opacity-25 text-info" style={{ fontSize: "10px" }}>
                            60 FPS Native
                          </span>
                        </div>
                        <p className="text-secondary small mb-2" style={{ fontSize: "12px", lineHeight: "1.6" }}>
                          High-performance cross-platform mobile apps built from a single codebase. Native hardware access, smooth gesture navigation, and real-time offline synchronization.
                        </p>
                        <div className="d-flex flex-wrap gap-2">
                          <span className="badge bg-dark border border-secondary text-light px-2 py-1" style={{ fontSize: "11px" }}>Flutter 3.x</span>
                          <span className="badge bg-dark border border-secondary text-light px-2 py-1" style={{ fontSize: "11px" }}>Dart</span>
                          <span className="badge bg-dark border border-secondary text-light px-2 py-1" style={{ fontSize: "11px" }}>iOS & Android</span>
                          <span className="badge bg-dark border border-secondary text-light px-2 py-1" style={{ fontSize: "11px" }}>Firebase / Push</span>
                        </div>
                      </div>
                    )}

                    {activeTab === "backend" && (
                      <div>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="text-info fw-semibold small d-flex align-items-center gap-1">
                            <Server size={14} /> Node.js, PHP/Laravel & Databases
                          </span>
                          <span className="badge bg-primary bg-opacity-25 text-primary" style={{ fontSize: "10px" }}>
                            ACID Compliant
                          </span>
                        </div>
                        <p className="text-secondary small mb-2" style={{ fontSize: "12px", lineHeight: "1.6" }}>
                          Hardened backend architectures with Express & Laravel, secure REST APIs, role-based JWT auth, and optimized MySQL / MongoDB indexing for zero latency.
                        </p>
                        <div className="d-flex flex-wrap gap-2">
                          <span className="badge bg-dark border border-secondary text-light px-2 py-1" style={{ fontSize: "11px" }}>Node.js & Express</span>
                          <span className="badge bg-dark border border-secondary text-light px-2 py-1" style={{ fontSize: "11px" }}>PHP 8 & Laravel</span>
                          <span className="badge bg-dark border border-secondary text-light px-2 py-1" style={{ fontSize: "11px" }}>MySQL Relational</span>
                          <span className="badge bg-dark border border-secondary text-light px-2 py-1" style={{ fontSize: "11px" }}>Python AI Microservices</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* System Architecture Metrics */}
                  <div className="row g-2 text-center font-monospace">
                    <div className="col-4">
                      <div className="p-2 rounded-2 border border-secondary border-opacity-25" style={{ background: "rgba(15, 23, 42, 0.4)" }}>
                        <div className="text-info fw-bold" style={{ fontSize: "13px" }}>100%</div>
                        <div className="text-secondary" style={{ fontSize: "10px" }}>IP Handover</div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="p-2 rounded-2 border border-secondary border-opacity-25" style={{ background: "rgba(15, 23, 42, 0.4)" }}>
                        <div className="text-success fw-bold" style={{ fontSize: "13px" }}>Weekly</div>
                        <div className="text-secondary" style={{ fontSize: "10px" }}>Sprint Demos</div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="p-2 rounded-2 border border-secondary border-opacity-25" style={{ background: "rgba(15, 23, 42, 0.4)" }}>
                        <div className="text-primary fw-bold" style={{ fontSize: "13px" }}>Zero</div>
                        <div className="text-secondary" style={{ fontSize: "10px" }}>Vendor Lock-in</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Tech Pill Top-Right */}
              <div
                className="position-absolute d-none d-sm-flex align-items-center gap-2 bg-white px-3 py-2 rounded-pill shadow-lg border border-primary-subtle"
                style={{
                  top: "-14px",
                  right: "20px",
                  zIndex: 3
                }}
              >
                <span className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: "22px", height: "22px", fontSize: "11px" }}>
                  ⚡
                </span>
                <span className="small fw-bold text-dark">Production Ready MVP</span>
              </div>

              {/* Floating Tech Pill Bottom-Left */}
              <div
                className="position-absolute d-none d-sm-flex align-items-center gap-2 bg-white px-3 py-2 rounded-pill shadow-lg border border-success-subtle"
                style={{
                  bottom: "-14px",
                  left: "20px",
                  zIndex: 3
                }}
              >
                <CheckCircle2 size={16} className="text-success" />
                <span className="small fw-bold text-dark">Enterprise Standards</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero3D;
