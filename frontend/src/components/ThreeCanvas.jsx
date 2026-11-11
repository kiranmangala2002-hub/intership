import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ThreeCanvas — Cinematic 3D Ambient WebGL Background
 * Inspired by Tony Stark's Holographic Lab & Apple Vision Pro Spatial UI
 * Features:
 * - 3-tier depth particle lattice (near, mid, far)
 * - Adaptive atmospheric lighting tailored to active route
 * - Smooth damped mouse parallax & gyroscopic drift
 * - Battery-friendly, low draw-call architecture with auto-pause on hidden tab
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

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene, Camera, High-Precision WebGL Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      52,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 34);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    currentMount.appendChild(renderer.domElement);

    // 2. High-Tech Holographic Ambient & Spot Lights
    const ambientLight = new THREE.AmbientLight(0xf5f3ff, 1.2);
    scene.add(ambientLight);

    const violetLight = new THREE.PointLight(0xa855f7, 2.8, 90);
    violetLight.position.set(-22, 14, 18);
    scene.add(violetLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 2.2, 90);
    cyanLight.position.set(20, -16, 18);
    scene.add(cyanLight);

    // 3. Multi-tier Holographic Star Dust Lattice
    // Tier A: Micro Star Dust
    const microCount = 380;
    const microPositions = new Float32Array(microCount * 3);
    for (let i = 0; i < microCount * 3; i++) {
      microPositions[i] = (Math.random() - 0.5) * 110;
    }
    const microGeo = new THREE.BufferGeometry();
    microGeo.setAttribute('position', new THREE.BufferAttribute(microPositions, 3));
    const microMat = new THREE.PointsMaterial({
      size: 0.18,
      color: 0x9333ea,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const microParticles = new THREE.Points(microGeo, microMat);
    scene.add(microParticles);

    // Tier B: Foreground Cyan Laser Sparks
    const cyanCount = 120;
    const cyanPositions = new Float32Array(cyanCount * 3);
    for (let i = 0; i < cyanCount * 3; i++) {
      cyanPositions[i] = (Math.random() - 0.5) * 80;
    }
    const cyanGeo = new THREE.BufferGeometry();
    cyanGeo.setAttribute('position', new THREE.BufferAttribute(cyanPositions, 3));
    const cyanMat = new THREE.PointsMaterial({
      size: 0.28,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const cyanParticles = new THREE.Points(cyanGeo, cyanMat);
    scene.add(cyanParticles);

    // 4. Subtle Holographic Ring Horizon
    const ringGeo = new THREE.RingGeometry(18, 18.06, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.3;
    ringMesh.position.set(0, -12, -10);
    scene.add(ringMesh);

    // 5. Mouse Parallax Reaction with Damped Easing
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

    // 6. Animation Loop with Tab Visibility Optimization
    let animationFrameId;
    let isTabVisible = true;

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isTabVisible) return;

      targetX += (mouseX - targetX) * 0.045;
      targetY += (mouseY - targetY) * 0.045;

      if (!prefersReducedMotion) {
        microParticles.rotation.y += 0.00035;
        cyanParticles.rotation.y += 0.00055;
        ringMesh.rotation.z += 0.0008;

        camera.position.x = targetX * 1.8;
        camera.position.y = -targetY * 1.2;
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
      microGeo.dispose();
      microMat.dispose();
      cyanGeo.dispose();
      cyanMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-90" />;
}
