import React, { useState, useEffect, useRef, useId, useLayoutEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Partner Node definition representing a satellite company in the radial network
 */
export interface PartnerNode {
  id: string;
  name: string;
  logo: string;
  leftPercent: number; // Percentage X (0 - 100)
  topPercent: number;  // Percentage Y (0 - 100)
  w?: number;          // Card width in px (default 120)
  h?: number;          // Card height in px (default 64)
  industry?: string;
  accentColor?: string;
}

/**
 * Candidate profile avatar representing an alumni trainee
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
  /** Subtitle badge under the metric (default: 'HIRING PARTNERS') */
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
  /** Satellite partner company nodes */
  partners?: PartnerNode[];
  /** Candidate alumni pool for traveling avatar badges */
  candidates?: CandidateAvatar[];
  /** Journey duration per candidate flight in seconds (default: 2.6) */
  flightDuration?: number;
  /** Departure interval between candidate flights in milliseconds (default: 1100) */
  flightInterval?: number;
  /** Optional click callback for partner company nodes */
  onPartnerClick?: (partner: PartnerNode) => void;
  /** Optional custom container CSS classes */
  className?: string;
}

// ============================================================================
// 1. ISOLATED COUNT-UP METRIC COMPONENT (Zero re-renders on parent network!)
// ============================================================================
interface CountUpMetricProps {
  target: number;
  duration: number;
  replayKey: number;
}

export const CountUpMetric = React.memo(function CountUpMetric({
  target,
  duration,
  replayKey,
}: CountUpMetricProps) {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      // Cubic ease-out: 1 - (1 - progress)^3
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [target, duration, replayKey]);

  return <span className="font-mono">{count.toLocaleString()}+</span>;
});

// ============================================================================
// DEFAULT DATA: 13 BALANCED RADIAL PARTNERS & ALUMNI CANDIDATES
// ============================================================================
const DEFAULT_PARTNERS: PartnerNode[] = [
  // Top Center
  { id: 'google', name: 'Google', logo: '/companies/google.png', leftPercent: 50, topPercent: 12, w: 135, h: 68, industry: 'Cloud & AI' },
  // Top Right
  { id: 'intel', name: 'Intel', logo: '/companies/intel.png', leftPercent: 67, topPercent: 22, w: 115, h: 58, industry: 'Semiconductors' },
  { id: 'stemx', name: 'STEMx', logo: '/companies/stemx.png', leftPercent: 82, topPercent: 15, w: 120, h: 60, industry: 'EdTech R&D' },
  // Right
  { id: 'cognizant', name: 'Cognizant', logo: '/companies/cognizant.png', leftPercent: 89, topPercent: 48, w: 125, h: 64, industry: 'Digital Systems' },
  { id: 'capgemini', name: 'Capgemini', logo: '/companies/capgemini.png', leftPercent: 75, topPercent: 58, w: 120, h: 60, industry: 'Engineering Cloud' },
  // Bottom Right
  { id: 'microchip', name: 'Microchip', logo: '/companies/microchip.png', leftPercent: 83, topPercent: 80, w: 135, h: 68, industry: 'Microcontrollers' },
  { id: 'verizon', name: 'Verizon', logo: '/companies/verizon.png', leftPercent: 63, topPercent: 87, w: 120, h: 60, industry: '5G Networks' },
  // Bottom Left
  { id: 'amd', name: 'AMD', logo: '/companies/amd.png', leftPercent: 37, topPercent: 87, w: 120, h: 60, industry: 'Compute Silicon' },
  { id: 'accenture', name: 'Accenture', logo: '/companies/accenture.png', leftPercent: 17, topPercent: 80, w: 135, h: 68, industry: 'Strategy & Tech' },
  // Left
  { id: 'bosch', name: 'Bosch', logo: '/companies/bosch.png', leftPercent: 25, topPercent: 58, w: 120, h: 60, industry: 'Automotive & IoT' },
  { id: 'arm', name: 'ARM', logo: '/companies/arm.png', leftPercent: 11, topPercent: 48, w: 125, h: 64, industry: 'Chip Architecture' },
  // Top Left
  { id: 'infosys', name: 'Infosys', logo: '/companies/infosys.png', leftPercent: 18, topPercent: 15, w: 120, h: 60, industry: 'IT Services' },
  { id: 'tcs', name: 'TCS', logo: '/companies/tcs.png', leftPercent: 33, topPercent: 22, w: 115, h: 58, industry: 'Consulting' },
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
  pathD: string;
  candidate: CandidateAvatar;
  duration: number;
  createdAt: number;
}

