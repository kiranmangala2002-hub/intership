import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * TechVisualizer3D — Real-time WebGL 3D Visualization for Corporate Tracks
 * - AI Integrated Full Stack: 3D Wireframe Hypercube with Neural Core & Data Beams
 * - Embedded Systems & IoT: 3D Silicon Processor Package with PCB Traces & Bus Signals
 */
export default function TechVisualizer3D({ type = 'fullstack', className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 320;
    const height = currentMount.clientHeight || 120;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(type === 'fullstack' ? 0xa855f7 : 0x00f0ff, 2.8, 20);
    pointLight.position.set(4, 3, 5);
    scene.add(pointLight);

    const group = new THREE.Group();
    scene.add(group);

    let cleanups = [];

    if (type === 'fullstack') {
      // -------------------------------------------------------------
      // 1. AI FULL STACK: 3D WIREFRAME HYPERCUBE + NEURAL CORE
      // -------------------------------------------------------------
      // Outer Hypercube
      const outerCubeGeo = new THREE.BoxGeometry(2.4, 2.4, 2.4);
      const outerEdges = new THREE.EdgesGeometry(outerCubeGeo);
      const outerMat = new THREE.LineBasicMaterial({
        color: 0xa855f7,
        linewidth: 2,
        transparent: true,
        opacity: 0.85,
      });
      const outerWire = new THREE.LineSegments(outerEdges, outerMat);
      group.add(outerWire);

      // Inner Floating Neural Core (Icosahedron)
      const coreGeo = new THREE.IcosahedronGeometry(0.95, 1);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x4c1d95,
        emissive: 0xa855f7,
        emissiveIntensity: 1.2,
        wireframe: true,
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      group.add(coreMesh);

      // Orbiting Data Spheres
      const orbitCount = 6;
      const orbitSpheres = [];
      for (let i = 0; i < orbitCount; i++) {
        const sGeo = new THREE.SphereGeometry(0.12, 12, 12);
        const sMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
        const sMesh = new THREE.Mesh(sGeo, sMat);
        group.add(sMesh);
        orbitSpheres.push(sMesh);
      }

      cleanups.push(() => {
        outerCubeGeo.dispose();
        outerEdges.dispose();
        outerMat.dispose();
        coreGeo.dispose();
        coreMat.dispose();
      });

      // Animate FullStack
      let animId;
      let clock = new THREE.Clock();
      const animate = () => {
        animId = requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        group.rotation.x = Math.sin(elapsed * 0.8) * 0.25;
        group.rotation.y += 0.015;
        coreMesh.rotation.y -= 0.025;
        coreMesh.rotation.z += 0.01;

        // Position orbit spheres
        orbitSpheres.forEach((s, idx) => {
          const angle = elapsed * 2.0 + (idx * (Math.PI * 2 / orbitCount));
          const r = 1.8;
          s.position.set(Math.cos(angle) * r, Math.sin(angle) * 0.8, Math.sin(angle) * r);
        });

        renderer.render(scene, camera);
      };
      animate();
      cleanups.push(() => cancelAnimationFrame(animId));
    } else {
      // -------------------------------------------------------------
      // 2. EMBEDDED IOT: 3D SILICON CHIP + PINS + PCB GLOW
      // -------------------------------------------------------------
      // Silicon Package Base
      const chipGeo = new THREE.BoxGeometry(2.2, 0.4, 2.2);
      const chipMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.3,
        metalness: 0.85,
      });
      const chipMesh = new THREE.Mesh(chipGeo, chipMat);
      group.add(chipMesh);

      // Metallic Heatspreader Top
      const heatGeo = new THREE.BoxGeometry(1.6, 0.1, 1.6);
      const heatMat = new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        metalness: 0.95,
        roughness: 0.15,
        emissive: 0x00f0ff,
        emissiveIntensity: 0.2,
      });
      const heatMesh = new THREE.Mesh(heatGeo, heatMat);
      heatMesh.position.y = 0.25;
      group.add(heatMesh);

      // Golden Pin Arrays along edges
      const pinMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        metalness: 0.95,
        roughness: 0.2,
      });
      const pins = [];
      for (let side = -1; side <= 1; side += 2) {
        for (let p = -3; p <= 3; p++) {
          const pinGeo = new THREE.BoxGeometry(0.08, 0.08, 0.4);
          const pin = new THREE.Mesh(pinGeo, pinMat);
          pin.position.set(p * 0.28, -0.05, side * 1.25);
          group.add(pin);
          pins.push(pin);
        }
      }

      // Orbiting Signal Pulse Rings
      const ringGeo = new THREE.RingGeometry(1.8, 1.88, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x14b8a6,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      });
      const signalRing = new THREE.Mesh(ringGeo, ringMat);
      signalRing.rotation.x = Math.PI / 2;
      group.add(signalRing);

      cleanups.push(() => {
        chipGeo.dispose();
        chipMat.dispose();
        heatGeo.dispose();
        heatMat.dispose();
        ringGeo.dispose();
        ringMat.dispose();
      });

      // Animate IoT Chip
      let animId;
      let clock = new THREE.Clock();
      const animate = () => {
        animId = requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        group.rotation.x = 0.55 + Math.sin(elapsed * 1.2) * 0.12;
        group.rotation.y += 0.016;

        signalRing.scale.setScalar(1 + Math.sin(elapsed * 3.5) * 0.15);
        signalRing.rotation.z += 0.02;

        renderer.render(scene, camera);
      };
      animate();
      cleanups.push(() => cancelAnimationFrame(animId));
    }

    return () => {
      cleanups.forEach((fn) => fn());
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [type]);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-[110px] pointer-events-none overflow-hidden ${className}`}
    />
  );
}
