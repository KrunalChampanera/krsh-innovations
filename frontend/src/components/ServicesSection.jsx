import React, { useState } from "react";
import { Container, Row, Col, Modal, Button, Badge } from "react-bootstrap";
import {
  Code,
  ShoppingCart,
  Server,
  Terminal,
  Smartphone,
  Compass,
  ArrowRight,
  CheckCircle,
  CheckCircle2,
  Sparkles
} from "lucide-react";

const ServicesSection = ({ onSelectServiceForQuote }) => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: "wordpress-dev",
      title: "WordPress Development",
      icon: <Code size={26} />,
      circleColor: "#0d9488", // Teal circle (Screenshot 2 Card 1)
      circleBg: "#ccfbf1",
      description:
        "We are the team of IT skilled experts who provide you any type of WordPress and modern web development services.",
      details:
        "Full-fledged solutions powered by React 18, headless WordPress, PHP, and modern frontend architectures for blazing speed and security.",
      tags: ["WordPress", "React.js 18", "PHP", "Headless CMS"],
      capabilities: [
        "Custom Theme & Plugin Engineering",
        "Headless WordPress with React 18 frontend",
        "High-performance speed optimization & caching",
        "WooCommerce and API integrations"
      ]
    },
    {
      id: "ecommerce-dev",
      title: "E-Commerce Development",
      icon: <ShoppingCart size={26} />,
      circleColor: "#e11d48", // Salmon / coral pink (Screenshot 2 Card 2)
      circleBg: "#ffe4e6",
      description:
        "We are here to build any kind of e-commerce website for your better business growth with seamless payment flows.",
      details:
        "Custom carts, multi-vendor marketplaces, Stripe/PayPal checkouts, inventory synchronization, and high-conversion purchase funnels.",
      tags: ["E-Commerce", "Node.js", "Express", "Stripe", "MySQL"],
      capabilities: [
        "Multi-currency secure payment gateways",
        "Real-time inventory and order tracking",
        "Merchant portal and admin analytics",
        "High-converting checkout funnels"
      ]
    },
    {
      id: "php-dev",
      title: "PHP Development",
      icon: <Server size={26} />,
      circleColor: "#2563eb", // Sky blue (Screenshot 2 Card 3)
      circleBg: "#dbeafe",
      description:
        "We provide all kind of desktop web PHP development services and open source customized development.",
      details:
        "Enterprise-grade PHP and Laravel applications built with clean MVC architectures, automated queued workers, and relational MySQL database models.",
      tags: ["PHP 8+", "Laravel", "MySQL", "Composer", "REST APIs"],
      capabilities: [
        "Clean MVC architecture & Eloquent ORM",
        "Asynchronous queued jobs & mailers",
        "Legacy PHP migration & refactoring",
        "High-security CSRF, XSS, and SQLi protection"
      ]
    },
    {
      id: "javascript-dev",
      title: "JavaScript Development",
      icon: <Terminal size={26} />,
      circleColor: "#d97706", // Warm amber / orange (Screenshot 2 Card 4)
      circleBg: "#fef3c7",
      description:
        "We provide all kind of services for next generation frontend and backend JavaScript development.",
      details:
        "High-concurrency React 18 frontends, Node.js and Express RESTful microservices, WebSockets, and real-time state synchronization.",
      tags: ["React 18", "Node.js", "Express", "Vite", "WebSockets"],
      capabilities: [
        "Concurrent React 18 & Three.js 3D graphics",
        "Node.js & Express high-speed REST APIs",
        "JWT Authentication and security guardrails",
        "Sub-millisecond data caching & pooling"
      ]
    },
    {
      id: "website-maintenance",
      title: "Website Maintanance",
      icon: <Smartphone size={26} />,
      circleColor: "#9333ea", // Purple (Screenshot 2 Card 5)
      circleBg: "#f3e8ff",
      description:
        "We provide you a hasslefree maintananace service option for your website and smooth Flutter mobile applications.",
      details:
        "Comprehensive 24/7 uptime monitoring, critical security patching, performance audits, cloud backup routines, and Flutter mobile apps.",
      tags: ["Flutter", "Dart", "24/7 Support", "DevOps", "Maintenance"],
      capabilities: [
        "24/7 uptime server monitoring & quick hotfixes",
        "Cross-platform Flutter mobile applications",
        "Automated database backups & SSL renewals",
        "Cloud scaling and performance tuning"
      ]
    },
    {
      id: "web-consultancy",
      title: "Web Consultancy",
      icon: <Compass size={26} />,
      circleColor: "#1e1b4b", // Dark navy (Screenshot 2 Card 6)
      circleBg: "#e0e7ff",
      description:
        "As a web consultancy we provide all kinds of custom services and guidance to assist our clients.",
      details:
        "Architectural consulting, technology stack evaluations, Python microservices, AI/ML integrations, and fractional CTO roadmaps.",
      tags: ["Python", "FastAPI", "Cloud Architecture", "Consultancy"],
      capabilities: [
        "Fractional CTO & Startup Architecture roadmaps",
        "MySQL & MongoDB schema optimizations",
        "Python automated data scrapers & ML models",
        "Infrastructure containerization with Docker"
      ]
    }
  ];

  const handleOpenModal = (service) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  const handleQuoteClick = (service) => {
    handleCloseModal();
    if (onSelectServiceForQuote) {
      onSelectServiceForQuote(service.title);
    }
  };

  return (
    <section id="services" className="py-5 my-4 position-relative">
      {/* Playful background geometry matching Screenshot 2 */}
      <div
        style={{
          position: "absolute",
          top: "15px",
          left: "52%",
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          border: "2px solid #f43f5e",
          opacity: 0.5,
          pointerEvents: "none"
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "80px",
          left: "15%",
          fontSize: "20px",
          color: "#06b6d4",
          fontWeight: "bold",
          opacity: 0.4,
          pointerEvents: "none"
        }}
      >
        +
      </div>

      <Container>
        {/* Title matching Screenshot 2 & 3 */}
        <div className="section-title-wrap">
          <h2 className="section-title">Services</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            Krsh.Innovations provides best customer focused services and build your ideas into reality.
            Our masterliness in desktop, full-stack web, mobile, and open source customized development.
          </p>
        </div>

        {/* 6 Cards Grid (3x2) with hover effect */}
        <Row className="g-4">
          {services.map((service, index) => (
            <Col key={index} xs={12} md={6} lg={4}>
              <div className="service-card text-center">
                <div>
                  <div
                    className="service-icon-box"
                    style={{
                      background: service.circleBg,
                      color: service.circleColor
                    }}
                  >
                    {service.icon}
                  </div>

                  <h4 className="fw-bold mb-3 fs-5 text-dark">{service.title}</h4>

                  <p className="text-secondary small mb-3" style={{ lineHeight: 1.65 }}>
                    {service.description}
                  </p>
                </div>

                <div>
                  <button
                    className="btn-readmore mx-auto"
                    onClick={() => handleOpenModal(service)}
                  >
                    <span>Read More</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Service Detail Modal */}
      <Modal
        show={!!selectedService}
        onHide={handleCloseModal}
        centered
        size="lg"
        contentClassName="border-0 shadow-lg rounded-4 overflow-hidden"
      >
        {selectedService && (
          <>
            {/* Top Accent Gradient Line */}
            <div style={{ height: "4px", background: "linear-gradient(90deg, #00a2ea 0%, #2563eb 100%)" }} />

            <Modal.Header closeButton className="border-0 px-4 pt-4 pb-2">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="rounded-3 d-flex align-items-center justify-content-center shadow-sm flex-shrink-0"
                  style={{
                    width: "52px",
                    height: "52px",
                    background: selectedService.circleBg,
                    color: selectedService.circleColor
                  }}
                >
                  {selectedService.icon}
                </div>
                <div>
                  <Modal.Title className="fw-bold fs-4 text-dark mb-1">
                    {selectedService.title}
                  </Modal.Title>
                  <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1 small fw-semibold">
                    Krsh.Innovations IT Services
                  </span>
                </div>
              </div>
            </Modal.Header>

            <Modal.Body className="px-4 py-3">
              {/* Overview Box */}
              <div className="p-3 rounded-3 bg-light border mb-4">
                <p className="text-secondary mb-0" style={{ fontSize: "1.02rem", lineHeight: 1.7 }}>
                  {selectedService.details}
                </p>
              </div>

              {/* Key Technical Capabilities with Micro-Cards */}
              <div className="mb-4">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <span className="fw-bold text-dark fs-6">Key Technical Capabilities</span>
                  <span className="text-muted small">({selectedService.capabilities.length} focus areas)</span>
                </div>
                <Row className="g-3">
                  {selectedService.capabilities.map((cap, idx) => (
                    <Col sm={6} key={idx}>
                      <div
                        className="h-100 p-3 rounded-3 bg-white border border-light-subtle shadow-sm d-flex align-items-start gap-3"
                        style={{ transition: "all 0.2s ease" }}
                      >
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 mt-1"
                          style={{
                            width: "22px",
                            height: "22px",
                            background: "rgba(0, 162, 234, 0.12)",
                            color: "#00a2ea"
                          }}
                        >
                          <CheckCircle2 size={15} />
                        </div>
                        <span className="small text-dark fw-medium" style={{ lineHeight: 1.5 }}>
                          {cap}
                        </span>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>

              {/* Technologies Utilized */}
              <div>
                <span className="fw-bold text-dark fs-6 d-block mb-2">Technologies Utilized:</span>
                <div className="d-flex flex-wrap gap-2">
                  {selectedService.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="badge bg-white text-dark border border-primary-subtle px-3 py-2 rounded-pill shadow-sm small fw-semibold d-inline-flex align-items-center gap-1"
                      style={{ fontSize: "0.82rem" }}
                    >
                      <span style={{ color: "#00a2ea" }}>•</span> {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer className="border-top bg-light bg-opacity-50 px-4 py-3 d-flex flex-wrap justify-content-end align-items-center gap-3">
              <button
                type="button"
                onClick={handleCloseModal}
                className="btn-krsh-secondary"
              >
                <span>Close</span>
              </button>
              <button
                type="button"
                className="btn-krsh-primary"
                onClick={() => handleQuoteClick(selectedService)}
              >
                <span>Request Quote for This Service</span>
                <ArrowRight size={16} />
              </button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </section>
  );
};

export default ServicesSection;
