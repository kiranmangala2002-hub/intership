import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-lavender-200/90 bg-white/80 backdrop-blur-xl py-8 sm:py-10 text-xs font-medium text-lavender-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Row: Brand & Social Channels */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand Column */}
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="SPHERONIX Technologies Pvt. Ltd"
              className="h-9 w-auto object-contain mix-blend-multiply"
            />
            <div className="flex flex-col text-left pl-3 border-l border-lavender-300">
              <span className="font-extrabold text-lavender-950 text-sm">
                SPHERONIX Technologies Pvt. Ltd
              </span>
              <span className="text-[11px] text-lavender-600">
                Corporate Internships & Training Program
              </span>
            </div>
          </div>

          {/* Social Media Links (Instagram, X, Facebook, WhatsApp) - Pixel-Perfect Circular Buttons matching Image Reference */}
          <div className="flex items-center justify-center gap-3">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/spheronix.careers/?__pwa=1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow SPHERONIX Careers on Instagram"
              title="Instagram (@spheronix.careers)"
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-[0_4px_14px_rgba(220,39,67,0.35)] hover:shadow-[0_6px_22px_rgba(220,39,67,0.55)] flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 flex-shrink-0"
            >
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            {/* X (formerly Twitter) */}
            <a
              href="https://x.com/CooSpheronix"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow @CooSpheronix on X"
              title="X (@CooSpheronix)"
              className="w-10 h-10 rounded-full bg-black text-white shadow-[0_4px_14px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_22px_rgba(0,0,0,0.5)] flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 flex-shrink-0"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/1FjKCU9jp5/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow SPHERONIX on Facebook"
              title="Facebook"
              className="w-10 h-10 rounded-full bg-[#1877F2] text-white shadow-[0_4px_14px_rgba(24,119,242,0.35)] hover:shadow-[0_6px_22px_rgba(24,119,242,0.55)] flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 flex-shrink-0"
            >
              <svg className="w-4.5 h-4.5 fill-white" viewBox="0 0 24 24">
                <path d="M16.671 15.463l.532-3.47h-3.328v-2.25c0-.949.465-1.874 1.956-1.874h1.491V4.916s-1.374-.235-2.686-.235c-2.741 0-4.533 1.662-4.533 4.669v2.25H7.078v3.47h3.047v8.385a12.09 12.09 0 003.75 0v-8.385h2.796z"/>
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/?text=Hi%20SPHERONIX%20Team%2C%20I%20am%20interested%20in%20Corporate%20Internships%20%26%20Training"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with SPHERONIX Admissions on WhatsApp"
              title="WhatsApp"
              className="w-10 h-10 rounded-full bg-[#25D366] text-white shadow-[0_4px_14px_rgba(37,211,102,0.35)] hover:shadow-[0_6px_22px_rgba(37,211,102,0.55)] flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 flex-shrink-0"
            >
              <svg className="w-4.5 h-4.5 fill-white" viewBox="0 0 24 24">
                <path d="M12.031 2c-5.508 0-9.984 4.477-9.984 9.984 0 1.761.458 3.481 1.33 5.002L2 22l5.163-1.354c1.464.799 3.111 1.22 4.868 1.22 5.508 0 9.984-4.477 9.984-9.984C22.015 6.477 17.539 2 12.031 2zm0 18.291c-1.503 0-2.977-.406-4.265-1.173l-.306-.182-3.167.831.846-3.087-.199-.317c-.841-1.341-1.286-2.903-1.286-4.512 0-4.573 3.721-8.294 8.294-8.294 4.573 0 8.294 3.721 8.294 8.294 0 4.573-3.721 8.294-8.294 8.294zm4.545-6.208c-.249-.125-1.474-.727-1.702-.81-.229-.083-.395-.125-.562.125-.166.249-.645.81-.79 1-.146.187-.291.208-.541.083-.249-.125-1.054-.388-2.008-1.238-.742-.662-1.243-1.48-1.389-1.729-.146-.249-.016-.384.109-.508.112-.112.249-.291.374-.437.125-.146.166-.249.249-.416.083-.166.042-.312-.021-.437-.062-.125-.562-1.353-.77-1.853-.203-.487-.41-.421-.562-.429-.146-.008-.312-.01-.479-.01-.166 0-.437.062-.666.312-.229.249-.874.854-.874 2.083 0 1.229.895 2.416 1.02 2.583.125.166 1.761 2.689 4.267 3.771.596.257 1.061.411 1.424.527.599.191 1.144.164 1.575.1 4.8-.072 1.474-.604 1.682-1.187.208-.583.208-1.083.146-1.187-.062-.104-.229-.166-.479-.291z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Subtle Horizontal Divider */}
        <div className="border-t border-lavender-200/60" />

        {/* Bottom Row: Official Corporate Address, Copyright & Legal Links */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-center lg:text-left text-lavender-600">
          {/* Company Official Address (Replaced Systems Live badge) */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-lavender-50/90 border border-lavender-200/80 text-[11px] font-medium text-lavender-800 shadow-2xs">
            <span className="text-purple-600 text-sm flex-shrink-0">📍</span>
            <span>
              <strong>Corporate Office:</strong> 5th Floor, No 8 & 9, Shantipura Main Rd, Phase II, Electronic City, Bengaluru, Karnataka 560100
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-[11px]">
            <p>
              &copy; {new Date().getFullYear()} SPHERONIX Technologies Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex gap-3 font-semibold text-lavender-500">
              <span>•</span>
              <a href="#home" className="hover:text-purple-900 transition-colors">Privacy</a>
              <a href="#home" className="hover:text-purple-900 transition-colors">Terms</a>
              <a href="#home" className="hover:text-purple-900 transition-colors">Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
