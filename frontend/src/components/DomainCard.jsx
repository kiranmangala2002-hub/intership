import React, { useState } from 'react';
import DomainDetailModal from './DomainDetailModal';
import Card3D from './common3d/Card3D';
import Button3D from './common3d/Button3D';
import { Cpu, Globe, Server, CheckCircle2, BookOpen, ArrowRight, Activity, Zap } from 'lucide-react';

export default function DomainCard({ domain, onSelectDomain }) {
  const { title, icon, tags, duration, description } = domain;
  const isFullStack = title.toLowerCase().includes('full stack');
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <>
      <Card3D
        maxTilt={8}
        depth={24}
        onClick={() => setIsDetailOpen(true)}
        className="h-full"
      >
        <div className="group relative bg-white/95 backdrop-blur-xl border border-lavender-200/90 rounded-3xl p-6 sm:p-7 shadow-[0_10px_35px_rgba(124,58,237,0.08)] hover:shadow-[0_22px_55px_rgba(124,58,237,0.18)] transition-all duration-300 flex flex-col justify-between overflow-hidden h-full">
          {/* Top subtle ambient highlight line */}
          <div
            className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${
              isFullStack
                ? 'from-purple-600 via-pink-500 to-indigo-600'
                : 'from-indigo-600 via-teal-500 to-emerald-500'
            }`}
          />

          {/* Card Main Body */}
          <div className="flex flex-col flex-1">
            {/* Header Row: Icon, Category & Duration */}
            <div className="flex justify-between items-start mb-4">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-xs group-hover:scale-105 group-hover:rotate-2 transition-transform duration-300 ${
                  isFullStack
                    ? 'bg-gradient-to-tr from-lavender-100 to-white border border-lavender-200'
                    : 'bg-gradient-to-tr from-teal-50 to-white border border-teal-200/60'
                }`}
              >
                {icon}
              </div>
              <div className="flex flex-col items-end gap-1">
                <span
                  className={`px-3 py-0.5 rounded-full text-xs font-bold border shadow-2xs ${
                    isFullStack
                      ? 'bg-purple-100/90 text-purple-800 border-purple-200/60'
                      : 'bg-teal-100/90 text-teal-800 border-teal-200/60'
                  }`}
                >
                  ⏱️ {duration}
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-lavender-500">
                  {isFullStack ? 'Software Engineering' : 'Hardware Engineering'}
                </span>
              </div>
            </div>

            {/* Synchronized Title: Fixed 56px Height for Exact Horizontal Baseline Alignment */}
            <div className="h-14 flex items-center mb-2">
              <h3
                className={`text-xl sm:text-2xl font-black transition-colors leading-tight ${
                  isFullStack
                    ? 'text-lavender-950 group-hover:text-purple-700'
                    : 'text-lavender-950 group-hover:text-teal-700'
                }`}
              >
                {title}
              </h3>
            </div>

            {/* Synchronized Description */}
            <div className="h-[64px] sm:h-[68px] flex items-start mb-4 overflow-hidden">
              <p className="text-xs sm:text-sm leading-relaxed text-lavender-700 line-clamp-3">
                {description}
              </p>
            </div>

            {/* 3D Holographic Visualizer Preview Panel */}
            <div
              className={`p-3.5 mb-4 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                isFullStack
                  ? 'bg-purple-50/70 border-purple-200/80 group-hover:border-purple-300 shadow-2xs'
                  : 'bg-teal-50/70 border-teal-200/80 group-hover:border-teal-300 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        isFullStack ? 'bg-purple-500' : 'bg-teal-500'
                      }`}
                    />
                    <span
                      className={`relative inline-flex rounded-full h-2 w-2 ${
                        isFullStack ? 'bg-purple-600' : 'bg-teal-600'
                      }`}
                    />
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-lavender-900">
                    {isFullStack ? 'Live AI Cloud Architecture' : 'Live Hardware Test Bench'}
                  </span>
                </div>
                <span className="text-[9px] font-bold text-lavender-500 bg-white/90 px-2 py-0.5 rounded-full border border-lavender-200 shadow-2xs">
                  {isFullStack ? 'Latency: 12ms' : 'Clock: 168 MHz'}
                </span>
              </div>

              {/* Holographic Spec Visuals */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-lavender-800">
                <div className="flex items-center gap-1.5 bg-white/90 p-2 rounded-xl border border-lavender-100 shadow-2xs">
                  {isFullStack ? (
                    <Server className="w-3.5 h-3.5 text-purple-600" />
                  ) : (
                    <Cpu className="w-3.5 h-3.5 text-teal-600" />
                  )}
                  <span className="truncate">
                    {isFullStack ? 'Next.js & LangChain' : 'ARM Cortex-M4 Core'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/90 p-2 rounded-xl border border-lavender-100 shadow-2xs">
                  {isFullStack ? (
                    <Zap className="w-3.5 h-3.5 text-purple-600" />
                  ) : (
                    <Activity className="w-3.5 h-3.5 text-teal-600" />
                  )}
                  <span className="truncate">
                    {isFullStack ? 'Autonomous AI Agents' : 'FreeRTOS & TinyML'}
                  </span>
                </div>
              </div>
            </div>

            {/* Key Features Checklist */}
            <div className="space-y-2 mb-4 p-3.5 rounded-2xl bg-lavender-50/70 border border-lavender-200/70 text-xs text-lavender-900 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span className="truncate">
                  {isFullStack
                    ? 'Production-grade enterprise repository access'
                    : 'Industry-grade hardware lab & test bench access'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span className="truncate">
                  {isFullStack
                    ? 'Weekly 1-on-1 architecture reviews with senior leads'
                    : 'Weekly 1-on-1 firmware reviews with senior leads'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span className="truncate">Verifiable SPHERONIX Experience Certificate & LOR</span>
              </div>
            </div>

            {/* Core Curriculum Technologies Tags */}
            <div className="mb-5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-lavender-500 block mb-1.5">
                Core Curriculum Technologies
              </span>
              <div className="h-16 flex flex-wrap content-start gap-1.5 overflow-hidden">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white text-purple-900 border border-lavender-200 shadow-2xs hover:border-purple-300 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card Footer: Aligned Stipend & Dual Action Buttons */}
          <div className="pt-3 border-t border-lavender-100 flex flex-col justify-end">
            {/* Monthly Stipend Row */}
            <div className="flex items-center justify-between mb-3.5">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-lavender-500 block">
                  Monthly Performance Stipend
                </span>
                <span className="text-lg font-black text-emerald-600 block leading-tight">
                  ₹10,000 – ₹15,000<span className="text-xs font-bold text-emerald-700">/mo</span>
                </span>
              </div>
              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs uppercase tracking-wider">
                Performance Based
              </span>
            </div>

            {/* Dual 3D Action Buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              <Button3D
                type="button"
                variant="secondary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDetailOpen(true);
                }}
                icon={<BookOpen className="w-3.5 h-3.5 text-purple-700" />}
              >
                View Details
              </Button3D>

              <Button3D
                type="button"
                variant={isFullStack ? 'primary' : 'cyan'}
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectDomain(title);
                }}
                icon={<ArrowRight className="w-3.5 h-3.5 text-white" />}
              >
                Apply Now
              </Button3D>
            </div>
          </div>
        </div>
      </Card3D>

      {/* In-Depth Domain Detail & Curriculum Modal */}
      <DomainDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        domainName={title}
        onApplyDomain={onSelectDomain}
      />
    </>
  );
}
