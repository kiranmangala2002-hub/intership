import React, { useState } from 'react';
import DomainCard from '../components/DomainCard';
import Badge3D from '../components/common3d/Badge3D';
import { Layers } from 'lucide-react';

export default function DomainsPage({ domains, onSelectDomain }) {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'AI Full Stack', 'Embedded & IoT'];

  const filteredDomains = domains.filter((d) => {
    if (filter === 'All') return true;
    if (filter === 'AI Full Stack') return d.title.includes('Full Stack');
    if (filter === 'Embedded & IoT') return d.title.includes('Embedded') || d.title.includes('IoT');
    return true;
  });

  return (
    <div className="space-y-10 perspective-1000">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-3">
          <Badge3D beacon={true} beaconColor="purple">
            <span className="font-extrabold uppercase tracking-wider text-[11px] text-purple-700">
              Specialized Corporate Programs
            </span>
          </Badge3D>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-lavender-950 mt-2 tracking-tight">
          Explore Corporate Domains
        </h1>
        <p className="text-sm text-lavender-700 mt-2 leading-relaxed">
          Select your corporate domain of interest to inspect syllabus details, monthly stipends, and apply directly.
        </p>

        {/* 3D Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6 p-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-lavender-200/90 w-fit mx-auto shadow-[0_4px_20px_rgba(124,58,237,0.08)]">
          {categories.map((cat) => {
            const isActive = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_4px_16px_rgba(124,58,237,0.35)] scale-102 font-black'
                    : 'text-lavender-700 hover:text-lavender-950 hover:bg-lavender-100/70'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-4xl mx-auto items-stretch">
        {filteredDomains.map((domain, index) => (
          <DomainCard
            key={index}
            domain={domain}
            onSelectDomain={onSelectDomain}
          />
        ))}
      </div>
    </div>
  );
}
