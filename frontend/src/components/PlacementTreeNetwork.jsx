import React, { useState, useEffect } from 'react';

// 10 Premier Hiring Partners arranged in a balanced elliptical radial network (0 collisions, 0 overlapping curves)
// Coordinates in a 1000 x 620 SVG viewBox
const PARTNER_COMPANIES = [
  {
    id: 'google',
    name: 'Google',
    logo: '/companies/google.png',
    x: 500,
    y: 75,
    w: 128,
    h: 62,
    curve: 'M 500 245 C 500 185, 500 140, 500 110',
    placedStudent: 'K. Sai Teja Reddy',
    college: 'JNTUA College of Engineering, Anantapur',
    role: 'AI Systems Engineer',
    package: '₹14.5 LPA',
    color: '#4285F4',
    avatarLetter: 'K',
  },
  {
    id: 'intel',
    name: 'Intel',
    logo: '/companies/intel.png',
    x: 745,
    y: 125,
    w: 120,
    h: 58,
    curve: 'M 570 260 C 635 210, 690 170, 725 145',
    placedStudent: 'B. Dinesh Naidu',
    college: 'SKUCE, Anantapur',
    role: 'IoT Edge Developer',
    package: '₹12.0 LPA',
    color: '#0071C5',
    avatarLetter: 'B',
  },
  {
    id: 'tcs',
    name: 'TCS',
    logo: '/companies/tcs.png',
    x: 885,
    y: 240,
    w: 118,
    h: 58,
    curve: 'M 590 295 C 690 280, 785 265, 840 245',
    placedStudent: 'P. Charan Kumar',
    college: 'PVKKIT, Anantapur',
    role: 'Cloud Application Engineer',
    package: '₹9.2 LPA',
    color: '#0047BA',
    avatarLetter: 'P',
  },
  {
    id: 'capgemini',
    name: 'Capgemini',
    logo: '/companies/capgemini.png',
    x: 885,
    y: 380,
    w: 122,
    h: 58,
    curve: 'M 590 325 C 690 340, 785 355, 840 375',
    placedStudent: 'G. Vamsi Krishna',
    college: 'ALITS, Anantapur',
    role: 'Full Stack Architect',
    package: '₹10.5 LPA',
    color: '#0070AD',
    avatarLetter: 'G',
  },
  {
    id: 'cognizant',
    name: 'Cognizant',
    logo: '/companies/cognizant.png',
    x: 745,
    y: 495,
    w: 122,
    h: 58,
    curve: 'M 570 355 C 635 405, 690 445, 725 475',
    placedStudent: 'K. Manoj Kumar',
    college: 'JNTUA CEA, Anantapur',
    role: 'Software Engineer',
    package: '₹9.8 LPA',
    color: '#1F4788',
    avatarLetter: 'M',
  },
  {
    id: 'microchip',
    name: 'Microchip',
    logo: '/companies/microchip.png',
    x: 500,
    y: 545,
    w: 126,
    h: 60,
    curve: 'M 500 375 C 500 435, 500 480, 500 510',
    placedStudent: 'S. Navya Sree',
    college: 'ALITS, Anantapur',
    role: 'Firmware & TinyML Engineer',
    package: '₹11.0 LPA',
    color: '#ED1C24',
    avatarLetter: 'S',
  },
  {
    id: 'verizon',
    name: 'Verizon',
    logo: '/companies/verizon.png',
    x: 255,
    y: 495,
    w: 118,
    h: 58,
    curve: 'M 430 355 C 365 405, 310 445, 275 475',
    placedStudent: 'T. Sumanth',
    college: 'SRIT, Anantapur',
    role: 'Network Automation Specialist',
    package: '₹10.2 LPA',
    color: '#CD040B',
    avatarLetter: 'T',
  },
  {
    id: 'amd',
    name: 'AMD',
    logo: '/companies/amd.png',
    x: 115,
    y: 380,
    w: 118,
    h: 58,
    curve: 'M 410 325 C 310 340, 215 355, 160 375',
    placedStudent: 'V. Bhavani Prasad',
    college: 'Gates Institute, Anantapur',
    role: 'Hardware Validation Engineer',
    package: '₹13.0 LPA',
    color: '#ED1C24',
    avatarLetter: 'V',
  },
  {
    id: 'bosch',
    name: 'Bosch',
    logo: '/companies/bosch.png',
    x: 115,
    y: 240,
    w: 118,
    h: 58,
    curve: 'M 410 295 C 310 280, 215 265, 160 245',
    placedStudent: 'A. Lavanya',
    college: 'CRIT, Anantapur',
    role: 'Embedded Automotive Systems',
    package: '₹11.5 LPA',
    color: '#EA1C24',
    avatarLetter: 'A',
  },
  {
    id: 'infosys',
    name: 'Infosys',
    logo: '/companies/infosys.png',
    x: 255,
    y: 125,
    w: 120,
    h: 58,
    curve: 'M 430 260 C 365 210, 310 170, 275 145',
    placedStudent: 'M. Harika Chowdary',
    college: 'SRIT, Rotarypuram, Anantapur',
    role: 'Full Stack Engineer',
    package: '₹9.5 LPA',
    color: '#007CC3',
    avatarLetter: 'H',
  },
];

