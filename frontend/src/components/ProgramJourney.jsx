import React, { useState } from 'react';
import Card3D from './common3d/Card3D';
import Button3D from './common3d/Button3D';
import Badge3D from './common3d/Badge3D';
import { CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Terminal, Code2, Award, Briefcase } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Technical Screening & Onboarding',
    desc: 'Undergo diagnostic technical screening, select your corporate domain (AI Full Stack or Embedded IoT), and get onboarded into the SPHERONIX internal developer environment.',
    icon: <Terminal className="w-6 h-6 text-white" />,
    badge: 'Stage 1',
    deliverables: 'Profile evaluation, tech assessment & repository credentials',
    color: 'from-purple-500 to-indigo-600',
    accentColor: '#a855f7',
  },
  {
    step: '02',
    title: 'Intensive Lab Sprints',
    desc: 'Attend hands-on architecture sprints led by senior industry mentors. Master production tools, CI/CD pipelines, system design, FreeRTOS, TinyML, and hardware benches.',
    icon: <Code2 className="w-6 h-6 text-white" />,
    badge: 'Stage 2',
    deliverables: 'Architecture workshops, code sprints & lab milestone clearance',
    color: 'from-fuchsia-500 to-pink-600',
    accentColor: '#ec4899',
  },
  {
    step: '03',
    title: 'Live Enterprise Projects',
    desc: 'Deploy code directly to production-grade repositories. Work on live enterprise client features and telemetry pipelines with weekly 1-on-1 code reviews and monthly stipends.',
    icon: <Briefcase className="w-6 h-6 text-white" />,
    badge: 'Stage 3',
    deliverables: 'Production pull requests & performance stipend disbursement',
    color: 'from-indigo-500 to-cyan-600',
    accentColor: '#06b6d4',
  },
  {
    step: '04',
    title: 'Verified Placements & Certification',
    desc: 'Receive verified SPHERONIX Experience Certificate, cryptographic QR credential, executive LOR, and fast-track corporate referral rounds with tier-1 hiring partners.',
    icon: <Award className="w-6 h-6 text-white" />,
    badge: 'Stage 4',
    deliverables: 'Verifiable credentials, executive LOR & recruiter placement',
    color: 'from-emerald-500 to-teal-600',
    accentColor: '#10b981',
  },
];

export default function ProgramJourney({ onApplyClick }) {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section className="space-y-10 sm:space-y-12 perspective-1000" id="program-journey">
      {/* 3D Connected Pathway Header Indicator */}
      <div className="hidden lg:flex items-center justify-between relative px-6 py-3 rounded-2xl bg-lavender-100/60 border border-lavender-200/80 shadow-2xs">
        {/* Animated Connecting Laser Beam */}
        <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-[2px] bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-500 z-0 opacity-40" />

        {STEPS.map((s, idx) => {
          const isSelected = activeStage === idx;
          return (
            <button
              key={idx}
              onClick={() => setActiveStage(idx)}
              className={`relative z-10 flex items-center gap-2.5 px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'bg-white shadow-[0_4px_16px_rgba(124,58,237,0.2)] border border-purple-300 scale-105'
                  : 'bg-white/80 hover:bg-white text-lavender-700 border border-lavender-200/60'
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white ${
                  isSelected ? 'bg-purple-600' : 'bg-lavender-400'
                }`}
              >
                {s.step}
              </span>
              <span className="text-xs font-bold tracking-tight text-lavender-900">
                {s.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* 4 Steps 3D Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {STEPS.map((item, idx) => (
          <Card3D
            key={idx}
            maxTilt={10}
            depth={22}
            className="h-full"
            onClick={() => setActiveStage(idx)}
          >
            <div className="group relative bg-white/95 backdrop-blur-xl border border-lavender-200/90 rounded-3xl p-6 sm:p-7 shadow-[0_8px_30px_rgba(124,58,237,0.06)] hover:shadow-[0_20px_50px_rgba(124,58,237,0.18)] transition-all duration-300 flex flex-col justify-between overflow-hidden h-full">
              {/* Top accent gradient line */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${item.color}`} />

              <div>
                {/* Header: Numeric index and 3D badge */}
                <div className="flex justify-between items-center mb-5">
                  <span className="text-3xl sm:text-4xl font-black text-lavender-300 group-hover:text-purple-600 transition-colors">
                    {item.step}
                  </span>
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-purple-100/80 text-purple-800 border border-purple-200/80 shadow-2xs">
                    {item.badge}
                  </span>
                </div>

                {/* Icon Container with 3D Depth */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.color} flex items-center justify-center shadow-[0_6px_20px_rgba(124,58,237,0.3)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 mb-5`}
                >
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
                <span className="text-xs font-bold text-purple-900 flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>{item.deliverables}</span>
                </span>
              </div>
            </div>
          </Card3D>
        ))}
      </div>

      {/* High-Impact 3D Call to Action Banner */}
      <div className="relative p-7 sm:p-10 rounded-3xl bg-gradient-to-r from-purple-800 via-indigo-900 to-slate-950 text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-[0_18px_50px_rgba(124,58,237,0.3)] overflow-hidden">
        {/* Decorative blur orbs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center md:text-left">
          <Badge3D beacon={true} beaconColor="cyan" className="mb-3 bg-white/10 text-white border-white/20">
            <span className="uppercase tracking-widest text-[10px] font-black">
              Cohort 2026 Admissions
            </span>
          </Badge3D>
          <h4 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
            Ready to Begin Your Corporate Career?
          </h4>
          <p className="text-xs sm:text-sm text-lavender-200 mt-1.5 max-w-xl leading-relaxed">
            Limited seats are allocated per corporate domain to guarantee dedicated 1-on-1 industry mentor attention and direct recruiter referrals.
          </p>
        </div>

        <Button3D
          variant="secondary"
          size="lg"
          onClick={onApplyClick}
          icon={<ArrowRight className="w-4 h-4 text-purple-700" />}
        >
          Apply for Batch 2026
        </Button3D>
      </div>
    </section>
  );
}
