import React, { useState, useRef, useEffect } from 'react';
import { Home, Layers, Compass, Sparkles, HelpCircle, ClipboardList } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'domains', label: 'Domains', icon: Layers },
  { id: 'journey', label: 'Journey', icon: Compass },
  { id: 'perks', label: 'Benefits', icon: Sparkles },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
  { id: 'applications', label: 'Applications', icon: ClipboardList },
];

export default function Navbar({
  activePage = 'home',
  onNavigate,
  onOpenRegister,
  onOpenSignIn,
  currentUser,
  onLogout,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const navRef = useRef(null);
  const itemRefs = useRef({});

  // Recalculate slider pill position smoothly whenever activePage changes or window resizes
  const updateSlider = () => {
    const activeBtn = itemRefs.current[activePage];
    const navContainer = navRef.current;
    if (activeBtn && navContainer) {
      const navRect = navContainer.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      setSliderStyle({
        left: btnRect.left - navRect.left,
        width: btnRect.width,
        opacity: 1,
      });
    }
  };

  useEffect(() => {
    updateSlider();
    const timer = setTimeout(updateSlider, 60);
    window.addEventListener('resize', updateSlider);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateSlider);
    };
  }, [activePage]);

  const handleNavClick = (id) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-2 sm:top-4 z-50 px-3 sm:px-6 max-w-6xl mx-auto w-full transition-all">
      {/* Main Glassmorphic Capsule */}
      <div className="relative flex items-center justify-between px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white/90 backdrop-blur-2xl border border-white/80 shadow-[0_10px_35px_rgba(124,58,237,0.08)]">
        
        {/* Left Section: Company Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center group py-0.5 focus:outline-none transition-transform hover:scale-105 active:scale-95 duration-200"
          >
            <img
              src="/logo.png"
              alt="SPHERONIX Technologies Pvt. Ltd"
              className="h-7 sm:h-9 md:h-10 w-auto object-contain mix-blend-multiply"
            />
          </button>
        </div>

        {/* Center Section: Desktop Navigation Links with Smooth Magnetic Sliding Active Pill */}
        <nav
          ref={navRef}
          className="relative hidden md:flex items-center gap-1 p-1 rounded-full bg-lavender-100/70 border border-lavender-200/60 shadow-inner"
        >
          {/* Smooth, Simple, Slow Sliding Active Background Pill */}
          <div
            className="absolute top-1 bottom-1 rounded-full bg-white shadow-[0_4px_16px_rgba(124,58,237,0.15)] border border-lavender-200/90 pointer-events-none will-change-transform z-0"
            style={{
              transform: `translateX(${sliderStyle.left}px)`,
              width: `${sliderStyle.width}px`,
              opacity: sliderStyle.opacity,
              transition:
                'transform 650ms cubic-bezier(0.25, 1, 0.5, 1), width 550ms cubic-bezier(0.25, 1, 0.5, 1), opacity 300ms ease',
            }}
          >
            {/* Active glowing accent indicator bar at the bottom */}
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 shadow-[0_0_8px_rgba(124,58,237,0.7)]" />
          </div>

          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                ref={(el) => (itemRefs.current[item.id] = el)}
                onClick={() => handleNavClick(item.id)}
                className={`relative z-10 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 group flex items-center gap-1.5 focus:outline-none ${
                  isActive
                    ? 'text-purple-950 font-black scale-102'
                    : 'text-lavender-700 hover:text-purple-900'
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 transition-all duration-500 ease-out ${
                    isActive
                      ? 'text-purple-600 scale-110 drop-shadow-[0_2px_4px_rgba(124,58,237,0.35)]'
                      : 'text-lavender-500 group-hover:text-purple-600 group-hover:scale-110'
                  }`}
                />
                <span className="transition-colors duration-300">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Section: Sign In & Shimmer Apply Button */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Desktop Auth / User Session */}
          <div className="hidden sm:flex items-center gap-2">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-lavender-900 truncate max-w-[120px]">
                  Hi, <span className="text-purple-700">{currentUser.name}</span>
                </span>
                <button
                  onClick={onLogout}
                  className="text-[11px] font-bold px-3 py-1.5 rounded-full border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onOpenSignIn}
                  className="text-xs font-bold px-3.5 py-2 rounded-full text-lavender-800 hover:text-purple-950 hover:bg-purple-50 transition-all duration-200"
                >
                  Sign In
                </button>
                <button
                  onClick={onOpenRegister}
                  className="relative overflow-hidden text-xs font-extrabold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-lavender-600 to-indigo-600 text-white shadow-[0_4px_16px_rgba(124,58,237,0.35)] hover:shadow-[0_6px_25px_rgba(124,58,237,0.55)] hover:scale-105 active:scale-95 transition-all duration-200 group"
                >
                  <span
                    className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none"
                    style={{ animation: 'navShimmer 4s ease-in-out infinite' }}
                  />
                  <span className="relative flex items-center gap-1">
                    Apply Now <span>→</span>
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-8 h-8 rounded-full bg-lavender-100/80 hover:bg-lavender-200 text-purple-950 flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer (Smooth, Responsive & Touch-friendly) */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 p-4 rounded-3xl bg-white/95 backdrop-blur-2xl border border-lavender-200/90 shadow-[0_15px_35px_rgba(124,58,237,0.15)] animate-cool-page">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-lavender-800 hover:bg-lavender-100/70'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Auth / Call to Action */}
          <div className="pt-3 border-t border-lavender-100 flex flex-col gap-2">
            {currentUser ? (
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-bold text-lavender-900">
                  Hi, <span className="text-purple-700">{currentUser.name}</span>
                </span>
                <button
                  onClick={() => {
                    onLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-xs font-bold px-3 py-1.5 rounded-full border border-rose-300 text-rose-600 hover:bg-rose-50"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onOpenSignIn();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-lavender-100 text-lavender-900 text-center hover:bg-lavender-200 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    onOpenRegister();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2.5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-sm text-center"
                >
                  Apply Now →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
