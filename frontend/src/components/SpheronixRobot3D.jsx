import React, { useEffect, useRef, useState } from 'react';

export default function SpheronixRobot3D({ className = '' }) {
  const robotRef = useRef(null);
  const containerRef = useRef(null);
  const shadowRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [lightOffset, setLightOffset] = useState({ x: 0, y: 0 });

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
      // Damped smooth spring interpolation for professional fluidity
      currentX += (mouseX - currentX) * 0.055;
      currentY += (mouseY - currentY) * 0.055;

      setLightOffset({ x: -currentX * 25, y: -currentY * 20 });

      if (robotRef.current) {
        // Natural 3D tilt angles (max ~15 deg for tasteful, professional feel)
        const rotY = currentX * 15;
        const rotX = -currentY * 10;
        const transX = currentX * 12;
        const transY = currentY * 7;
        robotRef.current.style.transform = `perspective(1200px) rotateY(${rotY}deg) rotateX(${rotX}deg) translateX(${transX}px) translateY(${transY}px)`;
      }

      // Parallax Shadow Shift (Light source moves in opposition)
      if (shadowRef.current) {
        const shadowX = -currentX * 14;
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

  // Interactive 3D Quantum Wave Burst on Click
  const handleRobotClick = () => {
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 1200);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleRobotClick}
      title="Click robot to emit a 3D quantum wave!"
      aria-label="SPHERONIX Autonomous 3D Humanoid Robot"
      className={`relative flex flex-col items-center justify-center select-none cursor-pointer ${className}`}
      style={{ perspective: '1200px' }}
    >
      {/* 1. SOFT AMBIENT STUDIO BACKLIGHT RADIANCE */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 rounded-full pointer-events-none -z-10 transition-all duration-700"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.28) 0%, rgba(99, 102, 241, 0.16) 45%, rgba(243, 232, 255, 0.05) 70%, transparent 85%)',
          filter: 'blur(45px)',
          transform: isHovered ? 'translate(-50%, -50%) scale(1.18)' : 'translate(-50%, -50%) scale(1.0)',
        }}
      />

      {/* 2. MINIMALIST PROFESSIONAL STATUS PILL */}
      <div className="mb-3 px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-xl border border-lavender-200/90 shadow-[0_4px_16px_rgba(124,58,237,0.08)] flex items-center gap-2 transition-all hover:scale-105 pointer-events-auto">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-[11px] font-extrabold tracking-wider uppercase bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
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
            animation: 'simplePro3DFloat 5.5s ease-in-out infinite',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* ========================================================= */}
          {/* 3D FLOATING COMPANION TECH NODES (Foreground & Background) */}
          {/* ========================================================= */}
          {/* Node 1: Foreground Right Tech Cube (Z: +55px) */}
          <div
            className="absolute -top-2 -right-4 sm:-right-8 pointer-events-none z-30 flex items-center gap-1.5"
            style={{
              transform: 'translateZ(55px)',
              animation: 'proCubeSpin1 6.5s ease-in-out infinite',
            }}
          >
            <div className="w-7 h-7 rounded-xl bg-white/85 backdrop-blur-md border border-purple-200/90 shadow-[0_4px_16px_rgba(168,85,247,0.25)] flex items-center justify-center text-xs text-purple-700">
              ⚡
            </div>
            <span className="text-[9px] font-bold text-purple-800 bg-white/80 px-2 py-0.5 rounded-full border border-purple-100 shadow-2xs hidden sm:inline">
              AI Core
            </span>
          </div>

          {/* Node 2: Background Left Sensor Node (Z: -30px) */}
          <div
            className="absolute top-1/2 -left-4 sm:-left-8 pointer-events-none -z-10 flex items-center gap-1.5"
            style={{
              transform: 'translateZ(-30px)',
              animation: 'proCubeSpin2 7.5s ease-in-out infinite',
            }}
          >
            <span className="text-[9px] font-bold text-cyan-800 bg-white/80 px-2 py-0.5 rounded-full border border-cyan-100 shadow-2xs hidden sm:inline">
              IoT Telemetry
            </span>
            <div className="w-6 h-6 rounded-lg bg-white/85 backdrop-blur-md border border-cyan-200/90 shadow-[0_4px_14px_rgba(6,182,212,0.22)] flex items-center justify-center text-[11px] text-cyan-700">
              📡
            </div>
          </div>

          {/* ========================================================= */}
          {/* DUAL 3D GYROSCOPE ORBIT RINGS (Tilted 3D Waist & Base Orbit) */}
          {/* ========================================================= */}
          {/* Outer Gyro Ring with Traveling Micro-Particle */}
          <div
            className="absolute top-[48%] -translate-y-1/2 w-64 sm:w-72 h-64 sm:h-72 pointer-events-none -z-5 rounded-full"
            style={{
              border: '1.2px dashed rgba(168, 85, 247, 0.35)',
              boxShadow: '0 0 15px rgba(168, 85, 247, 0.15)',
              animation: 'proGyroRingSpin 10s linear infinite',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Glowing Orbit Particle */}
            <div
              className="w-2.5 h-2.5 rounded-full bg-purple-500 absolute top-0 left-1/2 -translate-x-1/2"
              style={{
                boxShadow: '0 0 12px #a855f7, 0 0 20px #c084fc',
              }}
            />
          </div>

          {/* Inner Counter-Rotating Ring */}
          <div
            className="absolute top-[52%] -translate-y-1/2 w-52 sm:w-56 h-52 sm:h-56 pointer-events-none -z-6 rounded-full"
            style={{
              border: '1px dotted rgba(56, 189, 248, 0.38)',
              animation: 'proGyroRingSpinReverse 8s linear infinite',
              transformStyle: 'preserve-3d',
            }}
          />

          {/* ========================================================= */}
          {/* MAIN 3D ROBOT BODY IMAGE & DYNAMIC LIGHTING HIGHLIGHTS   */}
          {/* ========================================================= */}
          <div
            className="relative overflow-hidden rounded-3xl transition-transform duration-500"
            style={{
              transform: isHovered
                ? 'translateZ(38px) scale(1.025)'
                : isPulsing
                ? 'translateZ(45px) scale(1.04)'
                : 'translateZ(0px) scale(1.0)',
              filter: isPulsing
                ? 'drop-shadow(0 25px 45px rgba(124, 58, 237, 0.6)) brightness(1.1)'
                : 'drop-shadow(0 20px 35px rgba(124, 58, 237, 0.35))',
            }}
          >
            <img
              src="/spheronix-robot.png"
              alt="SPHERONIX 3D Robot"
              className="h-[430px] sm:h-[490px] lg:h-[530px] xl:h-[570px] w-auto object-contain transition-all duration-300 contrast-[1.03]"
            />

            {/* Dynamic Specular Sheen (Shifts with Mouse Tracking!) */}
            <div
              className="absolute -inset-full w-[250%] h-[250%] pointer-events-none z-20 transition-transform duration-200"
              style={{
                background:
                  'linear-gradient(115deg, transparent 42%, rgba(255, 255, 255, 0.45) 50%, rgba(216, 180, 254, 0.45) 53%, transparent 58%)',
                animation: 'proArmorSheen 6.0s ease-in-out infinite',
                transform: `translateX(${lightOffset.x}px) translateY(${lightOffset.y}px)`,
              }}
            />

            {/* Visor Eye Laser Glance Scan */}
            <div className="absolute top-[18.2%] left-[34%] w-[32%] h-5 pointer-events-none overflow-hidden z-25 flex items-center">
              <div
                className="absolute h-1 rounded-full"
                style={{
                  width: '35%',
                  background: 'linear-gradient(90deg, transparent, #38bdf8 40%, #ffffff 50%, #a855f7 60%, transparent)',
                  boxShadow: '0 0 12px #38bdf8, 0 0 20px #818cf8',
                  animation: 'visorLaserScan 3.8s ease-in-out infinite',
                }}
              />
            </div>

            {/* Chest Quantum Core Singularity */}
            <div
              className="absolute top-[35.2%] left-1/2 -translate-x-1/2 w-8 h-8 rounded-full pointer-events-none z-22 flex items-center justify-center"
              style={{
                background: 'radial-gradient(circle, rgba(56, 189, 248, 0.6) 0%, rgba(168, 85, 247, 0.3) 60%, transparent 80%)',
                boxShadow: isPulsing
                  ? '0 0 28px rgba(56, 189, 248, 1), 0 0 45px rgba(168, 85, 247, 0.8)'
                  : '0 0 16px rgba(56, 189, 248, 0.75)',
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
            </div>

            {/* Interactive Click 3D Quantum Ripple Wave */}
            {isPulsing && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                <div
                  className="w-40 h-40 rounded-full border-2 border-purple-400"
                  style={{
                    animation: 'quantumPulseWave 1.0s cubic-bezier(0.1, 0.8, 0.3, 1) forwards',
                    boxShadow: '0 0 25px #a855f7, inset 0 0 20px #06b6d4',
                  }}
                />
              </div>
            )}
          </div>

          {/* ========================================================= */}
          {/* MICRO ZERO-G FLOATING ENERGY EMBERS                      */}
          {/* ========================================================= */}
          <div className="absolute bottom-10 inset-x-0 h-40 pointer-events-none overflow-hidden flex justify-around">
            <span
              className="w-1.5 h-1.5 rounded-full bg-purple-400"
              style={{
                animation: 'microEmberFloat 4.2s ease-in infinite',
                animationDelay: '0.3s',
                boxShadow: '0 0 8px #c084fc',
              }}
            />
            <span
              className="w-2 h-2 rounded-full bg-cyan-400"
              style={{
                animation: 'microEmberFloat 4.8s ease-in infinite',
                animationDelay: '1.6s',
                boxShadow: '0 0 10px #38bdf8',
              }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full bg-indigo-400"
              style={{
                animation: 'microEmberFloat 3.9s ease-in infinite',
                animationDelay: '2.5s',
                boxShadow: '0 0 8px #818cf8',
              }}
            />
          </div>
        </div>

        {/* 4. DYNAMIC 3D CONTACT GROUND SHADOW (EXPANDS, CONTRACTS & SHIFTS WITH MOUSE) */}
        <div
          ref={shadowRef}
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-56 sm:w-64 h-12 rounded-full pointer-events-none -z-10 transition-all duration-300"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(76, 29, 149, 0.55) 0%, rgba(124, 58, 237, 0.25) 45%, transparent 75%)',
            animation: 'proContactShadow 5.5s ease-in-out infinite',
          }}
        />

        {/* 5. MINIMALIST HOLOGRAPHIC STASIS PEDESTAL RING (AT FEET) */}
        <div
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-64 sm:w-72 h-64 sm:h-72 rounded-full pointer-events-none -z-20"
          style={{
            border: '1.5px dashed rgba(168, 85, 247, 0.4)',
            boxShadow: 'inset 0 0 18px rgba(168, 85, 247, 0.2), 0 0 20px rgba(124, 58, 237, 0.15)',
            animation: 'proStasisRing 16s linear infinite',
            transform: 'translateX(-50%) rotateX(75deg)',
          }}
        />
      </div>
    </div>
  );
}
