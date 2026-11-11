import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { FSD_PROGRAM_DATA, EMBEDDED_PROGRAM_DATA } from '../data/domainCurriculums';
import Button3D from './common3d/Button3D';
import Card3D from './common3d/Card3D';
import Badge3D from './common3d/Badge3D';
import { ArrowRight, X } from 'lucide-react';

export default function DomainDetailModal({
  isOpen,
  onClose,
  domainName,
  onApplyDomain,
}) {
  const [activeTab, setActiveTab] = useState('modules'); // 'modules' | 'boards' | 'phases' | 'projects' | 'companies' | 'about'
  const [selectedModuleIdx, setSelectedModuleIdx] = useState(0);

  if (!isOpen) return null;

  const isFullStack =
    !domainName ||
    domainName.toLowerCase().includes('full stack') ||
    domainName.toLowerCase().includes('fsd') ||
    domainName.toLowerCase().includes('software');

  const data = isFullStack ? FSD_PROGRAM_DATA : EMBEDDED_PROGRAM_DATA;

  const TABS = isFullStack
    ? [
        { id: 'modules', label: '📖 All 9 Modules' },
        { id: 'phases', label: '🗓️ Phase 1 & 2 Structure' },
        { id: 'projects', label: '🚀 Mini & Major Projects' },
        { id: 'companies', label: '🏢 Top Hiring Companies' },
        { id: 'about', label: 'ℹ️ About SPHERONIX' },
      ]
    : [
        { id: 'modules', label: '📖 10 Modules (4 Parts)' },
        { id: 'boards', label: '🔬 Hardware Boards & Lab' },
        { id: 'phases', label: '🗓️ 4-Part Structure' },
        { id: 'projects', label: '🚀 10 Real Projects' },
        { id: 'companies', label: '🏢 28+ Semiconductor Recruiters' },
        { id: 'about', label: '💡 Why SPHERONIX' },
      ];

  // Group modules by part for embedded
  const getEmbeddedPartName = (idx) => {
    if (idx === 0 || idx === 1) return 'Part 1: Programming Concepts (Linux Platform)';
    if (idx === 2 || idx === 3) return 'Part 2: Embedded AI & IoT (ARM Cortex-M4 & FreeRTOS)';
    if (idx >= 4 && idx <= 7) return 'Part 3: Embedded Linux Device Drivers (LDD & BSP)';
    return 'Part 4: SDLC & Semiconductor Industry Career Preparation';
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/70 backdrop-blur-md overflow-hidden"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl h-[90vh] max-h-[90vh] bg-white rounded-3xl shadow-[0_25px_70px_rgba(124,58,237,0.3)] flex flex-col overflow-hidden border border-lavender-200 animate-cool-page my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gradient Stripe */}
        <div
          className={`h-2 flex-shrink-0 w-full bg-gradient-to-r ${
            isFullStack
              ? 'from-purple-600 via-pink-500 to-indigo-600'
              : 'from-indigo-600 via-teal-500 to-emerald-500'
          }`}
        />

        {/* ========================================================= */}
        {/* MODAL HEADER: Title, Official Company Badges & Close     */}
        {/* ========================================================= */}
        <div className="flex-shrink-0 p-5 sm:p-6 pb-4 border-b border-lavender-100 flex items-start justify-between gap-4 bg-white">
          <div className="flex items-start gap-3.5 sm:gap-4">
            <div
              className={`w-13 h-13 sm:w-15 sm:h-15 rounded-2xl flex items-center justify-center text-3xl shadow-xs flex-shrink-0 ${
                isFullStack
                  ? 'bg-gradient-to-tr from-purple-500 to-indigo-600 text-white'
                  : 'bg-gradient-to-tr from-teal-500 to-indigo-600 text-white'
              }`}
            >
              {data.icon}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
                <span className="text-[10px] sm:text-[11px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                  SPHERONIX OFFICIAL BOOKLET
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold text-lavender-600 bg-lavender-100 px-2.5 py-0.5 rounded-full">
                  ⏱️ 6-Month Program
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
                  <span>{data.stipend}</span>
                  <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-emerald-200/70 text-emerald-950 font-black">
                    {data.stipendType}
                  </span>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-lavender-950 tracking-tight leading-snug">
                {data.title}
              </h2>

              <p className="text-xs sm:text-sm text-lavender-700 mt-0.5 max-w-2xl leading-relaxed">
                {data.subtitle} • <strong>{data.company}</strong>
              </p>

              {/* Target Engineering Roles for Embedded */}
              {!isFullStack && (
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  <span className="text-[10px] font-extrabold uppercase text-lavender-500 tracking-wider">
                    Prepared Roles:
                  </span>
                  {[
                    'Firmware Engineer',
                    'Embedded AI Software Engineer',
                    'Embedded Linux Engineer',
                    'BSP Engineer',
                    'Device Driver Engineer',
                  ].map((role, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200/70"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-lavender-100 hover:bg-lavender-200 text-lavender-700 flex items-center justify-center font-bold text-sm transition-colors flex-shrink-0 hover:scale-105 active:scale-95"
          >
            ✕
          </button>
        </div>

        {/* ========================================================= */}
        {/* INTERACTIVE TAB NAVIGATION BAR                            */}
        {/* ========================================================= */}
        <div className="flex-shrink-0 px-4 sm:px-6 py-2 bg-lavender-50/80 border-b border-lavender-100 flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                data-tab-id={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? isFullStack
                      ? 'bg-purple-600 text-white shadow-xs scale-102'
                      : 'bg-teal-700 text-white shadow-xs scale-102'
                    : 'bg-white text-lavender-700 hover:text-purple-900 hover:bg-lavender-100/70 border border-lavender-200/70'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* SCROLLABLE MODAL CONTENT BODY                             */}
        {/* ========================================================= */}
        <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-6 md:p-7 space-y-6">
          {/* TAB 1: ALL MODULES DETAILED BREAKDOWN */}
          {activeTab === 'modules' && (
            <div className="space-y-5 animate-cool-page">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-lavender-100">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-lavender-950">
                    {isFullStack
                      ? 'Comprehensive Curriculum Covered in Months 1 – 6'
                      : '10 Modules Organized Across 4 Core Technical Parts'}
                  </h3>
                  <p className="text-xs text-lavender-600">
                    {isFullStack
                      ? '8 Core Modules in Technical Training + 1 Major Company Project in Phase 2.'
                      : 'From Linux Platform & Bare-Metal C to Embedded AI, FreeRTOS, Linux Device Drivers & Semiconductor Placement.'}
                  </p>
                </div>
                <div
                  className={`flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full border w-fit ${
                    isFullStack
                      ? 'text-purple-700 bg-purple-50 border-purple-200'
                      : 'text-teal-800 bg-teal-50 border-teal-200'
                  }`}
                >
                  <span>{data.modules.length} Modules Total</span>
                </div>
              </div>

              {/* Part Indicator Banner for Embedded */}
              {!isFullStack && (
                <div className="p-2.5 px-3.5 rounded-xl bg-gradient-to-r from-teal-50 via-indigo-50 to-purple-50 border border-teal-200 text-xs font-extrabold text-teal-900 flex items-center justify-between">
                  <span>📍 Current Part: {getEmbeddedPartName(selectedModuleIdx)}</span>
                  <span className="text-[11px] font-bold text-lavender-600">
                    Module {selectedModuleIdx + 1} of {data.modules.length}
                  </span>
                </div>
              )}

              {/* 6-Month Holographic Progression Timeline Track */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-lavender-50/80 border border-lavender-200/90 shadow-2xs">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 flex items-center gap-1.5">
                    <span>🗓️</span> 6-Month Holographic Learning Timeline
                  </span>
                  <span className="text-[10px] font-bold text-lavender-500">
                    Click node to jump to monthly modules
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {[
                    { month: 'Month 1', label: 'Foundation & Core', mIdx: 0 },
                    { month: 'Month 2', label: isFullStack ? 'Frontend & React' : 'Edge AI & ARM', mIdx: 2 },
                    { month: 'Month 3', label: isFullStack ? 'Backend Microservices' : 'FreeRTOS & IoT', mIdx: isFullStack ? 4 : 3 },
                    { month: 'Month 4', label: isFullStack ? 'AI Agents & Testing' : 'Linux Drivers LDD', mIdx: isFullStack ? 6 : 4 },
                    { month: 'Month 5', label: 'Company Project', mIdx: isFullStack ? 8 : 7 },
                    { month: 'Month 6', label: 'Deploy & Referrals', mIdx: isFullStack ? 8 : 9 },
                  ].map((node, nIdx) => (
                    <button
                      key={nIdx}
                      type="button"
                      onClick={() => setSelectedModuleIdx(node.mIdx)}
                      className={`p-2 rounded-xl text-center transition-all cursor-pointer ${
                        selectedModuleIdx === node.mIdx
                          ? isFullStack
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm scale-102 font-extrabold'
                            : 'bg-gradient-to-r from-teal-700 to-emerald-700 text-white shadow-sm scale-102 font-extrabold'
                          : 'bg-white text-lavender-800 hover:bg-lavender-100 border border-lavender-200/70 text-xs'
                      }`}
                    >
                      <span className="block text-[11px] font-black">{node.month}</span>
                      <span className="block text-[9px] truncate opacity-85 mt-0.5">{node.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Module Selector Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {data.modules.map((m, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedModuleIdx(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      selectedModuleIdx === idx
                        ? isFullStack
                          ? 'bg-purple-700 text-white shadow-xs'
                          : 'bg-teal-700 text-white shadow-xs'
                        : 'bg-lavender-100/80 text-lavender-800 hover:bg-lavender-200 border border-lavender-200/80'
                    }`}
                  >
                    {m.number}
                  </button>
                ))}
              </div>

              {/* Selected Module Deep-Dive Card */}
              {(() => {
                const mod = data.modules[selectedModuleIdx] || data.modules[0];
                return (
                  <div
                    className={`p-5 sm:p-6 rounded-3xl bg-white border-2 shadow-sm space-y-4 ${
                      isFullStack ? 'border-purple-200' : 'border-teal-200'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-lavender-100">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-xs font-black uppercase px-3 py-0.5 rounded-full ${
                              isFullStack
                                ? 'text-purple-700 bg-purple-100'
                                : 'text-teal-800 bg-teal-100'
                            }`}
                          >
                            {mod.number}
                          </span>
                          <span className="text-xs font-bold text-lavender-500">
                            {mod.phase}
                          </span>
                        </div>
                        <h4 className="text-xl font-black text-lavender-950">
                          {mod.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-lavender-600 mt-0.5">
                          {mod.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Subtopics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                      {mod.subtopics.map((sub, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-3.5 rounded-2xl bg-lavender-50/70 border border-lavender-200/80 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-1.5">
                              <span
                                className={`w-5 h-5 rounded-full text-white text-[10px] font-black flex items-center justify-center flex-shrink-0 ${
                                  isFullStack ? 'bg-purple-600' : 'bg-teal-700'
                                }`}
                              >
                                {sub.num}
                              </span>
                              <h5 className="text-xs sm:text-sm font-extrabold text-lavender-950">
                                {sub.name}
                              </h5>
                            </div>
                            <ul className="space-y-1.5 text-xs text-lavender-700 mt-2">
                              {sub.points.map((pt, pIdx) => (
                                <li key={pIdx} className="flex items-start gap-1.5">
                                  <span
                                    className={`font-bold mt-0.5 flex-shrink-0 ${
                                      isFullStack ? 'text-purple-600' : 'text-teal-600'
                                    }`}
                                  >
                                    •
                                  </span>
                                  <span>{pt}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Mini Project Callout */}
                    {mod.miniProject && (
                      <div
                        className={`p-3.5 sm:p-4 rounded-2xl border flex items-start gap-3 ${
                          isFullStack
                            ? 'bg-gradient-to-r from-purple-50 via-indigo-50 to-white border-purple-200'
                            : 'bg-gradient-to-r from-teal-50 via-indigo-50 to-white border-teal-200'
                        }`}
                      >
                        <span className="text-2xl flex-shrink-0">🚀</span>
                        <div>
                          <span
                            className={`text-[10px] font-extrabold uppercase tracking-wider block ${
                              isFullStack ? 'text-purple-700' : 'text-teal-800'
                            }`}
                          >
                            Integrated Project Deliverable
                          </span>
                          <h6 className="text-xs sm:text-sm font-black text-lavender-950 mt-0.5">
                            {mod.miniProject.title}
                          </h6>
                          <p className="text-xs text-lavender-700 mt-1 leading-relaxed">
                            {mod.miniProject.desc}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB 2: DEVELOPMENT BOARDS & HARDWARE LAB (Embedded Domain Only) */}
          {!isFullStack && activeTab === 'boards' && (
            <div className="space-y-6 animate-cool-page">
              <div className="pb-2 border-b border-lavender-100">
                <h3 className="text-base sm:text-lg font-black text-lavender-950">
                  SPHERONIX Development Boards & Hardware Lab Facilities
                </h3>
                <p className="text-xs text-lavender-600">
                  From Page 4 & Page 7 of the Official SPHERONIX Catalog: Focus on 100% practical, real-world hardware platforms.
                </p>
              </div>

              {/* Educational vs Industrial Boards Gap Analysis (Page 4) */}
              <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-50/90 via-white to-purple-50/90 border border-indigo-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">⚠️</span>
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-lavender-950">
                      What Is Industrial Embedded Systems? Bridging the Educational Gap
                    </h4>
                    <span className="text-xs font-bold text-purple-700">
                      Why SPHERONIX trains exclusively on industrial boards instead of toy educational boards
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                    <span className="text-xs font-black uppercase text-amber-900 block">
                      ❌ Educational Boards (Arduino & Raspberry Pi)
                    </span>
                    <p className="text-xs text-amber-950 leading-relaxed">
                      Most generic institutes train using Arduino and Raspberry Pi. However, the real industry rarely uses educational boards for product development. They come with ready-made APIs where developers do not learn hardware registers or low-level timing. This creates a severe skill gap.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                    <span className="text-xs font-black uppercase text-emerald-900 block">
                      ✅ Industrial Boards (BeagleBone Black & STM32 ARM)
                    </span>
                    <p className="text-xs text-emerald-950 leading-relaxed">
                      SPHERONIX trains on ARM Cortex-M (STM32) and ARM Cortex-A (BeagleBone Black) requiring deep register-level C programming, clock tree setup, DMA, custom device tree overlays, and peripheral interfacing without pre-made libraries.
                    </p>
                  </div>
                </div>
              </div>

              {/* 6 Hardware Board Platforms Grid (Page 7) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.developmentBoards.map((b, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-3xl bg-white border border-lavender-200 shadow-2xs hover:border-teal-300 transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-lavender-100">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{b.icon}</span>
                        <div>
                          <span className="text-[10px] font-extrabold uppercase text-teal-700 tracking-wider block">
                            {b.category}
                          </span>
                          <h5 className="text-xs sm:text-sm font-black text-lavender-950">
                            {b.board}
                          </h5>
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-1.5 text-xs text-lavender-700">
                      {b.specs.map((spec, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-1.5">
                          <span className="text-teal-600 font-bold mt-0.5 flex-shrink-0">✓</span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PHASE STRUCTURE & ADMISSION PROCESS */}
          {activeTab === 'phases' && (
            <div className="space-y-6 animate-cool-page">
              <div className="pb-2 border-b border-lavender-100">
                <h3 className="text-base sm:text-lg font-black text-lavender-950">
                  {isFullStack
                    ? 'Two-Phase Corporate Training Structure'
                    : '4-Part Progressive Technical Curriculum'}
                </h3>
                <p className="text-xs text-lavender-600">
                  Designed by SPHERONIX Technology Pvt. Ltd. to bridge the gap between academic theory and industry engineering.
                </p>
              </div>

              {/* Phases / Parts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {data.phasesSummary.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-3xl bg-white border border-lavender-200 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className={`text-xs font-black uppercase px-3 py-0.5 rounded-full ${
                            isFullStack
                              ? 'text-purple-700 bg-purple-100'
                              : 'text-teal-800 bg-teal-100'
                          }`}
                        >
                          {p.phase}
                        </span>
                        <span className="text-xs font-bold text-lavender-500">
                          ⏱️ {p.duration}
                        </span>
                      </div>

                      <h4 className="text-lg font-black text-lavender-950 mb-1">
                        {p.title}
                      </h4>
                      <span
                        className={`text-xs font-bold block mb-3 ${
                          isFullStack ? 'text-purple-600' : 'text-teal-700'
                        }`}
                      >
                        {p.badge}
                      </span>

                      <p className="text-xs sm:text-sm text-lavender-700 leading-relaxed mb-4">
                        {p.desc}
                      </p>

                      <div className="space-y-2 mb-4">
                        {p.highlights.map((hl, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2 text-xs text-lavender-800">
                            <span className="text-emerald-500 font-bold mt-0.5 flex-shrink-0">✓</span>
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Admission Process from Page 4 (For Embedded) */}
              {!isFullStack && data.admissionProcess && (
                <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-lavender-50 via-white to-teal-50/50 border border-lavender-200 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🎓</span>
                    <div>
                      <h4 className="text-sm sm:text-base font-black text-lavender-950">
                        {data.admissionProcess.admissionTest.title}
                      </h4>
                      <span className="text-xs font-bold text-teal-700">
                        Official Entrance Test & 10-Point Training Process
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white border border-lavender-200 space-y-2">
                      <span className="text-xs font-black uppercase text-purple-700 block">
                        📋 Syllabus for Admission Test
                      </span>
                      <ul className="space-y-1 text-xs text-lavender-800">
                        {data.admissionProcess.admissionTest.testSyllabus.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="text-purple-600 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="pt-2 text-[11px] font-extrabold text-emerald-700">
                        ✓ No fees for admission tests, where applicable
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-lavender-200 space-y-2">
                      <span className="text-xs font-black uppercase text-teal-700 block">
                        🛠️ Training Process Highlights
                      </span>
                      <ul className="space-y-1 text-xs text-lavender-800">
                        {data.admissionProcess.trainingProcess.points.slice(0, 5).map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-teal-600 font-bold mt-0.5">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: REAL-WORLD PROJECTS SHOWCASE */}
          {activeTab === 'projects' && (
            <div className="space-y-5 animate-cool-page">
              <div className="pb-2 border-b border-lavender-100">
                <h3 className="text-base sm:text-lg font-black text-lavender-950">
                  {isFullStack
                    ? '7 Real-World Application Deliverables'
                    : '10 Real-World Embedded AI, IoT & Robotics Projects'}
                </h3>
                <p className="text-xs text-lavender-600">
                  {isFullStack
                    ? 'Every trainee builds 6 module-based mini-projects plus 1 end-to-end major company project.'
                    : 'Projects featured on Page 6 & 7 of the Official SPHERONIX Catalog: Built on STM32, ESP32 & BeagleBone Black.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {data.miniProjectsList.map((proj, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-lavender-200 shadow-2xs hover:border-teal-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span
                          className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                            isFullStack
                              ? 'text-purple-700 bg-purple-100'
                              : 'text-teal-800 bg-teal-100'
                          }`}
                        >
                          Project {proj.num}
                        </span>
                        <span className="text-[11px] font-bold text-lavender-500">
                          {proj.module}
                        </span>
                      </div>

                      <h4 className="text-sm sm:text-base font-black text-lavender-950 mb-1">
                        {proj.title}
                      </h4>

                      <p className="text-xs text-lavender-700 leading-relaxed mb-3">
                        {proj.desc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-lavender-100 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-purple-900 bg-lavender-100 px-2.5 py-0.5 rounded-lg border border-lavender-200">
                        🛠️ {proj.tech}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-600">
                        ✓ Live Hardware Test
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: TOP HIRING COMPANIES */}
          {activeTab === 'companies' && (
            <div className="space-y-6 animate-cool-page">
              <div className="pb-2 border-b border-lavender-100">
                <h3 className="text-base sm:text-lg font-black text-lavender-950">
                  {isFullStack
                    ? 'Top Hiring Companies for Full Stack'
                    : '28+ Core Semiconductor & Embedded Systems Hiring Companies'}
                </h3>
                <p className="text-xs text-lavender-600">
                  {isFullStack
                    ? 'Get placed with top multinational tech corporations and product engineering firms.'
                    : 'From Page 10 of SPHERONIX Catalog: Texas Instruments, Qualcomm, NXP, NVIDIA, Bosch, STMicroelectronics and more.'}
                </p>
              </div>

              {/* Companies Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
                {data.topCompanies.map((comp, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-white border border-lavender-200/90 shadow-2xs hover:shadow-md hover:border-teal-300 text-center font-bold text-xs text-lavender-950 flex items-center justify-center transition-all hover:scale-105"
                  >
                    <span>{comp}</span>
                  </div>
                ))}
              </div>

              {/* SPHERONIX Program Features Grid (Page 10) */}
              <div>
                <h4
                  className={`text-sm font-black mb-3 uppercase tracking-wider ${
                    isFullStack ? 'text-purple-700' : 'text-teal-800'
                  }`}
                >
                  SPHERONIX Technology Pvt. Ltd. Program Features
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.spheronixFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-lavender-50/70 border border-lavender-200 flex items-start gap-3"
                    >
                      <span
                        className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center flex-shrink-0 ${
                          isFullStack
                            ? 'bg-purple-200 text-purple-800'
                            : 'bg-teal-200 text-teal-900'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <div>
                        <h5 className="text-xs sm:text-sm font-extrabold text-lavender-950">
                          {feat.title}
                        </h5>
                        <p className="text-xs text-lavender-600 mt-0.5">{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: ABOUT SPHERONIX & PHILOSOPHY */}
          {activeTab === 'about' && (
            <div className="space-y-6 animate-cool-page">
              {/* About Us Card */}
              <div className="p-5 sm:p-6 rounded-3xl bg-lavender-50/80 border border-lavender-200 space-y-3">
                <span className="text-[11px] font-black uppercase tracking-wider text-purple-700 block">
                  About SPHERONIX Technologies Pvt. Ltd.
                </span>
                <p className="text-xs sm:text-sm text-lavender-800 leading-relaxed">
                  SPHERONIX Technologies Pvt. Ltd. is a technology and innovation-driven company specializing in AI, software development, robotics, and automation. We develop innovative solutions that address real-world challenges through emerging technologies while empowering future talent through industry-focused training.
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-bold text-purple-800">
                  <span className="px-3 py-1 rounded-full bg-white border border-purple-200">INNOVATE</span>
                  <span className="px-3 py-1 rounded-full bg-white border border-purple-200">LEARN</span>
                  <span className="px-3 py-1 rounded-full bg-white border border-purple-200">BUILD</span>
                  <span className="px-3 py-1 rounded-full bg-white border border-purple-200">GROW</span>
                </div>
              </div>

              {/* Founders Message from Page 3 */}
              <div className="p-5 sm:p-6 rounded-3xl bg-white border border-lavender-200 space-y-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-black uppercase tracking-wider text-purple-700 block">
                    Founders Message
                  </span>
                  <span className="text-xs font-extrabold text-purple-900">— Team Spheronix</span>
                </div>
                <p className="text-xs sm:text-sm text-lavender-700 leading-relaxed italic">
                  &ldquo;{data.foundersMessage ? data.foundersMessage.message : 'At SPHERONIX Technologies Pvt. Ltd., we believe in the power of innovation, practical learning, and real-world impact. Our journey began with a vision to bridge the gap between academic learning and industry requirements.'}&rdquo;
                </p>
              </div>

              {/* What is Embedded AI & IoT (Page 3) */}
              {!isFullStack && data.whatIsEmbeddedAiIot && (
                <div className="p-5 rounded-3xl bg-gradient-to-br from-teal-50/70 via-white to-indigo-50/70 border border-teal-200 space-y-3">
                  <span className="text-[11px] font-black uppercase tracking-wider text-teal-800 block">
                    {data.whatIsEmbeddedAiIot.title}
                  </span>
                  <p className="text-xs sm:text-sm text-lavender-800 leading-relaxed">
                    {data.whatIsEmbeddedAiIot.roleDescription}
                  </p>
                  <p className="text-xs sm:text-sm text-lavender-800 leading-relaxed font-semibold text-teal-950">
                    {data.whatIsEmbeddedAiIot.industryComparison}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                    {data.whatIsEmbeddedAiIot.scopeIndustries.map((ind, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-white border border-teal-200 text-xs">
                        <span className="text-lg block mb-0.5">{ind.icon}</span>
                        <strong className="text-lavender-950 block">{ind.name}</strong>
                        <span className="text-[10px] text-lavender-600 leading-tight">{ind.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Official Contact & Center Info */}
              <div className="p-5 rounded-3xl bg-white border border-lavender-200 space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-purple-700">
                  Official Corporate Training Center
                </h4>
                <div className="space-y-2 text-xs text-lavender-800">
                  <p>
                    <strong>📍 Address:</strong> {data.contact.address}
                  </p>
                  <p>
                    <strong>📞 Contact Numbers:</strong> {data.contact.phones.join(' | ')}
                  </p>
                  <p>
                    <strong>✉️ Official Email:</strong> {data.contact.email}
                  </p>
                  <p>
                    <strong>🌐 Official Website:</strong>{' '}
                    <a
                      href={`https://${data.contact.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 underline"
                    >
                      {data.contact.website}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* STICKY ACTION FOOTER BAR                                  */}
        {/* ========================================================= */}
        <div className="flex-shrink-0 p-4 sm:p-5 px-6 bg-white border-t border-lavender-100 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-2 text-xs font-black text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 shadow-2xs">
              <span>{data.stipend}</span>
              <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-200/70 text-emerald-950 font-black">
                {data.stipendType}
              </span>
            </span>
            <span className="text-xs font-bold text-lavender-600 hidden sm:inline">
              👨‍🏫 Senior Mentor 1-on-1 Guidance
            </span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Button3D
              variant="secondary"
              size="sm"
              onClick={onClose}
            >
              Close
            </Button3D>
            <Button3D
              variant={isFullStack ? 'primary' : 'cyan'}
              size="sm"
              onClick={() => {
                onClose();
                if (onApplyDomain) onApplyDomain(data.title);
              }}
              icon={<ArrowRight className="w-4 h-4 text-white" />}
            >
              Apply for {isFullStack ? 'Full Stack' : 'Embedded Systems & IoT'} Track
            </Button3D>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
