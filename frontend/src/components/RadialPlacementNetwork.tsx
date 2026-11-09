import React, { useState, useEffect, useRef, useId } from 'react';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';

/**
 * Partner Node definition representing a satellite company in the radial network
 */
export interface PartnerNode {
  id: string;
  name: string;
  logo: string;
  x: number; // Coordinate in 1000x600 viewBox (0 - 1000)
  y: number; // Coordinate in 1000x600 viewBox (0 - 600)
  w?: number; // Optional width, defaults to 120
  h?: number; // Optional height, defaults to 64
  curve: string; // Bézier path from center hub to satellite node
  industry?: string;
  accentColor?: string;
}

/**
 * Candidate profile avatar representing a placed alumni
 */
export interface CandidateAvatar {
  id: string;
  name: string;
  avatar: string;
  role?: string;
  placedCompanyId?: string;
}

/**
 * Component Props for RadialPlacementNetwork
 */
export interface RadialPlacementNetworkProps {
  /** Central hub company logo */
  centerLogo?: string;
  /** Company or organization title */
  centerTitle?: string;
  /** Subtitle pill badge under the metric (default: 'HIRING PARTNERS') */
  centerSubtitle?: string;
  /** Small category pill at top of section */
  badgeLabel?: string;
  /** Main section headline */
  heading?: string;
  /** Section description text */
  description?: string;
  /** Footer summary subtext */
  footerText?: string;
  /** Animated metric target number (default: 3000) */
  targetCount?: number;
  /** Duration in seconds for the count-up animation (default: 5.2) */
  countDuration?: number;
  /** Satellite partner company nodes (default: 12 tech leaders) */
  partners?: PartnerNode[];
  /** Candidate alumni pool for traveling avatar badges */
  candidates?: CandidateAvatar[];
  /** Journey duration per candidate flight in seconds (default: 2.8) */
  flightDuration?: number;
  /** Departure interval between candidate flights in milliseconds (default: 1100) */
  flightInterval?: number;
  /** Optional click callback for partner company nodes */
  onPartnerClick?: (partner: PartnerNode) => void;
  /** Optional custom container CSS classes */
  className?: string;
}

// ============================================================================
// DEFAULT DATA: 12 RADIAL PARTNERS & ALUMNI CANDIDATES
// ============================================================================
const DEFAULT_PARTNERS: PartnerNode[] = [
  {
    id: 'google',
    name: 'Google',
    logo: '/companies/google.png',
    x: 500,
    y: 95,
    w: 135,
    h: 70,
    curve: 'M 500 235 C 500 195, 500 160, 500 130',
    industry: 'Cloud & AI',
    accentColor: '#4285F4',
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
    industry: 'IT Services',
    accentColor: '#007cc3',
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
    industry: 'EdTech R&D',
    accentColor: '#f97316',
  },
  {
    id: 'tcs',
    name: 'TCS',
    logo: '/companies/tcs.png',
    x: 345,
    y: 190,
    w: 115,
    h: 60,
    curve: 'M 430 270 C 415 250, 405 230, 395 215',
    industry: 'Consulting',
    accentColor: '#e11d48',
  },
  {
    id: 'intel',
    name: 'Intel',
    logo: '/companies/intel.png',
    x: 655,
    y: 185,
    w: 115,
    h: 60,
    curve: 'M 570 270 C 585 250, 595 230, 605 215',
    industry: 'Semiconductors',
    accentColor: '#0068b5',
  },
  {
    id: 'arm',
    name: 'ARM',
    logo: '/companies/arm.png',
    x: 95,
    y: 285,
    w: 125,
    h: 65,
    curve: 'M 390 300 C 310 295, 225 290, 160 285',
    industry: 'Chip Architecture',
    accentColor: '#0091bd',
  },
  {
    id: 'cognizant',
    name: 'Cognizant',
    logo: '/companies/cognizant.png',
    x: 905,
    y: 285,
    w: 125,
    h: 65,
    curve: 'M 610 300 C 690 295, 775 290, 840 285',
    industry: 'Digital Systems',
    accentColor: '#1a365d',
  },
  {
    id: 'bosch',
    name: 'Bosch',
    logo: '/companies/bosch.png',
    x: 250,
    y: 340,
    w: 120,
    h: 62,
    curve: 'M 400 320 C 365 325, 335 335, 310 340',
    industry: 'Automotive & IoT',
    accentColor: '#e30613',
  },
  {
    id: 'capgemini',
    name: 'Capgemini',
    logo: '/companies/capgemini.png',
    x: 750,
    y: 340,
    w: 120,
    h: 62,
    curve: 'M 600 320 C 635 325, 665 335, 690 340',
    industry: 'Engineering Cloud',
    accentColor: '#12abdb',
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
    industry: 'Strategy & Tech',
    accentColor: '#a100ff',
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
    industry: 'Microcontrollers',
    accentColor: '#ec1c24',
  },
  {
    id: 'amd',
    name: 'AMD',
    logo: '/companies/amd.png',
    x: 365,
    y: 480,
    w: 120,
    h: 62,
    curve: 'M 445 365 C 415 400, 385 425, 365 450',
    industry: 'Compute Silicon',
    accentColor: '#ed1c24',
  },
  {
    id: 'verizon',
    name: 'Verizon',
    logo: '/companies/verizon.png',
    x: 635,
    y: 480,
    w: 120,
    h: 62,
    curve: 'M 555 365 C 585 400, 615 425, 635 450',
    industry: '5G Networks',
    accentColor: '#cd040b',
  },
];

