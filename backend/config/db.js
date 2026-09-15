const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

let pool = null;
let isConnectedToMySQL = false;
let dbStatusMessage = "Initializing database connection...";

const localStorePath = path.join(__dirname, "..", "data");
const localDbFile = path.join(localStorePath, "local_store.json");

if (!fs.existsSync(localStorePath)) {
  fs.mkdirSync(localStorePath, { recursive: true });
}

const defaultGallery = [
  {
    id: 1,
    title: "FinTech Cloud Dashboard",
    category: "Web Development",
    image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    tech_stack: "React 18, Node.js, Express, MySQL",
    description: "Comprehensive analytics and high-frequency transaction dashboard for modern fintech founders.",
    project_url: "https://github.com",
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    title: "Smart Logistics Flutter App",
    category: "Mobile App",
    image_url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    tech_stack: "Flutter, Dart, Firebase, Python",
    description: "Cross-platform mobile application for real-time fleet GPS tracking, route optimization, and driver telemetry.",
    project_url: "https://github.com",
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    title: "Multi-Vendor E-Commerce Platform",
    category: "E-Commerce",
    image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    tech_stack: "PHP, Laravel, MySQL, Stripe",
    description: "Enterprise e-commerce store with multi-currency checkout, dynamic inventory sync, and seller payouts.",
    project_url: "https://github.com",
    created_at: new Date().toISOString()
  },
  {
    id: 4,
    title: "Healthcare Telemedicine Portal",
    category: "Enterprise",
    image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    tech_stack: "React 18, WebRTC, Express, MongoDB",
    description: "HIPAA-compliant telemedicine web portal connecting patients with certified clinicians via encrypted video consultations.",
    project_url: "https://github.com",
    created_at: new Date().toISOString()
  },
  {
    id: 5,
    title: "AI-Powered Business Intelligence",
    category: "AI & Python",
    image_url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
    tech_stack: "Python, FastAPI, React, MySQL",
    description: "Automated data ingestion pipeline with machine-learning predictive sales forecasts and custom visualization charts.",
    project_url: "https://github.com",
    created_at: new Date().toISOString()
  },
  {
    id: 6,
    title: "Next-Gen 3D Interactive Showcase",
    category: "UI/UX & 3D",
    image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    tech_stack: "Three.js, WebGL, React 18, CSS3",
    description: "Award-winning immersive 3D spatial product showroom built for high conversions and user engagement.",
    project_url: "https://github.com",
    created_at: new Date().toISOString()
  }
];

const getLocalData = () => {
  try {
    if (fs.existsSync(localDbFile)) {
      const data = JSON.parse(fs.readFileSync(localDbFile, "utf-8"));
      if (!data.gallery || data.gallery.length === 0) {
        data.gallery = defaultGallery;
        fs.writeFileSync(localDbFile, JSON.stringify(data, null, 2), "utf-8");
      }
      return data;
    }
  } catch (err) {
    console.error("Error reading local DB:", err);
  }
  return {
    inquiries: [
      {
        id: 1,
        name: "Alex Mercer",
        email: "alex.mercer@innovate.co",
        phone: "+1 (555) 234-5678",
        service: "Full-Stack Web (React + Node + Express)",
        budget: "$10,000 - $25,000",
        message: "Looking for an end-to-end React + Flutter solution with Node.js and MySQL backend for our tech startup.",
        status: "new",
        created_at: new Date().toISOString()
      }
    ],
    quotes: [],
    subscribers: [],
    gallery: defaultGallery
  };
};