interface MeasuredPath {
  d: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

/**
 * RadialPlacementNetwork - Production-ready, pixel-accurate radial placement animation
 */
export default function RadialPlacementNetwork({
  centerLogo = '/logo.png',
  centerTitle = 'SPHERONIX Technologies',
  centerSubtitle = 'HIRING PARTNERS',
  badgeLabel = 'WHERE OUR STUDENTS LAND',
  heading = 'Careers that land\nwhere it counts.',
  description = 'From our technical training batches to premier product engineering teams, our alumni secure verified careers at global technology leaders.',
  footerText = 'Every learner who finishes at SPHERONIX walks into a hiring network 3,000+',
  targetCount = 3000,
  countDuration = 5.2,
  partners = DEFAULT_PARTNERS,
  candidates = DEFAULT_CANDIDATES,
  flightDuration = 2.6,
  flightInterval = 1100,
  onPartnerClick,
  className = '',
}: RadialPlacementNetworkProps) {
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);
  const [travelers, setTravelers] = useState<ActiveTraveler[]>([]);
  const [landedPartners, setLandedPartners] = useState<Record<string, number>>({});
  const [replayKey, setReplayKey] = useState<number>(0);
  const [paths, setPaths] = useState<Record<string, MeasuredPath>>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const centerCardRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const nextRouteIdxRef = useRef<number>(0);
  const flightCounterRef = useRef<number>(0);
  const uniqueId = useId();

