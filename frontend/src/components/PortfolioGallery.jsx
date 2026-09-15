import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Badge, Button, Modal } from "react-bootstrap";
import {
  ExternalLink,
  Layers,
  Sparkles,
  PlusCircle,
  Laptop,
  Smartphone,
  Cpu,
  CheckCircle2,
  TrendingUp,
  Shield,
  Zap,
  Eye,
  ArrowRight
} from "lucide-react";

const PortfolioGallery = ({ onOpenAdmin, refreshTrigger }) => {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [spotlightDevice, setSpotlightDevice] = useState("laptop"); // 'laptop' | 'mobile' | 'metrics'

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      if (data.success) {
        setProjects(data.data || []);
      }
    } catch (err) {
      console.error("Error fetching gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, [refreshTrigger]);

  const categories = [
    "All",
    "Web Development",
    "Mobile App",
    "E-Commerce",
    "Enterprise",
    "AI & Python",
    "UI/UX & 3D"
  ];

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter(
          (p) => p.category && p.category.toLowerCase().includes(activeCategory.toLowerCase())
        );

  // Spotlight flagship project
  const featuredProject = projects[0] || {
    title: "FinTech Cloud Dashboard & Transaction Engine",
    category: "Web Development",
    image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    tech_stack: "React 18, Three.js, Node.js, Express, MySQL",
    description: "High-frequency real-time financial tracking architecture handling millions in daily transactional volume with sub-second latency.",
    project_url: "https://github.com"
  };

  return (
    <section id="portfolio" className="py-5 bg-white position-relative">
      {/* Subtle background glow */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 162, 234, 0.06) 0%, rgba(255,255,255,0) 70%)",
          pointerEvents: "none",
          zIndex: 0
        }}
      />

      <Container className="position-relative" style={{ zIndex: 1 }}>
        {/* Section Title */}
        <div className="section-title-wrap">
          <div className="d-block mb-3">
            <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-2 fw-semibold section-tag-badge">
              Krsh.Innovations Production Deployments
            </span>
          </div>
          <h2 className="section-title">Case Studies & Project Gallery</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            Explore recent digital systems, mobile apps, and scalable web solutions architected and
            delivered by Krsh.Innovations.
          </p>
        </div>

        {/* ========================================================
            CRAZY FEATURED PROJECT SPOTLIGHT (AWWWARDS-TIER SHOWCASE)
            ======================================================== */}
        <div className="project-spotlight-box p-4 p-md-5 mb-5 text-white">
          <Row className="align-items-center gy-4">
            {/* Left Column: Spotlight Info & Interactive Switchers */}
            <Col lg={5}>
              <div className="d-inline-flex align-items-center gap-2 px-3 py-1 mb-3 rounded-pill bg-white bg-opacity-10 border border-white border-opacity-20">
                <Sparkles size={15} className="text-info" />
                <span className="small fw-semibold text-info text-uppercase">
                  Featured Client Milestone
                </span>
              </div>

              <h3 className="fw-bold mb-3 fs-2 text-white">
                {featuredProject.title}
              </h3>

              <p className="text-white-50 mb-4" style={{ fontSize: "0.98rem", lineHeight: 1.65 }}>
                {featuredProject.description}
              </p>

              {/* Interactive Device / Mode Switcher Buttons */}
              <div className="mb-4">
                <div className="small text-white-50 fw-semibold mb-2">Interactive Showcase View:</div>
                <div className="d-flex flex-wrap gap-2">
                  <button
                    type="button"
                    className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold d-inline-flex align-items-center gap-2 border-0 ${
                      spotlightDevice === "laptop"
                        ? "bg-info text-dark shadow"
                        : "bg-white bg-opacity-10 text-white"
                    }`}
                    onClick={() => setSpotlightDevice("laptop")}
                  >
                    <Laptop size={15} />
                    <span>Web Dashboard</span>
                  </button>

                  <button
                    type="button"
                    className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold d-inline-flex align-items-center gap-2 border-0 ${
                      spotlightDevice === "mobile"
                        ? "bg-info text-dark shadow"
                        : "bg-white bg-opacity-10 text-white"
                    }`}
                    onClick={() => setSpotlightDevice("mobile")}
                  >
                    <Smartphone size={15} />
                    <span>Mobile App</span>
                  </button>

                  <button
                    type="button"
                    className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold d-inline-flex align-items-center gap-2 border-0 ${
                      spotlightDevice === "metrics"
                        ? "bg-info text-dark shadow"
                        : "bg-white bg-opacity-10 text-white"
                    }`}
                    onClick={() => setSpotlightDevice("metrics")}
                  >
                    <Zap size={15} />
                    <span>Live Architecture</span>
                  </button>
                </div>
              </div>

              {/* Live Metric Badges */}
              <div className="row g-2 mb-4">
                <div className="col-6">
                  <div className="spotlight-metric-chip">
                    <TrendingUp size={20} className="text-info flex-shrink-0" />
                    <div>
                      <div className="fw-bold small text-white">+180% Faster</div>
                      <div className="text-white-50" style={{ fontSize: "11px" }}>Optimized Speed</div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="spotlight-metric-chip">
                    <Shield size={20} className="text-success flex-shrink-0" />
                    <div>
                      <div className="fw-bold small text-white">99.9% Uptime</div>
                      <div className="text-white-50" style={{ fontSize: "11px" }}>MySQL Pooling</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medium Action Buttons */}
              <div className="d-flex flex-wrap align-items-center gap-3">
                <button
                  type="button"
                  className="btn-krsh-primary"
                  onClick={() => setSelectedProject(featuredProject)}
                >
                  <span>Explore Case Study</span>
                  <ArrowRight size={16} />
                </button>

                <a
                  href="#contact"
                  className="btn-krsh-secondary"
                  style={{ background: "rgba(255,255,255,0.12)", color: "#ffffff", borderColor: "rgba(255,255,255,0.25)" }}
                >
                  <span>Build Similar App</span>
                </a>
              </div>
            </Col>

            {/* Right Column: Dynamic Live Preview Frame */}
            <Col lg={7}>
              {spotlightDevice === "laptop" && (
                <div>
                  <div className="showcase-laptop-mockup">
                    <div className="bg-dark px-3 py-2 d-flex align-items-center justify-content-between border-bottom border-secondary">
                      <div className="d-flex gap-1">
                        <span className="rounded-circle bg-danger" style={{ width: "9px", height: "9px" }}></span>
                        <span className="rounded-circle bg-warning" style={{ width: "9px", height: "9px" }}></span>
                        <span className="rounded-circle bg-success" style={{ width: "9px", height: "9px" }}></span>
                      </div>
                      <div className="small text-white-50 px-3 py-1 rounded bg-black bg-opacity-40" style={{ fontSize: "11px" }}>
                        🔒 https://dashboard.krsh-innovations.com
                      </div>
                      <span className="badge bg-success small" style={{ fontSize: "9px" }}>LIVE</span>
                    </div>
                    <div className="showcase-laptop-screen">
                      <img
                        src={featuredProject.image_url}
                        alt={featuredProject.title}
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80";
                        }}
                      />
                    </div>
                  </div>
                  <div className="showcase-laptop-base"></div>
                </div>
              )}

              {spotlightDevice === "mobile" && (
                <div className="text-center py-2">
                  <div
                    style={{
                      width: "240px",
                      height: "390px",
                      background: "#0f172a",
                      borderRadius: "32px",
                      border: "6px solid #334155",
                      padding: "10px",
                      margin: "0 auto",
                      boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
                      display: "flex",
                      flexDirection: "column"
                    }}
                  >
                    <div className="bg-dark rounded-pill mx-auto mb-2" style={{ width: "70px", height: "12px" }}></div>
                    <div style={{ flex: 1, borderRadius: "20px", overflow: "hidden", position: "relative" }}>
                      <img
                        src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80"
                        alt="Mobile App"
                        className="w-100 h-100"
                        style={{ objectFit: "cover" }}
                      />
                      <div className="position-absolute bottom-0 start-0 end-0 p-3 bg-dark bg-opacity-75 text-white">
                        <div className="fw-bold small">Flutter Cross-Platform</div>
                        <div className="text-info" style={{ fontSize: "11px" }}>60 FPS Native Performance</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {spotlightDevice === "metrics" && (
                <div className="p-4 rounded-4 bg-dark bg-opacity-75 border border-secondary shadow-lg">
                  <div className="d-flex align-items-center gap-2 mb-3 text-info">
                    <Cpu size={20} />
                    <h5 className="fw-bold mb-0 text-white">Enterprise Stack Benchmark</h5>
                  </div>
                  <div className="space-y-3">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between small mb-1">
                        <span className="text-white-50">Frontend React 18 Concurrent Rendering</span>
                        <span className="text-info fw-bold">60 FPS Smooth</span>
                      </div>
                      <div className="progress bg-secondary" style={{ height: "6px" }}>
                        <div className="progress-bar bg-info" style={{ width: "98%" }}></div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between small mb-1">
                        <span className="text-white-50">MySQL 8.0 Connection Pool Latency</span>
                        <span className="text-success fw-bold">4.2 ms Query Time</span>
                      </div>
                      <div className="progress bg-secondary" style={{ height: "6px" }}>
                        <div className="progress-bar bg-success" style={{ width: "95%" }}></div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between small mb-1">
                        <span className="text-white-50">Node.js Express API Concurrency</span>
                        <span className="text-warning fw-bold">12,000 Req / Sec</span>
                      </div>
                      <div className="progress bg-secondary" style={{ height: "6px" }}>
                        <div className="progress-bar bg-warning" style={{ width: "92%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex justify-content-between small mb-1">
                        <span className="text-white-50">Code Security & OWASP Top 10</span>
                        <span className="text-info fw-bold">Grade A+ (Zero Vulns)</span>
                      </div>
                      <div className="progress bg-secondary" style={{ height: "6px" }}>
                        <div className="progress-bar bg-info" style={{ width: "100%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </div>

        {/* Category Filters Bar */}
        <div className="d-flex justify-content-center align-items-center flex-wrap gap-2 mb-4">
          <div className="d-flex flex-wrap justify-content-center gap-2">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold transition-all ${
                  activeCategory === cat
                    ? "btn-primary shadow-sm"
                    : "btn-outline-secondary border-light-subtle bg-light text-secondary"
                }`}
                style={activeCategory === cat ? { background: "#00a2ea", borderColor: "#00a2ea" } : {}}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Project Cards Grid */}
        <Row className="g-4">
          {filteredProjects.map((project) => (
            <Col key={project.id} xs={12} md={6} lg={4}>
              <div className="project-card-v2">
                <div
                  className="project-card-thumb-wrap"
                  onClick={() => setSelectedProject(project)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="project-card-img"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div className="position-absolute top-0 end-0 m-3">
                    <span className="badge project-badge-glass px-3 py-1 rounded-pill">
                      {project.category}
                    </span>
                  </div>
                  <div className="position-absolute bottom-0 start-0 m-3">
                    <span className="badge bg-success bg-opacity-90 text-white rounded-pill px-2 py-1 small d-inline-flex align-items-center gap-1">
                      <span className="rounded-circle bg-white" style={{ width: "6px", height: "6px" }}></span>
                      <span>Production Ready</span>
                    </span>
                  </div>
                </div>

                <div className="p-4 d-flex flex-column justify-content-between flex-grow-1">
                  <div>
                    <h5
                      className="fw-bold text-dark mb-2 fs-5 hover-text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedProject(project)}
                    >
                      {project.title}
                    </h5>
                    <p className="small text-secondary mb-3" style={{ lineHeight: 1.6 }}>
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <div className="d-flex flex-wrap gap-1 mb-3">
                      {project.tech_stack?.split(",").map((tech, i) => (
                        <span key={i} className="project-tech-badge">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>

                    <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                      <button
                        type="button"
                        className="btn btn-sm btn-link text-primary fw-semibold p-0 text-decoration-none d-flex align-items-center gap-1"
                        onClick={() => setSelectedProject(project)}
                      >
                        <Eye size={15} />
                        <span>Case Study Details</span>
                      </button>

                      {project.project_url && (
                        <a
                          href={project.project_url}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1 d-flex align-items-center gap-1"
                          style={{ fontSize: "12px" }}
                        >
                          <span>Live Demo</span>
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Project Detail Modal */}
      <Modal show={!!selectedProject} onHide={() => setSelectedProject(null)} centered size="lg">
        {selectedProject && (
          <>
            <Modal.Header closeButton className="border-0">
              <div className="d-flex align-items-center gap-2">
                <Badge bg="primary-subtle" text="primary" className="rounded-pill px-3 py-2">
                  {selectedProject.category}
                </Badge>
                <span className="small text-muted">• Krsh.Innovations Client Delivery</span>
              </div>
            </Modal.Header>
            <Modal.Body className="py-2">
              <img
                src={selectedProject.image_url}
                alt={selectedProject.title}
                className="w-100 rounded-4 mb-4 shadow-sm"
                style={{ maxHeight: "360px", objectFit: "cover" }}
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80";
                }}
              />
              <h4 className="fw-bold text-dark mb-2">{selectedProject.title}</h4>
              <p className="text-secondary" style={{ lineHeight: 1.7, fontSize: "1.02rem" }}>
                {selectedProject.description}
              </p>

              <div className="p-3 bg-light rounded-3 border mb-3">
                <h6 className="fw-bold text-dark mb-1">Architecture & Tech Stack:</h6>
                <p className="text-primary fw-semibold small mb-0">{selectedProject.tech_stack}</p>
              </div>

              <div className="row g-2 mb-3">
                <div className="col-sm-4">
                  <div className="p-2 border rounded-2 text-center bg-light">
                    <div className="fw-bold text-dark small">100% Quality</div>
                    <div className="text-muted" style={{ fontSize: "11px" }}>Strict Code Review</div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="p-2 border rounded-2 text-center bg-light">
                    <div className="fw-bold text-dark small">Scale-Ready</div>
                    <div className="text-muted" style={{ fontSize: "11px" }}>Optimized MySQL</div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="p-2 border rounded-2 text-center bg-light">
                    <div className="fw-bold text-dark small">On-Time</div>
                    <div className="text-muted" style={{ fontSize: "11px" }}>Delivered in Sprint</div>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="border-0 gap-2">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="btn-krsh-secondary"
                style={{ minWidth: "110px", height: "42px", fontSize: "0.88rem" }}
              >
                Close
              </button>
              {selectedProject.project_url && (
                <a
                  href={selectedProject.project_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-krsh-primary"
                  style={{ minWidth: "150px", height: "42px", fontSize: "0.88rem" }}
                >
                  Visit Live Demo
                </a>
              )}
            </Modal.Footer>
          </>
        )}
      </Modal>
    </section>
  );
};

export default PortfolioGallery;
