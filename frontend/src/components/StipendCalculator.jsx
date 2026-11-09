import React, { useState } from 'react';

export default function StipendCalculator({ onOpenRegister }) {
  const [selectedDomain, setSelectedDomain] = useState('fullstack'); // 'fullstack' | 'embedded'
  const [duration, setDuration] = useState(6); // 3, 4, 5, 6 months
  const [performanceTier, setPerformanceTier] = useState('advanced'); // 'standard' | 'advanced' | 'top'

  // Stipend configurations
  const monthlyRates = {
    fullstack: {
      name: 'AI Integrated Full Stack Development',
      standard: 25000,
      advanced: 32000,
      top: 40000,
    },
    embedded: {
      name: 'Embedded Systems & IoT',
      standard: 22000,
      advanced: 30000,
      top: 38000,
    },
  };

  const currentRate = monthlyRates[selectedDomain][performanceTier];
  const totalStipend = currentRate * duration;
  const mentorHours = duration * 8; // 8 hours of dedicated 1-on-1 reviews per month
  const gitCommits = duration * 60; // ~60 production commits per month
  const projectsCount = duration >= 5 ? 4 : duration >= 4 ? 3 : 2;

  return (
    <div className="relative p-7 sm:p-10 rounded-3xl bg-white/95 backdrop-blur-2xl border border-lavender-200/90 shadow-[0_15px_50px_rgba(124,58,237,0.1)] overflow-hidden max-w-5xl mx-auto">
      {/* Decorative ambient background gradients */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-400/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <span className="text-xs font-bold tracking-wider uppercase text-purple-700 bg-purple-100/80 px-3.5 py-1 rounded-full border border-purple-200/60 inline-flex items-center gap-1.5">
          📊 Interactive Career & Benefits Estimator
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-lavender-950 mt-3 tracking-tight">
          Calculate Your Corporate Internship Earnings & ROI
        </h2>
        <p className="text-xs sm:text-sm text-lavender-700 mt-2 leading-relaxed">
          Estimate your cumulative monthly stipend payout, mentor hours, and verified production portfolio deliverables based on your chosen track and duration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Interactive Controls */}
        <div className="lg:col-span-6 space-y-6">
          {/* Domain Selection Tabs */}
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-lavender-600 block mb-2.5">
              1. Select Corporate Domain
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedDomain('fullstack')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  selectedDomain === 'fullstack'
                    ? 'bg-purple-600 text-white border-purple-500 shadow-md scale-[1.02]'
                    : 'bg-lavender-50/70 hover:bg-lavender-100/70 border-lavender-200/80 text-lavender-900'
                }`}
              >
                <span className="text-lg block mb-1">💻</span>
                <span className="text-xs font-black block">AI Full Stack</span>
                <span className={`text-[11px] block mt-0.5 ${selectedDomain === 'fullstack' ? 'text-purple-200' : 'text-lavender-600'}`}>
                  Up to ₹40,000/mo
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedDomain('embedded')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  selectedDomain === 'embedded'
                    ? 'bg-purple-600 text-white border-purple-500 shadow-md scale-[1.02]'
                    : 'bg-lavender-50/70 hover:bg-lavender-100/70 border-lavender-200/80 text-lavender-900'
                }`}
              >
                <span className="text-lg block mb-1">⚡</span>
                <span className="text-xs font-black block">Embedded & IoT</span>
                <span className={`text-[11px] block mt-0.5 ${selectedDomain === 'embedded' ? 'text-purple-200' : 'text-lavender-600'}`}>
                  Up to ₹38,000/mo
                </span>
              </button>
            </div>
          </div>

          {/* Duration Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-lavender-600">
                2. Internship Duration
              </label>
              <span className="text-xs font-black text-purple-700 bg-purple-100 px-3 py-0.5 rounded-full border border-purple-200">
                {duration} Months
              </span>
            </div>
            <input
              type="range"
              min="3"
              max="6"
              step="1"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value, 10))}
              className="w-full h-2.5 bg-lavender-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <div className="flex justify-between text-[11px] font-bold text-lavender-500 mt-1.5">
              <span>3 Months</span>
              <span>4 Months</span>
              <span>5 Months</span>
              <span>6 Months</span>
            </div>
          </div>

          {/* Performance Tier Toggle */}
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-lavender-600 block mb-2">
              3. Project Milestone Band
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'standard', label: 'Standard', desc: 'Core Milestones' },
                { id: 'advanced', label: 'Advanced', desc: 'High Impact' },
                { id: 'top', label: 'Top Tier', desc: 'Elite Architecture' },
              ].map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setPerformanceTier(tier.id)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    performanceTier === tier.id
                      ? 'bg-purple-100/90 text-purple-950 border-purple-300 font-extrabold shadow-2xs'
                      : 'bg-white hover:bg-lavender-50/80 border-lavender-200 text-lavender-700 text-xs font-medium'
                  }`}
                >
                  <span className="text-xs font-bold block">{tier.label}</span>
                  <span className="text-[10px] opacity-75 block">{tier.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Projected Output Dossier */}
        <div className="lg:col-span-6 bg-gradient-to-br from-lavender-50/90 via-purple-50/50 to-indigo-50/80 p-6 sm:p-8 rounded-3xl border border-purple-200/90 shadow-inner flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-700 block mb-1">
              Estimated Cumulative Stipend
            </span>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl sm:text-5xl font-black text-emerald-600">
                ₹{totalStipend.toLocaleString()}
              </span>
              <span className="text-xs font-bold text-lavender-600">
                (₹{currentRate.toLocaleString()}/mo)
              </span>
            </div>
            <p className="text-xs text-lavender-700 leading-relaxed mb-6">
              Disbursed monthly upon milestone completion into your verified student account.
            </p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-purple-200/70 mb-6">
              <div className="p-3 rounded-2xl bg-white/90 border border-purple-100 shadow-2xs">
                <span className="text-xs block mb-0.5">👥</span>
                <span className="text-lg sm:text-xl font-black text-lavender-950 block">
                  {mentorHours}+ Hours
                </span>
                <span className="text-[10px] font-bold text-lavender-500 uppercase tracking-wider">
                  1-on-1 Mentor Reviews
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/90 border border-purple-100 shadow-2xs">
                <span className="text-xs block mb-0.5">📦</span>
                <span className="text-lg sm:text-xl font-black text-lavender-950 block">
                  {projectsCount} Projects
                </span>
                <span className="text-[10px] font-bold text-lavender-500 uppercase tracking-wider">
                  Enterprise Capstones
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/90 border border-purple-100 shadow-2xs">
                <span className="text-xs block mb-0.5">⚡</span>
                <span className="text-lg sm:text-xl font-black text-lavender-950 block">
                  {gitCommits}+ Commits
                </span>
                <span className="text-[10px] font-bold text-lavender-500 uppercase tracking-wider">
                  Verified Production Git
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/90 border border-purple-100 shadow-2xs">
                <span className="text-xs block mb-0.5">🎯</span>
                <span className="text-lg sm:text-xl font-black text-emerald-600 block">
                  96% Match
                </span>
                <span className="text-[10px] font-bold text-lavender-500 uppercase tracking-wider">
                  Placement Readyness
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenRegister}
            className="w-full py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-purple-600 via-lavender-600 to-indigo-600 shadow-[0_4px_16px_rgba(124,58,237,0.35)] hover:shadow-[0_8px_25px_rgba(124,58,237,0.5)] transition-all hover:scale-[1.02] active:scale-95 text-center"
          >
            Apply for {monthlyRates[selectedDomain].name} →
          </button>
        </div>
      </div>
    </div>
  );
}

