import React, { useState } from 'react';
import DomainCard from '../components/DomainCard';

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
    <div className="space-y-10">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold tracking-wider uppercase text-lavender-600 bg-lavender-100 px-3.5 py-1 rounded-full">
          Specialized Corporate Programs
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-lavender-950 mt-3">
          Explore Corporate Domains
        </h1>
        <p className="text-sm text-lavender-700 mt-2">
          Select your corporate domain of interest to inspect syllabus details, monthly stipends, and apply directly.
        </p>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6 p-1.5 rounded-full bg-white/80 backdrop-blur-md border border-lavender-200/80 w-fit mx-auto shadow-sm">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filter === cat
                  ? 'bg-lavender-600 text-white shadow-sm'
                  : 'text-lavender-700 hover:text-lavender-950 hover:bg-lavender-100/60'
              }`}
            >
              {cat}
            </button>
          ))}
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

