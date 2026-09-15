import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import * as THREE from "three";
import { ArrowRight, Sparkles, CheckCircle2, Code2, Smartphone, Database, Layers, Terminal } from "lucide-react";

// Helper to generate crisp canvas textures for 3D Tech Cubes
const createTechCubeTexture = (name, symbol, bgColor, textColor = "#ffffff") => {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  // Background Gradient
  const grad = ctx.createLinearGradient(0, 0, 512, 512);
  grad.addColorStop(0, bgColor);
  grad.addColorStop(1, "#0a1120");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Rounded Inner Border
  ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
  ctx.lineWidth = 14;
  ctx.strokeRect(20, 20, 472, 472);

  // Corner Accents
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.fillRect(20, 20, 40, 8);
  ctx.fillRect(20, 20, 8, 40);
  ctx.fillRect(452, 20, 40, 8);
  ctx.fillRect(484, 20, 8, 40);

  // Tech Symbol / Icon
  ctx.font = "bold 150px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = textColor;
  ctx.fillText(symbol, 256, 200);

  // Tech Name Label
  ctx.font = "bold 44px 'Plus Jakarta Sans', sans-serif";
  ctx.fillStyle = textColor;
  ctx.fillText(name, 256, 370);

  // Brand Label
  ctx.font = "600 22px 'Plus Jakarta Sans', sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
  ctx.fillText("Krsh.Innovations", 256, 425);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
};

