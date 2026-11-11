import React from 'react';
import FaqSection from '../components/FaqSection';
import Badge3D from '../components/common3d/Badge3D';

export default function FaqPage({ onOpenRegister }) {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <Badge3D variant="cyan" pulse={true} label="Support & Admissions Desk" />
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
