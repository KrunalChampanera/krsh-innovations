import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Badge, Button, Modal } from "react-bootstrap";
import { ExternalLink, Layers, Sparkles, PlusCircle } from "lucide-react";

const PortfolioGallery = ({ onOpenAdmin, refreshTrigger }) => {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);

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

  return (
    <section id="portfolio" className="py-5 bg-white position-relative">
      <Container>
        {/* Title matching agency style */}
        <div className="section-title-wrap">
          <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-2 fw-semibold mb-2">
            Recent Client Milestones
          </span>
          <h2 className="section-title">Case Studies & Project Gallery</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            Explore recent digital systems, mobile apps, and scalable web solutions architected and
            delivered by Krsh.Innovations.
          </p>
        </div>

        {/* Category Filters + Admin Trigger */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <div className="d-flex flex-wrap gap-2">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold transition-all ${
                  activeCategory === cat
                    ? "btn-primary shadow-sm"
                    : "btn-outline-secondary border-light-subtle bg-light text-secondary"
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <Button
            variant="outline-primary"
            size="sm"
            className="rounded-pill px-3 py-2 d-flex align-items-center gap-2 fw-semibold shadow-sm"
            onClick={onOpenAdmin}
          >
            <PlusCircle size={16} />
            <span>Manage Gallery (Admin)</span>
          </Button>
        </div>

        {/* Projects Grid */}
        <Row className="g-4">
          {filteredProjects.map((project) => (
            <Col key={project.id} xs={12} md={6} lg={4}>
              <Card
                className="border rounded-4 overflow-hidden h-100 shadow-sm transition-all hover-lift"
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedProject(project)}
              >
                <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-100 h-100"
                    style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div
                    className="position-absolute top-0 end-0 m-3 badge bg-dark bg-opacity-75 text-white px-3 py-1 rounded-pill"
                    style={{ backdropFilter: "blur(4px)" }}
                  >
                    {project.category}
                  </div>
                </div>

                <Card.Body className="p-4 d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="fw-bold text-dark mb-2">{project.title}</h5>
                    <p className="small text-secondary mb-3" style={{ lineHeight: 1.6 }}>
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <div className="small text-muted mb-2">
                      <strong>Tech:</strong> {project.tech_stack}
                    </div>
                    <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                      <span className="small text-primary fw-semibold d-flex align-items-center gap-1">
                        <span>View Details</span>
                        <ExternalLink size={14} />
                      </span>
                      <span className="badge bg-light text-muted border small">
                        #{project.id}
                      </span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Project Detail Modal */}
      <Modal show={!!selectedProject} onHide={() => setSelectedProject(null)} centered size="lg">
        {selectedProject && (
          <>
            <Modal.Header closeButton className="border-0">
              <Modal.Title className="fw-bold fs-4">{selectedProject.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-2">
              <img
                src={selectedProject.image_url}
                alt={selectedProject.title}
                className="w-100 rounded-4 mb-4 shadow-sm"
                style={{ maxHeight: "350px", objectFit: "cover" }}
              />
              <div className="d-flex align-items-center gap-2 mb-3">
                <Badge bg="primary-subtle" text="primary" className="rounded-pill px-3 py-2">
                  {selectedProject.category}
                </Badge>
                <span className="small text-muted">Krsh.Innovations Client Delivery</span>
              </div>
              <p className="text-secondary" style={{ lineHeight: 1.7, fontSize: "1.05rem" }}>
                {selectedProject.description}
              </p>
              <div className="p-3 bg-light rounded-3 border mb-3">
                <h6 className="fw-bold text-dark mb-1">Architecture & Tech Stack:</h6>
                <p className="text-primary fw-semibold small mb-0">{selectedProject.tech_stack}</p>
              </div>
            </Modal.Body>
            <Modal.Footer className="border-0">
              <Button variant="outline-secondary" onClick={() => setSelectedProject(null)} className="rounded-pill px-4">
                Close
              </Button>
              {selectedProject.project_url && (
                <Button
                  variant="primary"
                  href={selectedProject.project_url}
                  target="_blank"
                  className="rounded-pill px-4 fw-semibold border-0"
                  style={{ background: "var(--krsh-gradient-blue)" }}
                >
                  Visit Live Demo
                </Button>
              )}
            </Modal.Footer>
          </>
        )}
      </Modal>
    </section>
  );
};

export default PortfolioGallery;
