import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Rocket, Zap, Layers, ShieldCheck } from "lucide-react";

const StatsSection = () => {
  const [stats, setStats] = useState([
    {
      label: "Built To Your Vision",
      value: "100% Custom",
      sub: "Bespoke architecture engineered for your exact requirements",
      icon: <Rocket size={26} className="text-primary" />
    },
    {
      label: "Fast-Track Delivery",
      value: "Rapid MVP",
      sub: "From concept wireframes to live deployment in record weeks",
      icon: <Zap size={26} className="text-info" />
    },
    {
      label: "Modern Tech Stacks",
      value: "Battle-Tested",
      sub: "React 18, Flutter, Node.js, Laravel, MySQL & Python AI",
      icon: <Layers size={26} className="text-primary" />
    },
    {
      label: "100% Code Ownership",
      value: "Full Handover",
      sub: "Complete IP handover, direct founder access & zero lock-in",
      icon: <ShieldCheck size={26} className="text-success" />
    }
  ]);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data && data.data.length > 0) {
          const mapped = data.data.map((item, idx) => ({
            label: item.label,
            value: item.value,
            sub: item.description,
            icon:
              idx === 0 ? (
                <Rocket size={26} className="text-primary" />
              ) : idx === 1 ? (
                <Zap size={26} className="text-info" />
              ) : idx === 2 ? (
                <Layers size={26} className="text-primary" />
              ) : (
                <ShieldCheck size={26} className="text-success" />
              )
          }));
          setStats(mapped);
        }
      })
      .catch((err) => console.log("Using static stats fallback"));
  }, []);

  return (
    <section className="stats-banner py-5">
      <Container>
        {/* Startup Vision Header */}
        <div className="text-center mb-5">
          <div className="d-block mb-3">
            <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-2 fw-semibold section-tag-badge">
              Agile IT & Startup Studio
            </span>
          </div>
          <h2 className="display-6 fw-bold mb-3 text-dark">
            We Are Ready To Build{" "}
            <span
              style={{
                background: "var(--krsh-gradient-blue)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              What You Want
            </span>
          </h2>
          <p className="text-muted mx-auto" style={{ maxWidth: "680px", fontSize: "1.05rem", lineHeight: "1.65" }}>
            As an agile IT & startup studio, Krsh.Innovations partners directly with ambitious founders and
            growing companies to turn bold digital concepts into high-performance, scale-ready software.
          </p>
        </div>

        <Row className="g-4">
          {stats.map((stat, index) => (
            <Col key={index} xs={12} sm={6} lg={3}>
              <div className="stat-card h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="stat-icon-wrapper">{stat.icon}</div>
                  <div className="stat-number fs-3 fw-bold">{stat.value}</div>
                  <div className="stat-label fw-semibold text-dark">{stat.label}</div>
                </div>
                {stat.sub && (
                  <div className="small text-muted mt-3 border-top pt-2" style={{ fontSize: "0.82rem", lineHeight: "1.5" }}>
                    {stat.sub}
                  </div>
                )}
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default StatsSection;
