import React, { useState } from "react";
import { Container, Row, Col, Nav, Tab, Card, Badge } from "react-bootstrap";
import {
  Code,
  Layers,
  Database,
  Smartphone,
  Cpu,
  CheckCircle2,
  ExternalLink,
  Zap
} from "lucide-react";

const TechStackSection = () => {
  const [activeTab, setActiveTab] = useState("frontend");

  const techCategories = {
    frontend: {
      title: "Frontend & 3D Visuals",
      icon: <Layers size={18} />,
      description: "Fast, accessible, and reactive user interfaces built with React 18, Bootstrap 5, and WebGL Three.js.",
      items: [
        {
          name: "React.js 18",
          role: "Dynamic UI & Component Architecture",
          version: "v18.x Concurrent",
          badge: "Core Frontend",
          points: ["Concurrent rendering & Suspense", "Custom hooks & Clean state management", "Fast Vite build pipeline"]
        },
        {
          name: "Three.js & 3D WebGL",
          role: "Interactive 3D Graphics & Animations",
          version: "WebGL 2.0",
          badge: "Immersive 3D",
          points: ["Hardware-accelerated 3D viewports", "Mouse interactive geometry & shaders", "Lightweight particle effects"]
        },
        {
          name: "React-Bootstrap & CSS3",
          role: "Enterprise-Ready Responsive Styling",
          version: "Bootstrap 5.3",
          badge: "Mobile Responsive",
          points: ["100% Mobile & tablet responsive", "Accessible UI components", "Clean modern aesthetics"]
        }
      ]
    },
    backend: {
      title: "Backend & Server APIs",
      icon: <Code size={18} />,
      description: "High-concurrency, scalable microservices and RESTful APIs powered by Node.js, Express, PHP/Laravel, and Python.",
      items: [
        {
          name: "Node.js & Express",
          role: "High-Throughput Event-Driven Server",
          version: "Node v20+ LTS",
          badge: "Core Backend",
          points: ["Non-blocking asynchronous I/O", "REST & WebSocket real-time feeds", "JWT & OAuth2 token security"]
        },
        {
          name: "PHP & Laravel",
          role: "Robust Enterprise Backend & MVC",
          version: "PHP 8.2 / Laravel 11",
          badge: "Enterprise Web",
          points: ["Eloquent ORM & migrations", "Artisan CLI & queued jobs", "Rock-solid authentication & security"]
        },
        {
          name: "Python",
          role: "Data Pipelines, Automation & AI",
          version: "Python 3.11+",
          badge: "Intelligent Systems",
          points: ["FastAPI microservices", "Automated data web scrapers", "AI & Machine Learning integrations"]
        }
      ]
    },
    database: {
      title: "Databases & Storage",
      icon: <Database size={18} />,
      description: "Mission-critical relational schemas and flexible NoSQL document storage designed for high speed and data reliability.",
      items: [
        {
          name: "MySQL",
          role: "ACID Relational Database",
          version: "MySQL 8.0+",
          badge: "Relational DB",
          points: ["Indexed queries & connection pooling", "Strict foreign keys & transactions", "Automated schema migrations"]
        },
        {
          name: "MongoDB",
          role: "NoSQL Flexible Document Store",
          version: "v7.0+",
          badge: "NoSQL DB",
          points: ["Dynamic JSON-like schemas", "High-write scalability & sharding", "Rich aggregation pipelines"]
        }
      ]
    },
    mobile: {
      title: "Cross-Platform Mobile",
      icon: <Smartphone size={18} />,
      description: "Single codebase, dual platform delivery for iOS and Android with Google Flutter.",
      items: [
        {
          name: "Flutter",
          role: "Cross-Platform Mobile App SDK",
          version: "Flutter 3.x",
          badge: "iOS & Android",
          points: ["Native 60/120 FPS rendering engine", "Shared UI logic across iOS and Android", "Native device camera, GPS, & Bluetooth APIs"]
        }
      ]
    }
  };

  return (
    <section id="tech-stack" className="py-5 bg-light border-top border-bottom">
      <Container>
        <div className="section-title-wrap">
          <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-2 fw-semibold mb-2">
            Engineered with Precision
          </span>
          <h2 className="section-title">Our Technical Ecosystem</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            Krsh.Innovations builds on battle-tested, modern engineering stacks designed for speed,
            security, and infinite horizontal scalability.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="d-flex justify-content-center mb-4">
          <Nav
            variant="pills"
            className="p-1 bg-white rounded-pill border shadow-sm flex-wrap justify-content-center"
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
          >
            <Nav.Item>
              <Nav.Link eventKey="frontend" className="rounded-pill px-4 py-2 d-flex align-items-center gap-2">
                <Layers size={16} />
                <span>Frontend & 3D</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="backend" className="rounded-pill px-4 py-2 d-flex align-items-center gap-2">
                <Code size={16} />
                <span>Backend & APIs</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="database" className="rounded-pill px-4 py-2 d-flex align-items-center gap-2">
                <Database size={16} />
                <span>Databases</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="mobile" className="rounded-pill px-4 py-2 d-flex align-items-center gap-2">
                <Smartphone size={16} />
                <span>Mobile (Flutter)</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        {/* Tab Content Display */}
        <div className="mt-4">
          <Row className="g-4">
            {techCategories[activeTab].items.map((tech, idx) => (
              <Col key={idx} xs={12} md={activeTab === 'mobile' ? 12 : activeTab === 'database' ? 6 : 4}>
                <Card className="border-0 shadow-sm rounded-4 h-100 p-4 transition-all">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h4 className="fw-bold mb-1 fs-5 text-dark">{tech.name}</h4>
                      <div className="small text-muted">{tech.role}</div>
                    </div>
                    <Badge bg="primary-subtle" text="primary" className="rounded-pill px-3 py-2 border">
                      {tech.badge}
                    </Badge>
                  </div>

                  <hr className="my-3 text-muted opacity-25" />

                  <div className="mb-3">
                    {tech.points.map((point, pIdx) => (
                      <div key={pIdx} className="d-flex align-items-center gap-2 mb-2">
                        <Zap size={15} className="text-warning flex-shrink-0" />
                        <span className="small text-secondary">{point}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-2 border-top text-end">
                    <span className="small text-muted fw-semibold">{tech.version}</span>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default TechStackSection;
