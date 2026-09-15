import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { Mail, Phone, MapPin, Send, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Full-Stack Web Development",
    budget: "$5,000 - $10,000",
    message: ""
  });

  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
        setStatus({
          loading: false,
          success: data.message || "Your inquiry has been submitted successfully to Krsh.Innovations!",
          error: null
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "Full-Stack Web Development",
          budget: "$5,000 - $10,000",
          message: ""
        });
      } else {
        setStatus({
          loading: false,
          success: null,
          error: data.error || "Failed to submit inquiry. Please try again."
        });
      }
    } catch (err) {
      setStatus({
        loading: false,
        success: null,
        error: "Server connectivity error. You can directly reach us at Krsh.Innovations@gmail.com"
      });
    }
  };

  return (
    <section id="contact" className="py-5 my-4 bg-light border-top">
      <Container>
        <div className="section-title-wrap">
          <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-2 fw-semibold mb-2">
            Let's Talk Code & Scale
          </span>
          <h2 className="section-title">Start Your Project with Us</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            Whether you are an ambitious startup founder with a breakthrough idea or an enterprise
            seeking dedicated full-stack engineers, Krsh.Innovations is ready to execute.
          </p>
        </div>

        <Row className="gy-4">
          {/* Left Column: Direct Contact Info & Value Cards */}
          <Col lg={5}>
            <Card className="border-0 rounded-4 shadow-sm p-4 h-100 bg-white">
              <h3 className="fw-bold mb-3 text-dark">Krsh.Innovations</h3>
              <p className="text-muted mb-4">
                We design, code, and deploy high-performance applications with React 18, Node.js,
                PHP/Laravel, Python, Flutter, and MySQL.
              </p>

              <div className="d-flex align-items-center gap-3 mb-4 p-3 rounded-3 bg-light border">
                <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center p-3">
                  <Mail size={22} />
                </div>
                <div>
                  <div className="small text-muted fw-semibold">Official Inquiry Email</div>
                  <a
                    href="mailto:Krsh.Innovations@gmail.com"
                    className="fw-bold text-primary text-decoration-none"
                    style={{ fontSize: "1.05rem" }}
                  >
                    Krsh.Innovations@gmail.com
                  </a>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3 mb-4 p-3 rounded-3 bg-light border">
                <div className="rounded-circle bg-info text-white d-flex align-items-center justify-content-center p-3">
                  <MapPin size={22} />
                </div>
                <div>
                  <div className="small text-muted fw-semibold">Operating Model</div>
                  <div className="fw-bold text-dark">Global Remote & Enterprise Delivery</div>
                </div>
              </div>

              <div className="mt-auto pt-4 border-top">
                <h6 className="fw-bold text-dark mb-3">Our Client Guarantees:</h6>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <Clock size={18} className="text-primary flex-shrink-0" />
                  <span className="small text-secondary">Guaranteed 24-hour turnaround response</span>
                </div>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <ShieldCheck size={18} className="text-success flex-shrink-0" />
                  <span className="small text-secondary">Strict Mutual Non-Disclosure Agreement (NDA)</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <CheckCircle2 size={18} className="text-info flex-shrink-0" />
                  <span className="small text-secondary">Complete Source Code & Intellectual Property Ownership</span>
                </div>
              </div>
            </Card>
          </Col>

          {/* Right Column: Interactive Form */}
          <Col lg={7}>
            <Card className="border-0 rounded-4 shadow-sm p-4 p-md-5 bg-white">
              <h4 className="fw-bold text-dark mb-1">Send a Message</h4>
              <p className="small text-muted mb-4">
                Fill in your project scope below, and our team will get in touch.
              </p>

              {status.success && (
                <Alert variant="success" className="d-flex align-items-center gap-2 mb-4">
                  <CheckCircle2 size={20} />
                  <span>{status.success}</span>
                </Alert>
              )}

              {status.error && (
                <Alert variant="danger" className="mb-4">
                  {status.error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="small fw-bold text-secondary">Full Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Alex Mercer"
                        value={formData.name}
                        onChange={handleChange}
                        className="py-2 px-3 rounded-3"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="small fw-bold text-secondary">Email Address *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        required
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="py-2 px-3 rounded-3"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="small fw-bold text-secondary">Phone / WhatsApp (Optional)</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={handleChange}
                        className="py-2 px-3 rounded-3"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="small fw-bold text-secondary">Service Needed</Form.Label>
                      <Form.Select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="py-2 px-3 rounded-3"
                      >
                        <option value="Full-Stack Web (React + Node + Express)">
                          Full-Stack Web (React + Node + Express)
                        </option>
                        <option value="Mobile App (Flutter iOS & Android)">
                          Mobile App (Flutter iOS & Android)
                        </option>
                        <option value="Enterprise PHP & Laravel + MySQL">
                          Enterprise PHP & Laravel + MySQL
                        </option>
                        <option value="Python Microservices & Automation">
                          Python Microservices & Automation
                        </option>
                        <option value="Database Architecture (MySQL/MongoDB)">
                          Database Architecture (MySQL/MongoDB)
                        </option>
                        <option value="General IT Consultancy & Startup MVP">
                          General IT Consultancy & Startup MVP
                        </option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group>
                      <Form.Label className="small fw-bold text-secondary">Estimated Budget Range</Form.Label>
                      <Form.Select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="py-2 px-3 rounded-3"
                      >
                        <option value="$2,000 - $5,000">$2,000 - $5,000 (Small Project / MVP)</option>
                        <option value="$5,000 - $10,000">$5,000 - $10,000 (Standard Application)</option>
                        <option value="$10,000 - $25,000">$10,000 - $25,000 (Complex Full-Stack)</option>
                        <option value="$25,000+">$25,000+ (Enterprise Scale)</option>
                        <option value="Hourly / Dedicated Team">Hourly / Dedicated Team</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group>
                      <Form.Label className="small fw-bold text-secondary">Project Details & Requirements *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="message"
                        required
                        placeholder="Tell us about your project goals, tech stack preference, and target timeline..."
                        value={formData.message}
                        onChange={handleChange}
                        className="py-2 px-3 rounded-3"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12} className="mt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={status.loading}
                      className="w-100 py-3 rounded-pill fw-bold border-0 shadow d-flex align-items-center justify-content-center gap-2"
                      style={{ background: "var(--krsh-gradient-blue)" }}
                    >
                      <Send size={18} />
                      <span>{status.loading ? "Submitting Inquiry..." : "Submit Inquiry to Krsh.Innovations"}</span>
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactSection;
