import React, { useState, useEffect, useRef } from 'react';

// 13 Partner Companies with exact coordinates, bezier curves, and assigned student alumni avatars
const COMPANIES = [
  {
    id: 'google',
    name: 'Google',
    logo: '/companies/google.png',
    x: 500,
    y: 95,
    w: 135,
    h: 70,
    curve: 'M 500 235 C 500 195, 500 160, 500 130',
  },
  {
    id: 'infosys',
    name: 'Infosys',
    logo: '/companies/infosys.png',
    x: 235,
    y: 120,
    w: 120,
    h: 62,
    curve: 'M 430 255 C 375 220, 330 185, 295 150',
  },
  {
    id: 'stemx',
    name: 'STEMx',
    logo: '/companies/stemx.png',
    x: 765,
    y: 120,
    w: 120,
    h: 62,
    curve: 'M 570 255 C 625 220, 670 185, 705 150',
  },
  {
    id: 'tcs',
    name: 'TCS',
    logo: '/companies/tcs.png',
    x: 345,
    y: 190,
    w: 115,
    h: 60,
    curve: 'M 430 275 C 415 255, 405 235, 395 220',
  },
  {
    id: 'intel',
    name: 'Intel',
    logo: '/companies/intel.png',
    x: 655,
    y: 190,
    w: 115,
    h: 60,
    curve: 'M 570 275 C 585 255, 595 235, 605 220',
  },
  {
    id: 'arm',
    name: 'ARM',
    logo: '/companies/arm.png',
    x: 95,
    y: 285,
    w: 125,
    h: 65,
    curve: 'M 400 300 C 310 295, 225 290, 160 285',
  },
  {
    id: 'cognizant',
    name: 'Cognizant',
    logo: '/companies/cognizant.png',
    x: 905,
    y: 285,
    w: 125,
    h: 65,
    curve: 'M 600 300 C 690 295, 775 290, 840 285',
  },
  {
    id: 'bosch',
    name: 'Bosch',
    logo: '/companies/bosch.png',
    x: 250,
    y: 340,
    w: 120,
    h: 62,
    curve: 'M 410 320 C 370 325, 340 335, 310 340',
  },
  {
    id: 'capgemini',
    name: 'Capgemini',
    logo: '/companies/capgemini.png',
    x: 750,
    y: 340,
    w: 120,
    h: 62,
    curve: 'M 590 320 C 630 325, 660 335, 690 340',
  },
  {
    id: 'accenture',
    name: 'Accenture',
    logo: '/companies/accenture.png',
    x: 165,
    y: 450,
    w: 140,
    h: 72,
    curve: 'M 420 345 C 340 375, 280 395, 235 420',
  },
  {
    id: 'microchip',
    name: 'Microchip',
    logo: '/companies/microchip.png',
    x: 835,
    y: 450,
    w: 138,
    h: 70,
    curve: 'M 580 345 C 660 375, 720 395, 765 420',
  },
  {
    id: 'amd',
    name: 'AMD',
    logo: '/companies/amd.png',
    x: 365,
    y: 480,
    w: 120,
    h: 62,
    curve: 'M 445 365 C 415 400, 385 425, 365 448',
  },
  {
    id: 'verizon',
    name: 'Verizon',
    logo: '/companies/verizon.png',
    x: 635,
    y: 480,
    w: 120,
    h: 62,
    curve: 'M 555 365 C 585 400, 615 425, 635 448',
  },
];

// High-resolution alumni student portraits
const AVATAR_POOL = [
  '/avatars/v_student1.png',
  '/avatars/v_student2.png',
  '/avatars/v_student3.png',
  '/avatars/avatar1.png',
  '/avatars/avatar2.png',
  '/avatars/avatar3.png',
  '/avatars/avatar4.png',
  '/avatars/avatar5.png',
  '/avatars/student1.png',
  '/avatars/student2.png',
  '/avatars/student3.png',
  '/avatars/student4.png',
  '/avatars/student5.png',
];

// Alternating cross-network placement path cycle (matches organic video progression)
const ROUTE_SEQUENCE = [
  'google',
  'intel',
  'infosys',
  'capgemini',
  'tcs',
  'accenture',
  'cognizant',
  'bosch',
  'microchip',
  'arm',
  'amd',
  'stemx',
  'verizon',
];

