import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Users, Clock, Award, Headphones, ShieldCheck, Sparkles } from "lucide-react";

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-5 my-5 position-relative">
      <Container>
        {/* Title matching screenshot 4 */}
        <div className="section-title-wrap">
          <h2 className="section-title">Why Choose Us</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            Because "we're converting great ideas into great apps by great people." We provide you
            truly leading IT solutions for your better business growth.
          </p>
        </div>

        <Row className="align-items-center gy-4 gy-lg-5">
          {/* Left Column: Client First & Strong Expertise */}
          <Col lg={4} md={12} className="mb-4 mb-lg-0">
            {/* Feature 1 */}
            <div className="feature-item">
              <div className="feature-icon-circle">
                <Users size={24} />
              </div>
              <div>
                <h4 className="feature-title">Client First</h4>
                <p className="feature-desc">
                  For any business, clients are always at the core. We always start with your ideas
                  and we think from the perspective of your end users, providing solutions that solve
                  key issues to help your business flourish.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="feature-item mb-0">
              <div className="feature-icon-circle">
                <Award size={24} />
              </div>
              <div>
                <h4 className="feature-title">Strong Expertise</h4>
                <p className="feature-desc">
                  With our deep full-stack mastery across React, Node, Express, PHP/Laravel, Python,
                  and Flutter, you can expect higher quality with greater efficiency in less time.
                  Because we believe in "Quality Works not in Quantity."
                </p>
              </div>
            </div>
          </Col>

          {/* Center Column: 3D App / Device Mockup */}
          <Col lg={4} md={12} className="d-flex justify-content-center position-relative my-5 my-lg-0 py-3">
            {/* Glowing background halo */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "320px",
                height: "320px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, rgba(99, 102, 241, 0.1) 60%, rgba(255,255,255,0) 80%)",
                zIndex: 0
              }}
            />

            <div className="phone-mockup-frame position-relative" style={{ zIndex: 1 }}>
              <div className="phone-mockup-screen">
                <div className="phone-notch"></div>

                {/* Simulated Header */}
                <div className="d-flex align-items-center justify-content-between pb-2 mb-3 border-bottom">
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src="/logo-horizontal.png"
                      alt="Krsh Innovations"
                      style={{ height: "20px", width: "auto", objectFit: "contain" }}
                    />
                    <div className="text-success small ms-1" style={{ fontSize: "9px" }}>● Active Engineering</div>
                  </div>
                  <Sparkles size={14} className="text-primary" />
                </div>

                {/* Simulated Chat Messages */}
                <div className="chat-bubble left">
                  Hi team! We need a full-stack web and mobile application with React 18, Node.js, and MySQL.
                </div>

                <div className="chat-bubble right">
                  Hello! We can build your complete platform with clean architecture, responsive UI, and Flutter apps.
                </div>

                <div className="chat-bubble left">
                  Can you guarantee on-time delivery with ongoing support?
                </div>

                <div className="chat-bubble right">
                  Absolutely! 100% on-time milestone delivery and 24/7 post-deployment care.
                </div>

                {/* Progress bar inside mockup */}
                <div className="mt-auto pt-2 border-top">
                  <div className="d-flex justify-content-between small text-muted mb-1" style={{ fontSize: "10px" }}>
                    <span>Sprint Milestone</span>
                    <span className="fw-bold text-primary">100% Completed</span>
                  </div>
                  <div className="progress" style={{ height: "6px" }}>
                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: "100%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          {/* Right Column: On time Delivery & Post Development Support */}
          <Col lg={4} md={12} className="mt-4 mt-lg-0">
            {/* Feature 3 */}
            <div className="feature-item">
              <div className="feature-icon-circle">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="feature-title">On time Delivery</h4>
                <p className="feature-desc">
                  "We do not over promise, we over-deliver our promise." Because We respect your
                  time and hence, you can always count on us for seamless project execution, clear
                  milestone check-ins, and punctual delivery.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="feature-item mb-0">
              <div className="feature-icon-circle">
                <Headphones size={24} />
              </div>
              <div>
                <h4 className="feature-title">Post Development Support</h4>
                <p className="feature-desc">
                  We are not here to just build a robust solution for you, but also work with you in
                  maintaining it post-deployment. We provide continuous monitoring, bug fixes,
                  security patching, and cloud scaling.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
