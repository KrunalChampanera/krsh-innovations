import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import * as THREE from "three";
import { ArrowRight, Sparkles, CheckCircle2, Code2, Smartphone, Database, Layers, Terminal } from "lucide-react";

// Helper to generate crisp, futuristic canvas textures for 3D Tech Nodes
const createTechCubeTexture = (name, symbol, subtitle, bgColor, textColor = "#ffffff") => {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  // Deep tech gradient background
  const grad = ctx.createLinearGradient(0, 0, 512, 512);
  grad.addColorStop(0, bgColor);
  grad.addColorStop(0.65, "#0a1226");
  grad.addColorStop(1, "#030712");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Outer Glowing Cyber Border
  ctx.strokeStyle = "rgba(0, 162, 234, 0.85)";
  ctx.lineWidth = 14;
  ctx.strokeRect(18, 18, 476, 476);

  // Inner Thin Border
  ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
  ctx.lineWidth = 3;
  ctx.strokeRect(30, 30, 452, 452);

  // High-Tech Corner Brackets
  ctx.fillStyle = "#38bdf8";
  ctx.fillRect(18, 18, 40, 7);
  ctx.fillRect(18, 18, 7, 40);
  ctx.fillRect(454, 18, 40, 7);
  ctx.fillRect(487, 18, 7, 40);
  ctx.fillRect(18, 487, 40, 7);
  ctx.fillRect(18, 454, 7, 40);
  ctx.fillRect(454, 487, 40, 7);
  ctx.fillRect(487, 454, 7, 40);

  // Center Radial Tech Glow behind symbol
  const glowGrad = ctx.createRadialGradient(256, 180, 10, 256, 180, 120);
  glowGrad.addColorStop(0, "rgba(56, 189, 248, 0.35)");
  glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = glowGrad;
  ctx.beginPath();
  ctx.arc(256, 180, 120, 0, Math.PI * 2);
  ctx.fill();

  // Tech Symbol / Icon
  ctx.font = "bold 130px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = textColor;
  ctx.fillText(symbol, 256, 180);

  // Tech Name Label
  ctx.font = "bold 44px 'Plus Jakarta Sans', -apple-system, sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(name, 256, 330);

  // Architecture Subtitle
  ctx.font = "600 24px 'Plus Jakarta Sans', sans-serif";
  ctx.fillStyle = "#38bdf8";
  ctx.fillText(subtitle, 256, 385);

  // Krsh Cloud Node Tag
  ctx.font = "600 18px 'Plus Jakarta Sans', sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.fillText("Krsh Cloud Architecture", 256, 435);

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

    // 2. Build 3D IT Cloud Infrastructure & Cyber Core Model
    const cyberHubGroup = new THREE.Group();
    cyberHubGroup.position.set(0, -0.4, 0);
    mainGroup.add(cyberHubGroup);

    // --- A. Base Server Pedestal Platform ---
    const platformGroup = new THREE.Group();
    platformGroup.position.set(0, -1.0, 0);
    cyberHubGroup.add(platformGroup);

    // Main titanium disc base
    const baseCylinderGeo = new THREE.CylinderGeometry(2.7, 2.9, 0.15, 48);
    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.85,
      roughness: 0.25
    });
    const basePlatform = new THREE.Mesh(baseCylinderGeo, metalMaterial);
    platformGroup.add(basePlatform);

    // Inner circuit disc
    const innerCircuitGeo = new THREE.CylinderGeometry(2.4, 2.4, 0.17, 48);
    const circuitMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.6,
      roughness: 0.4
    });
    const innerCircuit = new THREE.Mesh(innerCircuitGeo, circuitMat);
    platformGroup.add(innerCircuit);

    // Glowing Cyan Perimeter Ring
    const platformRingGeo = new THREE.TorusGeometry(2.55, 0.03, 16, 64);
    const glowMat = new THREE.MeshBasicMaterial({ color: 0x00a2ea });
    const platformRing = new THREE.Mesh(platformRingGeo, glowMat);
    platformRing.rotation.x = Math.PI / 2;
    platformRing.position.y = 0.09;
    platformGroup.add(platformRing);

    // 4 High-Tech Edge Server Tower Monoliths
    const serverTowers = [];
    const towerPositions = [
      [1.55, 0.6, 0.85],
      [-1.55, 0.6, 0.85],
      [1.3, 0.6, -1.2],
      [-1.3, 0.6, -1.2]
    ];

    const towerGeo = new THREE.BoxGeometry(0.36, 1.2, 0.36);
    const towerMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      metalness: 0.9,
      roughness: 0.2
    });

    const ledGreenMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const ledCyanMat = new THREE.MeshBasicMaterial({ color: 0x00a2ea });
    const ledPurpleMat = new THREE.MeshBasicMaterial({ color: 0x8b5cf6 });
    const ledMaterials = [ledGreenMat, ledCyanMat, ledPurpleMat];

    towerPositions.forEach((pos, idx) => {
      const tower = new THREE.Mesh(towerGeo, towerMat);
      tower.position.set(...pos);
      platformGroup.add(tower);

      // Add 3 blinking server LED status lights on each tower
      for (let l = 0; l < 3; l++) {
        const ledGeo = new THREE.BoxGeometry(0.24, 0.04, 0.04);
        const ledMesh = new THREE.Mesh(ledGeo, ledMaterials[(idx + l) % 3]);
        ledMesh.position.set(0, 0.3 - l * 0.16, 0.185);
        tower.add(ledMesh);
      }
      serverTowers.push(tower);
    });

    // --- B. Central Quantum Computing Core ---
    const quantumCoreGroup = new THREE.Group();
    quantumCoreGroup.position.set(0, 0.35, 0);
    cyberHubGroup.add(quantumCoreGroup);

    // Pulsating inner energy heart (Sphere)
    const heartGeo = new THREE.SphereGeometry(0.5, 32, 32);
    const heartMat = new THREE.MeshStandardMaterial({
      color: 0x00a2ea,
      emissive: 0x0284c7,
      emissiveIntensity: 1.4,
      roughness: 0.2,
      metalness: 0.5
    });
    const coreHeart = new THREE.Mesh(heartGeo, heartMat);
    quantumCoreGroup.add(coreHeart);

    // Multifaceted Translucent Crystal Icosahedron
    const crystalGeo = new THREE.IcosahedronGeometry(0.82, 0);
    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0369a1,
      emissiveIntensity: 0.6,
      metalness: 0.8,
      roughness: 0.15,
      transparent: true,
      opacity: 0.8
    });
    const crystalCore = new THREE.Mesh(crystalGeo, crystalMat);
    quantumCoreGroup.add(crystalCore);

    // Outer Cyber Wireframe Cage
    const cageGeo = new THREE.IcosahedronGeometry(1.08, 1);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.65
    });
    const outerCage = new THREE.Mesh(cageGeo, cageMat);
    quantumCoreGroup.add(outerCage);

    // --- C. Concentric Gyroscopic Orbital Rings ---
    const ring1Geo = new THREE.TorusGeometry(1.5, 0.022, 16, 80);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x00a2ea });
    const orbitRing1 = new THREE.Mesh(ring1Geo, ring1Mat);
    orbitRing1.rotation.x = 0.5;
    quantumCoreGroup.add(orbitRing1);

    const ring2Geo = new THREE.TorusGeometry(1.9, 0.02, 16, 80);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x818cf8 });
    const orbitRing2 = new THREE.Mesh(ring2Geo, ring2Mat);
    orbitRing2.rotation.y = 0.7;
    orbitRing2.rotation.x = -0.3;
    quantumCoreGroup.add(orbitRing2);

    const ring3Geo = new THREE.TorusGeometry(2.3, 0.018, 16, 80);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const orbitRing3 = new THREE.Mesh(ring3Geo, ring3Mat);
    orbitRing3.rotation.z = 0.6;
    quantumCoreGroup.add(orbitRing3);

    // --- D. 6 Interactive Floating Tech Stack Nodes ---
    const techData = [
      { name: "React 18", symbol: "⚛", subtitle: "Frontend & Three.js", color: "#0284c7", pos: [-2.5, 1.3, 0.6], speed: 1.1 },
      { name: "Flutter", symbol: "📱", subtitle: "iOS & Android Apps", color: "#0ea5e9", pos: [2.5, 1.2, 0.4], speed: 1.3 },
      { name: "Node.js", symbol: "🟢", subtitle: "APIs & Microservices", color: "#16a34a", pos: [-2.2, -0.2, 1.6], speed: 0.9 },
      { name: "PHP Laravel", symbol: "⚡", subtitle: "Enterprise Backend", color: "#dc2626", pos: [2.2, -0.3, 1.5], speed: 1.2 },
      { name: "MySQL 8", symbol: "🐬", subtitle: "Cloud Databases", color: "#0369a1", pos: [0.0, 2.4, -0.5], speed: 1.0 },
      { name: "Python AI", symbol: "🐍", subtitle: "Neural & ML Models", color: "#d97706", pos: [-1.4, 2.2, -1.2], speed: 1.4 }
    ];

    const cubeMeshes = [];
    const conduitLines = [];
    const cubeGeo = new THREE.BoxGeometry(0.72, 0.72, 0.72);

    techData.forEach((tech, index) => {
      const texture = createTechCubeTexture(tech.name, tech.symbol, tech.subtitle, tech.color);
      const cubeMat = new THREE.MeshStandardMaterial({
        map: texture,
        metalness: 0.45,
        roughness: 0.25
      });

      const cube = new THREE.Mesh(cubeGeo, cubeMat);
      cube.position.set(...tech.pos);
      cube.userData = { ...tech, initialY: tech.pos[1], index };
      mainGroup.add(cube);
      cubeMeshes.push(cube);

      // Glowing laser data conduit from central core to tech cube
      const linePositions = new Float32Array([
        0, 0.35, 0,
        tech.pos[0], tech.pos[1], tech.pos[2]
      ]);
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x00a2ea,
        transparent: true,
        opacity: 0.45
      });
      const conduit = new THREE.Line(lineGeo, lineMat);
      mainGroup.add(conduit);
      conduitLines.push({ conduit, cube });
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

      // Animate Quantum Computing Core
      crystalCore.rotation.y = elapsedTime * 0.45;
      crystalCore.rotation.x = elapsedTime * 0.3;
      outerCage.rotation.y = -elapsedTime * 0.35;
      outerCage.rotation.z = elapsedTime * 0.22;

      // Beating energy core heart
      const pulseScale = 1.0 + Math.sin(elapsedTime * 3.5) * 0.08;
      coreHeart.scale.set(pulseScale, pulseScale, pulseScale);

      // Animate Orbital Rings
      orbitRing1.rotation.z = elapsedTime * 0.5;
      orbitRing2.rotation.x = elapsedTime * -0.4;
      orbitRing3.rotation.y = elapsedTime * 0.35;

      // Gentle Cloud Hub Bobbing
      cyberHubGroup.position.y = -0.4 + Math.sin(elapsedTime * 0.9) * 0.06;

      // Animate floating tech cubes and dynamic laser conduits
      cubeMeshes.forEach((cube, i) => {
        const { speed, initialY, index } = cube.userData;
        cube.position.y = initialY + Math.sin(elapsedTime * speed + index) * 0.16;
        cube.rotation.x += 0.008;
        cube.rotation.y += 0.012;

        const isHovered = hoveredTech && hoveredTech.name === cube.userData.name;
        if (isHovered) {
          cube.scale.lerp(new THREE.Vector3(1.22, 1.22, 1.22), 0.1);
        } else {
          cube.scale.lerp(new THREE.Vector3(1.0, 1.0, 1.0), 0.1);
        }

        // Update dynamic laser conduit endpoints
        if (conduitLines[i]) {
          const coreCenterY = cyberHubGroup.position.y + 0.35;
          const posAttr = conduitLines[i].conduit.geometry.attributes.position;
          posAttr.setXYZ(0, 0, coreCenterY, 0);
          posAttr.setXYZ(1, cube.position.x, cube.position.y, cube.position.z);
          posAttr.needsUpdate = true;
          conduitLines[i].conduit.material.opacity = isHovered ? 0.95 : 0.45;
        }
      });

      // Slow particle rotation
      particles.rotation.y = elapsedTime * 0.025;

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

          {/* Right Column: 3D Interactive Cloud Architecture & Tech Nodes */}
          <Col lg={6} className="position-relative">
            <div
              className="hero-canvas-container position-relative"
              ref={mountRef}
              style={{ height: "500px" }}
            >
              {/* Interactive 3D Node Hover Card */}
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
                  <div>
                    <strong className="text-dark small d-block">{hoveredTech.name}</strong>
                    <span className="text-muted" style={{ fontSize: "0.75rem" }}>
                      {hoveredTech.subtitle}
                    </span>
                  </div>
                  <span className="badge bg-primary text-white rounded-pill px-2 py-1 small ms-1">
                    Live Node
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
                <span>Move mouse to explore 3D Cloud Architecture & Tech Nodes</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero3D;