export default function PlacementTreeNetwork() {
  const [hoveredCompany, setHoveredCompany] = useState(null);
  const [displayCount, setDisplayCount] = useState(0);
  const [travelers, setTravelers] = useState([]);
  const [activeHighlights, setActiveHighlights] = useState({});
  const [replayKey, setReplayKey] = useState(0);

  const nextRouteIndexRef = useRef(0);
  const travelerIdCounterRef = useRef(0);
  const containerRef = useRef(null);

  // 1. ANIMATED COUNTER (0+ to 3,000+ cubic ease-out over ~5.2s)
  useEffect(() => {
    let startTime = null;
    let animId;
    const target = 3000;
    const duration = 5200;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out: 1 - (1 - progress)^3
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setDisplayCount(Math.floor(easeOut * target));

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setDisplayCount(target);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [replayKey]);

  // 2. MULTI-AVATAR TRAVELING PIPELINE (2-3 concurrent avatars continuously traveling)
  const spawnTraveler = (targetCompanyId = null) => {
    const compId = targetCompanyId || ROUTE_SEQUENCE[nextRouteIndexRef.current % ROUTE_SEQUENCE.length];
    if (!targetCompanyId) {
      nextRouteIndexRef.current += 1;
    }

    const company = COMPANIES.find((c) => c.id === compId);
    if (!company) return;

    const travelerId = `trv_${++travelerIdCounterRef.current}`;
    const avatar = AVATAR_POOL[travelerIdCounterRef.current % AVATAR_POOL.length];
    const duration = 2.8; // 2.8s flight time

    const newTraveler = {
      id: travelerId,
      companyId: company.id,
      companyName: company.name,
      curve: company.curve,
      avatar,
      duration,
      createdAt: Date.now(),
    };

    setTravelers((prev) => {
      const active = prev.filter((t) => Date.now() - t.createdAt < t.duration * 1000);
      return [...active, newTraveler];
    });

    // When avatar reaches the company (~88% of duration), highlight company card
    setTimeout(() => {
      setActiveHighlights((prev) => ({
        ...prev,
        [company.id]: Date.now(),
      }));
    }, duration * 1000 * 0.88);
  };

  useEffect(() => {
    // Launch initial wave
    spawnTraveler();
    const t1 = setTimeout(() => spawnTraveler(), 500);

    // Continuous ticker every 1100ms
    const interval = setInterval(() => {
      spawnTraveler();
    }, 1100);

    return () => {
      clearTimeout(t1);
      clearInterval(interval);
    };
  }, [replayKey]);

  // Manual replay trigger
  const handleReplay = () => {
    setReplayKey((k) => k + 1);
    setTravelers([]);
    setActiveHighlights({});
    setDisplayCount(0);
  };

  // When hovering a specific company, spawn a traveler directly towards it
  const handleCardHover = (comp) => {
    setHoveredCompany(comp.name);
    spawnTraveler(comp.id);
  };

  return (
    <div ref={containerRef} className="relative w-full py-10 sm:py-16 select-none">
      {/* SECTION HEADER (EXACTLY MATCHES VIDEO) */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 px-4">
        <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-sky-600 bg-sky-50/80 px-3 py-1 rounded-full border border-sky-100 mb-3 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
          WHERE OUR STUDENTS LAND
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Careers that land <br className="hidden sm:inline" />
          where it counts.
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-3 max-w-xl mx-auto leading-relaxed">
          From our technical training batches to premier product engineering teams, our alumni secure verified careers at global technology leaders.
        </p>
      </div>

      {/* ========================================================= */}
      {/* DESKTOP & TABLET: DYNAMIC MULTI-AVATAR TREE NETWORK       */}
      {/* ========================================================= */}
      <div className="hidden md:block relative w-full max-w-6xl mx-auto h-[600px]">
        {/* Soft Radial Ambient Radiance */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] bg-gradient-to-tr from-sky-200/25 via-indigo-100/30 to-purple-100/20 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* SVG BEZIER CURVES & MULTI-AVATAR TRAVELERS */}
        <svg
          viewBox="0 0 1000 600"
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Circular Clip for Student Portraits */}
            <clipPath id="avatarCircleClip">
              <circle cx="0" cy="0" r="13" />
            </clipPath>

            {/* Soft Shadow for Flying Avatar Badges */}
            <filter id="avatarDropShadow" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="rgba(15,23,42,0.22)" />
            </filter>

            {/* Glowing Gradient Laser Beam */}
            <linearGradient id="activeBeamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>

            {/* Soft Beam Glow Filter */}
            <filter id="beamGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. BASE SOLID TREE NETWORK BEZIER CURVES (Matching Video) */}
          {COMPANIES.map((comp) => {
            const isHovered = hoveredCompany === comp.name;
            const hasActiveTraveler = travelers.some((t) => t.companyId === comp.id);
            const isLanded = activeHighlights[comp.id] && Date.now() - activeHighlights[comp.id] < 1200;
            const isLit = isHovered || hasActiveTraveler || isLanded;

            return (
              <path
                key={`base-curve-${comp.id}`}
                d={comp.curve}
                fill="none"
                stroke={isLit ? '#818cf8' : '#cbd5e1'}
                strokeWidth={isLit ? 2.5 : 1.5}
                strokeOpacity={isLit ? 0.95 : 0.65}
                strokeLinecap="round"
                className="transition-colors duration-300"
              />
            );
          })}

          {/* 2. ACTIVE GLOWING LASER BEAMS FOR TRAVELERS & HOVER */}
          {COMPANIES.map((comp) => {
            const isHovered = hoveredCompany === comp.name;
            const hasActiveTraveler = travelers.some((t) => t.companyId === comp.id);
            const isLanded = activeHighlights[comp.id] && Date.now() - activeHighlights[comp.id] < 1200;
            const isLit = isHovered || hasActiveTraveler || isLanded;

            if (!isLit) return null;

            return (
              <g key={`glow-${comp.id}`}>
                {/* Diffuse soft outer glow */}
                <path
                  d={comp.curve}
                  fill="none"
                  stroke="#818cf8"
                  strokeWidth="5.5"
                  strokeOpacity="0.32"
                  strokeLinecap="round"
                />
                {/* Bright core gradient line */}
                <path
                  d={comp.curve}
                  fill="none"
                  stroke="url(#activeBeamGradient)"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  filter="url(#beamGlow)"
                />
              </g>
            );
          })}

          {/* 3. CONCURRENT TRAVELING STUDENT AVATARS (EXACTLY LIKE VIDEO) */}
          {travelers.map((trv) => (
            <g key={trv.id}>
              {/* GPU-Accelerated Path Motion */}
              <animateMotion
                path={trv.curve}
                dur={`${trv.duration}s`}
                fill="freeze"
                rotate="0"
              />

              {/* Smooth Fade-in at start & soft fade into destination card */}
              <animate
                attributeName="opacity"
                values="0; 1; 1; 0.95; 0"
                keyTimes="0; 0.12; 0.82; 0.94; 1"
                dur={`${trv.duration}s`}
                fill="freeze"
              />

              {/* Gentle Scale Easing */}
              <animateTransform
                attributeName="transform"
                type="scale"
                values="0.45; 1; 1; 0.65"
                keyTimes="0; 0.15; 0.85; 1"
                dur={`${trv.duration}s`}
                fill="freeze"
                additive="sum"
              />

              {/* Outer Cyan Energy Ring Pulse */}
              <circle cx="0" cy="0" r="16" fill="none" stroke="#38bdf8" strokeWidth="1.2" opacity="0.65">
                <animate attributeName="r" values="14; 20; 14" dur="1.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8; 0.15; 0.8" dur="1.2s" repeatCount="indefinite" />
              </circle>

              {/* Crisp White Drop-Shadow Shell */}
              <circle cx="0" cy="0" r="14.5" fill="#ffffff" filter="url(#avatarDropShadow)" />
              <circle cx="0" cy="0" r="14" fill="none" stroke="#6366f1" strokeWidth="1.6" />

              {/* Student Portrait Image */}
              <image
                href={trv.avatar}
                x="-13"
                y="-13"
                width="26"
                height="26"
                clipPath="url(#avatarCircleClip)"
                preserveAspectRatio="xMidYMid slice"
              />
            </g>
          ))}
        </svg>

        {/* ========================================================= */}
        {/* CENTER HUB: SPHERONIX LOGO + 3,000+ HIRING PARTNERS       */}
        {/* ========================================================= */}
        <div
          onClick={handleReplay}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center text-center p-3 cursor-pointer group"
          style={{ width: 240 }}
          title="Click to replay animation"
        >
          {/* Luminous Ambient Aura behind central hub */}
          <div className="absolute inset-0 -m-8 rounded-full bg-gradient-to-tr from-sky-300/35 via-indigo-200/25 to-purple-200/35 blur-2xl pointer-events-none -z-10 group-hover:scale-110 transition-transform duration-500" />

          {/* SPHERONIX Company Logo */}
          <div className="h-13 flex items-center justify-center mb-1">
            <img
              src="/logo.png"
              alt="SPHERONIX Technologies Pvt. Ltd"
              className="max-h-12 w-auto object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Animated Counter (0+ to 3,000+) Exactly like the video */}
          <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-mono my-0.5">
            {displayCount.toLocaleString()}+
          </div>

          {/* Subtitle Badge */}
          <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-indigo-700 bg-indigo-50/90 px-3.5 py-1 rounded-full border border-indigo-200/80 shadow-2xs mt-0.5 group-hover:bg-indigo-100 transition-colors">
            HIRING PARTNERS
          </div>
        </div>

        {/* ========================================================= */}
        {/* 13 FLOATING COMPANY CARDS                                 */}
        {/* ========================================================= */}
        {COMPANIES.map((comp) => {
          const isHovered = hoveredCompany === comp.name;
          const isLanded = activeHighlights[comp.id] && Date.now() - activeHighlights[comp.id] < 1200;
          const hasActiveTraveler = travelers.some((t) => t.companyId === comp.id);
          const isActive = isHovered || isLanded || hasActiveTraveler;

          return (
            <div
              key={comp.id}
              onMouseEnter={() => handleCardHover(comp)}
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
                className={`w-full h-full rounded-2xl sm:rounded-3xl bg-white flex items-center justify-center p-3.5 transition-all duration-300 relative ${
                  isActive
                    ? 'shadow-[0_16px_36px_rgba(99,102,241,0.28)] -translate-y-1.5 scale-105 border-2 border-indigo-400 ring-4 ring-indigo-100'
                    : 'shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-slate-100 hover:shadow-[0_12px_28px_rgba(0,0,0,0.1)] hover:-translate-y-1'
                }`}
              >
                <img
                  src={comp.logo}
                  alt={comp.name}
                  className="max-h-full max-w-[82%] object-contain transition-transform duration-300"
                />

                {/* Subtle success pulse when student lands */}
                {isLanded && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-white" />
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {/* Live Network Activity Pill */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-semibold text-indigo-700 bg-white/95 backdrop-blur-md py-1.5 px-4 rounded-full border border-indigo-100 shadow-sm transition-all flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Active Placement Network: <strong className="text-purple-800">{hoveredCompany || 'Continuous Live Placement Streams'}</strong></span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE VIEW (< 768px): ANIMATED COUNTER + DYNAMIC CARDS   */}
      {/* ========================================================= */}
      <div className="block md:hidden relative p-5 rounded-3xl bg-gradient-to-b from-white via-sky-50/20 to-white border border-slate-200/80 shadow-md mx-4">
        {/* Center SPHERONIX Hub */}
        <div
          onClick={handleReplay}
          className="text-center flex flex-col items-center justify-center mb-6 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm relative overflow-hidden cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-sky-200/30 via-indigo-100/20 to-purple-100/30 blur-xl pointer-events-none" />
          <img
            src="/logo.png"
            alt="SPHERONIX Technologies"
            className="h-10 w-auto object-contain mix-blend-multiply mb-1 relative z-10"
          />
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono my-1 relative z-10">
            {displayCount.toLocaleString()}+
          </div>
          <div className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-indigo-700 bg-indigo-50 px-3 py-0.5 rounded-full border border-indigo-200 relative z-10">
            HIRING PARTNERS
          </div>
        </div>

        {/* Responsive Grid with Active Highlight Cycle */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {COMPANIES.map((comp) => {
            const isLanded = activeHighlights[comp.id] && Date.now() - activeHighlights[comp.id] < 1200;
            const isHovered = hoveredCompany === comp.name;
            const isActive = isLanded || isHovered;
            return (
              <div
                key={comp.id}
                onClick={() => handleCardHover(comp)}
                className={`h-16 p-3 rounded-2xl bg-white flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? 'border-2 border-indigo-500 ring-2 ring-indigo-200 shadow-md scale-102'
                    : 'border border-slate-100 shadow-2xs'
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

      {/* FOOTER SUBTEXT (MATCHING VIDEO) */}
      <p className="text-xs sm:text-sm text-slate-500 text-center max-w-2xl mx-auto mt-8 px-4 leading-relaxed">
        Every learner who finishes at SPHERONIX walks into a hiring network 3,000+
      </p>
    </div>
  );
}
