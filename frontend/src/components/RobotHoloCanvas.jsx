import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function RobotHoloCanvas({ mode = 'steady', mousePos = { x: 0, y: 0 } }) {
  const mountRef = useRef(null);
  const modeRef = useRef(mode);
  const mouseRef = useRef(mousePos);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    mouseRef.current = mousePos;
  }, [mousePos]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 460;
    const height = container.clientHeight || 620;

    // 1. WebGL Scene, Camera, Alpha Renderer with Additive Glow
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. 3D Holographic Gimbal Rings Group
    const gimbalGroup = new THREE.Group();
    scene.add(gimbalGroup);

    // Primary Equatorial Ring with Segmented Wireframe
    const outerGeo = new THREE.TorusGeometry(5.4, 0.035, 16, 80);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    const outerRing = new THREE.Mesh(outerGeo, outerMat);
    outerRing.rotation.x = Math.PI / 3;
    gimbalGroup.add(outerRing);

    // Secondary Inclined Tech Ring (Cyan Laser)
    const midGeo = new THREE.TorusGeometry(4.4, 0.03, 16, 72);
    const midMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const midRing = new THREE.Mesh(midGeo, midMat);
    midRing.rotation.y = Math.PI / 3.5;
    gimbalGroup.add(midRing);

    // Inner Concentric Gyro Core Ring (Electric Magenta)
    const innerGeo = new THREE.TorusGeometry(3.4, 0.045, 16, 60);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xe879f9,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const innerRing = new THREE.Mesh(innerGeo, innerMat);
    innerRing.rotation.x = -Math.PI / 4.5;
    gimbalGroup.add(innerRing);

    // 3. Floating 3D Quantum Geometric Crystals (8 Octahedrons with wireframes)
    const crystalGroup = new THREE.Group();
    scene.add(crystalGroup);
    const crystals = [];

    const crystalGeo = new THREE.OctahedronGeometry(0.28, 0);
    for (let i = 0; i < 8; i++) {
      const crystalMat = new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? 0x06b6d4 : i % 3 === 1 ? 0xc084fc : 0xf43f5e,
        wireframe: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });
      const crystal = new THREE.Mesh(crystalGeo, crystalMat);
      const angle = (i / 8) * Math.PI * 2;
      const radius = 3.9 + (i % 2) * 0.9;
      crystal.position.set(Math.cos(angle) * radius, ((i % 4) - 1.5) * 2.2, Math.sin(angle) * radius);
      crystal.userData = {
        angle,
        radius,
        speed: 0.01 + (i % 3) * 0.005,
        rotSpeed: 0.03 + (i % 2) * 0.02,
        yBase: crystal.position.y,
      };
      crystalGroup.add(crystal);
      crystals.push(crystal);
    }

    // 4. Double Helix Quantum Particle Spiral (280 Additive Particles)
    const particleCount = 280;
    const helixPositions = new Float32Array(particleCount * 3);
    const helixColors = new Float32Array(particleCount * 3);
    const colorViolet = new THREE.Color(0xa855f7);
    const colorCyan = new THREE.Color(0x38bdf8);
    const colorPink = new THREE.Color(0xec4899);

    for (let i = 0; i < particleCount; i++) {
      const strand = i % 2 === 0 ? 0 : Math.PI;
      const t = (i / particleCount) * Math.PI * 5;
      const rad = 2.8 + Math.sin(t * 2) * 0.5;
      const y = (i / particleCount) * 12 - 6;

      helixPositions[i * 3] = Math.cos(t + strand) * rad;
      helixPositions[i * 3 + 1] = y;
      helixPositions[i * 3 + 2] = Math.sin(t + strand) * rad;

      const c = i % 3 === 0 ? colorCyan : i % 3 === 1 ? colorViolet : colorPink;
      helixColors[i * 3] = c.r;
      helixColors[i * 3 + 1] = c.g;
      helixColors[i * 3 + 2] = c.b;
    }

    const helixGeo = new THREE.BufferGeometry();
    helixGeo.setAttribute('position', new THREE.BufferAttribute(helixPositions, 3));
    helixGeo.setAttribute('color', new THREE.BufferAttribute(helixColors, 3));

    const helixMat = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const helixPoints = new THREE.Points(helixGeo, helixMat);
    scene.add(helixPoints);

    // 5. Volumetric Cinematic Ambient Starfield Dust (180 Floating Micro-Points)
    const dustCount = 180;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 14;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.1,
      color: 0xc4b5fd,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    scene.add(dustPoints);

    // 6. Expanding 3D Holographic Shockwave Rings (Continuous Energy Emission)
    const shockwaveGroup = new THREE.Group();
    scene.add(shockwaveGroup);
    const shockwaveRings = [];

    const shockGeo = new THREE.RingGeometry(0.8, 0.95, 48);
    for (let i = 0; i < 3; i++) {
      const shockMat = new THREE.MeshBasicMaterial({
        color: 0xa855f7,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      });
      const shockMesh = new THREE.Mesh(shockGeo, shockMat);
      shockMesh.rotation.x = Math.PI / 2;
      shockMesh.position.y = -4.5;
      shockwaveGroup.add(shockMesh);
      shockwaveRings.push({
        mesh: shockMesh,
        scale: 0.5 + i * 1.5,
        maxScale: 6.0,
        speed: 0.035,
      });
    }

    // 7. Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Mode speed & color multipliers
      const isOverdrive = modeRef.current === 'overdrive';
      const isDiagnostic = modeRef.current === 'diagnostic';
      const speedMult = isOverdrive ? 2.8 : isDiagnostic ? 1.6 : 1.0;

      // Mouse Parallax reaction
      const targetRotX = -mouseRef.current.y * 0.28;
      const targetRotY = mouseRef.current.x * 0.38;

      gimbalGroup.rotation.x += (targetRotX - gimbalGroup.rotation.x) * 0.05;
      gimbalGroup.rotation.y += (targetRotY - gimbalGroup.rotation.y) * 0.05;

      // Rotate individual gimbal rings
      outerRing.rotation.z += 0.006 * speedMult;
      midRing.rotation.x += 0.009 * speedMult;
      innerRing.rotation.y += 0.014 * speedMult;

      // Dynamic color shifts on overdrive
      if (isOverdrive) {
        outerMat.color.setHex(0xf43f5e);
        midMat.color.setHex(0x06b6d4);
        innerMat.color.setHex(0xa855f7);
      } else if (isDiagnostic) {
        outerMat.color.setHex(0x06b6d4);
        midMat.color.setHex(0x10b981);
        innerMat.color.setHex(0x38bdf8);
      } else {
        outerMat.color.setHex(0xa855f7);
        midMat.color.setHex(0x38bdf8);
        innerMat.color.setHex(0xe879f9);
      }

      // Rotate and animate crystals in 3D orbit
      crystals.forEach((crystal) => {
        crystal.userData.angle += crystal.userData.speed * speedMult;
        crystal.position.x = Math.cos(crystal.userData.angle) * crystal.userData.radius;
        crystal.position.z = Math.sin(crystal.userData.angle) * crystal.userData.radius;
        crystal.position.y = crystal.userData.yBase + Math.sin(time * 2.5 + crystal.userData.angle) * 0.35;
        crystal.rotation.x += crystal.userData.rotSpeed;
        crystal.rotation.y += crystal.userData.rotSpeed;
      });

      // Swirl helix particles
      helixPoints.rotation.y += 0.012 * speedMult;
      const positions = helixGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        // Slowly rise upwards
        positions[i * 3 + 1] += 0.024 * speedMult;
        if (positions[i * 3 + 1] > 6) {
          positions[i * 3 + 1] = -6;
        }
      }
      helixGeo.attributes.position.needsUpdate = true;

      // Slow drift of volumetric ambient dust
      dustPoints.rotation.y = time * 0.02 * speedMult;
      dustPoints.rotation.x = Math.sin(time * 0.2) * 0.05;

      // Continuous expanding holographic shockwaves at the base
      shockwaveRings.forEach((ring) => {
        ring.scale += ring.speed * speedMult;
        if (ring.scale > ring.maxScale) {
          ring.scale = 0.5;
        }
        ring.mesh.scale.set(ring.scale, ring.scale, 1);
        const progress = (ring.scale - 0.5) / (ring.maxScale - 0.5);
        // Fade in quickly, then fade out
        ring.mesh.material.opacity = Math.sin(progress * Math.PI) * 0.55 * (isOverdrive ? 1.3 : 1.0);
      });

      // Render
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 460;
      const newH = container.clientHeight || 620;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      outerGeo.dispose();
      outerMat.dispose();
      midGeo.dispose();
      midMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      crystalGeo.dispose();
      helixGeo.dispose();
      helixMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      shockGeo.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
      style={{ opacity: mode === 'overdrive' ? 1 : 0.9 }}
    />
  );
}
