import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas({ activePage = 'home' }) {
  const mountRef = useRef(null);
  const activePageRef = useRef(activePage);

  useEffect(() => {
    activePageRef.current = activePage;
  }, [activePage]);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // 1. Scene, Camera, High-Precision WebGL Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 32);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // 2. High-Tech Lavender Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0xf5f3ff, 1.4);
    scene.add(ambientLight);

    const violetLight = new THREE.PointLight(0x8b5cf6, 2.5, 80);
    violetLight.position.set(-20, 10, 15);
    scene.add(violetLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 2.0, 80);
    cyanLight.position.set(15, -15, 15);
    scene.add(cyanLight);

    // 3. Subtle Ambient Floating Star Dust (Soft Lavender & Violet particles)
    const particleCount = 350;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      particlePositions[i] = (Math.random() - 0.5) * 90;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.16,
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.35,
    });
    const starDust = new THREE.Points(particleGeo, particleMat);
    scene.add(starDust);

    // 4. Mouse Parallax Reaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
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

    // 5. Animation Loop
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Gentle floating particle drift
      starDust.rotation.y += 0.0003;
      starDust.rotation.x = -targetY * 0.08;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-90" />;
}
