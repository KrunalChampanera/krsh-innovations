import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CheckSquare, Smile, Target, Award } from "lucide-react";

const StatsSection = () => {
  const [stats, setStats] = useState([
    {
      label: "Completed Project",
      value: "4000+",
      sub: "Robust code & deployments",
      icon: <CheckSquare size={26} className="text-primary" />
    },
    {
      label: "Happy Clients",
      value: "600+",
      sub: "Global founders & brands",
      icon: <Smile size={26} className="text-info" />
    },
    {
      label: "Multi Services",
      value: "500+",
      sub: "Web, Mobile, DB, Cloud",
      icon: <Target size={26} className="text-primary" />
    },
    {
      label: "Retention Ratio",
      value: "95%",
      sub: "Trusted long-term partner",
      icon: <Award size={26} className="text-warning" />
    }
  ]);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data && data.data.length > 0) {
          // Map backend stats with icons
          const mapped = data.data.map((item, idx) => ({
            label: item.label,
            value: item.value,
            sub: item.description,
            icon:
              idx === 0 ? (
                <CheckSquare size={26} className="text-primary" />
              ) : idx === 1 ? (
                <Smile size={26} className="text-info" />
              ) : idx === 2 ? (
                <Target size={26} className="text-primary" />
              ) : (
                <Award size={26} className="text-warning" />
              )
          }));
          setStats(mapped);
        }
      })
      .catch((err) => console.log("Using static stats fallback"));
  }, []);

  return (
    <section className="stats-banner">
      <Container>
        {/* Title directly matching screenshot 5 */}
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold mb-2">
            We Have Completed 4000+ Projects{" "}
            <span
              style={{
                background: "var(--krsh-gradient-blue)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Successfully
            </span>
          </h2>
          <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
            From high-growth tech startups to global enterprise platforms, Krsh.Innovations delivers
            speed, scale, and clean architecture every time.
          </p>
        </div>

        <Row className="g-4">
          {stats.map((stat, index) => (
            <Col key={index} xs={12} sm={6} lg={3}>
              <div className="stat-card">
                <div className="stat-icon-wrapper">{stat.icon}</div>
                <div className="stat-number">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                {stat.sub && (
                  <div className="small text-muted mt-2 border-top pt-2">
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