const DEFAULT_CANDIDATES: CandidateAvatar[] = [
  { id: 'c1', name: 'Kiran M.', avatar: '/avatars/v_student1.png', role: 'Embedded Engineer' },
  { id: 'c2', name: 'Priya S.', avatar: '/avatars/v_student2.png', role: 'IoT Firmware Dev' },
  { id: 'c3', name: 'Arun K.', avatar: '/avatars/v_student3.png', role: 'Systems Architect' },
  { id: 'c4', name: 'Deepika R.', avatar: '/avatars/avatar1.png', role: 'SoC Verification' },
  { id: 'c5', name: 'Rahul V.', avatar: '/avatars/avatar2.png', role: 'RTOS Specialist' },
  { id: 'c6', name: 'Sneha P.', avatar: '/avatars/avatar3.png', role: 'Hardware Design' },
  { id: 'c7', name: 'Aditya N.', avatar: '/avatars/student1.png', role: 'Linux Kernel Dev' },
  { id: 'c8', name: 'Meera T.', avatar: '/avatars/student2.png', role: 'Edge AI Engineer' },
];

interface ActiveTraveler {
  id: string;
  partnerId: string;
  partnerName: string;
  curve: string;
  candidate: CandidateAvatar;
  duration: number;
  createdAt: number;
}

/**
 * RadialPlacementNetwork - Production-ready, responsive radial placement animation component
 */
