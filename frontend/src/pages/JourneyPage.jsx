import React from 'react';
import ProgramJourney from '../components/ProgramJourney';
import Badge3D from '../components/common3d/Badge3D';

export default function JourneyPage({ onApplyClick }) {
  return (
    <div className="space-y-12 perspective-1000">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-3">
          <Badge3D beacon={true} beaconColor="purple">
            <span className="font-extrabold uppercase tracking-wider text-[11px] text-purple-700">
              Curriculum & Career Roadmap
            </span>
          </Badge3D>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-lavender-950 mt-2 tracking-tight">
          The Corporate Journey
        </h1>
        <p className="text-sm text-lavender-700 mt-2 leading-relaxed">
          A step-by-step pathway crafted by senior software architects to guide you from foundational algorithms to enterprise deployment.
        </p>
      </div>

      <ProgramJourney onApplyClick={onApplyClick} />
    </div>
  );
}
