import React from 'react';

/**
 * Badge3D — Holographic Pulsing Status Pill / Badge
 * Features:
 * - Animated beacon light (emerald or cyan)
 * - Metallic glass rim with inner specular reflection
 * - Tasteful micro-tilt depth
 */
export default function Badge3D({
  children,
  beacon = true,
  beaconColor = 'emerald', // 'emerald' | 'cyan' | 'purple'
  className = '',
}) {
  const beaconColors = {
    emerald: 'bg-emerald-500',
    cyan: 'bg-cyan-400',
    purple: 'bg-purple-500',
  }[beaconColor] || 'bg-emerald-500';

  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-xl border border-lavender-200/90 shadow-[0_4px_16px_rgba(124,58,237,0.08)] text-[11px] font-bold text-lavender-900 transition-all hover:scale-105 hover:border-purple-300 ${className}`}
    >
      {beacon && (
        <span className="relative flex h-2 w-2 flex-shrink-0">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${beaconColors}`} />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${beaconColors}`} />
        </span>
      )}
      <span className="leading-none">{children}</span>
    </div>
  );
}

