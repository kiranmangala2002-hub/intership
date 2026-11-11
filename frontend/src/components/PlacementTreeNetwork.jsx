import React, { useState } from 'react';

// Top Corporate Hiring Partners with official logos and industries (Packages strictly > 4.0 LPA and < 10.0 LPA)
const HIRING_PARTNERS_ROW_1 = [
  { id: 'google', name: 'Google', logo: '/companies/google.png', industry: 'Cloud & AI Systems', ctc: '₹9.8 LPA' },
  { id: 'intel', name: 'Intel', logo: '/companies/intel.png', industry: 'Semiconductors & Edge AI', ctc: '₹8.8 LPA' },
  { id: 'tcs', name: 'TCS Digital', logo: '/companies/tcs.png', industry: 'Enterprise Platforms', ctc: '₹5.8 LPA' },
  { id: 'arm', name: 'ARM', logo: '/companies/arm.png', industry: 'Architecture & Kernels', ctc: '₹9.2 LPA' },
  { id: 'bosch', name: 'Bosch', logo: '/companies/bosch.png', industry: 'Mobility & Automotive IoT', ctc: '₹8.4 LPA' },
  { id: 'infosys', name: 'Infosys', logo: '/companies/infosys.png', industry: 'Full Stack Engineering', ctc: '₹5.2 LPA' },
];

const HIRING_PARTNERS_ROW_2 = [
  { id: 'amd', name: 'AMD', logo: '/companies/amd.png', industry: 'Processors & Validation', ctc: '₹9.5 LPA' },
  { id: 'capgemini', name: 'Capgemini', logo: '/companies/capgemini.png', industry: 'Cloud Architecture', ctc: '₹6.8 LPA' },
  { id: 'microchip', name: 'Microchip', logo: '/companies/microchip.png', industry: 'Microcontrollers & Firmware', ctc: '₹7.8 LPA' },
  { id: 'cognizant', name: 'Cognizant', logo: '/companies/cognizant.png', industry: 'Software Solutions', ctc: '₹4.8 LPA' },
  { id: 'accenture', name: 'Accenture', logo: '/companies/accenture.png', industry: 'Digital Platforms', ctc: '₹6.2 LPA' },
  { id: 'verizon', name: 'Verizon', logo: '/companies/verizon.png', industry: 'Network Automation', ctc: '₹7.2 LPA' },
];

// Verified Placed Alumni from Premier Rayalaseema Region Engineering Colleges
const ALUMNI_PLACEMENTS = [
  {
    id: 1,
    studentName: 'K. Sai Teja Reddy',
    college: 'Sri Venkateswara University College of Engineering (SVUCE), Tirupati',
    domain: 'AI Integrated Full Stack Development',
    domainTag: 'Full Stack',
    company: 'Google',
    companyLogo: '/companies/google.png',
    role: 'AI Systems Engineer',
    package: '₹9.8 LPA',
    batch: 'Class of 2026',
    initial: 'K',
  },
  {
    id: 2,
    studentName: 'M. Harika Chowdary',
    college: 'G. Pulla Reddy Engineering College (GPREC), Kurnool',
    domain: 'AI Integrated Full Stack Development',
    domainTag: 'Full Stack',
    company: 'Infosys',
    companyLogo: '/companies/infosys.png',
    role: 'Full Stack Specialist',
    package: '₹5.2 LPA',
    batch: 'Class of 2026',
    initial: 'M',
  },
  {
    id: 3,
    studentName: 'B. Dinesh Naidu',
    college: 'Rajeev Gandhi Memorial College of Engineering & Technology (RGMCET), Nandyal',
    domain: 'Embedded Systems & IoT',
    domainTag: 'Embedded IoT',
    company: 'Intel',
    companyLogo: '/companies/intel.png',
    role: 'IoT Edge Firmware Developer',
    package: '₹8.8 LPA',
    batch: 'Class of 2026',
    initial: 'B',
  },
  {
    id: 4,
    studentName: 'P. Charan Kumar',
    college: 'Madanapalle Institute of Technology & Science (MITS), Chittoor Dist',
    domain: 'AI Integrated Full Stack Development',
    domainTag: 'Full Stack',
    company: 'TCS Digital',
    companyLogo: '/companies/tcs.png',
    role: 'Cloud Platform Architect',
    package: '₹5.8 LPA',
    batch: 'Class of 2025',
    initial: 'P',
  },
  {
    id: 5,
    studentName: 'S. Navya Sree',
    college: 'K.S.R.M. College of Engineering (KSRMCE), Kadapa',
    domain: 'Embedded Systems & IoT',
    domainTag: 'Embedded IoT',
    company: 'Microchip',
    companyLogo: '/companies/microchip.png',
    role: 'Embedded Firmware & TinyML',
    package: '₹7.8 LPA',
    batch: 'Class of 2026',
    initial: 'S',
  },
  {
    id: 6,
    studentName: 'V. Bhavani Prasad',
    college: 'Sree Vidyanikethan Engineering College, Tirupati',
    domain: 'Embedded Systems & IoT',
    domainTag: 'Embedded IoT',
    company: 'AMD',
    companyLogo: '/companies/amd.png',
    role: 'Hardware Validation Engineer',
    package: '₹9.5 LPA',
    batch: 'Class of 2026',
    initial: 'V',
  },
  {
    id: 7,
    studentName: 'G. Vamsi Krishna',
    college: 'YSR Engineering College of Yogi Vemana University, Proddatur, Kadapa Dist',
    domain: 'AI Integrated Full Stack Development',
    domainTag: 'Full Stack',
    company: 'Capgemini',
    companyLogo: '/companies/capgemini.png',
    role: 'Backend Systems Architect',
    package: '₹6.8 LPA',
    batch: 'Class of 2026',
    initial: 'G',
  },
  {
    id: 8,
    studentName: 'K. Manoj Kumar',
    college: 'G. Pullaiah College of Engineering and Technology (GPCET), Kurnool',
    domain: 'Embedded Systems & IoT',
    domainTag: 'Embedded IoT',
    company: 'Bosch',
    companyLogo: '/companies/bosch.png',
    role: 'Automotive Embedded Systems',
    package: '₹8.4 LPA',
    batch: 'Class of 2025',
    initial: 'M',
  },
];

