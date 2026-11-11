import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ThreeCanvas — Cinematic Atmospheric Spatial Background
 * Inspired by Apple Vision Pro Spatial UI & Tony Stark Holographic Glass
 * Refined, professional, luxury enterprise aesthetic:
 * - Soft, luminous ambient floating stardust & cyan micro-sparks
 * - Atmospheric depth lighting with smooth violet/cyan radial falloff
 * - Fluid, subtle mouse parallax with damped spring physics
 * - Clutter-free: No jarring retro wireframes or clashing floor grids
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

    // 1. Scene, Camera, WebGL Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 36);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    currentMount.appendChild(renderer.domElement);

    // 2. Sophisticated Holographic Ambient Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xf8fafc, 1.5);
    scene.add(ambientLight);

    const violetGlow = new THREE.PointLight(0xa855f7, 2.2, 80);
    violetGlow.position.set(-20, 16, 20);
    scene.add(violetGlow);

    const cyanGlow = new THREE.PointLight(0x06b6d4, 1.8, 80);
    cyanGlow.position.set(22, -14, 20);
    scene.add(cyanGlow);

    // 3. Dual-Tier Subtle Holographic Particle Constellation
    // Tier A: Micro Stardust (Soft Lavender)
    const starCount = 280;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 90;
      starPositions[i + 1] = (Math.random() - 0.5) * 65;
      starPositions[i + 2] = (Math.random() - 0.5) * 45;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.22,
      color: 0x9333ea,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
    });
    const starParticles = new THREE.Points(starGeo, starMat);
    scene.add(starParticles);

    // Tier B: Cyan Spatial Sparks (Subtle foreground depth)
    const cyanCount = 85;
    const cyanPositions = new Float32Array(cyanCount * 3);
    for (let i = 0; i < cyanCount * 3; i += 3) {
      cyanPositions[i] = (Math.random() - 0.5) * 75;
      cyanPositions[i + 1] = (Math.random() - 0.5) * 55;
      cyanPositions[i + 2] = (Math.random() - 0.5) * 35;
    }
    const cyanGeo = new THREE.BufferGeometry();
    cyanGeo.setAttribute('position', new THREE.BufferAttribute(cyanPositions, 3));
    const cyanMat = new THREE.PointsMaterial({
      size: 0.32,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const cyanParticles = new THREE.Points(cyanGeo, cyanMat);
    scene.add(cyanParticles);

    // 4. Subtle, Soft Luminous Horizon Ring (Understated depth anchor)
    const ringGeo = new THREE.RingGeometry(22, 22.08, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.3;
    ringMesh.position.set(0, -14, -8);
    scene.add(ringMesh);

    // 5. Smooth Damped Mouse Parallax Tracking
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

    // 6. Animation Loop
    let animId;
    let isTabVisible = true;

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isTabVisible) return;

      targetX += (mouseX - targetX) * 0.035;
      targetY += (mouseY - targetY) * 0.035;

      if (!prefersReducedMotion) {
        starParticles.rotation.y += 0.00025;
        cyanParticles.rotation.y += 0.0004;
        ringMesh.rotation.z += 0.0005;

        // Subtle, elegant camera drift
        camera.position.x = targetX * 1.5;
        camera.position.y = -targetY * 1.0;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      starGeo.dispose();
      starMat.dispose();
      cyanGeo.dispose();
      cyanMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-90 overflow-hidden"
    />
  );
}
