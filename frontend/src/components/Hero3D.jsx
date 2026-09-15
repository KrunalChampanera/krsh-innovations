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
    camera.position.set(0, 0.4, 7.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    currentMount.appendChild(renderer.domElement);

    // Root interactive pivot
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // ==========================================
    // 2. BUILD 3D HOLOGRAPHIC CYBER CLOUD GLOBE
    // ==========================================
    const globeGroup = new THREE.Group();
    globeGroup.position.set(0, 0.1, 0);
    mainGroup.add(globeGroup);

    const globeRadius = 1.95;

    // A. Inner Translucent Dark Cyber Sphere
    const innerSphereGeo = new THREE.SphereGeometry(globeRadius, 40, 40);
    const innerSphereMat = new THREE.MeshStandardMaterial({
      color: 0x050c1a,
      metalness: 0.9,
      roughness: 0.2,
      transparent: true,
      opacity: 0.94
    });
    const innerGlobe = new THREE.Mesh(innerSphereGeo, innerSphereMat);
    globeGroup.add(innerGlobe);

    // B. Outer Luminous Geodesic Wireframe
    const latticeGeo = new THREE.IcosahedronGeometry(globeRadius * 1.03, 3);
    const latticeMat = new THREE.MeshBasicMaterial({
      color: 0x00a2ea,
      wireframe: true,
      transparent: true,
      opacity: 0.28
    });
    const latticeMesh = new THREE.Mesh(latticeGeo, latticeMat);
    globeGroup.add(latticeMesh);

    // C. Fibonacci Point-Cloud Matrix on Surface (420 data nodes)
    const pointCount = 420;
    const pointPositions = new Float32Array(pointCount * 3);
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < pointCount; i++) {
      const theta = 2 * Math.PI * i / goldenRatio;
      const phi = Math.acos(1 - 2 * (i + 0.5) / pointCount);
      const r = globeRadius * 1.035;
      pointPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pointPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pointPositions[i * 3 + 2] = r * Math.cos(phi);
    }
    const pointCloudGeo = new THREE.BufferGeometry();
    pointCloudGeo.setAttribute("position", new THREE.BufferAttribute(pointPositions, 3));
    const pointCloudMat = new THREE.PointsMaterial({
      size: 0.045,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.75
    });
    const pointCloud = new THREE.Points(pointCloudGeo, pointCloudMat);
    globeGroup.add(pointCloud);

    // D. Glowing Meridian & Latitude Coordinate Bands
    const ring1Geo = new THREE.TorusGeometry(globeRadius * 1.04, 0.015, 16, 90);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00a2ea, transparent: true, opacity: 0.45 });
    const equatorRing = new THREE.Mesh(ring1Geo, ringMat);
    equatorRing.rotation.x = Math.PI / 2;
    globeGroup.add(equatorRing);

    const meridian1 = new THREE.Mesh(ring1Geo, ringMat);
    meridian1.rotation.y = 0.8;
    globeGroup.add(meridian1);

    const meridian2 = new THREE.Mesh(ring1Geo, ringMat);
    meridian2.rotation.y = -0.8;
    globeGroup.add(meridian2);

    // E. Global Regional Cloud Hub Beacons & Radar Pulse Rings
    const hubCoords = [
      { name: "Silicon Valley", lat: 37, lon: -122, color: 0x00a2ea },
      { name: "London", lat: 51, lon: 0, color: 0x10b981 },
      { name: "Singapore", lat: 1.3, lon: 103, color: 0x38bdf8 },
      { name: "Tokyo", lat: 35, lon: 139, color: 0x818cf8 },
      { name: "Frankfurt", lat: 50, lon: 8.6, color: 0x00a2ea },
      { name: "Sydney", lat: -33, lon: 151, color: 0xf59e0b }
    ];

    const convertGeoToVector = (lat, lon, r) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
    };

    const hubVectors = [];
    const radarRings = [];
    const beaconGeo = new THREE.SphereGeometry(0.07, 16, 16);

    hubCoords.forEach((hub) => {
      const v = convertGeoToVector(hub.lat, hub.lon, globeRadius * 1.035);
      hubVectors.push(v);

      const beaconMat = new THREE.MeshBasicMaterial({ color: hub.color });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.copy(v);
      globeGroup.add(beacon);

      // Radar Pulse Ring lying tangential to surface
      const ringGeo = new THREE.RingGeometry(0.08, 0.12, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: hub.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
      });
      const radarRing = new THREE.Mesh(ringGeo, ringMat);
      radarRing.position.copy(v);
      radarRing.lookAt(new THREE.Vector3(0, 0, 0));
      globeGroup.add(radarRing);
      radarRings.push(radarRing);
    });

    // F. 3D Laser Flight/Data Arcs Connecting Hubs
    const arcPairs = [
      [0, 1], // Silicon Valley -> London
      [1, 4], // London -> Frankfurt
      [4, 2], // Frankfurt -> Singapore
      [2, 3], // Singapore -> Tokyo
      [3, 5]  // Tokyo -> Sydney
    ];

    const photonPulses = [];
    const arcCurves = [];

    arcPairs.forEach(([idxA, idxB]) => {
      const pA = hubVectors[idxA];
      const pB = hubVectors[idxB];
      const mid = pA.clone().add(pB).multiplyScalar(0.5);
      const dist = pA.distanceTo(pB);
      mid.normalize().multiplyScalar(globeRadius * (1.18 + dist * 0.08));

      const curve = new THREE.QuadraticBezierCurve3(pA, mid, pB);
      arcCurves.push(curve);

      const points = curve.getPoints(40);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.55
      });
      const arcLine = new THREE.Line(lineGeo, lineMat);
      globeGroup.add(arcLine);

      // Traveling Photon Data Packet
      const photonGeo = new THREE.SphereGeometry(0.045, 12, 12);
      const photonMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const photon = new THREE.Mesh(photonGeo, photonMat);
      globeGroup.add(photon);
      photonPulses.push({ photon, curve, progress: Math.random() });
    });

    // G. Inner Radiant Glowing Core
    const innerLight = new THREE.PointLight(0x00a2ea, 4.0, 10);
    innerLight.position.set(0, 0, 0);
    globeGroup.add(innerLight);

    // ====================================================
    // 3. 6 FLOATING 3D TECH SATELLITES IN PLANETARY ORBIT
    // ====================================================
    const techData = [
      { name: "React 18", symbol: "⚛", subtitle: "Frontend & 3D Web", color: "#0284c7" },
      { name: "Flutter", symbol: "📱", subtitle: "iOS & Android Apps", color: "#0ea5e9" },
      { name: "Node.js", symbol: "🟢", subtitle: "APIs & Microservices", color: "#10b981" },
      { name: "PHP Laravel", symbol: "⚡", subtitle: "Enterprise Backend", color: "#dc2626" },
      { name: "MySQL 8", symbol: "🐬", subtitle: "Cloud Databases", color: "#0369a1" },
      { name: "Python AI", symbol: "🐍", subtitle: "Neural & ML Models", color: "#d97706" }
    ];

    const satelliteMeshes = [];
    const satelliteConduits = [];
    const satGeo = new THREE.BoxGeometry(0.72, 0.72, 0.72);

    techData.forEach((tech, index) => {
      const texture = createTechCubeTexture(tech.name, tech.symbol, tech.subtitle, tech.color);
      const satMat = new THREE.MeshStandardMaterial({
        map: texture,
        metalness: 0.45,
        roughness: 0.25
      });

      const satellite = new THREE.Mesh(satGeo, satMat);
      satellite.userData = {
        ...tech,
        baseAngle: index * (Math.PI * 2 / techData.length),
        orbitRadiusX: 3.45,
        orbitRadiusZ: 2.7,
        orbitTilt: 0.32,
        speed: 0.35 + (index % 2) * 0.05
      };
      mainGroup.add(satellite);
      satelliteMeshes.push(satellite);

      // Connector laser conduit from satellite to globe center
      const linePositions = new Float32Array(6);
      const conduitGeo = new THREE.BufferGeometry();
      conduitGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
      const conduitMat = new THREE.LineBasicMaterial({
        color: 0x00a2ea,
        transparent: true,
        opacity: 0.4
      });
      const conduit = new THREE.Line(conduitGeo, conduitMat);
      mainGroup.add(conduit);
      satelliteConduits.push(conduit);
    });

    // 4. Subtle Cosmic Ambient Particles
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 14;
      particlePositions[i + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i + 2] = (Math.random() - 0.5) * 10;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.65
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 5. Scene Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(5, 7, 6);
    scene.add(dirLight);

    const cyanRimLight = new THREE.PointLight(0x38bdf8, 2.5, 9);
    cyanRimLight.position.set(-3.5, 2.5, 3);
    scene.add(cyanRimLight);

    const purpleRimLight = new THREE.PointLight(0x818cf8, 2.2, 9);
    purpleRimLight.position.set(3.5, -2, 3);
    scene.add(purpleRimLight);

    // ==========================================
    // 6. INTERACTIVE MOUSE & DRAG-TO-SPIN LOGIC
    // ==========================================
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-1000, -1000);
    let targetRotationX = 0;
    let targetRotationY = 0;

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let dragVelocity = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onMouseMove = (event) => {
      const rect = currentMount.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      mouse.x = x;
      mouse.y = y;

      if (isDragging) {
        const deltaX = event.clientX - previousMousePosition.x;
        const deltaY = event.clientY - previousMousePosition.y;
        dragVelocity.x = deltaX * 0.005;
        dragVelocity.y = deltaY * 0.005;

        globeGroup.rotation.y += dragVelocity.x;
        globeGroup.rotation.x += dragVelocity.y;

        previousMousePosition = { x: event.clientX, y: event.clientY };
      } else {
        targetRotationY = x * 0.28;
        targetRotationX = -y * 0.22;
      }

      // Hover Detection over Satellites
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(satelliteMeshes);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        setHoveredTech(hit.userData);
        currentMount.style.cursor = "pointer";
      } else {
        setHoveredTech(null);
        currentMount.style.cursor = isDragging ? "grabbing" : "grab";
      }
    };

    currentMount.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);

    // Touch support for mobile devices
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - previousMousePosition.x;
        const deltaY = e.touches[0].clientY - previousMousePosition.y;
        globeGroup.rotation.y += deltaX * 0.006;
        globeGroup.rotation.x += deltaY * 0.006;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchEnd = () => {
      isDragging = false;
    };

    currentMount.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // ==========================================
    // 7. 60 FPS DYNAMIC ANIMATION LOOP
    // ==========================================
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Damped Parallax
      if (!isDragging) {
        mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.05;
        mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.05;
        globeGroup.rotation.y += 0.003; // Smooth continuous globe spin
      }

      // Smooth radar pulse wave animation
      radarRings.forEach((ring, i) => {
        const waveScale = 1.0 + ((elapsedTime * 1.5 + i * 0.3) % 1) * 2.2;
        ring.scale.set(waveScale, waveScale, 1);
        ring.material.opacity = Math.max(0, 0.8 - ((elapsedTime * 1.5 + i * 0.3) % 1));
      });

      // Advance photon data packets along arcs
      photonPulses.forEach((item) => {
        item.progress = (item.progress + 0.008) % 1;
        const pt = item.curve.getPoint(item.progress);
        item.photon.position.copy(pt);
      });

      // Animate Orbiting Tech Satellites
      satelliteMeshes.forEach((sat, i) => {
        const { baseAngle, orbitRadiusX, orbitRadiusZ, orbitTilt, speed, name } = sat.userData;
        const angle = baseAngle + elapsedTime * speed;

        const x = Math.cos(angle) * orbitRadiusX;
        const z = Math.sin(angle) * orbitRadiusZ;
        const y = Math.sin(angle) * Math.sin(orbitTilt) * 1.8 + Math.sin(elapsedTime * 1.2 + i) * 0.12;

        sat.position.set(x, y, z);
        sat.rotation.y += 0.012;
        sat.rotation.x += 0.006;

        const isHovered = hoveredTech && hoveredTech.name === name;
        if (isHovered) {
          sat.scale.lerp(new THREE.Vector3(1.25, 1.25, 1.25), 0.1);
        } else {
          sat.scale.lerp(new THREE.Vector3(1.0, 1.0, 1.0), 0.1);
        }

        // Dynamic laser conduit to nearest point on globe surface
        if (satelliteConduits[i]) {
          const globeSurfacePt = sat.position.clone().normalize().multiplyScalar(globeRadius * 1.04);
          const posAttr = satelliteConduits[i].geometry.attributes.position;
          posAttr.setXYZ(0, globeSurfacePt.x, globeSurfacePt.y, globeSurfacePt.z);
          posAttr.setXYZ(1, sat.position.x, sat.position.y, sat.position.z);
          posAttr.needsUpdate = true;
          satelliteConduits[i].material.opacity = isHovered ? 0.95 : 0.35;
        }
      });

      // Rotate cosmic background particles
      particles.rotation.y = elapsedTime * 0.02;

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
      currentMount.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      currentMount.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
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

          {/* Right Column: 3D Interactive Holographic Cyber Globe & Connected Cloud Network */}
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
                    Cloud Satellite
                  </span>
                </div>
              )}

              {/* 3D Hint Badge */}
              <div
                className="position-absolute bg-white bg-opacity-95 px-3 py-1 rounded-pill shadow-sm border border-light-subtle small text-muted d-flex align-items-center gap-2"
                style={{
                  bottom: "4%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 2,
                  pointerEvents: "none"
                }}
              >
                <Sparkles size={14} className="text-primary" />
                <span>Drag to spin 3D Cyber Globe • Hover satellites to inspect stack</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero3D;
