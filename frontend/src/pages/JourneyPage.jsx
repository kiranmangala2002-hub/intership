import React from 'react';
import ProgramJourney from '../components/ProgramJourney';

export default function JourneyPage({ onApplyClick }) {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold tracking-wider uppercase text-lavender-600 bg-lavender-100 px-3.5 py-1 rounded-full">
          Curriculum & Career Roadmap
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-lavender-950 mt-3">
          The Corporate Journey
        </h1>
        <p className="text-sm text-lavender-700 mt-2">
          A step-by-step pathway crafted by senior software architects to guide you from foundational algorithms to enterprise deployment.
        </p>
      </div>

      <ProgramJourney onApplyClick={onApplyClick} />
    </div>
  );
}

