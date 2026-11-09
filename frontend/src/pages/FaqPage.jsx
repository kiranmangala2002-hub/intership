import React from 'react';
import FaqSection from '../components/FaqSection';

export default function FaqPage({ onOpenRegister }) {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold tracking-wider uppercase text-purple-700 bg-purple-100/80 px-3.5 py-1 rounded-full border border-purple-200/60 inline-flex items-center gap-1.5">
          ✨ Support & Guidance
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-lavender-950 mt-3 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-lavender-700 mt-2 leading-relaxed">
          Find transparent information regarding admission criteria, stipend disbursement, project mentors, and job placement assistance.
        </p>
      </div>

      <FaqSection onOpenRegister={onOpenRegister} />
    </div>
  );
}