  // --------------------------------------------------------------------------
  // 1. EXACT REAL-PIXEL GEOMETRIC MEASUREMENT (Lines ALWAYS connect to cards!)
  // --------------------------------------------------------------------------
  const updateMeasuredPaths = useCallback(() => {
    if (!containerRef.current || !centerCardRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const centerRect = centerCardRef.current.getBoundingClientRect();

    if (containerRect.width === 0 || containerRect.height === 0) return;

    // Center Hub center in container pixel space
    const centerCx = centerRect.left - containerRect.left + centerRect.width / 2;
    const centerCy = centerRect.top - containerRect.top + centerRect.height / 2;
    const centerHalfW = centerRect.width / 2;
    const centerHalfH = centerRect.height / 2;

    const computedPaths: Record<string, MeasuredPath> = {};

    partners.forEach((partner) => {
      const cardEl = cardRefs.current[partner.id];
      if (!cardEl) return;

      const cardRect = cardEl.getBoundingClientRect();
      const cardCx = cardRect.left - containerRect.left + cardRect.width / 2;
      const cardCy = cardRect.top - containerRect.top + cardRect.height / 2;
      const cardHalfW = cardRect.width / 2;
      const cardHalfH = cardRect.height / 2;

      // Direction vector
      const dx = cardCx - centerCx;
      const dy = cardCy - centerCy;
      const angle = Math.atan2(dy, dx);

      // Start: Exact perimeter point on center card
      // Using ellipse / rounded rectangle perimeter clamping
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const startX = centerCx + cosA * (centerHalfW - 6);
      const startY = centerCy + sinA * (centerHalfH - 6);

      // End: Exact perimeter point on partner card facing the center
      const endX = cardCx - cosA * (cardHalfW - 4);
      const endY = cardCy - sinA * (cardHalfH - 4);

      // Gentle organic Bézier curvature:
      // Control points bow slightly outward
      const midDist = Math.hypot(dx, dy) * 0.15;
      const perpX = -sinA * midDist;
      const perpY = cosA * midDist;

      const cp1x = startX + cosA * (dx * 0.35) + perpX * 0.35;
      const cp1y = startY + sinA * (dy * 0.35) + perpY * 0.35;
      const cp2x = startX + cosA * (dx * 0.7) + perpX * 0.15;
      const cp2y = startY + sinA * (dy * 0.7) + perpY * 0.15;

      const d = `M ${startX.toFixed(1)} ${startY.toFixed(1)} C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${endX.toFixed(1)} ${endY.toFixed(1)}`;

      computedPaths[partner.id] = {
        d,
        startX,
        startY,
        endX,
        endY,
      };
    });

    setPaths(computedPaths);
  }, [partners]);

  // Recalculate on mount, resize, and partner changes
  useLayoutEffect(() => {
    updateMeasuredPaths();
    const handleResize = () => updateMeasuredPaths();
    window.addEventListener('resize', handleResize);

    const resizeObserver = new ResizeObserver(() => {
      updateMeasuredPaths();
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Safety check after fonts/images settle
    const settleTimer = setTimeout(updateMeasuredPaths, 300);

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      clearTimeout(settleTimer);
    };
  }, [updateMeasuredPaths]);

  // --------------------------------------------------------------------------
  // 2. CONCURRENT TRAVELING CANDIDATE PIPELINE
  // --------------------------------------------------------------------------
  const launchCandidateFlight = useCallback(
    (targetPartnerId?: string) => {
      if (!partners.length) return;

      const partnerId = targetPartnerId || partners[nextRouteIdxRef.current % partners.length].id;
      if (!targetPartnerId) {
        nextRouteIdxRef.current += 1;
      }

      const targetPartner = partners.find((p) => p.id === partnerId);
      if (!targetPartner) return;

      const pathData = paths[targetPartner.id];
      if (!pathData) return;

      const candidate = candidates[flightCounterRef.current % candidates.length];
      const flightId = `flight_${++flightCounterRef.current}_${Date.now()}`;

      const newFlight: ActiveTraveler = {
        id: flightId,
        partnerId: targetPartner.id,
        partnerName: targetPartner.name,
        pathD: pathData.d,
        candidate,
        duration: flightDuration,
        createdAt: Date.now(),
      };

      setTravelers((prev) => {
        // Keep at most 4 active flights in DOM
        const active = prev.filter((t) => Date.now() - t.createdAt < t.duration * 1000);
        return [...active, newFlight];
      });

      // Impact event: When candidate arrives (~88% of flight time), trigger node pulse
      const impactTimer = setTimeout(() => {
        setLandedPartners((prev) => ({
          ...prev,
          [targetPartner.id]: Date.now(),
        }));
      }, flightDuration * 1000 * 0.88);

      return () => clearTimeout(impactTimer);
    },
    [candidates, flightDuration, partners, paths]
  );

  // Continuous flight ticker
  useEffect(() => {
    if (Object.keys(paths).length === 0) return;

    // Launch initial wave
    launchCandidateFlight();
    const delayTimer = setTimeout(() => launchCandidateFlight(), 500);

    const intervalId = setInterval(() => {
      launchCandidateFlight();
    }, flightInterval);

    return () => {
      clearTimeout(delayTimer);
      clearInterval(intervalId);
    };
  }, [paths, flightInterval, launchCandidateFlight, replayKey]);

  // Replay animation triggers
  const handleReplay = () => {
    setReplayKey((prev) => prev + 1);
    setTravelers([]);
    setLandedPartners({});
    updateMeasuredPaths();
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
        <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-sky-600 bg-sky-50/90 px-3.5 py-1.5 rounded-full border border-sky-100 shadow-2xs mb-3.5">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
          {badgeLabel}
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight whitespace-pre-line">
          {heading}
        </h2>

        {/* Description */}
        {description && (
          <p className="text-xs sm:text-sm text-slate-600 mt-3.5 max-w-xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* ==================================================================== */}
      {/* DESKTOP & TABLET: PIXEL-PERFECT RADIAL TREE NETWORK                  */}
      {/* ==================================================================== */}
      <div
        ref={containerRef}
        className="hidden md:block relative w-full max-w-6xl mx-auto h-[620px]"
      >
        {/* Soft Radial Ambient Radiance */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-sky-200/25 via-indigo-100/30 to-purple-100/20 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* ================================================================== */}
        {/* SVG CONNECTOR LINES & HARDWARE-ACCELERATED TRAVELING AVATARS       */}
        {/* (Runs in 1:1 real pixel coordinates matching the DOM elements!)    */}
        {/* ================================================================== */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{ width: '100%', height: '100%' }}
        >
          <defs>
            {/* Circular Clip for Candidate Portraits */}
            <clipPath id={`${uniqueId}-avatarClip`}>
              <circle cx="0" cy="0" r="14" />
            </clipPath>

            {/* Candidate Badge Drop Shadow */}
            <filter id={`${uniqueId}-dropShadow`} x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="rgba(15,23,42,0.25)" />
            </filter>

            {/* Neon Active Beam Gradient */}
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

          {/* 1. BASE CONNECTOR LINES (SOLID, SOFT SKY-BLUE, PHYSICALLY CONNECTED) */}
          {partners.map((partner) => {
            const pathData = paths[partner.id];
            if (!pathData) return null;

            const isHovered = hoveredPartner === partner.name;
            const hasFlight = travelers.some((t) => t.partnerId === partner.id);
            const isLanded = landedPartners[partner.id] && Date.now() - landedPartners[partner.id] < 1200;
            const isLit = isHovered || hasFlight || isLanded;

            return (
              <path
                key={`base-line-${partner.id}`}
                d={pathData.d}
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
            const pathData = paths[partner.id];
            if (!pathData) return null;

            const isHovered = hoveredPartner === partner.name;
            const hasFlight = travelers.some((t) => t.partnerId === partner.id);
            const isLanded = landedPartners[partner.id] && Date.now() - landedPartners[partner.id] < 1200;
            const isLit = isHovered || hasFlight || isLanded;

            if (!isLit) return null;

            return (
              <g key={`glow-beam-${partner.id}`}>
                <path
                  d={pathData.d}
                  fill="none"
                  stroke="#818cf8"
                  strokeWidth="5.5"
                  strokeOpacity="0.32"
                  strokeLinecap="round"
                />
                <path
                  d={pathData.d}
                  fill="none"
                  stroke={`url(#${uniqueId}-beamGrad)`}
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  filter={`url(#${uniqueId}-beamGlow)`}
                />
              </g>
            );
          })}

          {/* 3. HARDWARE-ACCELERATED TRAVELING CANDIDATE AVATARS (60FPS) */}
          {travelers.map((trv) => (
            <g key={trv.id}>
              {/* GPU Path Motion */}
              <animateMotion
                path={trv.pathD}
                dur={`${trv.duration}s`}
                fill="freeze"
                rotate="0"
              />

              {/* Smooth Start Fade-In & Landing Fade-Out */}
              <animate
                attributeName="opacity"
                values="0; 1; 1; 0.95; 0"
                keyTimes="0; 0.12; 0.82; 0.94; 1"
                dur={`${trv.duration}s`}
                fill="freeze"
              />

              {/* Gentle Scale */}
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
              <circle cx="0" cy="0" r="17" fill="none" stroke="#38bdf8" strokeWidth="1.2" opacity="0.65">
                <animate attributeName="r" values="14; 21; 14" dur="1.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8; 0.15; 0.8" dur="1.2s" repeatCount="indefinite" />
              </circle>

              {/* Crisp White Drop-Shadow Shell */}
              <circle cx="0" cy="0" r="15" fill="#ffffff" filter={`url(#${uniqueId}-dropShadow)`} />
              <circle cx="0" cy="0" r="14.5" fill="none" stroke="#6366f1" strokeWidth="1.6" />

              {/* Student Portrait Image */}
              <image
                href={trv.candidate.avatar}
                x="-14"
                y="-14"
                width="28"
                height="28"
                clipPath={`url(#${uniqueId}-avatarClip)`}
                preserveAspectRatio="xMidYMid slice"
              />
            </g>
          ))}
        </svg>

        {/* ================================================================== */}
        {/* PROMINENT CENTRAL HUB CARD                                         */}
        {/* ================================================================== */}
        <div
          ref={centerCardRef}
          onClick={handleReplay}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center text-center p-4 cursor-pointer group select-none transition-transform hover:scale-103"
          style={{ width: 250 }}
          title="Click to replay metric count-up and placement wave"
        >
          {/* Luminous Pulsing Aura */}
          <div className="absolute inset-0 -m-8 rounded-full bg-gradient-to-tr from-sky-300/40 via-indigo-300/30 to-purple-300/40 blur-2xl pointer-events-none -z-10 animate-pulse" />

          {/* Company Logo */}
          <div className="h-14 flex items-center justify-center mb-1">
            <img
              src={centerLogo}
              alt={centerTitle}
              className="max-h-12 w-auto object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Isolated Animated Metric Count-Up */}
          <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight my-0.5">
            <CountUpMetric target={targetCount} duration={countDuration} replayKey={replayKey} />
          </div>

          {/* Subtitle Badge */}
          <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-indigo-700 bg-indigo-50/90 px-3.5 py-1 rounded-full border border-indigo-200/80 shadow-2xs mt-0.5 group-hover:bg-indigo-100 transition-colors">
            {centerSubtitle}
          </div>
        </div>

        {/* ================================================================== */}
        {/* SATELLITE PARTNER NODES (FLOATING/BOBBING IDLE ANIMATION)           */}
        {/* ================================================================== */}
        {partners.map((partner, index) => {
          const isHovered = hoveredPartner === partner.name;
          const isLanded = landedPartners[partner.id] && Date.now() - landedPartners[partner.id] < 1200;
          const hasFlight = travelers.some((t) => t.partnerId === partner.id);
          const isActive = isHovered || isLanded || hasFlight;

          // Staggered floating oscillation parameters
          const bobDuration = 3.2 + (index % 4) * 0.5;
          const bobDelay = (index % 5) * 0.25;

          return (
            <motion.div
              key={partner.id}
              ref={(el) => (cardRefs.current[partner.id] = el)}
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
                scale: { duration: 0.5, delay: index * 0.03, ease: 'easeOut' },
                opacity: { duration: 0.5, delay: index * 0.03 },
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
                left: `${partner.leftPercent}%`,
                top: `${partner.topPercent}%`,
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
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-semibold text-indigo-700 bg-white/95 backdrop-blur-md py-1.5 px-4 rounded-full border border-indigo-100 shadow-sm transition-all flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            Active Placement Streams:{' '}
            <strong className="text-purple-800 font-bold">
              {hoveredPartner ? `Dispatching to ${hoveredPartner}` : 'Continuous 60fps Network'}
            </strong>
          </span>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* MOBILE RESPONSIVE CLUSTER (< 768px)                                  */}
      {/* ==================================================================== */}
      <div className="block md:hidden relative p-5 rounded-3xl bg-gradient-to-b from-white via-sky-50/20 to-white border border-slate-200/80 shadow-md mx-4">
        {/* Mobile Center Hub */}
        <div
          onClick={handleReplay}
          className="text-center flex flex-col items-center justify-center mb-6 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm relative overflow-hidden cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-sky-200/30 via-indigo-100/20 to-purple-100/30 blur-xl pointer-events-none" />
          <img
            src={centerLogo}
            alt={centerTitle}
            className="h-10 w-auto object-contain mix-blend-multiply mb-1 relative z-10"
          />
          <div className="text-3xl font-black text-slate-900 tracking-tight font-mono my-1 relative z-10">
            <CountUpMetric target={targetCount} duration={countDuration} replayKey={replayKey} />
          </div>
          <div className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-indigo-700 bg-indigo-50 px-3 py-0.5 rounded-full border border-indigo-200 relative z-10">
            {centerSubtitle}
          </div>
        </div>

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
        <p className="text-xs sm:text-sm text-slate-500 text-center max-w-2xl mx-auto mt-8 px-4 leading-relaxed">
          {footerText}
        </p>
      )}
    </section>
  );
}
