import React from 'react';
import TrainingPerks from '../components/TrainingPerks';
import PlacementTreeNetwork from '../components/PlacementTreeNetwork';

export default function PerksPage({ onApplyClick }) {
  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold tracking-wider uppercase text-purple-700 bg-purple-100/80 px-3.5 py-1 rounded-full border border-purple-200/60 inline-flex items-center gap-1.5">
          ✨ Mentorship & Advantages
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-lavender-950 mt-3 tracking-tight">
          Corporate Benefits & Mentorship
        </h1>
        <p className="text-xs sm:text-sm text-lavender-700 mt-2 leading-relaxed">
          Discover why engineering undergraduates choose SPHERONIX for industry credentials, performance based stipends, and professional career acceleration.
        </p>
      </div>

      <TrainingPerks />

      {/* Corporate Placed Companies Tree Structure Showcase */}
      <section>
        <PlacementTreeNetwork />
      </section>

      {/* Verified Certificate Showcase Card */}
      <section className="p-7 sm:p-10 rounded-3xl bg-white/90 backdrop-blur-xl border border-lavender-200/90 shadow-[0_10px_40px_rgba(124,58,237,0.08)] max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-600 border-2 border-amber-300 flex items-center justify-center text-4xl shadow-md flex-shrink-0">
          📜
        </div>
        <div className="flex-1 text-center md:text-left">
          <span className="text-xs font-bold text-purple-700 uppercase tracking-wider inline-flex items-center gap-1.5">
            <span>✨</span> Official Industry Credential
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-lavender-950 mt-1">
            Verifiable Corporate Experience Certificate
          </h3>
          <p className="text-xs sm:text-sm text-lavender-700 leading-relaxed mt-2">
            Every graduate receives an official SPHERONIX Corporate Internship Certificate containing a cryptographic QR code for instant recruiter verification, along with an executive Letter of Recommendation (LOR).
          </p>
        </div>
        <button
          onClick={onApplyClick}
          className="w-full md:w-auto px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_4px_16px_rgba(124,58,237,0.35)] hover:shadow-[0_6px_22px_rgba(124,58,237,0.5)] transition-all flex-shrink-0 hover:scale-105 active:scale-95 text-center"
        >
          Enroll & Get Certified →
        </button>
      </section>
    </div>
  );
}