const saveLocalData = (data) => {
  try {
    fs.writeFileSync(localDbFile, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing local DB:", err);
  }
};

const initDatabase = async () => {
  const host = process.env.DB_HOST || "localhost";
  const user = process.env.DB_USER || "root";
  const password = process.env.DB_PASSWORD || "";
  const database = process.env.DB_NAME || "krsh_innovations";
  const port = parseInt(process.env.DB_PORT || "3306", 10);

  try {
    const rootConnection = await mysql.createConnection({
      host,
      user,
      password,
      port,
      connectTimeout: 3000
    });

    await rootConnection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    await rootConnection.end();

    pool = mysql.createPool({
      host,
      user,
      password,
      database,
      port,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    const createInquiriesTable = `
      CREATE TABLE IF NOT EXISTS inquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) DEFAULT NULL,
        service VARCHAR(100) NOT NULL,
        budget VARCHAR(100) DEFAULT 'Flexible',
        message TEXT NOT NULL,
        status ENUM('new', 'contacted', 'in_progress', 'completed') DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const createQuotesTable = `
      CREATE TABLE IF NOT EXISTS quotes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        project_type VARCHAR(100) NOT NULL,
        tech_stack TEXT NOT NULL,
        features TEXT NOT NULL,
        estimated_cost VARCHAR(100) NOT NULL,
        estimated_timeline VARCHAR(100) NOT NULL,
        notes TEXT DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const createGalleryTable = `
      CREATE TABLE IF NOT EXISTS gallery (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        image_url TEXT NOT NULL,
        tech_stack VARCHAR(255) NOT NULL,
        description TEXT,
        project_url VARCHAR(255) DEFAULT '#',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const createSubscribersTable = `
      CREATE TABLE IF NOT EXISTS subscribers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await pool.query(createInquiriesTable);
    await pool.query(createQuotesTable);
    await pool.query(createGalleryTable);
    await pool.query(createSubscribersTable);

    // Seed gallery if empty in MySQL
    const [existingGallery] = await pool.query("SELECT COUNT(*) as count FROM gallery");
    if (existingGallery[0].count === 0) {
      for (const item of defaultGallery) {
        await pool.query(
          "INSERT INTO gallery (title, category, image_url, tech_stack, description, project_url) VALUES (?, ?, ?, ?, ?, ?)",
          [item.title, item.category, item.image_url, item.tech_stack, item.description, item.project_url]
        );
      }
    }

    isConnectedToMySQL = true;
    dbStatusMessage = `Connected to MySQL database "${database}" on ${host}:${port}`;
    console.log(`[DB SUCCESS] ${dbStatusMessage}`);
  } catch (error) {
    isConnectedToMySQL = false;
    dbStatusMessage = `MySQL Server is not active (${error.message}). Using resilient local JSON store. Start MySQL to activate live DB.`;
    console.warn(`[DB NOTICE] ${dbStatusMessage}`);
  }
};

const getDbStatus = () => {
  return {
    isMySQL: isConnectedToMySQL,
    message: dbStatusMessage,
    timestamp: new Date().toISOString()
  };
};

const query = async (sql, params = []) => {
  if (isConnectedToMySQL && pool) {
    try {
      const [rows] = await pool.query(sql, params);
      return rows;
    } catch (err) {
      console.error("MySQL query execution error:", err.message);
      throw err;
    }
  }

  // Resilient fallback logic for local store
  const data = getLocalData();
  const lowerSql = sql.toLowerCase().trim();

  // INQUIRIES
  if (lowerSql.startsWith("insert into inquiries")) {
    const newItem = {
      id: (data.inquiries.length > 0 ? Math.max(...data.inquiries.map(i => i.id)) : 0) + 1,
      name: params[0],
      email: params[1],
      phone: params[2],
      service: params[3],
      budget: params[4] || "Flexible",
      message: params[5],
      status: "new",
      created_at: new Date().toISOString()
    };
    data.inquiries.unshift(newItem);
    saveLocalData(data);
    return { insertId: newItem.id, affectedRows: 1 };
  }

  if (lowerSql.includes("update inquiries set status")) {
    const status = params[0];
    const id = parseInt(params[1], 10);
    const target = data.inquiries.find(i => i.id === id);
    if (target) {
      target.status = status;
      saveLocalData(data);
      return { affectedRows: 1 };
    }
    return { affectedRows: 0 };
  }

  if (lowerSql.startsWith("delete from inquiries")) {
    const id = parseInt(params[0], 10);
    const initialLen = data.inquiries.length;
    data.inquiries = data.inquiries.filter(i => i.id !== id);
    saveLocalData(data);
    return { affectedRows: initialLen - data.inquiries.length };
  }

  if (lowerSql.includes("from inquiries")) {
    return data.inquiries;
  }

  // GALLERY
  if (lowerSql.startsWith("insert into gallery")) {
    const newItem = {
      id: (data.gallery.length > 0 ? Math.max(...data.gallery.map(g => g.id)) : 0) + 1,
      title: params[0],
      category: params[1],
      image_url: params[2],
      tech_stack: params[3],
      description: params[4] || "",
      project_url: params[5] || "#",
      created_at: new Date().toISOString()
    };
    data.gallery.unshift(newItem);
    saveLocalData(data);
    return { insertId: newItem.id, affectedRows: 1 };
  }

  if (lowerSql.startsWith("update gallery")) {
    // Expect: title, category, image_url, tech_stack, description, project_url, id
    const id = parseInt(params[6], 10);
    const target = data.gallery.find(g => g.id === id);
    if (target) {
      target.title = params[0];
      target.category = params[1];
      target.image_url = params[2];
      target.tech_stack = params[3];
      target.description = params[4];
      target.project_url = params[5];
      saveLocalData(data);
      return { affectedRows: 1 };
    }
    return { affectedRows: 0 };
  }

  if (lowerSql.startsWith("delete from gallery")) {
    const id = parseInt(params[0], 10);
    const initialLen = data.gallery.length;
    data.gallery = data.gallery.filter(g => g.id !== id);
    saveLocalData(data);
    return { affectedRows: initialLen - data.gallery.length };
  }

  if (lowerSql.includes("from gallery")) {
    return data.gallery;
  }

  // QUOTES
  if (lowerSql.startsWith("insert into quotes")) {
    const newItem = {
      id: (data.quotes.length > 0 ? Math.max(...data.quotes.map(q => q.id)) : 0) + 1,
      name: params[0],
      email: params[1],
      project_type: params[2],
      tech_stack: params[3],
      features: params[4],
      estimated_cost: params[5],
      estimated_timeline: params[6],
      notes: params[7] || "",
      created_at: new Date().toISOString()
    };
    data.quotes.unshift(newItem);
    saveLocalData(data);
    return { insertId: newItem.id, affectedRows: 1 };
  }

  if (lowerSql.includes("from quotes")) {
    return data.quotes;
  }

  // SUBSCRIBERS
  if (lowerSql.startsWith("insert into subscribers")) {
    const exists = data.subscribers.find(s => s.email === params[0]);
    if (!exists) {
      data.subscribers.push({
        id: data.subscribers.length + 1,
        email: params[0],
        subscribed_at: new Date().toISOString()
      });
      saveLocalData(data);
    }
    return { affectedRows: 1 };
  }

  return [];
};

module.exports = {
  initDatabase,
  getDbStatus,
  query
};
