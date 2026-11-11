import React from 'react';
import SpheronixRobot3D from '../components/SpheronixRobot3D';
import PlacementTreeNetwork from '../components/PlacementTreeNetwork';
import Card3D from '../components/common3d/Card3D';
import Button3D from '../components/common3d/Button3D';
import Badge3D from '../components/common3d/Badge3D';
import { ArrowRight, Sparkles, Layers, Compass, BarChart3, Rocket } from 'lucide-react';

export default function HomePage({ onOpenRegister, onNavigate }) {
  return (
    <div className="space-y-10 sm:space-y-14 perspective-1000">
      {/* HERO SECTION - CINEMATIC 2-COLUMN LAYOUT WITH 3D ROBOT ON LEFT */}
      <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center pt-2 sm:pt-4 pb-2">
        {/* Ambient Hero Spotlight Glow */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Left Column: 3D Spheronix Humanoid Robot with WebGL Holo-VFX & Gyro Controls */}
        <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col items-center justify-center relative w-full">
          <div className="relative w-full max-w-[360px] sm:max-w-[440px] lg:max-w-none mx-auto">
            <SpheronixRobot3D />
          </div>
        </div>

        {/* Right Column: Hero Branding, Value Proposition & 3D Interactive Cards */}
        <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Live Cohort Admissions Pill with 3D Pulsing Beacon */}
          <div className="mb-5">
            <Badge3D beacon={true} beaconColor="emerald">
              <span className="font-extrabold uppercase tracking-wider text-[11px] text-purple-700">
                Admissions Open
              </span>
              <span className="text-lavender-300 mx-1.5">•</span>
              <span className="text-lavender-700 font-medium">
                SPHERONIX Technologies Corporate Cohort 2026
              </span>
            </Badge3D>
          </div>

          {/* Main Cinematic Headline with 3D Depth */}
          <h1 className="text-3xl sm:text-5xl xl:text-6xl font-black tracking-tight text-lavender-950 leading-[1.12] mb-5">
            Launch Your Career At{' '}
            <span className="bg-gradient-to-r from-purple-700 via-fuchsia-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm">
              SPHERONIX
            </span>{' '}
            With Corporate Internships & Training
          </h1>

          <p className="text-sm sm:text-base text-lavender-800/85 max-w-xl leading-relaxed mb-8">
            Gain valuable real-world corporate experience at SPHERONIX Technologies Pvt. Ltd, work on enterprise-grade production projects, and receive certified industry mentorship & training with performance based monthly stipends from ₹10,000 to ₹15,000.
          </p>

          {/* 3D Tactile CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 mb-10 w-full sm:w-auto">
            <Button3D
              onClick={onOpenRegister}
              variant="primary"
              size="lg"
              icon={<Rocket className="w-5 h-5 text-white" />}
            >
              Apply for Internships & Training
            </Button3D>

            <Button3D
              onClick={() => onNavigate('domains')}
              variant="secondary"
              size="lg"
              icon={<Layers className="w-4 h-4 text-purple-600" />}
            >
              Explore 2 Flagship Domains →
            </Button3D>
          </div>

          {/* 3 High-Impact 3D Interactive Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full">
            {/* Stat 1: Performance Based Stipend */}
            <Card3D maxTilt={14} depth={22} className="w-full">
              <div className="relative p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-lavender-200/90 shadow-[0_6px_22px_rgba(124,58,237,0.08)] text-center overflow-hidden h-full">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
                <span className="text-sm block mb-1">💰</span>
                <span className="block text-2xl sm:text-3xl font-black text-emerald-600 mb-0.5">
                  ₹10K - ₹15K
                </span>
                <span className="text-[11px] font-bold text-lavender-600 uppercase tracking-wider block">
                  Performance Based Stipend
                </span>
              </div>
            </Card3D>

            {/* Stat 2: Senior Mentor */}
            <Card3D maxTilt={14} depth={22} className="w-full">
              <div className="relative p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-lavender-200/90 shadow-[0_6px_22px_rgba(124,58,237,0.08)] text-center overflow-hidden h-full">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
                <span className="text-sm block mb-1">👨‍🏫</span>
                <span className="block text-2xl sm:text-3xl font-black text-amber-600 mb-0.5">
                  Senior Mentor
                </span>
                <span className="text-[11px] font-bold text-lavender-600 uppercase tracking-wider block">
                  1-on-1 Guidance & Reviews
                </span>
              </div>
            </Card3D>

            {/* Stat 3: Corporate Placement */}
            <Card3D maxTilt={14} depth={22} className="w-full">
              <div className="relative p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-lavender-200/90 shadow-[0_6px_22px_rgba(124,58,237,0.08)] text-center overflow-hidden h-full">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500" />
                <span className="text-sm block mb-1">🏆</span>
                <span className="block text-2xl sm:text-3xl font-black text-purple-700 mb-0.5">
                  Placement
                </span>
                <span className="text-[11px] font-bold text-lavender-600 uppercase tracking-wider block">
                  Partner Network Support
                </span>
              </div>
            </Card3D>
          </div>
        </div>
      </section>

      {/* QUICK HIGHLIGHT CARDS GRID WITH 3D TILT PHYSICS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Corporate Domains */}
        <Card3D onClick={() => onNavigate('domains')} maxTilt={10} depth={25}>
          <div className="p-7 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-xl border border-lavender-200/90 shadow-[0_10px_35px_rgba(124,58,237,0.08)] flex flex-col justify-between h-full group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-2xl text-white mb-5 shadow-[0_6px_20px_rgba(124,58,237,0.35)] group-hover:scale-110 group-hover:rotate-3 transition-transform">
                💼
              </div>
              <h3 className="text-xl font-bold text-lavender-950 mb-2.5 group-hover:text-purple-700 transition-colors">
                Corporate Domains
              </h3>
              <p className="text-xs sm:text-sm text-lavender-700 leading-relaxed">
                Explore 2 core corporate specializations: <strong>AI Integrated Full Stack Development</strong> and <strong>Embedded Systems & IoT</strong>.
              </p>
            </div>
            <span className="mt-6 text-xs font-bold text-purple-600 group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1.5">
              View All Domains <span>→</span>
            </span>
          </div>
        </Card3D>

        {/* Card 2: 4-Stage Learning Curve */}
        <Card3D onClick={() => onNavigate('journey')} maxTilt={10} depth={25}>
          <div className="p-7 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-xl border border-lavender-200/90 shadow-[0_10px_35px_rgba(124,58,237,0.08)] flex flex-col justify-between h-full group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-2xl text-white mb-5 shadow-[0_6px_20px_rgba(236,72,153,0.35)] group-hover:scale-110 group-hover:rotate-3 transition-transform">
                🗺️
              </div>
              <h3 className="text-xl font-bold text-lavender-950 mb-2.5 group-hover:text-purple-700 transition-colors">
                4-Stage Learning Curve
              </h3>
              <p className="text-xs sm:text-sm text-lavender-700 leading-relaxed">
                From online technical screening to live hands-on labs, enterprise client projects, and verified placement certification.
              </p>
            </div>
            <span className="mt-6 text-xs font-bold text-purple-600 group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1.5">
              Inspect Program Journey <span>→</span>
            </span>
          </div>
        </Card3D>

        {/* Card 3: Applicant Dashboard */}
        <Card3D onClick={() => onNavigate('applications')} maxTilt={10} depth={25}>
          <div className="p-7 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-xl border border-lavender-200/90 shadow-[0_10px_35px_rgba(124,58,237,0.08)] flex flex-col justify-between h-full group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center text-2xl text-white mb-5 shadow-[0_6px_20px_rgba(99,102,241,0.35)] group-hover:scale-110 group-hover:rotate-3 transition-transform">
                📊
              </div>
              <h3 className="text-xl font-bold text-lavender-950 mb-2.5 group-hover:text-purple-700 transition-colors">
                Applicant Dashboard
              </h3>
              <p className="text-xs sm:text-sm text-lavender-700 leading-relaxed">
                Track real-time cohort volumes, evaluation progress, and candidate screening statistics synced with the live database.
              </p>
            </div>
            <span className="mt-6 text-xs font-bold text-purple-600 group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1.5">
              Track Application Counts <span>→</span>
            </span>
          </div>
        </Card3D>
      </section>

      {/* OUR TRAINEES PLACED COMPANIES TREE STRUCTURE SHOWCASE */}
      <section>
        <PlacementTreeNetwork />
      </section>
    </div>
  );
}
