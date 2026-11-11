import React, { useRef, useState } from 'react';

/**
 * Button3D — Futuristic 3D Interactive Tactical Button
 * Features:
 * - Dynamic 3D depth press feel (transforms down on click)
 * - Holographic edge glow with cyan/lavender light
 * - Metallic bezel and specular reflection
 */
export default function Button3D({
  children,
  onClick,
  className = '',
  variant = 'primary', // 'primary' | 'secondary' | 'cyan' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  disabled = false,
  type = 'button',
  icon = null,
}) {
  const [isPressed, setIsPressed] = useState(false);

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs rounded-xl',
    md: 'px-6 py-3 text-sm rounded-2xl',
    lg: 'px-8 py-4 text-base rounded-2xl',
  }[size] || 'px-6 py-3 text-sm rounded-2xl';

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-purple-600 via-lavender-600 to-indigo-600 text-white shadow-[0_8px_25px_rgba(124,58,237,0.35)] hover:shadow-[0_12px_35px_rgba(124,58,237,0.55)] border border-purple-400/40',
    cyan:
      'bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 text-white shadow-[0_8px_25px_rgba(6,182,212,0.35)] hover:shadow-[0_12px_35px_rgba(6,182,212,0.55)] border border-cyan-400/40',
    secondary:
      'bg-white/90 text-lavender-950 hover:bg-white border border-lavender-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(124,58,237,0.15)]',
    ghost:
      'bg-transparent text-lavender-700 hover:text-lavender-950 hover:bg-lavender-100/60 border border-transparent hover:border-lavender-200/70',
  }[variant] || 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white';

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={`relative font-extrabold tracking-tight inline-flex items-center justify-center gap-2 transition-all duration-200 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden ${sizeClasses} ${variantClasses} ${className}`}
      style={{
        transform: isPressed
          ? 'translateY(3px) scale(0.98)'
          : 'translateY(0px) scale(1)',
      }}
    >
      {/* 3D Specular Sheen Line on Hover */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

      {icon && <span className="flex-shrink-0 transition-transform group-hover:scale-110">{icon}</span>}
      <span className="relative z-10 inline-flex items-center gap-1.5">{children}</span>
    </button>
  );
}

