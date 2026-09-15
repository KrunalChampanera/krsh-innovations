import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, Badge } from "react-bootstrap";
import { Calculator, Send, CheckCircle2, Sparkles, Clock, DollarSign } from "lucide-react";
import confetti from "canvas-confetti";

const ProjectEstimator = ({ preselectedService }) => {
  const [projectType, setProjectType] = useState(preselectedService || "Full-Stack Web App (React 18 + Node.js)");
  const [selectedTech, setSelectedTech] = useState(["React.js 18", "Node.js & Express", "MySQL"]);
  const [selectedFeatures, setSelectedFeatures] = useState(["User Authentication & Security", "Admin Dashboard"]);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const techOptions = [
    "React.js 18",
    "Node.js & Express",
    "PHP & Laravel",
    "Flutter (iOS & Android)",
    "MySQL Relational DB",
    "MongoDB NoSQL",
    "Python Microservices",
    "Three.js 3D Effects"
  ];

  const featureOptions = [
    { name: "User Authentication & Security", cost: 400, weeks: 0.5 },
    { name: "Payment Gateway Integration", cost: 600, weeks: 1 },
    { name: "Admin Management Dashboard", cost: 800, weeks: 1 },
    { name: "3D WebGL / Interactive Animations", cost: 700, weeks: 1 },
    { name: "Real-time Chat & WebSockets", cost: 900, weeks: 1.5 },
    { name: "Multi-Language & SEO Optimization", cost: 500, weeks: 0.5 }
  ];

  const handleTechToggle = (tech) => {
    if (selectedTech.includes(tech)) {
      setSelectedTech(selectedTech.filter((t) => t !== tech));
    } else {
      setSelectedTech([...selectedTech, tech]);
    }
  };

  const handleFeatureToggle = (featName) => {
    if (selectedFeatures.includes(featName)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== featName));
    } else {
      setSelectedFeatures([...selectedFeatures, featName]);
    }
  };

  // Dynamic calculation logic
  const baseCost = projectType.includes("Full Suite")
    ? 4500
    : projectType.includes("Mobile App")
    ? 3000
    : projectType.includes("Enterprise")
    ? 3500
    : 2000;

  const featuresCost = selectedFeatures.reduce((total, feat) => {
    const item = featureOptions.find((f) => f.name === feat);
    return total + (item ? item.cost : 0);
  }, 0);

  const totalCost = baseCost + featuresCost;
  const estimatedPriceRange = `$${totalCost.toLocaleString()} - $${(totalCost + 1500).toLocaleString()}`;

  const baseWeeks = projectType.includes("Full Suite") ? 6 : 3;
  const featureWeeks = selectedFeatures.reduce((total, feat) => {
    const item = featureOptions.find((f) => f.name === feat);
    return total + (item ? item.weeks : 0);
  }, 0);
  const totalWeeks = Math.ceil(baseWeeks + featureWeeks);
  const estimatedTimeline = `${totalWeeks} - ${totalWeeks + 2} Weeks`;

  const handleSubmitQuote = async (e) => {
    e.preventDefault();
    if (!clientName || !clientEmail) {
      setSubmitResult({
        type: "danger",
        message: "Please provide your Name and Email to receive your detailed quote."
      });
      return;
    }

    setSubmitting(true);
    setSubmitResult(null);

    try {
      const payload = {
        name: clientName,
        email: clientEmail,
        projectType,
        techStack: selectedTech,
        features: selectedFeatures,
        estimatedCost: estimatedPriceRange,
        estimatedTimeline,
        notes
      };

      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        setSubmitResult({
          type: "success",
          message: data.message
        });
        setClientName("");
        setClientEmail("");
        setNotes("");
      } else {
        setSubmitResult({
          type: "danger",
          message: data.error || "Failed to submit quote request."
        });
      }
    } catch (err) {
      setSubmitResult({
        type: "danger",
        message: "Network error submitting quote. You can email us directly at Krsh.Innovations@gmail.com"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="estimator" className="py-5 bg-white position-relative">
      <Container>
        <div className="section-title-wrap">
          <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-2 fw-semibold mb-2">
            Transparent Pricing
          </span>
          <h2 className="section-title">Project Cost & Timeline Estimator</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            Configure your dream project specifications to calculate an instant architectural estimate
            and receive a detailed technical roadmap directly from Krsh.Innovations.
          </p>
        </div>

        <Row className="g-4 align-items-stretch">
          {/* Configuration Form */}
          <Col lg={7}>
            <Card className="border rounded-4 p-4 shadow-sm h-100">
              <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
                <Calculator size={20} className="text-primary" />
                <span>1. Select Project Type & Scope</span>
              </h5>

              <Form.Select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="py-3 px-3 rounded-3 border-primary-subtle mb-4"
              >
                <option value="Full-Stack Web App (React 18 + Node.js)">
                  Full-Stack Web App (React 18, Node.js, Express & MySQL)
                </option>
                <option value="Mobile Application (Flutter iOS & Android)">
                  Mobile Application (Flutter Cross-Platform iOS & Android)
                </option>
                <option value="Enterprise Web & Portal (PHP/Laravel + MySQL)">
                  Enterprise Web & Portal (PHP/Laravel, MySQL & APIs)
                </option>
                <option value="Full Suite: Web + Mobile + Cloud (End-to-End)">
                  Full Suite: Web + Mobile + Cloud Architecture (End-to-End)
                </option>
              </Form.Select>

              <h5 className="fw-bold mb-3">2. Choose Preferred Technologies</h5>
              <div className="d-flex flex-wrap gap-2 mb-4">
                {techOptions.map((tech, idx) => {
                  const isSelected = selectedTech.includes(tech);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleTechToggle(tech)}
                      className={`btn btn-sm rounded-pill px-3 py-2 fw-medium transition-all ${
                        isSelected
                          ? "btn-primary shadow-sm"
                          : "btn-outline-secondary"
                      }`}
                    >
                      {isSelected ? "✓ " : "+ "} {tech}
                    </button>
                  );
                })}
              </div>

              <h5 className="fw-bold mb-3">3. Key Modules & Capabilities</h5>
              <Row className="g-2 mb-4">
                {featureOptions.map((feat, idx) => {
                  const isChecked = selectedFeatures.includes(feat.name);
                  return (
                    <Col sm={6} key={idx}>
                      <div
                        onClick={() => handleFeatureToggle(feat.name)}
                        className={`p-3 rounded-3 border cursor-pointer d-flex align-items-center justify-content-between transition-all ${
                          isChecked ? "bg-primary-subtle border-primary text-primary" : "bg-light border-light-subtle"
                        }`}
                        style={{ cursor: "pointer" }}
                      >
                        <span className="small fw-semibold">{feat.name}</span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="form-check-input ms-2"
                        />
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Card>
          </Col>

          {/* Real-time Calculation Card & Submission */}
          <Col lg={5}>
            <Card
              className="border-0 rounded-4 p-4 shadow-lg text-white h-100 d-flex flex-column justify-content-between"
              style={{ background: "linear-gradient(145deg, #0f172a 0%, #1e293b 100%)" }}
            >
              <div>
                <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-secondary">
                  <div className="d-flex align-items-center gap-2">
                    <Sparkles size={20} className="text-info" />
                    <h5 className="fw-bold mb-0 text-white">Live Project Estimate</h5>
                  </div>
                  <Badge bg="info" className="text-dark rounded-pill px-3 py-1">
                    Instant
                  </Badge>
                </div>

                <div className="mb-4">
                  <div className="text-muted small text-uppercase tracking-wider mb-1">
                    Estimated Investment Range
                  </div>
                  <div className="display-6 fw-bold text-info">{estimatedPriceRange}</div>
                  <div className="small text-secondary mt-1">Includes architecture, QA & deployment</div>
                </div>

                <div className="mb-4 pb-3 border-bottom border-secondary">
                  <div className="text-muted small text-uppercase tracking-wider mb-1">
                    Delivery Roadmap
                  </div>
                  <div className="fs-4 fw-bold text-white d-flex align-items-center gap-2">
                    <Clock size={20} className="text-primary" />
                    <span>{estimatedTimeline}</span>
                  </div>
                  <div className="small text-secondary mt-1">Agile sprints with weekly demos</div>
                </div>

                {submitResult && (
                  <Alert variant={submitResult.type} className="py-2 small">
                    {submitResult.message}
                  </Alert>
                )}

                <Form onSubmit={handleSubmitQuote}>
                  <div className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Your Full Name *"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      required
                      className="bg-dark text-white border-secondary rounded-3 py-2"
                    />
                  </div>
                  <div className="mb-3">
                    <Form.Control
                      type="email"
                      placeholder="Your Work Email *"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      required
                      className="bg-dark text-white border-secondary rounded-3 py-2"
                    />
                  </div>
                  <div className="mb-3">
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Additional Project Details (Optional)"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="bg-dark text-white border-secondary rounded-3 py-2"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={submitting}
                    className="w-100 py-3 rounded-pill fw-bold border-0 shadow d-flex align-items-center justify-content-center gap-2"
                    style={{ background: "var(--krsh-gradient-blue)" }}
                  >
                    <Send size={18} />
                    <span>{submitting ? "Submitting to MySQL..." : "Send Estimate to Krsh.Innovations"}</span>
                  </Button>
                </Form>
              </div>

              <div className="small text-center text-secondary mt-4 pt-2 border-top border-secondary">
                Submitted directly to <strong>Krsh.Innovations@gmail.com</strong>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProjectEstimator;
