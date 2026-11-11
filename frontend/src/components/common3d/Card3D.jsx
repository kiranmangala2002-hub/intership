import React, { useRef, useState, useEffect } from 'react';

/**
 * Card3D — Premium Interactive 3D Tilt Card with Dynamic Specular Glare
 * Features:
 * - Real-time cursor tracking with natural spring physics
 * - Dynamic specular light reflection angle matching cursor
 * - Preserved 3D depth context (translate-z on nested elements)
 * - Safe fallback for mobile or prefers-reduced-motion
 */
export default function Card3D({
  children,
  className = '',
  maxTilt = 6,
  depth = 12,
  glare = true,
  onClick,
  style = {},
  disabled = false,
}) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('perspective(1200px) rotateX(0deg) rotateY(0deg)');
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e) => {
    if (disabled || prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width - 0.5) * 2; // -1 to 1
    const yPercent = (y / rect.height - 0.5) * 2; // -1 to 1

    const rotY = xPercent * maxTilt;
    const rotX = -yPercent * maxTilt;

    setTransform(`perspective(1200px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(${depth}px)`);

    if (glare) {
      setGlarePos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.2,
      });
    }
  };

  const handleMouseEnter = () => {
    if (disabled || prefersReducedMotion) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform('perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)');
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative preserve-3d transition-transform duration-200 ease-out will-change-transform ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      style={{
        transform,
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      {/* Dynamic Specular Holographic Glare Overlay */}
      {glare && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit] z-30 transition-opacity duration-300 overflow-hidden"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.45) 0%, rgba(168, 85, 247, 0.15) 30%, transparent 70%)`,
          }}
        />
      )}

      {children}
    </div>
  );
}