export default function PlacementTreeNetwork() {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredAlumni = ALUMNI_PLACEMENTS.filter((item) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Full Stack') return item.domainTag === 'Full Stack';
    if (selectedFilter === 'Embedded IoT') return item.domainTag === 'Embedded IoT';
    return true;
  });

  return (
    <div className="relative w-full pt-6 sm:pt-10 pb-2 sm:pb-3 overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-purple-200/40 via-lavender-200/30 to-indigo-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* ========================================================= */}
      {/* 1. SECTION HEADER                                         */}
      {/* ========================================================= */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 px-4">
        <div className="inline-flex items-center gap-2 text-[11px] font-black tracking-widest uppercase text-purple-700 bg-purple-100/90 px-3.5 py-1 rounded-full border border-purple-200/80 mb-3 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          VERIFIED CORPORATE PLACEMENT NETWORK
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-lavender-950 tracking-tight leading-tight">
          Where our talent lands <br className="hidden sm:inline" />
          powers the industry.
        </h2>
        <p className="text-xs sm:text-sm text-lavender-700 mt-3 max-w-xl mx-auto leading-relaxed">
          From intensive hands-on lab sprints to tier-1 technology leaders. Explore verified career placements from premier Rayalaseema region engineering institutes.
        </p>
      </div>

      {/* ========================================================= */}
      {/* 2. EXECUTIVE METRICS BAR                                  */}
      {/* ========================================================= */}
      <div className="max-w-4xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 p-4 sm:p-5 rounded-3xl bg-white/90 backdrop-blur-xl border border-lavender-200 shadow-[0_8px_30px_rgba(124,58,237,0.06)]">
          <div className="p-3 text-center border-b sm:border-b-0 sm:border-r border-lavender-100">
            <span className="text-2xl sm:text-3xl font-black text-indigo-700 block">40+</span>
            <span className="text-[10px] sm:text-[11px] font-bold text-lavender-600 uppercase tracking-wider">
              Hiring Partners
            </span>
          </div>
          <div className="p-3 text-center border-b sm:border-b-0 sm:border-r border-lavender-100">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 block">₹9.8 LPA</span>
            <span className="text-[10px] sm:text-[11px] font-bold text-lavender-600 uppercase tracking-wider">
              Top CTC Package
            </span>
          </div>
          <div className="p-3 text-center">
            <span className="text-2xl sm:text-3xl font-black text-sky-600 block">100%</span>
            <span className="text-[10px] sm:text-[11px] font-bold text-lavender-600 uppercase tracking-wider">
              Placement Support
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. DUAL-ROW INFINITE KINETIC LOGO MARQUEE (TOP RECRUITERS)*/}
      {/* ========================================================= */}
      <div className="w-full space-y-4 mb-16 overflow-hidden select-none">
        {/* Row 1: Sliding Left */}
        <div className="flex gap-4 w-max animate-[marqueeLeft_35s_linear_infinite] hover:[animation-play-state:paused]">
          {[...HIRING_PARTNERS_ROW_1, ...HIRING_PARTNERS_ROW_1, ...HIRING_PARTNERS_ROW_1].map((comp, idx) => (
            <div
              key={`r1-${idx}`}
              className="w-56 sm:w-64 h-22 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-lavender-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex items-center justify-between gap-4 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(124,58,237,0.14)] hover:border-purple-300 transition-all flex-shrink-0"
            >
              <div className="h-10 w-28 sm:w-32 flex items-center justify-start">
                <img
                  src={comp.logo}
                  alt={comp.name}
                  className="h-8 sm:h-9 max-w-full object-contain filter drop-shadow-2xs transition-transform group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-lavender-500 block truncate max-w-[110px]">
                  {comp.industry}
                </span>
                <span className="text-[12px] font-black text-emerald-600 block">
                  {comp.ctc}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Sliding Right */}
        <div className="flex gap-4 w-max animate-[marqueeRight_35s_linear_infinite] hover:[animation-play-state:paused]">
          {[...HIRING_PARTNERS_ROW_2, ...HIRING_PARTNERS_ROW_2, ...HIRING_PARTNERS_ROW_2].map((comp, idx) => (
            <div
              key={`r2-${idx}`}
              className="w-56 sm:w-64 h-22 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-lavender-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex items-center justify-between gap-4 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(124,58,237,0.14)] hover:border-purple-300 transition-all flex-shrink-0"
            >
              <div className="h-10 w-28 sm:w-32 flex items-center justify-start">
                <img
                  src={comp.logo}
                  alt={comp.name}
                  className="h-8 sm:h-9 max-w-full object-contain filter drop-shadow-2xs transition-transform group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-lavender-500 block truncate max-w-[110px]">
                  {comp.industry}
                </span>
                <span className="text-[12px] font-black text-emerald-600 block">
                  {comp.ctc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. FEATURED ALUMNI PLACEMENT SUCCESS STORIES              */}
      {/* ========================================================= */}
      <div className="max-w-6xl mx-auto px-4">
        {/* Toolbar with Track Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-2xl font-black text-lavender-950 tracking-tight">
              Recent Alumni Career Placements
            </h3>
            <p className="text-xs text-lavender-600 mt-0.5">
              Verified selections across premier Rayalaseema region engineering colleges & tier-1 recruiters.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-lavender-100/80 border border-lavender-200">
            <button
              onClick={() => setSelectedFilter('All')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedFilter === 'All'
                  ? 'bg-purple-600 text-white shadow-2xs'
                  : 'text-lavender-700 hover:text-lavender-950'
              }`}
            >
              ⭐ All Tracks
            </button>
            <button
              onClick={() => setSelectedFilter('Full Stack')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedFilter === 'Full Stack'
                  ? 'bg-purple-600 text-white shadow-2xs'
                  : 'text-lavender-700 hover:text-lavender-950'
              }`}
            >
              💻 AI Full Stack
            </button>
            <button
              onClick={() => setSelectedFilter('Embedded IoT')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedFilter === 'Embedded IoT'
                  ? 'bg-purple-600 text-white shadow-2xs'
                  : 'text-lavender-700 hover:text-lavender-950'
              }`}
            >
              ⚡ Embedded IoT
            </button>
          </div>
        </div>

        {/* 8 Featured Placement Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredAlumni.map((alum) => (
            <div
              key={alum.id}
              className="p-5 rounded-3xl bg-white/90 backdrop-blur-xl border border-lavender-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(124,58,237,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header: Student Initial & Hiring Company Logo */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-black text-lg flex items-center justify-center shadow-2xs flex-shrink-0 group-hover:scale-105 transition-transform">
                    {alum.initial}
                  </div>
                  <div className="h-10 px-3 py-1 rounded-xl bg-white border border-lavender-200/90 shadow-2xs flex items-center justify-center max-w-[125px]">
                    <img
                      src={alum.companyLogo}
                      alt={alum.company}
                      className="h-7 max-w-full object-contain filter group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Candidate Name & Rayalaseema College */}
                <h4 className="font-black text-lavender-950 text-base leading-tight group-hover:text-purple-700 transition-colors">
                  {alum.studentName}
                </h4>
                <p
                  title={alum.college}
                  className="text-[11px] text-lavender-600 mt-1 font-medium leading-snug min-h-[32px] line-clamp-2"
                >
                  {alum.college}
                </p>

                {/* Role Offered & Company */}
                <div className="mt-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-lavender-900">
                    <span className="text-purple-700 font-extrabold">{alum.company}</span>
                    <span className="text-lavender-300">•</span>
                    <span className="text-lavender-700 truncate">{alum.role}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-purple-600 block mt-0.5">
                    {alum.batch}
                  </span>
                </div>
              </div>

              {/* Bottom Row: CTC Package Pill & Verified Offer Badge */}
              <div className="pt-4 mt-4 border-t border-lavender-100 flex items-center justify-between">
                <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                  {alum.package}
                </span>
                <span className="text-[10px] font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-lg border border-purple-200 flex items-center gap-1">
                  <span>✓</span> Placed
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Placement Support Footer Pill */}
        <div className="mt-6 sm:mt-8 p-5 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-950 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="text-2xl flex-shrink-0">🚀</span>
            <div>
              <h4 className="font-extrabold text-sm sm:text-base">
                Ready to kickstart your corporate tech career?
              </h4>
              <p className="text-xs text-lavender-300 mt-0.5">
                Comprehensive training with direct corporate referrals, resume workshops, and technical mock interviews.
              </p>
            </div>
          </div>
          <a
            href="#applications"
            className="px-5 py-2.5 rounded-2xl text-xs font-extrabold text-purple-950 bg-white hover:bg-lavender-100 hover:scale-102 active:scale-95 transition-all shadow-md whitespace-nowrap"
          >
            Apply for Corporate Cohort 2026 →
          </a>
        </div>
      </div>
    </div>
  );
}
