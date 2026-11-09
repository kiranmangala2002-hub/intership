import React from 'react';
import DevToolsSection from '../components/DevToolsSection';
import DevTerminalPreview from '../components/DevTerminalPreview';

export default function DevToolsPage() {
  return (
    <div className="space-y-16">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold tracking-wider uppercase text-lavender-600 bg-lavender-100 px-3.5 py-1 rounded-full">
          Hands-On Software Engineering
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-lavender-950 mt-3">
          Enterprise Dev Tools & Cloud Stack
        </h1>
        <p className="text-sm text-lavender-700 mt-2">
          Explore the exact industry development environments, cloud infrastructure tools, and interactive terminals practiced at SPHERONIX.
        </p>
      </div>

      <DevToolsSection />
      <DevTerminalPreview />
    </div>
  );
}

