import React, { useEffect, useRef, useState } from 'react';

/**
 * SpheronixRobot3D — Ultra-Premium Corporate Humanoid Robot Mascot
 * Inspired by Apple Vision Pro & Tony Stark's Holographic Laboratory
 * Features:
 * - Fluid 3D Gyroscope Mouse Parallax with realistic spring damping
 * - Polished holographic pedestal with subtle concentric glow rings
 * - Multi-depth glassmorphic HUD telemetry tags with 3D elevation
 * - Dynamic ground shadow responding realistically to cursor position
 * - Interactive click feedback with soft holographic radial sweep
 */
export default function SpheronixRobot3D({ className = '' }) {
  const robotRef = useRef(null);
  const containerRef = useRef(null);
  const shadowRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  // Smooth Interactive 3D Gyroscope & Mouse Parallax Physics
  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId;

    const handleMouseMove = (e) => {
      // Calculate normalized mouse offset (-1 to 1) from window center
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const animate = () => {
      // Damped smooth spring interpolation for natural luxury fluidity
      currentX += (mouseX - currentX) * 0.05;
      currentY += (mouseY - currentY) * 0.05;

      if (robotRef.current) {
        // Natural 3D tilt angles (refined: max ~10 deg for tasteful corporate feel)
        const rotY = currentX * 10;
        const rotX = -currentY * 7;
        const transX = currentX * 10;
        const transY = currentY * 6;
        robotRef.current.style.transform = `perspective(1200px) rotateY(${rotY}deg) rotateX(${rotX}deg) translateX(${transX}px) translateY(${transY}px)`;
      }

      // Parallax Shadow Shift (Opposite of light source)
      if (shadowRef.current) {
        const shadowX = -currentX * 12;
        shadowRef.current.style.transform = `translateX(calc(-50% + ${shadowX}px)) rotateX(75deg)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleRobotClick = () => {
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 1000);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleRobotClick}
      title="Click robot to interact!"
      aria-label="SPHERONIX Autonomous 3D Humanoid Robot"
      className={`relative flex flex-col items-center justify-center select-none cursor-pointer group ${className}`}
      style={{ perspective: '1200px' }}
    >
      {/* 1. SOFT AMBIENT STUDIO BACKLIGHT RADIANCE */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 rounded-full pointer-events-none -z-10 transition-all duration-700"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.22) 0%, rgba(99, 102, 241, 0.12) 45%, rgba(6, 182, 212, 0.06) 70%, transparent 85%)',
          filter: 'blur(50px)',
          transform: isHovered ? 'translate(-50%, -50%) scale(1.15)' : 'translate(-50%, -50%) scale(1.0)',
        }}
      />

      {/* 2. MINIMALIST PROFESSIONAL STATUS PILL */}
      <div className="mb-3 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-xl border border-purple-200/90 shadow-[0_4px_16px_rgba(124,58,237,0.1)] flex items-center gap-2 transition-all hover:scale-105 pointer-events-auto">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
        </span>
        <span className="text-[11px] font-extrabold tracking-wider uppercase bg-gradient-to-r from-purple-700 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
          SPHERONIX AI Robotics Lab
        </span>
        <span className="text-lavender-300 text-[10px]">•</span>
        <span className="text-[10px] font-semibold text-lavender-700">Autonomous Core</span>
      </div>

      {/* 3. 3D ROBOT RIG: MOUSE GYRO ROTATION + IDLE BREATHING FLOAT */}
      <div
        ref={robotRef}
        className="relative flex flex-col items-center will-change-transform z-10 transition-transform duration-100 ease-out"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Continuous 3D Zero-G Levitation Oscillation */}
        <div
          className="relative flex flex-col items-center"
          style={{
            animation: 'simplePro3DFloat 6s ease-in-out infinite',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Floating Companion 3D HUD Tag: Top Right */}
          <div
            className="absolute top-8 -right-3 sm:-right-8 pointer-events-none z-30 flex items-center gap-1.5 transition-transform duration-300"
            style={{
              transform: 'translateZ(35px)',
            }}
          >
            <div className="px-2.5 py-1 rounded-xl bg-white/95 backdrop-blur-md border border-purple-200 shadow-[0_6px_20px_rgba(168,85,247,0.18)] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-[10px] font-extrabold text-purple-900 tracking-tight">
                Next.js & LangChain AI
              </span>
            </div>
          </div>

          {/* Floating Companion 3D HUD Tag: Left Mid */}
          <div
            className="absolute top-1/2 -left-3 sm:-left-8 pointer-events-none z-30 flex items-center gap-1.5 transition-transform duration-300"
            style={{
              transform: 'translateZ(25px)',
            }}
          >
            <div className="px-2.5 py-1 rounded-xl bg-white/95 backdrop-blur-md border border-cyan-200 shadow-[0_6px_20px_rgba(6,182,212,0.18)] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-[10px] font-extrabold text-cyan-900 tracking-tight">
                ARM Cortex-M4 Core
              </span>
            </div>
          </div>

          {/* Soft Concentric Hologram Rings Around Robot Waist */}
          <div
            className="absolute top-[50%] -translate-y-1/2 w-64 sm:w-72 h-64 sm:h-72 pointer-events-none -z-5 rounded-full opacity-60"
            style={{
              border: '1px dashed rgba(168, 85, 247, 0.3)',
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.1)',
              animation: 'proGyroRingSpin 16s linear infinite',
              transformStyle: 'preserve-3d',
            }}
          />

          {/* HIGH-RES ROBOT CHASSIS */}
          <div
            className="relative overflow-visible transition-all duration-300"
            style={{
              transform: isHovered
                ? 'translateZ(20px) scale(1.02)'
                : isPulsing
                ? 'translateZ(25px) scale(1.03)'
                : 'translateZ(0px) scale(1.0)',
              filter: isPulsing
                ? 'drop-shadow(0 20px 40px rgba(124, 58, 237, 0.45)) brightness(1.06)'
                : 'drop-shadow(0 16px 30px rgba(124, 58, 237, 0.22))',
            }}
          >
            <img
              src="/spheronix-robot.png"
              alt="SPHERONIX 3D Robot"
              className="h-[430px] sm:h-[490px] lg:h-[530px] xl:h-[560px] w-auto object-contain transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* 4. HOLOGRAPHIC GROUND PEDESTAL & SHADOW */}
      <div className="relative -mt-10 sm:-mt-12 w-64 sm:w-80 h-16 pointer-events-none -z-10 flex items-center justify-center">
        {/* Soft Radial Ambient Shadow */}
        <div
          ref={shadowRef}
          className="absolute left-1/2 top-1/2 w-52 sm:w-64 h-10 rounded-full bg-purple-950/25 blur-md transition-transform duration-100 ease-out"
        />

        {/* Concentric Holographic Ground Rings */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 sm:w-68 h-14 rounded-full border border-purple-400/40 opacity-75"
          style={{
            transform: 'rotateX(75deg)',
            boxShadow: '0 0 16px rgba(168, 85, 247, 0.25), inset 0 0 12px rgba(168, 85, 247, 0.15)',
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 sm:w-48 h-10 rounded-full border border-cyan-400/50 opacity-85"
          style={{
            transform: 'rotateX(75deg)',
            boxShadow: '0 0 12px rgba(6, 182, 212, 0.3)',
          }}
        />
      </div>
    </div>
  );
}
