const express = require("express");
const router = express.Router();
const db = require("../config/db");

const COMPANY_INFO = {
  name: "Krsh.Innovations",
  tagline: "Empowering Startup Founders & Enterprises with Visionary Engineering",
  email: "Krsh.Innovations@gmail.com",
  phone: "+91 98765 43210 / Global Remote",
  founded: "2020",
  headquarters: "India / Global Remote Delivery",
  specialties: [
    "Full-Stack Web Development (React.js, Node.js, Express, PHP, Laravel, Python)",
    "Mobile Applications (Flutter, Cross-Platform iOS & Android)",
    "Database Architecture (MySQL, MongoDB)",
    "Enterprise Solutions & Startup MVPs",
    "3D Interactive Web Experiences & Modern UI/UX"
  ]
};

// Health Check
router.get("/health", (req, res) => {
  const dbStatus = db.getDbStatus();
  res.json({
    status: "online",
    company: COMPANY_INFO.name,
    email: COMPANY_INFO.email,
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// Services List (Aligned with reference UI & company capabilities)
router.get("/services", (req, res) => {
  const services = [
    {
      id: "fullstack-react",
      title: "WordPress & Web Development",
      category: "Web & CMS",
      icon: "Code2",
      badgeColor: "#06b6d4",
      shortDesc: "We are the team of IT skilled experts who provide you any type of WordPress and modern React.js development services.",
      fullDesc: "We design robust, high-performance web systems utilizing React 18, WordPress, Node.js, Express, PHP, and Laravel. From dynamic SPA dashboards to enterprise portals, we ensure 99.9% uptime, responsive design, and SEO-friendly architectures.",
      technologies: ["React.js 18", "WordPress", "Node.js", "Express", "PHP", "Laravel"],
      features: [
        "Custom SPA & WordPress Themes",
        "Secure RESTful & GraphQL APIs",
        "Enterprise Dashboard & CMS",
        "Third-party integrations & Payment Gateways"
      ]
    },
    {
      id: "ecommerce-dev",
      title: "E-Commerce Development",
      category: "E-Commerce & SaaS",
      icon: "ShoppingCart",
      badgeColor: "#f43f5e",
      shortDesc: "We are here to build any kind of e-commerce website for your better business growth with modern payment checkout funnels.",
      fullDesc: "From custom carts to Stripe/Razorpay payments and inventory management, we engineer bulletproof e-commerce platforms ready to process millions in revenue.",
      technologies: ["Node.js", "Express", "Laravel", "Stripe API", "MySQL", "MongoDB"],
      features: [
        "Multi-currency secure payment gateways",
        "Real-time inventory and order tracking",
        "Role-based access control & merchant portals",
        "High-converting checkout funnels"
      ]
    },
    {
      id: "php-laravel",
      title: "PHP & Laravel Development",
      category: "Enterprise Backend",
      icon: "Server",
      badgeColor: "#3b82f6",
      shortDesc: "We provide all kind of desktop web PHP development services and open source customized development.",
      fullDesc: "Enterprise-tested PHP and Laravel backends engineered for speed, test coverage, queue processing, and rock-solid relational MySQL database architectures.",
      technologies: ["PHP 8+", "Laravel", "MySQL", "Composer", "REST APIs"],
      features: [
        "Clean MVC architecture & Eloquent ORM",
        "Asynchronous queued jobs & mailers",
        "Legacy PHP migration & modern refactoring",
        "High-security CSRF, XSS, and SQLi protection"
      ]
    },
    {
      id: "javascript-dev",
      title: "JavaScript Development",
      category: "Full Stack JS",
      icon: "Terminal",
      badgeColor: "#f59e0b",
      shortDesc: "We provide all kind of services for next generation frontend and backend JavaScript development.",
      fullDesc: "Lightweight, lightning-fast microservices and RESTful APIs capable of handling tens of thousands of concurrent client connections with sub-millisecond response times using React 18, Node.js, and Express.",
      technologies: ["React.js 18", "Node.js", "Express", "Vite", "MySQL", "MongoDB"],
      features: [
        "Event-driven REST APIs and WebSockets",
        "JWT Authentication and role-based security",
        "MySQL connection pooling and indexing",
        "MongoDB schema modeling and aggregations"
      ]
    },
    {
      id: "website-maintenance",
      title: "Website Maintenance & Flutter",
      category: "Mobile & DevOps",
      icon: "Smartphone",
      badgeColor: "#a855f7",
      shortDesc: "We provide you a hasslefree maintenance service option for your website and smooth Flutter mobile applications.",
      fullDesc: "Cross-platform applications that deliver native look-and-feel, seamless API integration, offline database sync, and camera/biometric integrations for iOS & Android with continuous server monitoring.",
      technologies: ["Flutter", "Dart", "iOS", "Android", "CI/CD", "DevOps"],
      features: [
        "Single codebase for App Store & Google Play",
        "Offline-first caching with SQLite / Hive",
        "24/7 server monitoring & bug fixes",
        "Security patches & performance optimization"
      ]
    },
    {
      id: "web-consultancy",
      title: "Web Consultancy & Architecture",
      category: "Consultancy & AI",
      icon: "Compass",
      badgeColor: "#312e81",
      shortDesc: "As a web consultancy we provide all kinds of custom services and guidance to assist our clients.",
      fullDesc: "Startup advisory, technical debt reduction, cloud scaling on AWS, database tuning, Python microservices, and AI model integrations.",
      technologies: ["Python", "FastAPI", "Cloud DevOps", "Docker", "Architecture Strategy"],
      features: [
        "Fractional CTO & Startup Architecture roadmaps",
        "Database performance indexing for MySQL/MongoDB",
        "Python data processing and automated scrapers",
        "Cloud containerization and CI/CD pipelines"
      ]
    }
  ];

  res.json({ success: true, data: services });
});

// Stats (Screenshot 5)
router.get("/stats", (req, res) => {
  const stats = [
    { label: "Completed Project", value: "4000+", icon: "CheckSquare", description: "Delivered on-time with clean code" },
    { label: "Happy Clients", value: "600+", icon: "Smile", description: "From startups to global enterprises" },
    { label: "Multi Services", value: "500+", icon: "Target", description: "Full web, mobile, database & cloud" },
    { label: "Retention Ratio", value: "95%", icon: "Award", description: "Long-term partnership & trust" }
  ];
  res.json({ success: true, data: stats });
});

// ========================
// GALLERY / PORTFOLIO CRUD
// ========================
router.get("/gallery", async (req, res) => {
  try {
    const rows = await db.query("SELECT * FROM gallery ORDER BY id DESC");
    res.json({ success: true, count: rows.length, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/gallery", async (req, res) => {
  try {
    const { title, category, image_url, tech_stack, description, project_url } = req.body;

    if (!title || !category || !image_url) {
      return res.status(400).json({
        success: false,
        error: "Title, Category, and Image URL are required."
      });
    }

    const sql = `
      INSERT INTO gallery (title, category, image_url, tech_stack, description, project_url)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [
      title.trim(),
      category.trim(),
      image_url.trim(),
      tech_stack ? tech_stack.trim() : "React 18, Node.js",
      description ? description.trim() : "",
      project_url ? project_url.trim() : "#"
    ];

    const result = await db.query(sql, params);
    res.status(201).json({
      success: true,
      message: "Gallery project created successfully!",
      id: result.insertId || result.id || Date.now()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put("/gallery/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, image_url, tech_stack, description, project_url } = req.body;

    const sql = `
      UPDATE gallery
      SET title = ?, category = ?, image_url = ?, tech_stack = ?, description = ?, project_url = ?
      WHERE id = ?
    `;
    const params = [
      title.trim(),
      category.trim(),
      image_url.trim(),
      tech_stack ? tech_stack.trim() : "",
      description ? description.trim() : "",
      project_url ? project_url.trim() : "#",
      id
    ];

    await db.query(sql, params);
    res.json({ success: true, message: "Gallery project updated successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete("/gallery/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM gallery WHERE id = ?", [id]);
    res.json({ success: true, message: "Gallery project deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ========================
// INQUIRIES & CONTACT
// ========================
router.get("/inquiries", async (req, res) => {
  try {
    const rows = await db.query("SELECT * FROM inquiries ORDER BY id DESC LIMIT 100");
    res.json({ success: true, count: rows.length, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, service, budget, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Please provide your Name, Email, and Message."
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid email address."
      });
    }

    const sql = `
      INSERT INTO inquiries (name, email, phone, service, budget, message)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [
      name.trim(),
      email.trim(),
      phone ? phone.trim() : null,
      service || "General Inquiry",
      budget || "Flexible",
      message.trim()
    ];

    const result = await db.query(sql, params);

    res.status(201).json({
      success: true,
      message: "Thank you for contacting Krsh.Innovations! Our engineering team will review your project and get back to you within 24 hours.",
      inquiryId: result.insertId || result.id || Date.now(),
      submittedTo: COMPANY_INFO.email
    });
  } catch (error) {
    console.error("Error saving inquiry:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error saving inquiry. Please contact directly at " + COMPANY_INFO.email
    });
  }
});

router.put("/inquiries/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["new", "contacted", "in_progress", "completed"].includes(status)) {
      return res.status(400).json({ success: false, error: "Invalid status value." });
    }

    await db.query("UPDATE inquiries SET status = ? WHERE id = ?", [status, id]);
    res.json({ success: true, message: `Inquiry status updated to ${status}!` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete("/inquiries/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM inquiries WHERE id = ?", [id]);
    res.json({ success: true, message: "Inquiry deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ========================
// QUOTES & ESTIMATOR
// ========================
router.get("/quotes", async (req, res) => {
  try {
    const rows = await db.query("SELECT * FROM quotes ORDER BY id DESC LIMIT 100");
    res.json({ success: true, count: rows.length, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/quote", async (req, res) => {
  try {
    const {
      name,
      email,
      projectType,
      techStack,
      features,
      estimatedCost,
      estimatedTimeline,
      notes
    } = req.body;

    if (!name || !email || !projectType) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and project type are required for a quote request."
      });
    }

    const sql = `
      INSERT INTO quotes (name, email, project_type, tech_stack, features, estimated_cost, estimated_timeline, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const techStr = Array.isArray(techStack) ? techStack.join(", ") : (techStack || "");
    const featStr = Array.isArray(features) ? features.join(", ") : (features || "");

    const params = [
      name.trim(),
      email.trim(),
      projectType,
      techStr,
      featStr,
      estimatedCost || "Custom",
      estimatedTimeline || "Custom",
      notes ? notes.trim() : ""
    ];

    const result = await db.query(sql, params);

    res.status(201).json({
      success: true,
      message: `Your project estimate for ${projectType} has been recorded! A lead developer from Krsh.Innovations will reach out to discuss milestones and architecture.`,
      quoteId: result.insertId || result.id || Date.now()
    });
  } catch (error) {
    console.error("Error submitting quote:", error);
    res.status(500).json({
      success: false,
      error: "Could not submit quote. Please try again or email " + COMPANY_INFO.email
    });
  }
});

// ========================
// NEWSLETTER
// ========================
router.post("/newsletter", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(400).json({ success: false, error: "Please provide a valid email." });
    }

    const sql = `INSERT INTO subscribers (email) VALUES (?)`;
    await db.query(sql, [email.trim().toLowerCase()]);

    res.json({
      success: true,
      message: "Subscribed successfully to Krsh.Innovations tech briefings!"
    });
  } catch (error) {
    res.json({
      success: true,
      message: "You are already subscribed to Krsh.Innovations updates!"
    });
  }
});

module.exports = router;
