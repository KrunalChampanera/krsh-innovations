-- Database schema for Krsh.Innovations IT Services
CREATE DATABASE IF NOT EXISTS krsh_innovations;
USE krsh_innovations;

-- Inquiries Table (from Contact form)
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

-- Quotes Table (from Interactive Project Estimator)
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

-- Gallery / Portfolio Table (Admin Managed)
CREATE TABLE IF NOT EXISTS gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    image_url LONGTEXT NOT NULL,
    tech_stack VARCHAR(255) NOT NULL,
    description TEXT,
    project_url VARCHAR(255) DEFAULT '#',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Newsletter Subscribers
CREATE TABLE IF NOT EXISTS subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Initial Seed Data
INSERT IGNORE INTO inquiries (id, name, email, phone, service, budget, message, status)
VALUES 
(1, 'Alex Mercer', 'alex.mercer@innovate.co', '+1 (555) 234-5678', 'Full-Stack Web (React + Node + Express)', '$10,000 - $25,000', 'Looking for an end-to-end React + Flutter solution with Node.js and MySQL backend for our tech startup.', 'new');

INSERT IGNORE INTO gallery (id, title, category, image_url, tech_stack, description, project_url)
VALUES
(1, 'FinTech Cloud Dashboard', 'Web Development', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', 'React 18, Node.js, Express, MySQL', 'Comprehensive analytics and high-frequency transaction dashboard for modern fintech founders.', 'https://github.com'),
(2, 'Smart Logistics Flutter App', 'Mobile App', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80', 'Flutter, Dart, Firebase, Python', 'Cross-platform mobile application for real-time fleet GPS tracking, route optimization, and driver telemetry.', 'https://github.com'),
(3, 'Multi-Vendor E-Commerce Platform', 'E-Commerce', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', 'PHP, Laravel, MySQL, Stripe', 'Enterprise e-commerce store with multi-currency checkout, dynamic inventory sync, and seller payouts.', 'https://github.com'),
(4, 'Healthcare Telemedicine Portal', 'Enterprise', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80', 'React 18, WebRTC, Express, MongoDB', 'HIPAA-compliant telemedicine web portal connecting patients with certified clinicians via encrypted video consultations.', 'https://github.com'),
(5, 'AI-Powered Business Intelligence', 'AI & Python', 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80', 'Python, FastAPI, React, PostgreSQL', 'Automated data ingestion pipeline with machine-learning predictive sales forecasts and custom visualization charts.', 'https://github.com'),
(6, 'Next-Gen 3D Interactive Showcase', 'UI/UX & 3D', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80', 'Three.js, WebGL, React 18, CSS3', 'Award-winning immersive 3D spatial product showroom built for high conversions and user engagement.', 'https://github.com');
