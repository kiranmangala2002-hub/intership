import React, { useState, useEffect } from 'react';

// 13 Partner Companies with exact coordinates, bezier curves, and assigned student alumni avatars
// Arranged in alternating rhythm (Center -> Left -> Right -> Left -> Right...) for organic progression
const COMPANIES = [
  {
    id: 'google',
    name: 'Google',
    logo: '/companies/google.png',
    x: 500,
    y: 95,
    w: 135,
    h: 70,
    curve: 'M 500 240 C 500 190, 500 155, 500 130',
    avatar: '/avatars/avatar1.png',
  },
  {
    id: 'infosys',
    name: 'Infosys',
    logo: '/companies/infosys.png',
    x: 235,
    y: 120,
    w: 120,
    h: 62,
    curve: 'M 425 265 C 365 235, 315 175, 285 145',
    avatar: '/avatars/avatar2.png',
  },
  {
    id: 'stemx',
    name: 'STEMx',
    logo: '/companies/stemx.png',
    x: 765,
    y: 120,
    w: 120,
    h: 62,
    curve: 'M 575 265 C 635 235, 685 175, 715 145',
    avatar: '/avatars/avatar3.png',
  },
  {
    id: 'tcs',
    name: 'TCS',
    logo: '/companies/tcs.png',
    x: 345,
    y: 190,
    w: 115,
    h: 60,
    curve: 'M 425 280 C 410 255, 398 230, 390 208',
    avatar: '/avatars/avatar4.png',
  },
  {
    id: 'intel',
    name: 'Intel',
    logo: '/companies/intel.png',
    x: 655,
    y: 190,
    w: 115,
    h: 60,
    curve: 'M 575 280 C 590 255, 602 230, 610 208',
    avatar: '/avatars/avatar5.png',
  },
  {
    id: 'arm',
    name: 'ARM',
    logo: '/companies/arm.png',
    x: 95,
    y: 285,
    w: 125,
    h: 65,
    curve: 'M 410 300 C 315 295, 225 288, 155 285',
    avatar: '/avatars/student1.png',
  },
  {
    id: 'cognizant',
    name: 'Cognizant',
    logo: '/companies/cognizant.png',
    x: 905,
    y: 285,
    w: 125,
    h: 65,
    curve: 'M 590 300 C 685 295, 775 288, 845 285',
    avatar: '/avatars/student2.png',
  },
  {
    id: 'bosch',
    name: 'Bosch',
    logo: '/companies/bosch.png',
    x: 250,
    y: 340,
    w: 120,
    h: 62,
    curve: 'M 410 315 C 370 320, 335 328, 305 335',
    avatar: '/avatars/student3.png',
  },
  {
    id: 'capgemini',
    name: 'Capgemini',
    logo: '/companies/capgemini.png',
    x: 750,
    y: 340,
    w: 120,
    h: 62,
    curve: 'M 590 315 C 630 320, 665 328, 695 335',
    avatar: '/avatars/student4.png',
  },
  {
    id: 'accenture',
    name: 'Accenture',
    logo: '/companies/accenture.png',
    x: 165,
    y: 450,
    w: 140,
    h: 72,
    curve: 'M 420 330 C 335 355, 270 385, 225 420',
    avatar: '/avatars/student5.png',
  },
  {
    id: 'microchip',
    name: 'Microchip',
    logo: '/companies/microchip.png',
    x: 835,
    y: 450,
    w: 138,
    h: 70,
    curve: 'M 580 330 C 665 355, 730 385, 775 420',
    avatar: '/avatars/avatar1.png',
  },
  {
    id: 'amd',
    name: 'AMD',
    logo: '/companies/amd.png',
    x: 365,
    y: 480,
    w: 120,
    h: 62,
    curve: 'M 440 345 C 415 385, 385 415, 365 448',
    avatar: '/avatars/avatar2.png',
  },
  {
    id: 'verizon',
    name: 'Verizon',
    logo: '/companies/verizon.png',
    x: 635,
    y: 480,
    w: 120,
    h: 62,
    curve: 'M 560 345 C 585 385, 615 415, 635 448',
    avatar: '/avatars/avatar3.png',
  },
];