export default function RadialPlacementNetwork({
  centerLogo = '/logo.png',
  centerTitle = 'SPHERONIX Technologies',
  centerSubtitle = 'HIRING PARTNERS',
  badgeLabel = 'WHERE OUR STUDENTS LAND',
  heading = 'Careers that land\nwhere it counts.',
  description = 'From our technical training batches to premier product engineering teams, our alumni secure verified careers at global technology leaders.',
  footerText = 'Every learner who finishes at SPHERONIX walks into a hiring network of 3,000+ opportunities and 28+ semiconductor partners.',
  targetCount = 3000,
  countDuration = 5.2,
  partners = DEFAULT_PARTNERS,
  candidates = DEFAULT_CANDIDATES,
  flightDuration = 2.8,
  flightInterval = 1100,
  onPartnerClick,
  className = '',
}: RadialPlacementNetworkProps) {
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);
  const [travelers, setTravelers] = useState<ActiveTraveler[]>([]);
  const [landedPartners, setLandedPartners] = useState<Record<string, number>>({});
  const [replayKey, setReplayKey] = useState<number>(0);
  const [displayNumber, setDisplayNumber] = useState<number>(0);

  const nextRouteIdxRef = useRef<number>(0);
  const flightCounterRef = useRef<number>(0);
  const uniqueId = useId();

  // --------------------------------------------------------------------------
  // 1. FRAMER MOTION COUNT-UP ANIMATION
  // --------------------------------------------------------------------------
  const countMotionValue = useMotionValue(0);

  useEffect(() => {
    countMotionValue.set(0);
    const controls = animate(countMotionValue, targetCount, {
      duration: countDuration,
      ease: [0.16, 1, 0.3, 1], // Cubic Ease-Out
      onUpdate: (latest) => {
        setDisplayNumber(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [targetCount, countDuration, replayKey, countMotionValue]);

  // --------------------------------------------------------------------------
  // 2. CONCURRENT TRAVELING AVATAR PIPELINE
  // --------------------------------------------------------------------------
  const launchCandidateFlight = (targetPartnerId?: string) => {
    if (!partners.length) return;

    const partnerId = targetPartnerId || partners[nextRouteIdxRef.current % partners.length].id;
    if (!targetPartnerId) {
      nextRouteIdxRef.current += 1;
    }

    const targetPartner = partners.find((p) => p.id === partnerId);
    if (!targetPartner) return;

    const candidate = candidates[flightCounterRef.current % candidates.length];
    const flightId = `flight_${++flightCounterRef.current}_${Date.now()}`;

    const newFlight: ActiveTraveler = {
      id: flightId,
      partnerId: targetPartner.id,
      partnerName: targetPartner.name,
      curve: targetPartner.curve,
      candidate,
      duration: flightDuration,
      createdAt: Date.now(),
    };

    setTravelers((prev) => {
      // Retain max 4 active flights to keep DOM lean and 60fps consistent
      const active = prev.filter((t) => Date.now() - t.createdAt < t.duration * 1000);
      return [...active, newFlight];
    });

    // Impact event: When candidate arrives (~88% of flight time), trigger node glow
    const impactTimer = setTimeout(() => {
      setLandedPartners((prev) => ({
        ...prev,
        [targetPartner.id]: Date.now(),
      }));
    }, flightDuration * 1000 * 0.88);

    return () => clearTimeout(impactTimer);
  };

  useEffect(() => {
    // Launch initial wave
    launchCandidateFlight();
    const initialDelayTimer = setTimeout(() => launchCandidateFlight(), 550);

    // Continuous rhythmic flight ticker
    const flightIntervalId = setInterval(() => {
      launchCandidateFlight();
    }, flightInterval);

    return () => {
      clearTimeout(initialDelayTimer);
      clearInterval(flightIntervalId);
    };
  }, [flightInterval, flightDuration, replayKey, partners]);

  // Replay animation triggers
  const handleReplay = () => {
    setReplayKey((prev) => prev + 1);
    setTravelers([]);
    setLandedPartners({});
    setDisplayNumber(0);
  };

  const handlePartnerHover = (partner: PartnerNode) => {
    setHoveredPartner(partner.name);
    launchCandidateFlight(partner.id);
  };

  return (
    <section className={`relative w-full py-12 sm:py-20 select-none overflow-hidden ${className}`}>
      {/* ==================================================================== */}
      {/* SECTION HEADER                                                       */}
      {/* ==================================================================== */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 px-4">
        {/* Category Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-sky-600 bg-sky-50/90 px-3.5 py-1.5 rounded-full border border-sky-100 shadow-2xs mb-3.5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
          {badgeLabel}
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight whitespace-pre-line"
        >
          {heading}
        </motion.h2>

        {/* Description */}
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-sm text-slate-600 mt-3.5 max-w-xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>
        )}
      </div>

      {/* ==================================================================== */}
      {/* DESKTOP & TABLET: RADIAL BEZIER NETWORK WITH TRAVELING AVATARS       */}
      {/* ==================================================================== */}
      <div className="hidden md:block relative w-full max-w-6xl mx-auto h-[600px]">
        {/* Soft Radial Ambient Radiance */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] bg-gradient-to-tr from-sky-200/25 via-indigo-100/30 to-purple-100/20 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* SVG BEZIER CURVES & FLYING CANDIDATE BADGES */}
        <svg
          viewBox="0 0 1000 600"
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Circular Clip for Candidate Portraits */}
            <clipPath id={`${uniqueId}-avatarClip`}>
              <circle cx="0" cy="0" r="13" />
            </clipPath>

            {/* Candidate Badge Drop Shadow */}
            <filter id={`${uniqueId}-dropShadow`} x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="rgba(15,23,42,0.25)" />
            </filter>

            {/* Active Beam Gradient */}
            <linearGradient id={`${uniqueId}-beamGrad`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>

            {/* Glowing Beam Diffuse Filter */}
            <filter id={`${uniqueId}-beamGlow`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. BASE SOLID CONNECTOR CURVES */}
          {partners.map((partner) => {
            const isHovered = hoveredPartner === partner.name;
            const hasFlight = travelers.some((t) => t.partnerId === partner.id);
            const isLanded = landedPartners[partner.id] && Date.now() - landedPartners[partner.id] < 1200;
            const isLit = isHovered || hasFlight || isLanded;

            return (
              <path
                key={`base-curve-${partner.id}`}
                d={partner.curve}
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
          {partners.map((partner) => {
            const isHovered = hoveredPartner === partner.name;
            const hasFlight = travelers.some((t) => t.partnerId === partner.id);
            const isLanded = landedPartners[partner.id] && Date.now() - landedPartners[partner.id] < 1200;
            const isLit = isHovered || hasFlight || isLanded;

            if (!isLit) return null;

            return (
              <g key={`glow-beam-${partner.id}`}>
                {/* Diffuse Outer Glow */}
                <path
                  d={partner.curve}
                  fill="none"
                  stroke="#818cf8"
                  strokeWidth="5.5"
                  strokeOpacity="0.32"
                  strokeLinecap="round"
                />
                {/* Core Neon Gradient Pulse */}
                <path
                  d={partner.curve}
                  fill="none"
                  stroke={`url(#${uniqueId}-beamGrad)`}
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  filter={`url(#${uniqueId}-beamGlow)`}
                />
              </g>
            );
          })}

          {/* 3. HARDWARE-ACCELERATED TRAVELING CANDIDATE AVATARS */}
          {travelers.map((trv) => (
            <g key={trv.id}>
              {/* Bézier Path Motion */}
              <animateMotion
                path={trv.curve}
                dur={`${trv.duration}s`}
                fill="freeze"
                rotate="0"
              />

              {/* Start Fade-In & Landing Fade-Out */}
              <animate
                attributeName="opacity"
                values="0; 1; 1; 0.95; 0"
                keyTimes="0; 0.12; 0.82; 0.94; 1"
                dur={`${trv.duration}s`}
                fill="freeze"
              />

              {/* Scale Transitions */}
              <animateTransform
                attributeName="transform"
                type="scale"
                values="0.45; 1; 1; 0.65"
                keyTimes="0; 0.15; 0.85; 1"
                dur={`${trv.duration}s`}
                fill="freeze"
                additive="sum"
              />

              {/* Cyan Energy Ring Pulse */}
              <circle cx="0" cy="0" r="16" fill="none" stroke="#38bdf8" strokeWidth="1.2" opacity="0.65">
                <animate attributeName="r" values="14; 20; 14" dur="1.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8; 0.15; 0.8" dur="1.2s" repeatCount="indefinite" />
              </circle>

              {/* Crisp White Drop-Shadow Shell */}
              <circle cx="0" cy="0" r="14.5" fill="#ffffff" filter={`url(#${uniqueId}-dropShadow)`} />
              <circle cx="0" cy="0" r="14" fill="none" stroke="#6366f1" strokeWidth="1.6" />

              {/* Candidate Portrait Image */}
              <image
                href={trv.candidate.avatar}
                x="-13"
                y="-13"
                width="26"
                height="26"
                clipPath={`url(#${uniqueId}-avatarClip)`}
                preserveAspectRatio="xMidYMid slice"
              />
            </g>
          ))}
        </svg>

        {/* ================================================================== */}
        {/* PROMINENT CENTRAL HUB CARD                                         */}
        {/* ================================================================== */}
        <motion.div
          onClick={handleReplay}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center text-center p-4 cursor-pointer group select-none"
          style={{ width: 250 }}
          title="Click to replay count-up & placement sequence"
        >
          {/* Luminous Pulsing Aura */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.35, 0.65, 0.35],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 -m-8 rounded-full bg-gradient-to-tr from-sky-300/40 via-indigo-300/30 to-purple-300/40 blur-2xl pointer-events-none -z-10"
          />

          {/* Company Logo */}
          <div className="h-14 flex items-center justify-center mb-1">
            <img
              src={centerLogo}
              alt={centerTitle}
              className="max-h-12 w-auto object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Animated Count-Up Number (0+ to 3,000+) */}
          <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-mono my-0.5">
            {displayNumber.toLocaleString()}+
          </div>

          {/* Subtitle Badge */}
          <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-indigo-700 bg-indigo-50/90 px-3.5 py-1 rounded-full border border-indigo-200/80 shadow-2xs mt-0.5 group-hover:bg-indigo-100 transition-colors">
            {centerSubtitle}
          </div>
        </motion.div>

        {/* ================================================================== */}
        {/* SATELLITE PARTNER NODES (FLOATING/BOBBING IDLE ANIMATION)           */}
        {/* ================================================================== */}
        {partners.map((partner, index) => {
          const isHovered = hoveredPartner === partner.name;
          const isLanded = landedPartners[partner.id] && Date.now() - landedPartners[partner.id] < 1200;
          const hasFlight = travelers.some((t) => t.partnerId === partner.id);
          const isActive = isHovered || isLanded || hasFlight;

          // Staggered floating oscillation parameters
          const bobDuration = 3.2 + (index % 4) * 0.5; // 3.2s, 3.7s, 4.2s, 4.7s
          const bobDelay = (index % 6) * 0.25;

          return (
            <motion.div
              key={partner.id}
              onClick={() => onPartnerClick && onPartnerClick(partner)}
              onMouseEnter={() => handlePartnerHover(partner)}
              onMouseLeave={() => setHoveredPartner(null)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: [0, -6, 0],
              }}
              transition={{
                scale: { duration: 0.5, delay: index * 0.04, ease: 'easeOut' },
                opacity: { duration: 0.5, delay: index * 0.04 },
                y: {
                  duration: bobDuration,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                  delay: bobDelay,
                },
              }}
              whileHover={{
                scale: 1.08,
                y: -10,
                transition: { duration: 0.2, ease: 'easeOut' },
              }}
              className="absolute z-10 flex items-center justify-center cursor-pointer"
              style={{
                left: `${partner.x / 10}%`,
                top: `${partner.y / 6}%`,
                transform: 'translate(-50%, -50%)',
                width: partner.w || 120,
                height: partner.h || 64,
              }}
            >
              <div
                className={`w-full h-full rounded-2xl sm:rounded-3xl bg-white flex items-center justify-center p-3.5 transition-all duration-300 relative ${
                  isActive
                    ? 'shadow-[0_16px_36px_rgba(99,102,241,0.28)] border-2 border-indigo-400 ring-4 ring-indigo-100'
                    : 'shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-slate-100 hover:shadow-[0_12px_28px_rgba(0,0,0,0.1)]'
                }`}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-full max-w-[82%] object-contain transition-transform duration-300"
                />

                {/* Placement Success Ping Badge */}
                <AnimatePresence>
                  {isLanded && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -top-1.5 -right-1.5 flex h-4 w-4"
                    >
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white shadow-xs" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}

        {/* Live Network Activity Indicator Pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-semibold text-indigo-700 bg-white/95 backdrop-blur-md py-1.5 px-4 rounded-full border border-indigo-100 shadow-sm transition-all flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            Active Placement Streams:{' '}
            <strong className="text-purple-800 font-bold">
              {hoveredPartner ? `Dispatching to ${hoveredPartner}` : '60 FPS Concurrent Network'}
            </strong>
          </span>
        </motion.div>
      </div>

      {/* ==================================================================== */}
      {/* MOBILE RESPONSIVE CLUSTER (< 768px)                                  */}
      {/* ==================================================================== */}
      <div className="block md:hidden relative p-5 rounded-3xl bg-gradient-to-b from-white via-sky-50/20 to-white border border-slate-200/80 shadow-md mx-4">
        {/* Mobile Center Hub */}
        <motion.div
          onClick={handleReplay}
          whileTap={{ scale: 0.98 }}
          className="text-center flex flex-col items-center justify-center mb-6 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm relative overflow-hidden cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-sky-200/30 via-indigo-100/20 to-purple-100/30 blur-xl pointer-events-none" />
          <img
            src={centerLogo}
            alt={centerTitle}
            className="h-10 w-auto object-contain mix-blend-multiply mb-1 relative z-10"
          />
          <div className="text-3xl font-black text-slate-900 tracking-tight font-mono my-1 relative z-10">
            {displayNumber.toLocaleString()}+
          </div>
          <div className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-indigo-700 bg-indigo-50 px-3 py-0.5 rounded-full border border-indigo-200 relative z-10">
            {centerSubtitle}
          </div>
        </motion.div>

        {/* Mobile Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {partners.map((partner) => {
            const isLanded = landedPartners[partner.id] && Date.now() - landedPartners[partner.id] < 1200;
            const isHovered = hoveredPartner === partner.name;
            const isActive = isLanded || isHovered;

            return (
              <motion.div
                key={partner.id}
                onClick={() => {
                  handlePartnerHover(partner);
                  if (onPartnerClick) onPartnerClick(partner);
                }}
                whileTap={{ scale: 0.95 }}
                className={`h-16 p-3 rounded-2xl bg-white flex items-center justify-center transition-all duration-300 relative ${
                  isActive
                    ? 'border-2 border-indigo-500 ring-2 ring-indigo-200 shadow-md scale-102'
                    : 'border border-slate-100 shadow-2xs'
                }`}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-full max-w-[80%] object-contain"
                />
                {isLanded && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* SECTION FOOTER SUBTEXT                                               */}
      {/* ==================================================================== */}
      {footerText && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xs sm:text-sm text-slate-500 text-center max-w-2xl mx-auto mt-8 px-4 leading-relaxed"
        >
          {footerText}
        </motion.p>
      )}
    </section>
  );
}
