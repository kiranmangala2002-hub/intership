import React from 'react';

const PERKS = [
  {
    icon: '👨‍🏫',
    title: 'Senior Mentor',
    desc: 'Direct weekly 1-on-1 code reviews, architectural feedback, and career counseling from dedicated senior enterprise leads.',
    badge: 'Senior Mentor',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    icon: '💰',
    title: 'Performance Based Stipend',
    desc: 'Performance based monthly stipends ranging from ₹10,000 to ₹15,000 disbursed directly to your bank account upon project milestone completion.',
    badge: '₹10K - ₹15K/mo',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: '📜',
    title: 'Verified Corporate Certificate',
    desc: 'Official SPHERONIX certificate of completion with cryptographic QR code verification and executive Letter of Recommendation (LOR).',
    badge: 'Verifiable QR Code',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: '💼',
    title: 'Pre-Placement Offers (PPO)',
    desc: 'Top 20% performing interns receive fast-track direct full-time employment offers (PPO) at SPHERONIX Technologies.',
    badge: 'PPO Opportunities',
    color: 'from-fuchsia-500 to-pink-600',
  },
  {
    icon: '⏰',
    title: 'Student-Friendly Schedule',
    desc: 'Flexible evening and weekend batches tailored to accommodate college semester exams, midterms, and lab hours.',
    badge: 'Exam Pause Allowed',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    icon: '🛠️',
    title: 'Enterprise Tooling Stack',
    desc: 'Get hands-on experience with modern industry tools: Docker, Next.js, Node.js, ARM Cortex, FreeRTOS, Redis, and LangChain.',
    badge: 'Industry Stack',
    color: 'from-violet-500 to-purple-600',
  },
];

export default function TrainingPerks() {
  return (
    <section className="space-y-10" id="training-perks">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PERKS.map((perk, idx) => (
          <div
            key={idx}
            className="group relative p-6 sm:p-7 rounded-3xl bg-white/90 backdrop-blur-xl border border-lavender-200/90 shadow-[0_8px_30px_rgba(124,58,237,0.06)] hover:shadow-[0_16px_40px_rgba(124,58,237,0.15)] transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden"
          >
            {/* Top gradient highlight */}
            <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${perk.color}`} />

            <div>
              <div className="flex justify-between items-center mb-4">
                <div className={`w-13 h-13 rounded-2xl bg-gradient-to-tr ${perk.color} flex items-center justify-center text-2xl text-white shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                  {perk.icon}
                </div>
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-lavender-100 text-purple-900 border border-lavender-200/80 shadow-2xs">
                  {perk.badge}
                </span>
              </div>

              <h3 className="text-lg font-black text-lavender-950 mb-2 group-hover:text-purple-700 transition-colors">
                {perk.title}
              </h3>

              <p className="text-xs sm:text-sm text-lavender-700 leading-relaxed">
                {perk.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
