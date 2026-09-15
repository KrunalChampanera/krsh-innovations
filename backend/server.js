const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const { initDatabase, getDbStatus } = require("./config/db");
const apiRoutes = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for development & client origin
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple request logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`[HTTP] ${req.method} ${req.originalUrl} ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// API Routes
app.use("/api", apiRoutes);

// Root Welcome Endpoint
app.get("/", (req, res) => {
  res.json({
    company: "Krsh.Innovations",
    tagline: "Innovative Full-Stack & Mobile Development Agency",
    email: "Krsh.Innovations@gmail.com",
    apiDocumentation: "/api/health",
    endpoints: [
      "/api/health",
      "/api/services",
      "/api/stats",
      "/api/contact",
      "/api/quote",
      "/api/newsletter",
      "/api/inquiries"
    ]
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found on Krsh.Innovations Backend API`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("[SERVER ERROR]", err);
  res.status(500).json({
    success: false,
    error: "Internal server error occurred",
    details: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// Boot Server & Initialize DB
app.listen(PORT, async () => {
  console.log(`====================================================`);
  console.log(`🚀 Krsh.Innovations API running on http://localhost:${PORT}`);
  console.log(`📧 Contact: Krsh.Innovations@gmail.com`);
  console.log(`====================================================`);
  await initDatabase();
});
