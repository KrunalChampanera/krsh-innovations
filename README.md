# Krsh.Innovations - Full-Stack IT Development Agency Platform

> **Krsh.Innovations** (`Krsh.Innovations@gmail.com`)  
> Full-Stack Web, Mobile, Database & Cloud Engineering for Startups and Enterprises.

---

## ðŸš€ Key Technologies & Features

- **Frontend**:
  - **React 18** (`react@^18.3.1`, `react-dom@^18.3.1`)
  - **3D Interactive WebGL** via **Three.js** (Mouse-reactive 3D cyber-core orb with particle nebula)
  - **React-Bootstrap 2.10** & **Bootstrap 5.3** (Fluid responsive layouts & accessible controls)
  - **Lucide Icons** & **Bootstrap Icons**
  - **Interactive Project Estimator** with real-time budget and timeline calculations
  - **Interactive 6-Card Services Grid** with 3D hover effects & detail modals
  - **Why Choose Us** section with realistic 3D mobile application mockup
  - **Stats Section** highlighting 4000+ completed projects, 600+ clients, 95% retention
  - **Live Inquiries & Database Monitor** modal

- **Backend**:
  - **Node.js** & **Express** RESTful API
  - **MySQL** relational database with connection pooling (`mysql2/promise`)
  - Auto-provisioning database schema (`krsh_innovations` database and tables)
  - Resilient offline fallback: seamlessly handles operations even if local MySQL is temporarily stopped
  - REST Endpoints:
    - `GET /api/health`
    - `GET /api/services`
    - `GET /api/stats`
    - `POST /api/contact`
    - `POST /api/quote`
    - `POST /api/newsletter`
    - `GET /api/inquiries`

- **Core Tech Stacks Covered**:
  - React.js 18, Node.js, Express, PHP, Laravel, Python, Flutter, MySQL, MongoDB

---

## ðŸ› ï¸ Quick Start Instructions

### 1. Start the Backend API (Port 5000)
```bash
cd backend
npm install
npm run dev
```
Backend will be live at: `http://localhost:5000`

### 2. Start the Frontend App (Port 5180)
```bash
cd frontend
npm install
npm run dev
```
Frontend will be live at: `http://localhost:5180`

---

## ðŸ—„ï¸ MySQL Database Setup (Optional / Live Mode)

1. Open **XAMPP Control Panel** or your MySQL service.
2. Start the **MySQL** module (default port `3306`).
3. The Express backend will automatically detect MySQL, create the `krsh_innovations` database, and execute table migrations for:
   - `inquiries`
   - `quotes`
   - `subscribers`
4. You can also manually import the schema using `backend/sql/schema.sql` via phpMyAdmin (`http://localhost/phpmyadmin`) or MySQL CLI:
```bash
mysql -u root -p < backend/sql/schema.sql
```

---

## ðŸ“‚ Project Architecture

```
krsh-innovations/
â”œâ”€â”€ backend/
â”‚   â”œâ”€â”€ config/
â”‚   â”‚   â””â”€â”€ db.js            # MySQL connection pool & resilient fallback engine
â”‚   â”œâ”€â”€ routes/
â”‚   â”‚   â””â”€â”€ api.js           # REST API endpoints (contact, quote, services, stats)
â”‚   â”œâ”€â”€ sql/
â”‚   â”‚   â””â”€â”€ schema.sql       # MySQL schema and initial seed data
â”‚   â”œâ”€â”€ .env                 # Environment configuration (Port, DB credentials)
â”‚   â”œâ”€â”€ package.json
â”‚   â””â”€â”€ server.js            # Express server entrypoint
â”‚
â””â”€â”€ frontend/
    â”œâ”€â”€ src/
    â”‚   â”œâ”€â”€ components/
    â”‚   â”‚   â”œâ”€â”€ Navbar.jsx           # Glassmorphic header with live DB indicator
    â”‚   â”‚   â”œâ”€â”€ Hero3D.jsx           # Three.js 3D interactive hero canvas
    â”‚   â”‚   â”œâ”€â”€ StatsSection.jsx     # 4000+ Projects counter section
    â”‚   â”‚   â”œâ”€â”€ ServicesSection.jsx  # 6-Card grid with 3D hover effects & modal
    â”‚   â”‚   â”œâ”€â”€ TechStackSection.jsx # React, Node, PHP/Laravel, Python, Flutter, DBs
    â”‚   â”‚   â”œâ”€â”€ WhyChooseUs.jsx      # 4 Pillars with central 3D phone mockup
    â”‚   â”‚   â”œâ”€â”€ ProjectEstimator.jsx # Interactive quote calculator
    â”‚   â”‚   â”œâ”€â”€ ContactSection.jsx   # Inquiry form to Krsh.Innovations@gmail.com
    â”‚   â”‚   â”œâ”€â”€ InquiriesModal.jsx   # Live database monitor
    â”‚   â”‚   â””â”€â”€ Footer.jsx           # Footer & newsletter
    â”‚   â”œâ”€â”€ App.jsx
    â”‚   â”œâ”€â”€ index.css
    â”‚   â””â”€â”€ main.jsx
    â”œâ”€â”€ index.html
    â”œâ”€â”€ package.json
    â””â”€â”€ vite.config.js
```