export default function PlacementTreeNetwork() {
  const [hoveredCompany, setHoveredCompany] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [placedCount, setPlacedCount] = useState(3000);

  // Smooth sequential rotation between partners every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % PARTNER_COMPANIES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Subtle animated counter effect
  useEffect(() => {
    const counterTimer = setInterval(() => {
      setPlacedCount((prev) => (prev >= 3050 ? 3000 : prev + 1));
    }, 4500);
    return () => clearInterval(counterTimer);
  }, []);

  const currentComp = hoveredCompany
    ? PARTNER_COMPANIES.find((c) => c.id === hoveredCompany) || PARTNER_COMPANIES[activeStep]
    : PARTNER_COMPANIES[activeStep];

  return (
    <div className="relative w-full py-10 sm:py-16 overflow-hidden">
      {/* SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 px-4">
        <div className="inline-flex items-center gap-2 text-[11px] font-black tracking-widest uppercase text-purple-700 bg-purple-100/90 px-3.5 py-1 rounded-full border border-purple-200/80 mb-3 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          VERIFIED CORPORATE PLACEMENT NETWORK
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-lavender-950 tracking-tight leading-tight">
          Where our talent lands <br className="hidden sm:inline" />
          powers the industry.
        </h2>
        <p className="text-xs sm:text-sm text-lavender-700 mt-3 max-w-xl mx-auto leading-relaxed">
          From intensive hands-on lab sprints to tier-1 technology leaders. Explore the direct talent pipeline connecting SPHERONIX graduates to top product companies.
        </p>
      </div>

      {/* ========================================================= */}
      {/* DESKTOP & TABLET: PURE RADIAL ELLIPSE NETWORK (NO OVERLAPS) */}
      {/* ========================================================= */}
      <div className="hidden md:block relative w-full max-w-6xl mx-auto h-[620px] select-none">
        {/* Ambient Radial Energy Backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[480px] bg-gradient-to-tr from-purple-200/35 via-indigo-100/30 to-sky-100/20 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* SVG Dynamic Connection Conduits */}
        <svg
          viewBox="0 0 1000 620"
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Active Laser Pulse Gradient */}
            <linearGradient id="activeBeamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="1" />
              <stop offset="50%" stopColor="#6366f1" stopOpacity="1" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="1" />
            </linearGradient>

            {/* Ambient Conduits Flow Gradient */}
            <linearGradient id="ambientConduitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#818cf8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.3" />
            </linearGradient>

            {/* Glow Filter for High-Energy Lasers */}
            <filter id="laserBloom" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Base Guide Conduits (Always visible with subtle dash for high-tech look) */}
          {PARTNER_COMPANIES.map((comp) => {
            const isMatch = comp.id === currentComp.id;
            return (
              <g key={`conduit-${comp.id}`}>
                {/* Subtle Base Path */}
                <path
                  d={comp.curve}
                  fill="none"
                  stroke={isMatch ? '#818cf8' : '#cbd5e1'}
                  strokeWidth={isMatch ? 2.5 : 1.4}
                  strokeOpacity={isMatch ? 0.9 : 0.55}
                  strokeDasharray={isMatch ? 'none' : '4 6'}
                  strokeLinecap="round"
                  className="transition-all duration-400"
                />

                {/* Gentle Ambient Moving Energy Dash (continuous flow) */}
                <path
                  d={comp.curve}
                  fill="none"
                  stroke="url(#ambientConduitGrad)"
                  strokeWidth="2"
                  strokeDasharray="14 140"
                  strokeLinecap="round"
                  style={{
                    animation: `treeEnergyFlow ${isMatch ? '1.8s' : '4s'} linear infinite`,
                  }}
                />
              </g>
            );
          })}

          {/* 2. Highlighted Active Radiant Laser Stream for currentComp */}
          {currentComp && (
            <g key={`active-beam-${currentComp.id}`}>
              {/* Outer Radiant Bloom */}
              <path
                d={currentComp.curve}
                fill="none"
                stroke="#818cf8"
                strokeWidth="7"
                strokeOpacity="0.4"
                filter="url(#laserBloom)"
                strokeLinecap="round"
              />
              {/* Intense Inner Core Laser */}
              <path
                d={currentComp.curve}
                fill="none"
                stroke="url(#activeBeamGrad)"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* 3. Smooth Traveling Candidate Photon Badge along active curve */}
          {currentComp && (
            <g key={`photon-${currentComp.id}-${activeStep}`}>
              <animateMotion
                path={currentComp.curve}
                dur="2.4s"
                fill="freeze"
                rotate="0"
              />
              <animate
                attributeName="opacity"
                values="0; 1; 1; 0.9; 0"
                keyTimes="0; 0.15; 0.82; 0.95; 1"
                dur="2.4s"
                fill="freeze"
              />

              {/* Glowing Outer Particle Shield */}
              <circle cx="0" cy="0" r="14" fill="#ffffff" filter="url(#laserBloom)" />
              <circle cx="0" cy="0" r="13" fill="#6366f1" />
              <circle cx="0" cy="0" r="12" fill="#7c3aed" />

              {/* Student Initial Letter Badge */}
              <text
                x="0"
                y="4.5"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="11"
                fontWeight="900"
                fontFamily="sans-serif"
              >
                {currentComp.avatarLetter}
              </text>
            </g>
          )}
        </svg>

        {/* ========================================================= */}
        {/* CENTER HUB: SPHERONIX LOGO + 3,000+ PLACED + STATUS       */}
        {/* ========================================================= */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center text-center p-5 bg-white/95 backdrop-blur-xl border-2 border-purple-300/80 rounded-3xl shadow-[0_20px_50px_rgba(124,58,237,0.18)] transition-all duration-300 hover:shadow-[0_25px_60px_rgba(124,58,237,0.28)]"
          style={{ width: 230 }}
        >
          {/* Company Official Logo */}
          <div className="h-12 flex items-center justify-center mb-1.5">
            <img
              src="/logo.png"
              alt="SPHERONIX Technologies Pvt. Ltd"
              className="max-h-11 w-auto object-contain mix-blend-multiply"
            />
          </div>

          {/* Dynamic Placed Counter */}
          <div className="mt-1">
            <span className="text-2xl font-black text-lavender-950 tracking-tight block">
              {placedCount.toLocaleString()}+
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700 bg-purple-100/90 px-3 py-0.5 rounded-full border border-purple-200 mt-0.5 inline-block">
              HIRING PARTNERS
            </span>
          </div>

          {/* Pulsing Status Dot */}
          <div className="flex items-center gap-1.5 mt-2 text-[10px] font-bold text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Active Talent Pipeline</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 10 SATELLITE PARTNER CARDS IN CLEAN ELLIPTICAL ORBIT      */}
        {/* ========================================================= */}
        {PARTNER_COMPANIES.map((comp) => {
          const isSelected = comp.id === currentComp.id;
          return (
            <div
              key={comp.id}
              onMouseEnter={() => setHoveredCompany(comp.id)}
              onMouseLeave={() => setHoveredCompany(null)}
              className="absolute z-10 flex flex-col items-center justify-center cursor-pointer transition-all duration-400"
              style={{
                left: `${comp.x / 10}%`,
                top: `${comp.y / 6.2}%`,
                transform: 'translate(-50%, -50%)',
                width: comp.w,
                height: comp.h,
              }}
            >
              <div
                className={`w-full h-full rounded-2xl bg-white/95 backdrop-blur-md flex items-center justify-center p-3.5 transition-all duration-400 relative ${
                  isSelected
                    ? 'shadow-[0_14px_34px_rgba(99,102,241,0.3)] -translate-y-2 scale-108 border-2 border-indigo-500 ring-4 ring-indigo-200/60'
                    : 'shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-lavender-200/90 hover:-translate-y-1 hover:shadow-md hover:border-purple-300'
                }`}
              >
                {/* Company Logo Image */}
                <img
                  src={comp.logo}
                  alt={comp.name}
                  className="max-h-7 max-w-[85%] object-contain filter transition-transform duration-300"
                />

                {/* Active Highlight Beacon Corner */}
                {isSelected && (
                  <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-xs animate-ping" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* ACTIVE PLACEMENT ROUTE SPOTLIGHT (CLEAN & INFORMATIVE)   */}
      {/* ========================================================= */}
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div className="p-4 sm:p-5 rounded-3xl bg-white/90 backdrop-blur-xl border border-lavender-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-black text-lg flex items-center justify-center shadow-2xs flex-shrink-0">
              {currentComp.avatarLetter}
            </div>
            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="text-xs font-black text-lavender-950">
                  {currentComp.placedStudent}
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {currentComp.package}
                </span>
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                  {currentComp.role}
                </span>
              </div>
              <p className="text-[11px] text-lavender-600 mt-0.5">
                Alumni from <strong>{currentComp.college}</strong> → Placed at <strong>{currentComp.name}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-lavender-600 hidden lg:inline">
              Hover any card to inspect path
            </span>
            <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
          </div>
        </div>

        {/* 4 Key Placement Statistics Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <div className="p-3 rounded-2xl bg-white/80 border border-lavender-200/80 text-center shadow-2xs">
            <span className="text-lg font-black text-purple-700 block">3,000+</span>
            <span className="text-[10px] font-bold text-lavender-600 uppercase">Trained & Placed</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/80 border border-lavender-200/80 text-center shadow-2xs">
            <span className="text-lg font-black text-indigo-700 block">40+</span>
            <span className="text-[10px] font-bold text-lavender-600 uppercase">Hiring Partners</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/80 border border-lavender-200/80 text-center shadow-2xs">
            <span className="text-lg font-black text-emerald-600 block">₹14.5 LPA</span>
            <span className="text-[10px] font-bold text-lavender-600 uppercase">Top CTC Package</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/80 border border-lavender-200/80 text-center shadow-2xs">
            <span className="text-lg font-black text-sky-600 block">100%</span>
            <span className="text-[10px] font-bold text-lavender-600 uppercase">Practical Labs</span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE RESPONSIVE DISPLAY (GRID OF PARTNER NODES)          */}
      {/* ========================================================= */}
      <div className="md:hidden mt-8 px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {PARTNER_COMPANIES.map((comp) => (
            <div
              key={`m-${comp.id}`}
              onClick={() => setHoveredCompany(comp.id)}
              className={`p-3.5 rounded-2xl bg-white flex flex-col items-center justify-center text-center transition-all ${
                comp.id === currentComp.id
                  ? 'border-2 border-purple-500 shadow-md scale-102'
                  : 'border border-lavender-200 shadow-2xs'
              }`}
            >
              <img src={comp.logo} alt={comp.name} className="h-6 object-contain mb-2" />
              <span className="text-[11px] font-bold text-lavender-950 block">{comp.name}</span>
              <span className="text-[10px] font-semibold text-emerald-600">{comp.package}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