export default function PlacementTreeNetwork() {
  const [hoveredCompany, setHoveredCompany] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  // Sequential progression: Each connection activates ONE AFTER THE OTHER
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % COMPANIES.length);
    }, 2400); // 2.4 seconds per company connection

    return () => clearInterval(interval);
  }, []);

  const currentComp = COMPANIES[activeStep];
  const effectiveActiveName = hoveredCompany || (currentComp ? currentComp.name : null);

  return (
    <div className="relative w-full py-8 sm:py-12">
      {/* SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-sky-600 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
          WHERE OUR STUDENTS LAND
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Careers that land <br className="hidden sm:inline" />
          where it counts.
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-3 max-w-xl mx-auto leading-relaxed">
          From our technical training batches to premier product engineering teams, our alumni secure verified careers at global technology leaders.
        </p>
      </div>

      {/* ========================================================= */}
      {/* DESKTOP & TABLET: SEQUENTIAL ONE-AFTER-OTHER NETWORK      */}
      {/* ========================================================= */}
      <div className="hidden md:block relative w-full max-w-6xl mx-auto h-[600px] select-none">
        {/* Soft Background Radial Radiance */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] bg-gradient-to-tr from-sky-200/20 via-purple-100/25 to-sky-100/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* SVG CONNECTING CURVES WITH SEQUENTIAL TRAVELING AVATAR ANIMATIONS */}
        <svg
          viewBox="0 0 1000 600"
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Circular Clip for Traveling Student Avatars */}
            <clipPath id="avatarCircleClip">
              <circle cx="0" cy="0" r="13" />
            </clipPath>

            {/* Avatar Drop Shadow Filter */}
            <filter id="avatarDropShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="rgba(0,0,0,0.22)" />
            </filter>

            {/* Active Laser Pulse Gradient */}
            <linearGradient id="activeBeamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>

          {/* 1. Base Subtle Tree Network Connections (Always visible for tree architecture) */}
          {COMPANIES.map((comp) => {
            const isCurrentlyActive = comp.name === effectiveActiveName;
            return (
              <path
                key={`base-curve-${comp.id}`}
                d={comp.curve}
                fill="none"
                stroke={isCurrentlyActive ? '#6366f1' : '#cbd5e1'}
                strokeWidth={isCurrentlyActive ? 2.8 : 1.5}
                strokeOpacity={isCurrentlyActive ? 1 : 0.45}
                strokeDasharray={isCurrentlyActive ? 'none' : '4 4'}
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            );
          })}

          {/* 2. Active Glowing Connection Line (One at a time, or hovered) */}
          {COMPANIES.map((comp) => {
            const isCurrentlyActive = comp.name === effectiveActiveName;
            if (!isCurrentlyActive) return null;
            return (
              <g key={`glow-group-${comp.id}`}>
                {/* Soft outer glow */}
                <path
                  d={comp.curve}
                  fill="none"
                  stroke="#818cf8"
                  strokeWidth="5"
                  strokeOpacity="0.35"
                  strokeLinecap="round"
                />
                {/* Flowing illuminated laser line */}
                <path
                  d={comp.curve}
                  fill="none"
                  stroke="url(#activeBeamGradient)"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
              </g>
            );
          })}

          {/* 3. STUDENT AVATAR TRAVELING ONE AFTER THE OTHER (Same Animation Style) */}
          {currentComp && (
            <g key={`active-trav-${activeStep}-${currentComp.id}`}>
              {/* Motion along the bezier curve from center to company */}
              <animateMotion
                path={currentComp.curve}
                dur="2.0s"
                fill="freeze"
                rotate="0"
              />

              {/* Smooth fade-in from center and soft land at company card */}
              <animate
                attributeName="opacity"
                values="0; 1; 1; 0.95; 0"
                keyTimes="0; 0.12; 0.78; 0.94; 1"
                dur="2.0s"
                fill="freeze"
              />

              {/* White Circular Shell with Drop Shadow */}
              <circle cx="0" cy="0" r="14" fill="#ffffff" filter="url(#avatarDropShadow)" />
              <circle cx="0" cy="0" r="13.5" fill="none" stroke="#6366f1" strokeWidth="1.5" />

              {/* Circular Student Portrait Image */}
              <image
                href={currentComp.avatar}
                x="-13"
                y="-13"
                width="26"
                height="26"
                clipPath="url(#avatarCircleClip)"
                preserveAspectRatio="xMidYMid slice"
              />
            </g>
          )}

          {/* Extra instant response if user hovers over a different company */}
          {hoveredCompany && hoveredCompany !== currentComp?.name && (() => {
            const hComp = COMPANIES.find((c) => c.name === hoveredCompany);
            if (!hComp) return null;
            return (
              <g key={`hover-trav-${hComp.id}`}>
                <animateMotion
                  path={hComp.curve}
                  dur="1.8s"
                  repeatCount="indefinite"
                  rotate="0"
                />
                <circle cx="0" cy="0" r="14" fill="#ffffff" filter="url(#avatarDropShadow)" />
                <circle cx="0" cy="0" r="13.5" fill="none" stroke="#a855f7" strokeWidth="1.5" />
                <image
                  href={hComp.avatar}
                  x="-13"
                  y="-13"
                  width="26"
                  height="26"
                  clipPath="url(#avatarCircleClip)"
                  preserveAspectRatio="xMidYMid slice"
                />
              </g>
            );
          })()}
        </svg>

        {/* ========================================================= */}
        {/* CENTER HUB: SPHERONIX LOGO + HIRING PARTNERS (NO COUNT) */}
        {/* ========================================================= */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center text-center p-3"
          style={{ width: 220 }}
        >
          {/* SPHERONIX Company Logo */}
          <div className="h-14 flex items-center justify-center mb-1">
            <img
              src="/logo.png"
              alt="SPHERONIX Technologies Pvt. Ltd"
              className="max-h-12 w-auto object-contain mix-blend-multiply transition-transform hover:scale-105"
            />
          </div>

          {/* Subtitle */}
          <div className="text-[11px] font-extrabold tracking-widest uppercase text-purple-700 bg-purple-50/90 px-3 py-0.5 rounded-full border border-purple-200/80 mt-1 shadow-2xs">
            HIRING PARTNERS
          </div>
        </div>

        {/* ========================================================= */}
        {/* 13 FLOATING COMPANY CARDS (HIGHLIGHT ONE AFTER OTHER)    */}
        {/* ========================================================= */}
        {COMPANIES.map((comp) => {
          const isCurrentlyActive = comp.name === effectiveActiveName;
          return (
            <div
              key={comp.id}
              onMouseEnter={() => setHoveredCompany(comp.name)}
              onMouseLeave={() => setHoveredCompany(null)}
              className="absolute z-10 flex items-center justify-center cursor-pointer transition-all duration-300"
              style={{
                left: `${comp.x / 10}%`,
                top: `${comp.y / 6}%`,
                transform: 'translate(-50%, -50%)',
                width: comp.w,
                height: comp.h,
              }}
            >
              <div
                className={`w-full h-full rounded-2xl sm:rounded-3xl bg-white flex items-center justify-center p-3.5 transition-all duration-400 ${
                  isCurrentlyActive
                    ? 'shadow-[0_16px_36px_rgba(99,102,241,0.26)] -translate-y-1.5 scale-105 border-2 border-indigo-400 ring-2 ring-indigo-200/70'
                    : 'shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-slate-100 hover:shadow-[0_12px_28px_rgba(0,0,0,0.1)]'
                }`}
              >
                <img
                  src={comp.logo}
                  alt={comp.name}
                  className="max-h-full max-w-[82%] object-contain"
                />
              </div>
            </div>
          );
        })}

        {/* Live Sequential Connection Status Pill */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-semibold text-indigo-700 bg-white/95 backdrop-blur-md py-1.5 px-4 rounded-full border border-indigo-100 shadow-sm transition-all flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Connecting Trainees: <strong className="text-purple-800">{effectiveActiveName}</strong></span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE VIEW (< 768px): SEQUENTIAL HIGHLIGHTING CLUSTER    */}
      {/* ========================================================= */}
      <div className="block md:hidden relative p-5 rounded-3xl bg-gradient-to-b from-white via-sky-50/20 to-white border border-slate-200/80 shadow-md">
        {/* Center SPHERONIX Hub */}
        <div className="text-center flex flex-col items-center justify-center mb-6 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
          <img
            src="/logo.png"
            alt="SPHERONIX Technologies"
            className="h-10 w-auto object-contain mix-blend-multiply mb-2"
          />
          <div className="text-[11px] font-extrabold tracking-widest uppercase text-purple-700 bg-purple-50 px-3 py-0.5 rounded-full border border-purple-200 mt-1">
            HIRING PARTNERS
          </div>
        </div>

        {/* Responsive Grid with Active Step Highlight */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {COMPANIES.map((comp) => {
            const isCurrentlyActive = comp.name === effectiveActiveName;
            return (
              <div
                key={comp.id}
                className={`h-16 p-3 rounded-2xl bg-white flex items-center justify-center transition-all duration-300 ${
                  isCurrentlyActive
                    ? 'border-2 border-indigo-400 ring-2 ring-indigo-200 shadow-md scale-102'
                    : 'border border-slate-100 shadow-xs'
                }`}
              >
                <img
                  src={comp.logo}
                  alt={comp.name}
                  className="max-h-full max-w-[80%] object-contain"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
