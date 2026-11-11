import React from 'react';
import TrainingPerks from '../components/TrainingPerks';
import PlacementTreeNetwork from '../components/PlacementTreeNetwork';
import Badge3D from '../components/common3d/Badge3D';

export default function PerksPage({ onApplyClick }) {
  return (
    <div className="space-y-12 sm:space-y-16 perspective-1000">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-3">
          <Badge3D beacon={true} beaconColor="purple">
            <span className="font-extrabold uppercase tracking-wider text-[11px] text-purple-700">
              Mentorship & Corporate Perks
            </span>
          </Badge3D>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-lavender-950 mt-2 tracking-tight">
          Corporate Benefits & Mentorship
        </h1>
        <p className="text-xs sm:text-sm text-lavender-700 mt-2 leading-relaxed">
          Discover why engineering undergraduates choose SPHERONIX for industry credentials, performance based stipends, and professional career acceleration.
        </p>
      </div>

      <TrainingPerks />

      {/* Corporate Placed Companies Showcase */}
      <section>
        <PlacementTreeNetwork onApplyClick={onApplyClick} />
      </section>
    </div>
  );
}
