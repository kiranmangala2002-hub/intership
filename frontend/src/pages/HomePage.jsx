import React from 'react';
import SpheronixRobot3D from '../components/SpheronixRobot3D';
import PlacementTreeNetwork from '../components/PlacementTreeNetwork';

export default function HomePage({ onOpenRegister, onNavigate }) {
  return (
    <div className="space-y-10 sm:space-y-14">
      {/* HERO SECTION - CINEMATIC 2-COLUMN LAYOUT WITH 3D ROBOT ON LEFT */}
      <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center pt-2 sm:pt-6 pb-4">
        {/* Ambient Hero Spotlight Glow */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-indigo-400/15 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Left Column: 3D Spheronix Humanoid Robot with WebGL Holo-VFX & Controls */}
        <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col items-center justify-center relative w-full">
          <div className="relative w-full max-w-[360px] sm:max-w-[440px] lg:max-w-none mx-auto">
            <SpheronixRobot3D />
          </div>
        </div>

        {/* Right Column: Hero Branding, Value Proposition & Stat Cards */}
        <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Live Cohort Admissions Pill with Pulsing Beacon */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-purple-200/80 shadow-[0_4px_16px_rgba(124,58,237,0.08)] text-xs font-bold text-lavender-900 mb-5 group hover:border-purple-300 transition-all">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-extrabold uppercase tracking-wider text-[11px] text-purple-700">
              Admissions Open
            </span>
            <span className="text-lavender-300">•</span>
            <span className="text-lavender-700 font-medium">
              SPHERONIX Technologies Corporate Cohort 2026
            </span>
          </div>

          {/* Main Cinematic Headline */}
          <h1 className="text-3xl sm:text-5xl xl:text-6xl font-black tracking-tight text-lavender-950 leading-[1.12] mb-5">
            Launch Your Career At{' '}
            <span className="bg-gradient-to-r from-purple-700 via-fuchsia-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-xs">
              SPHERONIX
            </span>{' '}
            With Corporate Internships & Training
          </h1>

          <p className="text-sm sm:text-base text-lavender-800/85 max-w-xl leading-relaxed mb-8">
            Gain valuable real-world corporate experience at SPHERONIX Technologies Pvt. Ltd, work on enterprise-grade production projects, and receive certified industry mentorship & training with performance based monthly stipends from ₹10,000 to ₹15,000.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 mb-10 w-full sm:w-auto">
            <button
              onClick={onOpenRegister}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl text-sm sm:text-base font-extrabold text-white bg-gradient-to-r from-purple-600 via-lavender-600 to-indigo-600 shadow-[0_6px_25px_rgba(124,58,237,0.35)] hover:shadow-[0_10px_35px_rgba(124,58,237,0.55)] hover:-translate-y-1 active:scale-95 transition-all group"
            >
              <span className="inline-flex items-center gap-2">
                🚀 Apply for Internships & Training
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </button>
            <button
              onClick={() => onNavigate('domains')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl text-sm sm:text-base font-bold text-lavender-800 bg-white/90 hover:bg-white border border-lavender-200/90 shadow-sm hover:shadow-md hover:-translate-y-1 active:scale-95 transition-all"
            >
              Explore 2 Flagship Domains →
            </button>
          </div>

          {/* 3 High-Impact Interactive Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full">
            {/* Stat 1: Performance Based Stipend (Replaced 35000 with 10-15k) */}
            <div className="relative p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-xl border border-lavender-200/90 shadow-[0_4px_20px_rgba(124,58,237,0.06)] text-center hover:-translate-y-1.5 hover:shadow-[0_10px_28px_rgba(16,185,129,0.14)] transition-all overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
              <span className="text-xs block mb-1">💰</span>
              <span className="block text-2xl sm:text-3xl font-black text-emerald-600 mb-0.5 group-hover:scale-105 transition-transform">
                ₹10K - ₹15K
              </span>
              <span className="text-[11px] font-bold text-lavender-600 uppercase tracking-wider block">
                Performance Based Stipend
              </span>
            </div>

            {/* Stat 2: Senior Mentor (Replaced 500+ mentorship) */}
            <div className="relative p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-xl border border-lavender-200/90 shadow-[0_4px_20px_rgba(124,58,237,0.06)] text-center hover:-translate-y-1.5 hover:shadow-[0_10px_28px_rgba(245,158,11,0.14)] transition-all overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
              <span className="text-xs block mb-1">👨‍🏫</span>
              <span className="block text-2xl sm:text-3xl font-black text-amber-600 mb-0.5 group-hover:scale-105 transition-transform">
                Senior Mentor
              </span>
              <span className="text-[11px] font-bold text-lavender-600 uppercase tracking-wider block">
                1-on-1 Guidance & Reviews
              </span>
            </div>

            {/* Stat 3: Corporate Placement (No numerical count) */}
            <div className="relative p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-xl border border-lavender-200/90 shadow-[0_4px_20px_rgba(124,58,237,0.06)] text-center hover:-translate-y-1.5 hover:shadow-[0_10px_28px_rgba(99,102,241,0.14)] transition-all overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500" />
              <span className="text-xs block mb-1">🏆</span>
              <span className="block text-2xl sm:text-3xl font-black text-purple-700 mb-0.5 group-hover:scale-105 transition-transform">
                Placement
              </span>
              <span className="text-[11px] font-bold text-lavender-600 uppercase tracking-wider block">
                Partner Network Support
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK HIGHLIGHT CARDS GRID */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Corporate Domains */}
        <div
          onClick={() => onNavigate('domains')}
          className="group cursor-pointer p-7 sm:p-8 rounded-3xl bg-white/85 backdrop-blur-xl border border-lavender-200/90 shadow-[0_8px_30px_rgba(124,58,237,0.06)] hover:shadow-[0_15px_40px_rgba(124,58,237,0.15)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-2xl text-white mb-5 shadow-[0_4px_16px_rgba(124,58,237,0.3)] group-hover:scale-110 group-hover:rotate-3 transition-transform">
              💼
            </div>
            <h3 className="text-xl font-bold text-lavender-950 mb-2.5 group-hover:text-purple-700 transition-colors">
              Corporate Domains
            </h3>
            <p className="text-xs sm:text-sm text-lavender-700 leading-relaxed">
              Explore 2 core corporate specializations: <strong>AI Integrated Full Stack Development</strong> and <strong>Embedded Systems & IoT</strong>.
            </p>
          </div>
          <span className="mt-6 text-xs font-bold text-purple-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5">
            View All Domains <span>→</span>
          </span>
        </div>

        {/* Card 2: 4-Stage Learning Curve */}
        <div
          onClick={() => onNavigate('journey')}
          className="group cursor-pointer p-7 sm:p-8 rounded-3xl bg-white/85 backdrop-blur-xl border border-lavender-200/90 shadow-[0_8px_30px_rgba(124,58,237,0.06)] hover:shadow-[0_15px_40px_rgba(124,58,237,0.15)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-2xl text-white mb-5 shadow-[0_4px_16px_rgba(236,72,153,0.3)] group-hover:scale-110 group-hover:rotate-3 transition-transform">
              🗺️
            </div>
            <h3 className="text-xl font-bold text-lavender-950 mb-2.5 group-hover:text-purple-700 transition-colors">
              4-Stage Learning Curve
            </h3>
            <p className="text-xs sm:text-sm text-lavender-700 leading-relaxed">
              From online technical screening to live hands-on labs, enterprise client projects, and verified placement certification.
            </p>
          </div>
          <span className="mt-6 text-xs font-bold text-purple-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5">
            Inspect Program Journey <span>→</span>
          </span>
        </div>

        {/* Card 3: Applicant Dashboard */}
        <div
          onClick={() => onNavigate('applications')}
          className="group cursor-pointer p-7 sm:p-8 rounded-3xl bg-white/85 backdrop-blur-xl border border-lavender-200/90 shadow-[0_8px_30px_rgba(124,58,237,0.06)] hover:shadow-[0_15px_40px_rgba(124,58,237,0.15)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center text-2xl text-white mb-5 shadow-[0_4px_16px_rgba(99,102,241,0.3)] group-hover:scale-110 group-hover:rotate-3 transition-transform">
              📊
            </div>
            <h3 className="text-xl font-bold text-lavender-950 mb-2.5 group-hover:text-purple-700 transition-colors">
              Applicant Dashboard
            </h3>
            <p className="text-xs sm:text-sm text-lavender-700 leading-relaxed">
              Track real-time cohort volumes, evaluation progress, and candidate screening statistics synced with the live database.
            </p>
          </div>
          <span className="mt-6 text-xs font-bold text-purple-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5">
            Track Application Counts <span>→</span>
          </span>
        </div>
      </section>

      {/* OUR TRAINEES PLACED COMPANIES TREE STRUCTURE SHOWCASE */}
      <section>
        <PlacementTreeNetwork />
      </section>
    </div>
  );
}
