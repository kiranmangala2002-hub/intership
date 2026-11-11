import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ThreeCanvas — Cinematic JARVIS 3D Holographic Laboratory Environment
 * Inspired by Tony Stark's Holographic Lab & Apple Vision Pro Spatial Canvas
 * Features:
 * - 3D Perspective Cyber Grid Floor with animated glowing lines
 * - Floating 3D Holographic Wireframe Polyhedrons (Icosahedrons, Octahedrons, Torus)
 * - Multi-tier glowing neon particle constellation (Cyan & Electric Violet)
 * - Real-time smooth mouse parallax & gyroscopic camera dynamics
 * - Fully optimized with tab-visibility auto-pause
 */
export default function ThreeCanvas({ activePage = 'home' }) {
  const mountRef = useRef(null);
  const activePageRef = useRef(activePage);

  useEffect(() => {
    activePageRef.current = activePage;
  }, [activePage]);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene, Camera, High-Precision WebGL Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 4, 38);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // 2. High-Tech Holographic Studio Lights
    const ambientLight = new THREE.AmbientLight(0xf5f3ff, 1.4);
    scene.add(ambientLight);

    const violetLight = new THREE.PointLight(0xa855f7, 3.5, 95);
    violetLight.position.set(-25, 18, 22);
    scene.add(violetLight);

    const cyanLight = new THREE.PointLight(0x00f0ff, 3.8, 95);
    cyanLight.position.set(25, -12, 22);
    scene.add(cyanLight);

    // -------------------------------------------------------------
    // 3. 3D PERSPECTIVE CYBER GRID FLOOR (TONY STARK LAB HORIZON)
    // -------------------------------------------------------------
    const gridHelper = new THREE.GridHelper(90, 45, 0x00f0ff, 0xa855f7);
    gridHelper.position.set(0, -14, -5);
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.38;
    gridHelper.material.blending = THREE.AdditiveBlending;
    scene.add(gridHelper);

    // Subtle Secondary Horizon Ring
    const horizonRingGeo = new THREE.RingGeometry(24, 24.15, 64);
    const horizonRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const horizonRing = new THREE.Mesh(horizonRingGeo, horizonRingMat);
    horizonRing.rotation.x = Math.PI / 2.2;
    horizonRing.position.set(0, -14, -5);
    scene.add(horizonRing);

    // -------------------------------------------------------------
    // 4. FLOATING 3D HOLOGRAPHIC POLYHEDRONS (SPATIAL ARTIFACTS)
    // -------------------------------------------------------------
    const floatingShapes = [];

    // Shape 1: Large Wireframe Icosahedron (Top Right)
    const icoGeo = new THREE.IcosahedronGeometry(3.2, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoMesh.position.set(22, 12, -10);
    scene.add(icoMesh);
    floatingShapes.push({ mesh: icoMesh, rx: 0.005, ry: 0.007, basePosY: 12 });

    // Shape 2: Cyan Wireframe Octahedron (Mid Left)
    const octGeo = new THREE.OctahedronGeometry(2.4);
    const octMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const octMesh = new THREE.Mesh(octGeo, octMat);
    octMesh.position.set(-24, 4, -8);
    scene.add(octMesh);
    floatingShapes.push({ mesh: octMesh, rx: 0.006, ry: -0.008, basePosY: 4 });

    // Shape 3: Torus Knot Cyber Ring (Bottom Left)
    const knotGeo = new THREE.TorusKnotGeometry(2.0, 0.25, 64, 16);
    const knotMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    knotMesh.position.set(-18, -10, -6);
    scene.add(knotMesh);
    floatingShapes.push({ mesh: knotMesh, rx: 0.004, ry: 0.006, basePosY: -10 });

    // Shape 4: Wireframe Tech Cube (Right Bottom)
    const cubeGeo = new THREE.BoxGeometry(2.5, 2.5, 2.5);
    const cubeMat = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const cubeMesh = new THREE.Mesh(cubeGeo, cubeMat);
    cubeMesh.position.set(20, -8, -4);
    scene.add(cubeMesh);
    floatingShapes.push({ mesh: cubeMesh, rx: -0.006, ry: 0.005, basePosY: -8 });

    // -------------------------------------------------------------
    // 5. PROMINENT 3D NEON LASER PARTICLES (CYAN & VIOLET)
    // -------------------------------------------------------------
    // Cyan Particles
    const cyanCount = 180;
    const cyanPositions = new Float32Array(cyanCount * 3);
    for (let i = 0; i < cyanCount * 3; i += 3) {
      cyanPositions[i] = (Math.random() - 0.5) * 85;
      cyanPositions[i + 1] = (Math.random() - 0.5) * 60;
      cyanPositions[i + 2] = (Math.random() - 0.5) * 50;
    }
    const cyanGeo = new THREE.BufferGeometry();
    cyanGeo.setAttribute('position', new THREE.BufferAttribute(cyanPositions, 3));
    const cyanMat = new THREE.PointsMaterial({
      size: 0.45,
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const cyanParticles = new THREE.Points(cyanGeo, cyanMat);
    scene.add(cyanParticles);

    // Violet Particles
    const violetCount = 220;
    const violetPositions = new Float32Array(violetCount * 3);
    for (let i = 0; i < violetCount * 3; i += 3) {
      violetPositions[i] = (Math.random() - 0.5) * 95;
      violetPositions[i + 1] = (Math.random() - 0.5) * 65;
      violetPositions[i + 2] = (Math.random() - 0.5) * 55;
    }
    const violetGeo = new THREE.BufferGeometry();
    violetGeo.setAttribute('position', new THREE.BufferAttribute(violetPositions, 3));
    const violetMat = new THREE.PointsMaterial({
      size: 0.42,
      color: 0xa855f7,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const violetParticles = new THREE.Points(violetGeo, violetMat);
    scene.add(violetParticles);

    // -------------------------------------------------------------
    // 6. MOUSE PARALLAX & RESIZE LISTENERS
    // -------------------------------------------------------------
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      if (prefersReducedMotion) return;
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // -------------------------------------------------------------
    // 7. ANIMATION LOOP WITH TAB VISIBILITY OPTIMIZATION
    // -------------------------------------------------------------
    let animationFrameId;
    let isTabVisible = true;
    let clock = new THREE.Clock();

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isTabVisible) return;
      const elapsed = clock.getElapsedTime();

      targetX += (mouseX - targetX) * 0.045;
      targetY += (mouseY - targetY) * 0.045;

      if (!prefersReducedMotion) {
        // Floating 3D Wireframe Shapes Rotation and Levitation
        floatingShapes.forEach(({ mesh, rx, ry, basePosY }) => {
          mesh.rotation.x += rx;
          mesh.rotation.y += ry;
          mesh.position.y = basePosY + Math.sin(elapsed * 1.5 + basePosY) * 0.8;
        });

        // Particle Lattice Subtle Drift
        cyanParticles.rotation.y += 0.0008;
        cyanParticles.rotation.x += 0.0004;
        violetParticles.rotation.y -= 0.0006;

        // Cyber Grid Wave Pulse
        gridHelper.position.z = -5 + (Math.sin(elapsed * 0.5) * 1.5);
        horizonRing.rotation.z += 0.0015;

        // Camera Spatial Parallax Follows Cursor
        camera.position.x = targetX * 3.5;
        camera.position.y = 4 + -targetY * 2.2;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      gridHelper.dispose();
      horizonRingGeo.dispose();
      horizonRingMat.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      octGeo.dispose();
      octMat.dispose();
      knotGeo.dispose();
      knotMat.dispose();
      cubeGeo.dispose();
      cubeMat.dispose();
      cyanGeo.dispose();
      cyanMat.dispose();
      violetGeo.dispose();
      violetMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-100 overflow-hidden"
    />
  );
}
