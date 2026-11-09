import React, { useState } from 'react';

const CATEGORIES = ['All Tools', 'Cloud & DevOps', 'Full Stack', 'AI & Data', 'Testing & Collab'];

const DEV_TOOLS = [
  {
    name: 'Docker',
    category: 'Cloud & DevOps',
    icon: '🐳',
    role: 'Containerization',
    description: 'Package applications into lightweight, standalone containers for seamless local and production execution.',
    badge: 'Industry Standard',
  },
  {
    name: 'AWS Cloud',
    category: 'Cloud & DevOps',
    icon: '☁️',
    role: 'Cloud Infrastructure',
    description: 'Deploy auto-scaling serverless microservices, S3 storage, and RDS databases on Amazon Web Services.',
    badge: 'High Demand',
  },
  {
    name: 'Kubernetes',
    category: 'Cloud & DevOps',
    icon: '☸️',
    role: 'Cluster Orchestration',
    description: 'Manage production container deployments, automated rollouts, service discovery, and zero-downtime scaling.',
    badge: 'Enterprise',
  },
  {
    name: 'GitHub Actions',
    category: 'Cloud & DevOps',
    icon: '⚙️',
    role: 'CI/CD Pipelines',
    description: 'Automate build, lint, unit testing, and production deployment workflows on every pull request.',
    badge: 'DevOps Core',
  },
  {
    name: 'VS Code',
    category: 'Full Stack',
    icon: '💻',
    role: 'Primary IDE',
    description: 'Master enterprise extensions, Git lenses, debugging configurations, and remote SSH development environments.',
    badge: 'Developer Choice',
  },
  {
    name: 'Postman',
    category: 'Testing & Collab',
    icon: '🚀',
    role: 'API Testing & Mocking',
    description: 'Design, document, test, and automate RESTful and GraphQL API collections with environment variables.',
    badge: 'API Testing',
  },
  {
    name: 'Redis',
    category: 'Full Stack',
    icon: '⚡',
    role: 'In-Memory Cache',
    description: 'Implement ultra-low latency caching, distributed sessions, and pub/sub message brokers.',
    badge: 'High Performance',
  },
  {
    name: 'Figma',
    category: 'Testing & Collab',
    icon: '🎨',
    role: 'UI/UX Prototyping',
    description: 'Transform design systems, autolayout wireframes, and interactive components into pixel-perfect React code.',
    badge: 'Design Systems',
  },
  {
    name: 'PyTorch & HuggingFace',
    category: 'AI & Data',
    icon: '🧠',
    role: 'Deep Learning & LLMs',
    description: 'Fine-tune generative AI transformer models, train neural networks, and deploy inference endpoints.',
    badge: 'AI Core',
  },
  {
    name: 'Jira & Agile Sprint',
    category: 'Testing & Collab',
    icon: '📋',
    role: 'Project Management',
    description: 'Work in 2-week agile Scrum sprints, estimate story points, manage backlogs, and run daily standups.',
    badge: 'Corporate Standard',
  },
  {
    name: 'MongoDB Atlas',
    category: 'Full Stack',
    icon: '🍃',
    role: 'Cloud NoSQL Database',
    description: 'Model scalable document collections, aggregation pipelines, and sharded replica sets.',
    badge: 'Database',
  },
  {
    name: 'Linux / Ubuntu Server',
    category: 'Cloud & DevOps',
    icon: '🐧',
    role: 'OS & Shell Scripting',
    description: 'Master bash scripting, SSH keys, process daemons (systemd), and production server monitoring.',
    badge: 'Essential',
  },
];

export default function DevToolsSection() {
  const [activeTab, setActiveTab] = useState('All Tools');

  const filteredTools =
    activeTab === 'All Tools'
      ? DEV_TOOLS
      : DEV_TOOLS.filter((t) => t.category === activeTab);

  return (
    <section className="space-y-10" id="dev-tools-section">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold tracking-wider uppercase text-lavender-600 bg-lavender-100 px-3.5 py-1 rounded-full">
          Modern Engineering Ecosystem
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-lavender-950 mt-3">
          Enterprise Development Tools You Master
        </h2>
        <p className="text-sm text-lavender-700 mt-2">
          At SPHERONIX, you don&apos;t just learn theory. You get hands-on experience with the exact software stack used by Fortune 500 engineering teams.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bg-white/70 backdrop-blur-md border border-lavender-200/80 w-fit mx-auto shadow-sm">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === cat
                ? 'bg-lavender-600 text-white shadow-sm'
                : 'text-lavender-700 hover:text-lavender-950 hover:bg-lavender-100/60'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredTools.map((tool, idx) => (
          <div
            key={idx}
            className="group p-5 rounded-3xl bg-white/85 backdrop-blur-md border border-lavender-200/90 shadow-lavender-soft hover:shadow-card-3d transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="w-12 h-12 rounded-2xl bg-lavender-50 border border-lavender-200 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-xs">
                  {tool.icon}
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-lavender-100 text-lavender-700 border border-lavender-200">
                  {tool.badge}
                </span>
              </div>

              <h3 className="text-base font-extrabold text-lavender-950 group-hover:text-lavender-600 transition-colors">
                {tool.name}
              </h3>
              <span className="block text-[11px] font-semibold text-lavender-500 uppercase tracking-wider mb-2">
                {tool.role}
              </span>

              <p className="text-xs text-lavender-700/90 leading-relaxed">
                {tool.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-lavender-100 flex items-center justify-between text-[11px] font-bold text-lavender-600">
              <span>{tool.category}</span>
              <span className="text-lavender-400 group-hover:translate-x-1 transition-transform">✓ Certified</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

