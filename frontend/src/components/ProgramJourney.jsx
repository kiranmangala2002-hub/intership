import React from 'react';

const STEPS = [
  {
    step: '01',
    title: 'Domain Selection & Application',
    desc: 'Select your flagship corporate specialization (AI Full Stack or Embedded IoT) and submit your student profile, academic credentials, and resume.',
    icon: '📝',
    badge: 'Stage 1',
    deliverables: 'Profile submission & screening evaluation',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    step: '02',
    title: 'Corporate Hands-On Training',
    desc: 'Attend immersive technical architecture workshops led by senior industry mentors. Master production tools, CI/CD, system design, and edge hardware.',
    icon: '⚡',
    badge: 'Stage 2',
    deliverables: 'Live architecture labs & core mastery',
    color: 'from-fuchsia-500 to-pink-600',
  },
  {
    step: '03',
    title: 'Live Enterprise Project Work',
    desc: 'Deploy code directly to production-grade repositories. Tackle real-world client briefs and telemetry pipelines with weekly 1-on-1 code reviews.',
    icon: '💻',
    badge: 'Stage 3',
    deliverables: 'Production code & monthly stipend disbursement',
    color: 'from-indigo-500 to-cyan-600',
  },
  {
    step: '04',
    title: 'Certification & Placement Support',
    desc: 'Receive verified SPHERONIX Experience Certificate, cryptographic QR credential, executive LOR, and priority PPO fast-track interview rounds.',
    icon: '🎓',
    badge: 'Stage 4',
    deliverables: 'Verifiable credentials & placement assistance',
    color: 'from-emerald-500 to-teal-600',
  },
];

export default function ProgramJourney({ onApplyClick }) {
  return (
    <section className="space-y-12" id="program-journey">
      {/* 4 Steps Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {STEPS.map((item, idx) => (
          <div
            key={idx}
            className="group relative bg-white/90 backdrop-blur-xl border border-lavender-200/90 rounded-3xl p-6 sm:p-7 shadow-[0_10px_35px_rgba(124,58,237,0.06)] hover:shadow-[0_20px_45px_rgba(124,58,237,0.16)] transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden"
          >
            {/* Top accent gradient line */}
            <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${item.color}`} />

            <div>
              {/* Header: Numeric index and badge */}
              <div className="flex justify-between items-center mb-5">
                <span className="text-3xl sm:text-4xl font-black text-lavender-300 group-hover:text-purple-600 transition-colors">
                  {item.step}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-100/70 text-purple-800 border border-purple-200/60 shadow-2xs">
                  {item.badge}
                </span>
              </div>

              {/* Icon Container */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-2xl text-white mb-5 shadow-[0_4px_16px_rgba(124,58,237,0.25)] group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                {item.icon}
              </div>

              <h3 className="text-lg sm:text-xl font-black text-lavender-950 mb-2.5 group-hover:text-purple-700 transition-colors">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm leading-relaxed text-lavender-700/90 mb-5">
                {item.desc}
              </p>
            </div>

            {/* Deliverable highlight tag */}
            <div className="pt-4 border-t border-lavender-100">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-lavender-500 block mb-1">
                Milestone Deliverable
              </span>
              <span className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                <span className="text-emerald-500 font-extrabold">✓</span> {item.deliverables}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* High-Impact Bottom Call to Action Banner */}
      <div className="relative p-7 sm:p-10 rounded-3xl bg-gradient-to-r from-purple-700 via-lavender-700 to-indigo-800 text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-[0_15px_45px_rgba(124,58,237,0.35)] overflow-hidden">
        {/* Decorative blur orbs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-lavender-200 bg-white/10 px-3.5 py-1 rounded-full border border-white/20 inline-block mb-2">
            Cohort 2026 Admissions
          </span>
          <h4 className="text-2xl sm:text-3xl font-black tracking-tight">
            Ready to Begin Your Corporate Career?
          </h4>
          <p className="text-xs sm:text-sm text-lavender-100/90 mt-1.5 max-w-xl">
            Limited seats are allocated per corporate domain to guarantee dedicated 1-on-1 industry mentor attention.
          </p>
        </div>

        <button
          onClick={onApplyClick}
          className="relative z-10 w-full md:w-auto px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-black bg-white text-purple-950 hover:bg-lavender-50 shadow-xl hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
        >
          🚀 Apply for Batch 2026 →
        </button>
      </div>
    </section>
  );
}
