import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * SpheronixRobot3D — Cinematic 3D Humanoid Robot & Holographic Laboratory Scene
 * Inspired by Iron Man JARVIS & Tony Stark's Holographic Lab
 * Built with Three.js WebGL:
 * - 3D Multi-axis JARVIS Holographic Rings with traveling energy pulses
 * - 3D Floating Tech Cubes & Octahedron Sensor Nodes orbiting in 3D XYZ space
 * - 3D Cyber Core with pulsing Arc Reactor & glowing scanning Visor
 * - Depth-integrated Robot Chassis with dynamic specular & normal lighting
 * - Interactive 3D Cursor Parallax (Head & HUD track cursor in real time)
 * - Click-triggered Quantum Energy Shockwave
 */
export default function SpheronixRobot3D({ className = '' }) {
  const mountRef = useRef(null);
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const shockwaveTriggerRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Detect user motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene, Camera, WebGL Renderer
    const scene = new THREE.Scene();
    const width = currentMount.clientWidth || 480;
    const height = currentMount.clientHeight || 560;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    currentMount.appendChild(renderer.domElement);

    // 2. Dynamic Cinematic Studio Lighting (Tony Stark Lab Palette)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Cyan Key Light (Top Left)
    const cyanKeyLight = new THREE.PointLight(0x00f0ff, 3.5, 40);
    cyanKeyLight.position.set(-8, 6, 8);
    scene.add(cyanKeyLight);

    // Lavender / Violet Rim Light (Right Back)
    const violetRimLight = new THREE.PointLight(0xa855f7, 4.0, 40);
    violetRimLight.position.set(8, -4, 6);
    scene.add(violetRimLight);

    // Front Fill Light
    const frontFillLight = new THREE.DirectionalLight(0xffffff, 1.2);
    frontFillLight.position.set(0, 4, 10);
    scene.add(frontFillLight);

    // 3. 3D ROBOT HOLOGRAPHIC RIG CONTAINER
    const robotRig = new THREE.Group();
    scene.add(robotRig);

    // -------------------------------------------------------------
    // A. 3D CONCENTRIC FLOOR HOLOGRAPHIC PROJECTION RINGS & RADAR
    // -------------------------------------------------------------
    const floorGroup = new THREE.Group();
    floorGroup.position.set(0, -5.2, 0);
    floorGroup.rotation.x = -Math.PI / 2.3;
    robotRig.add(floorGroup);

    // Outer Ring
    const floorRing1Geo = new THREE.RingGeometry(4.2, 4.35, 64);
    const floorRing1Mat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const floorRing1 = new THREE.Mesh(floorRing1Geo, floorRing1Mat);
    floorGroup.add(floorRing1);

    // Mid Cyan Ring
    const floorRing2Geo = new THREE.RingGeometry(3.2, 3.32, 64);
    const floorRing2Mat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const floorRing2 = new THREE.Mesh(floorRing2Geo, floorRing2Mat);
    floorGroup.add(floorRing2);

    // Inner Glowing Ring
    const floorRing3Geo = new THREE.RingGeometry(2.1, 2.18, 48);
    const floorRing3Mat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const floorRing3 = new THREE.Mesh(floorRing3Geo, floorRing3Mat);
    floorGroup.add(floorRing3);

    // Radar Scanning Beam Mesh
    const radarBeamGeo = new THREE.CircleGeometry(4.35, 32, 0, Math.PI / 4);
    const radarBeamMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });
    const radarBeam = new THREE.Mesh(radarBeamGeo, radarBeamMat);
    floorGroup.add(radarBeam);

    // -------------------------------------------------------------
    // B. 3D JARVIS GYROSCOPE ORBIT RINGS (Tilted 3D Hologram)
    // -------------------------------------------------------------
    // Gyro Ring 1: Primary Cyan Ring
    const gyroRing1Geo = new THREE.TorusGeometry(3.6, 0.035, 16, 100);
    const gyroRing1Mat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 1.8,
      roughness: 0.2,
      metalness: 0.9,
    });
    const gyroRing1 = new THREE.Mesh(gyroRing1Geo, gyroRing1Mat);
    gyroRing1.rotation.x = Math.PI / 3;
    gyroRing1.rotation.y = Math.PI / 6;
    robotRig.add(gyroRing1);

    // Gyro Ring 2: Counter Violet Ring
    const gyroRing2Geo = new THREE.TorusGeometry(3.1, 0.03, 16, 100);
    const gyroRing2Mat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0xa855f7,
      emissiveIntensity: 1.6,
      roughness: 0.2,
      metalness: 0.9,
    });
    const gyroRing2 = new THREE.Mesh(gyroRing2Geo, gyroRing2Mat);
    gyroRing2.rotation.x = -Math.PI / 4;
    gyroRing2.rotation.y = -Math.PI / 4;
    robotRig.add(gyroRing2);

    // Traveling Energy Particle on Ring 1
    const particleGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const particleMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      blending: THREE.AdditiveBlending,
    });
    const energyParticle = new THREE.Mesh(particleGeo, particleMat);
    robotRig.add(energyParticle);

    // -------------------------------------------------------------
    // C. 3D FLOATING TECH CUBES & SENSOR NODES (Orbiting in 3D Space)
    // -------------------------------------------------------------
    const nodesGroup = new THREE.Group();
    robotRig.add(nodesGroup);

    // Node 1: AI Quantum Core Cube
    const cube1Geo = new THREE.BoxGeometry(0.55, 0.55, 0.55);
    const cube1Edges = new THREE.EdgesGeometry(cube1Geo);
    const cube1WireMat = new THREE.LineBasicMaterial({ color: 0x00f0ff, linewidth: 2 });
    const cube1Wire = new THREE.LineSegments(cube1Edges, cube1WireMat);
    const cube1CoreMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.6,
      roughness: 0.3,
      metalness: 0.9,
      transparent: true,
      opacity: 0.9,
    });
    const cube1Mesh = new THREE.Mesh(cube1Geo, cube1CoreMat);
    cube1Mesh.add(cube1Wire);
    cube1Mesh.position.set(3.4, 2.2, 1.8);
    nodesGroup.add(cube1Mesh);

    // Node 2: IoT Telemetry Octahedron
    const octaGeo = new THREE.OctahedronGeometry(0.48);
    const octaEdges = new THREE.EdgesGeometry(octaGeo);
    const octaWireMat = new THREE.LineBasicMaterial({ color: 0xa855f7, linewidth: 2 });
    const octaWire = new THREE.LineSegments(octaEdges, octaWireMat);
    const octaCoreMat = new THREE.MeshStandardMaterial({
      color: 0x1e1b4b,
      emissive: 0xa855f7,
      emissiveIntensity: 0.7,
      roughness: 0.2,
      metalness: 0.9,
      transparent: true,
      opacity: 0.85,
    });
    const octaMesh = new THREE.Mesh(octaGeo, octaCoreMat);
    octaMesh.add(octaWire);
    octaMesh.position.set(-3.2, 1.5, -1.2);
    nodesGroup.add(octaMesh);

    // Node 3: Tiny Micro Chip Cube
    const cube2Geo = new THREE.BoxGeometry(0.38, 0.38, 0.38);
    const cube2Mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x38bdf8,
      emissiveIntensity: 1.2,
      roughness: 0.1,
      metalness: 0.95,
    });
    const cube2Mesh = new THREE.Mesh(cube2Geo, cube2Mat);
    cube2Mesh.position.set(2.8, -2.0, 1.5);
    nodesGroup.add(cube2Mesh);

    // Node 4: Dodecahedron Edge AI Core
    const dodecaGeo = new THREE.DodecahedronGeometry(0.42);
    const dodecaMat = new THREE.MeshStandardMaterial({
      color: 0x2e1065,
      emissive: 0xc084fc,
      emissiveIntensity: 0.8,
      wireframe: true,
    });
    const dodecaMesh = new THREE.Mesh(dodecaGeo, dodecaMat);
    dodecaMesh.position.set(-2.8, -1.8, 1.4);
    nodesGroup.add(dodecaMesh);

    // -------------------------------------------------------------
    // D. 3D ROBOT CHASSIS & DEPTH MESH PLANE (High-Res Hologram)
    // -------------------------------------------------------------
    const textureLoader = new THREE.TextureLoader();
    const robotTexture = textureLoader.load('/spheronix-robot.png', () => {
      renderer.render(scene, camera);
    });
    robotTexture.colorSpace = THREE.SRGBColorSpace;

    // Front Robot Silhouette Mesh (Depth Layer 0)
    const robotPlaneGeo = new THREE.PlaneGeometry(6.6, 9.4);
    const robotPlaneMat = new THREE.MeshStandardMaterial({
      map: robotTexture,
      transparent: true,
      roughness: 0.25,
      metalness: 0.8,
      side: THREE.DoubleSide,
      alphaTest: 0.05,
    });
    const robotMesh = new THREE.Mesh(robotPlaneGeo, robotPlaneMat);
    robotMesh.position.set(0, -0.2, 0.1);
    robotRig.add(robotMesh);

    // Glowing Arc Reactor Core Mesh behind/on robot chest (3D Emissive Disk)
    const arcReactorGeo = new THREE.RingGeometry(0.12, 0.38, 32);
    const arcReactorMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const arcReactor = new THREE.Mesh(arcReactorGeo, arcReactorMat);
    arcReactor.position.set(0.1, 1.85, 0.18);
    robotRig.add(arcReactor);

    // Glowing LED Visor Line on Robot Head
    const visorGeo = new THREE.PlaneGeometry(0.7, 0.12);
    const visorMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.position.set(0.1, 3.25, 0.2);
    robotRig.add(visorMesh);

    // -------------------------------------------------------------
    // E. 3D EXPANDING SHOCKWAVE RING (ON CLICK)
    // -------------------------------------------------------------
    const shockwaveGeo = new THREE.RingGeometry(0.2, 0.45, 48);
    const shockwaveMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const shockwaveMesh = new THREE.Mesh(shockwaveGeo, shockwaveMat);
    shockwaveMesh.position.set(0, 0, 0.5);
    scene.add(shockwaveMesh);

    let shockwaveActive = false;
    let shockwaveScale = 1;
    let shockwaveOpacity = 0;

    shockwaveTriggerRef.current = () => {
      shockwaveActive = true;
      shockwaveScale = 1;
      shockwaveOpacity = 1;
      shockwaveMesh.position.set(0, 1.85, 0.5);
    };

    // -------------------------------------------------------------
    // F. MOUSE GYROSCOPE PHYSICS & CAMERA INTERACTION
    // -------------------------------------------------------------
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      if (prefersReducedMotion) return;
      const rect = currentMount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!currentMount) return;
      const newW = currentMount.clientWidth || 480;
      const newH = currentMount.clientHeight || 560;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // -------------------------------------------------------------
    // G. MAIN ANIMATION LOOP
    // -------------------------------------------------------------
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Fluid Spring Damping
      currentX += (mouseX - currentX) * 0.055;
      currentY += (mouseY - currentY) * 0.055;

      if (!prefersReducedMotion) {
        // Robot Rig 3D Parallax Rotation
        robotRig.rotation.y = currentX * 0.38;
        robotRig.rotation.x = -currentY * 0.22;
        robotRig.position.x = currentX * 0.45;
        robotRig.position.y = -currentY * 0.35 + Math.sin(elapsedTime * 1.8) * 0.15; // Zero-G breathing levitation

        // Arc Reactor & Visor Pulsing
        const pulse = Math.sin(elapsedTime * 4.0) * 0.3 + 0.85;
        arcReactor.scale.set(pulse, pulse, 1);
        visorMesh.scale.x = (Math.sin(elapsedTime * 3.0) * 0.15 + 1.0);

        // Gyroscope 3D Rings Rotation
        gyroRing1.rotation.z += 0.012;
        gyroRing1.rotation.y += 0.008;
        gyroRing2.rotation.z -= 0.015;
        gyroRing2.rotation.x += 0.006;

        // Traveling Energy Particle on Gyro 1
        const orbitAngle = elapsedTime * 2.2;
        energyParticle.position.set(
          Math.cos(orbitAngle) * 3.6,
          Math.sin(orbitAngle) * 3.6 * Math.sin(Math.PI / 3),
          Math.sin(orbitAngle) * 3.6 * Math.cos(Math.PI / 3)
        );

        // Floor Rings and Radar Sweep
        radarBeam.rotation.z += 0.025;
        floorRing1.rotation.z += 0.004;
        floorRing2.rotation.z -= 0.006;

        // Orbiting Tech Nodes Rotation in 3D
        cube1Mesh.rotation.x += 0.02;
        cube1Mesh.rotation.y += 0.025;
        cube1Mesh.position.y = 2.2 + Math.sin(elapsedTime * 2.2) * 0.35;

        octaMesh.rotation.x -= 0.018;
        octaMesh.rotation.z += 0.022;
        octaMesh.position.y = 1.5 + Math.cos(elapsedTime * 1.9) * 0.4;

        cube2Mesh.rotation.y += 0.03;
        cube2Mesh.rotation.z += 0.015;

        dodecaMesh.rotation.x += 0.015;
        dodecaMesh.rotation.y -= 0.018;

        // Shockwave Expansion
        if (shockwaveActive) {
          shockwaveScale += 0.45;
          shockwaveOpacity -= 0.035;
          shockwaveMesh.scale.set(shockwaveScale, shockwaveScale, 1);
          shockwaveMat.opacity = Math.max(0, shockwaveOpacity);
          if (shockwaveOpacity <= 0) {
            shockwaveActive = false;
          }
        }

        // Dynamic Point Lights Follow Cursor
        cyanKeyLight.position.x = -8 + currentX * 3;
        violetRimLight.position.x = 8 + currentX * 3;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      // Dispose Geometries and Materials
      floorRing1Geo.dispose();
      floorRing1Mat.dispose();
      floorRing2Geo.dispose();
      floorRing2Mat.dispose();
      floorRing3Geo.dispose();
      floorRing3Mat.dispose();
      radarBeamGeo.dispose();
      radarBeamMat.dispose();
      gyroRing1Geo.dispose();
      gyroRing1Mat.dispose();
      gyroRing2Geo.dispose();
      gyroRing2Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      cube1Geo.dispose();
      cube1CoreMat.dispose();
      cube1WireMat.dispose();
      octaGeo.dispose();
      octaCoreMat.dispose();
      octaWireMat.dispose();
      cube2Geo.dispose();
      cube2Mat.dispose();
      dodecaGeo.dispose();
      dodecaMat.dispose();
      robotPlaneGeo.dispose();
      robotPlaneMat.dispose();
      arcReactorGeo.dispose();
      arcReactorMat.dispose();
      visorGeo.dispose();
      visorMat.dispose();
      shockwaveGeo.dispose();
      shockwaveMat.dispose();
      renderer.dispose();
    };
  }, []);

  const handleContainerClick = () => {
    if (shockwaveTriggerRef.current) {
      shockwaveTriggerRef.current();
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleContainerClick}
      title="Click 3D Mascot to emit a quantum energy shockwave!"
      aria-label="SPHERONIX Autonomous 3D Humanoid Robot"
      className={`relative flex flex-col items-center justify-center select-none cursor-pointer group ${className}`}
      style={{ perspective: '1200px' }}
    >
      {/* 1. SOFT AMBIENT STUDIO BACKLIGHT RADIANCE */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[420px] h-80 sm:h-[420px] rounded-full pointer-events-none -z-10 transition-all duration-700"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, rgba(6, 182, 212, 0.22) 40%, rgba(99, 102, 241, 0.12) 65%, transparent 80%)',
          filter: 'blur(55px)',
          transform: isHovered ? 'translate(-50%, -50%) scale(1.15)' : 'translate(-50%, -50%) scale(1.0)',
        }}
      />

      {/* 2. MINIMALIST PROFESSIONAL STATUS PILL */}
      <div className="mb-2 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-xl border border-purple-200/90 shadow-[0_4px_20px_rgba(124,58,237,0.15)] flex items-center gap-2 transition-all hover:scale-105 pointer-events-auto">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
        </span>
        <span className="text-[11px] font-extrabold tracking-wider uppercase bg-gradient-to-r from-purple-700 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
          SPHERONIX AI Robotics Lab
        </span>
        <span className="text-lavender-300 text-[10px]">•</span>
        <span className="text-[10px] font-bold text-lavender-800">WebGL 3D Core Active</span>
      </div>

      {/* 3. THREE.JS 3D CANVAS MOUNT */}
      <div
        ref={mountRef}
        className="relative w-[340px] sm:w-[440px] lg:w-[480px] h-[460px] sm:h-[530px] lg:h-[580px] pointer-events-none overflow-visible will-change-transform"
      />

      {/* 4. INTERACTIVE 3D HOLOGRAPHIC DATA BADGE (FLOATING BOTTOM) */}
      <div className="mt-1 px-4 py-1.5 rounded-2xl bg-white/90 backdrop-blur-md border border-cyan-200/80 shadow-[0_6px_25px_rgba(6,182,212,0.15)] flex items-center gap-3 transition-all hover:scale-105 pointer-events-auto">
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-cyan-800">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
          <span>ARM Cortex-M4 Core</span>
        </div>
        <span className="text-lavender-300 text-[10px]">|</span>
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-purple-800">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
          <span>Next.js & LangChain AI</span>
        </div>
      </div>
    </div>
  );
}