// Helper to generate Laptop Screen code editor texture
const createLaptopScreenTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext("2d");

  // IDE Dark Background
  ctx.fillStyle = "#090d16";
  ctx.fillRect(0, 0, 1024, 640);

  // IDE Top Bar
  ctx.fillStyle = "#131c2e";
  ctx.fillRect(0, 0, 1024, 60);

  // Window Dots (Mac style)
  ctx.fillStyle = "#ef4444";
  ctx.beginPath();
  ctx.arc(35, 30, 9, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#f59e0b";
  ctx.beginPath();
  ctx.arc(65, 30, 9, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#10b981";
  ctx.beginPath();
  ctx.arc(95, 30, 9, 0, Math.PI * 2);
  ctx.fill();

  // Active Tab
  ctx.fillStyle = "#090d16";
  ctx.fillRect(140, 10, 260, 50);
  ctx.fillStyle = "#38bdf8";
  ctx.font = "bold 19px monospace";
  ctx.fillText("KrshArchitecture.tsx", 160, 42);

  // Code Lines with syntax highlighting
  const codeLines = [
    { text: "import { LaunchApp } from '@krsh/innovations';", color: "#c084fc" },
    { text: "", color: "#fff" },
    { text: "// 🚀 Krsh.Innovations Multi-Stack Studio", color: "#64748b" },
    { text: "export const EnterpriseApp = async () => {", color: "#38bdf8" },
    { text: "  const techStack = {", color: "#e2e8f0" },
    { text: "    frontend: ['React 18', 'Three.js 3D', 'Bootstrap 5'],", color: "#34d399" },
    { text: "    backend:  ['Node.js', 'Express', 'PHP', 'Laravel'],", color: "#fbbf24" },
    { text: "    database: ['MySQL 8.0', 'MongoDB Atlas'],", color: "#60a5fa" },
    { text: "    mobile:   ['Google Flutter iOS & Android'],", color: "#f472b6" },
    { text: "    support:  '24/7 Dedicated Scaling & Support'", color: "#38bdf8" },
    { text: "  };", color: "#e2e8f0" },
    { text: "  return await LaunchApp.deploy(techStack);", color: "#a78bfa" },
    { text: "};", color: "#38bdf8" }
  ];

  ctx.font = "24px 'Fira Code', 'Courier New', monospace";
  let y = 110;
  codeLines.forEach((line) => {
    ctx.fillStyle = line.color;
    ctx.fillText(line.text, 40, y);
    y += 38;
  });

  // Bottom Status Bar
  ctx.fillStyle = "#0284c7";
  ctx.fillRect(0, 595, 1024, 45);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 18px sans-serif";
  ctx.fillText("✔ WebGL 3D Active | MySQL Online | Krsh.Innovations@gmail.com", 30, 624);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
};

const Hero3D = ({ onGetStarted }) => {
  const mountRef = useRef(null);
  const [hoveredTech, setHoveredTech] = useState(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const width = currentMount.clientWidth || 550;
    const height = currentMount.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.1, 7.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    currentMount.appendChild(renderer.domElement);

    // Root interactive pivot
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 2. Build 3D Laptop Model
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(0, -0.4, 0);
    laptopGroup.rotation.y = -0.25; // Sleek 3D angle
    mainGroup.add(laptopGroup);

    // Laptop Base Chassis
    const baseGeo = new THREE.BoxGeometry(3.2, 0.1, 2.2);
    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.8,
      roughness: 0.25
    });
    const laptopBase = new THREE.Mesh(baseGeo, metalMaterial);
    laptopGroup.add(laptopBase);

    // Keyboard Area on Base
    const keyboardGeo = new THREE.PlaneGeometry(2.8, 1.2);
    const keyboardMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.8
    });
    const keyboard = new THREE.Mesh(keyboardGeo, keyboardMat);
    keyboard.rotation.x = -Math.PI / 2;
    keyboard.position.set(0, 0.052, -0.2);
    laptopGroup.add(keyboard);

    // Trackpad
    const trackpadGeo = new THREE.PlaneGeometry(1.0, 0.6);
    const trackpadMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.4
    });
    const trackpad = new THREE.Mesh(trackpadGeo, trackpadMat);
    trackpad.rotation.x = -Math.PI / 2;
    trackpad.position.set(0, 0.052, 0.7);
    laptopGroup.add(trackpad);

    // Laptop Screen Lid (Angled at 110 degrees)
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.05, -1.05);
    lidGroup.rotation.x = -0.32;
    laptopGroup.add(lidGroup);

    // Screen Bezel Outer
    const lidGeo = new THREE.BoxGeometry(3.2, 2.1, 0.08);
    const lidMesh = new THREE.Mesh(lidGeo, metalMaterial);
    lidMesh.position.set(0, 1.05, 0);
    lidGroup.add(lidMesh);

    // Active Display Screen with Live IDE Code
    const screenGeo = new THREE.PlaneGeometry(3.0, 1.9);
    const screenTexture = createLaptopScreenTexture();
    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture
    });
    const screenDisplay = new THREE.Mesh(screenGeo, screenMat);
    screenDisplay.position.set(0, 1.05, 0.045);
    lidGroup.add(screenDisplay);

    // 3. Create 6 Floating 3D Tech Cubes Orbiting the Laptop
    const techData = [
      { name: "React 18", symbol: "⚛", color: "#0284c7", pos: [-2.4, 1.3, 0.6], speed: 1.1 },
      { name: "Flutter", symbol: "📱", color: "#0ea5e9", pos: [2.5, 1.2, 0.4], speed: 1.3 },
      { name: "Node.js", symbol: "🟢", color: "#16a34a", pos: [-2.1, -0.1, 1.6], speed: 0.9 },
      { name: "PHP Laravel", symbol: "⚡", color: "#dc2626", pos: [2.2, -0.2, 1.5], speed: 1.2 },
      { name: "MySQL", symbol: "🐬", color: "#0369a1", pos: [0.0, 2.4, -0.6], speed: 1.0 },
      { name: "Python", symbol: "🐍", color: "#d97706", pos: [-1.4, 2.1, -1.2], speed: 1.4 }
    ];

    const cubeMeshes = [];
    const cubeGeo = new THREE.BoxGeometry(0.72, 0.72, 0.72);

    techData.forEach((tech, index) => {
      const texture = createTechCubeTexture(tech.name, tech.symbol, tech.color);
      const cubeMat = new THREE.MeshStandardMaterial({
        map: texture,
        metalness: 0.4,
        roughness: 0.3
      });

      const cube = new THREE.Mesh(cubeGeo, cubeMat);
      cube.position.set(...tech.pos);
      cube.userData = { ...tech, initialY: tech.pos[1], index };
      mainGroup.add(cube);
      cubeMeshes.push(cube);
    });

    // 4. Subtle Cyber Nebula Particles
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 12;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight.position.set(5, 8, 6);
    scene.add(dirLight);

    const cyanGlow = new THREE.PointLight(0x38bdf8, 2.5, 8);
    cyanGlow.position.set(-2, 2, 2);
    scene.add(cyanGlow);

    const purpleGlow = new THREE.PointLight(0x818cf8, 2.2, 8);
    purpleGlow.position.set(2, 2, 2);
    scene.add(purpleGlow);

    // 6. Raycaster & Mouse Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-1000, -1000);
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (event) => {
      const rect = currentMount.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      mouse.x = x;
      mouse.y = y;

      targetRotationY = x * 0.35;
      targetRotationX = -y * 0.25;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cubeMeshes);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        setHoveredTech(hit.userData);
        currentMount.style.cursor = "pointer";
      } else {
        setHoveredTech(null);
        currentMount.style.cursor = "default";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 7. Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera parallax
      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.05;

      // Animate floating cubes
      cubeMeshes.forEach((cube) => {
        const { speed, initialY, index } = cube.userData;
        cube.position.y = initialY + Math.sin(elapsedTime * speed + index) * 0.16;
        cube.rotation.x += 0.008;
        cube.rotation.y += 0.012;

        if (hoveredTech && hoveredTech.name === cube.userData.name) {
          cube.scale.lerp(new THREE.Vector3(1.18, 1.18, 1.18), 0.1);
        } else {
          cube.scale.lerp(new THREE.Vector3(1.0, 1.0, 1.0), 0.1);
        }
      });

      // Gentle laptop bobbing
      laptopGroup.position.y = -0.4 + Math.sin(elapsedTime * 0.8) * 0.05;

      // Slow particle rotation
      particles.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!currentMount) return;
      const newW = currentMount.clientWidth;
      const newH = currentMount.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [hoveredTech]);

  return (
    <section id="home" className="hero-section position-relative overflow-hidden" style={{ minHeight: "88vh" }}>
      {/* Subtle geometric background accents matching screenshot 2/3 style */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "12%",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(2, 132, 199, 0.12) 0%, rgba(255,255,255,0) 70%)",
          zIndex: 0,
          pointerEvents: "none"
        }}
      />
      {/* Decorative tiny pink circle & cyan plus */}
      <div
        style={{
          position: "absolute",
          top: "22%",
          right: "48%",
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          border: "2px solid #f43f5e",
          opacity: 0.6,
          pointerEvents: "none"
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "35%",
          left: "4%",
          fontSize: "22px",
          color: "#06b6d4",
          fontWeight: "bold",
          opacity: 0.5,
          pointerEvents: "none"
        }}
      >
        +
      </div>

      <Container className="position-relative" style={{ zIndex: 1 }}>
        <Row className="align-items-center gy-5">
          {/* Left Column: Headings & Value Props matching Screenshot 1 */}
          <Col lg={6}>
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 mb-3 rounded-pill bg-light border border-primary-subtle shadow-sm">
              <Sparkles size={16} className="text-primary" />
              <span className="small fw-bold text-primary text-uppercase tracking-wider">
                Krsh.Innovations • IT & Startup Studio
              </span>
            </div>

            <h1 className="hero-headline text-dark mb-3">
              White Label{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #00a2ea 0%, #2563eb 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Development Agency
              </span>
            </h1>

            <p className="hero-subtitle mb-4">
              A team of highly experienced experts and skilled developers to provide you with any kind
              of web and mobile development services. We build complete, scale-ready software from
              scratch.
            </p>

            {/* Quick Tech Badge Highlights */}
            <div className="d-flex flex-wrap gap-2 mb-4">
              <span className="badge bg-light text-dark border px-3 py-2 rounded-pill fw-medium">
                ⚡ React.js 18
              </span>
              <span className="badge bg-light text-dark border px-3 py-2 rounded-pill fw-medium">
                📱 Flutter Apps
              </span>
              <span className="badge bg-light text-dark border px-3 py-2 rounded-pill fw-medium">
                🛠️ PHP & Laravel
              </span>
              <span className="badge bg-light text-dark border px-3 py-2 rounded-pill fw-medium">
                🟢 Node.js & Express
              </span>
              <span className="badge bg-light text-dark border px-3 py-2 rounded-pill fw-medium">
                🐬 MySQL & MongoDB
              </span>
              <span className="badge bg-light text-dark border px-3 py-2 rounded-pill fw-medium">
                🐍 Python AI
              </span>
            </div>

            {/* CTA Buttons: Standardized Medium Size (Same Width & Height) */}
            <div className="d-flex flex-wrap align-items-center gap-3">
              <button
                type="button"
                className="btn-krsh-primary"
                onClick={onGetStarted}
              >
                <span>Get Started</span>
                <ArrowRight size={16} />
              </button>

              <a
                href="#services"
                className="btn-krsh-secondary"
              >
                <span>Explore Services</span>
              </a>
            </div>

            {/* Trust Markers */}
            <div className="d-flex align-items-center gap-4 mt-4 pt-3 border-top border-light-subtle">
              <div className="d-flex align-items-center gap-2">
                <CheckCircle2 size={17} className="text-primary" />
                <span className="small text-muted fw-semibold">Guaranteed On-Time</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <CheckCircle2 size={17} className="text-success" />
                <span className="small text-muted fw-semibold">100% Code Ownership</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <CheckCircle2 size={17} className="text-info" />
                <span className="small text-muted fw-semibold">24/7 Dedicated Support</span>
              </div>
            </div>
          </Col>

          {/* Right Column: Upgraded 3D Interactive Laptop & Floating Tech Cubes */}
          <Col lg={6} className="position-relative">
            <div
              className="hero-canvas-container position-relative"
              ref={mountRef}
              style={{ height: "500px" }}
            >
              {/* Interactive 3D Cube Hover Card */}
              {hoveredTech && (
                <div
                  className="position-absolute bg-white px-3 py-2 rounded-pill shadow-lg border border-primary-subtle d-flex align-items-center gap-2"
                  style={{
                    top: "6%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 10,
                    pointerEvents: "none"
                  }}
                >
                  <span className="fs-5">{hoveredTech.symbol}</span>
                  <strong className="text-dark small">{hoveredTech.name}</strong>
                  <span className="badge bg-primary text-white rounded-pill px-2 py-1 small">
                    Interactive 3D
                  </span>
                </div>
              )}

              {/* 3D Hint Badge */}
              <div
                className="position-absolute bg-white bg-opacity-90 px-3 py-1 rounded-pill shadow-sm border border-light-subtle small text-muted d-flex align-items-center gap-2"
                style={{
                  bottom: "4%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 2,
                  pointerEvents: "none"
                }}
              >
                <Sparkles size={14} className="text-primary" />
                <span>Move mouse to tilt 3D workspace & cubes</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero3D;
