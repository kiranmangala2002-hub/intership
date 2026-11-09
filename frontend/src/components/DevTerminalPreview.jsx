import React, { useState } from 'react';

const TABS = [
  { id: 'bash', label: 'deploy-pipeline.sh', lang: 'bash' },
  { id: 'docker', label: 'docker-compose.yml', lang: 'yaml' },
  { id: 'python', label: 'train_ai_agent.py', lang: 'python' },
];

const CODE_SNIPPETS = {
  bash: `#!/bin/bash
# SPHERONIX Corporate CI/CD Pipeline
echo "🚀 Initializing Automated Build & Test Pipeline..."
npm run test:security
docker build -t spheronix/cloud-api:latest .
docker run -d -p 5000:5000 --env-file .env spheronix/cloud-api

echo "✅ All 48 Integration Tests Passed [100% Coverage]"
echo "✨ Deployed to SPHERONIX Enterprise Cluster: http://localhost:5000"`,

  docker: `version: '3.8'
services:
  spheronix-api:
    image: node:20-alpine
    container_name: spheronix_backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/spheronix
    depends_on:
      - mongo
      - redis-cache

  redis-cache:
    image: redis:7-alpine
    ports:
      - "6379:6379"`,

  python: `import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

# SPHERONIX AI Lab - Corporate LLM Inference
print("⚡ Loading SPHERONIX Neural Weights...")
model_name = "spheronix-ai/deep-agent-v2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype=torch.float16)

prompt = "Analyze corporate telemetry and predict deployment stability."
inputs = tokenizer(prompt, return_tensors="pt")
outputs = model.generate(**inputs, max_new_tokens=100)
print("🎯 Inference Complete. Production Ready.")`,
};

export default function DevTerminalPreview() {
  const [activeTab, setActiveTab] = useState('bash');
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState([
    'spheronix@corporate-cluster:~$ ./deploy-pipeline.sh',
    '[INFO] Authenticated with SPHERONIX Enterprise Cloud',
    '[INFO] Initializing Docker Container Daemon v24.0.7...',
    '[SUCCESS] 48/48 Microservice Test Suites Passed (1.42s)',
    '[READY] Cluster healthy. Latency: 12ms. Zero Downtime Active.',
  ]);

  const handleCopy = () => {
    navigator.clipboard.writeText(CODE_SNIPPETS[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunSimulation = () => {
    setIsRunning(true);
    setTerminalLogs((prev) => [
      ...prev,
      `spheronix@cluster:~$ executing ${activeTab}...`,
      `[+] Compiling modules...`,
    ]);

    setTimeout(() => {
      setTerminalLogs((prev) => [
        ...prev,
        `[✓] Build Succeeded in 420ms! All microservices healthy.`,
      ]);
      setIsRunning(false);
    }, 1200);
  };

  return (
    <section className="space-y-8" id="dev-terminal-preview">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold tracking-wider uppercase text-lavender-600 bg-lavender-100 px-3.5 py-1 rounded-full">
          Interactive Tech Experience
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-lavender-950 mt-3">
          Experience Live Corporate Engineering
        </h2>
        <p className="text-sm text-lavender-700 mt-2">
          Inspect the real workflows, container architectures, and AI scripts taught during the program.
        </p>
      </div>

      <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden bg-slate-950 border border-lavender-300/40 shadow-2xl">
        {/* Terminal Title Bar */}
        <div className="flex justify-between items-center px-4 py-3 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            <span className="text-xs font-mono text-slate-400 ml-3 hidden sm:inline">
              spheronix@corporate-dev-env: ~/{activeTab}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRunSimulation}
              disabled={isRunning}
              className="text-xs font-semibold px-3 py-1 rounded-lg bg-emerald-600/80 hover:bg-emerald-600 text-white transition-all disabled:opacity-50"
            >
              {isRunning ? '⏳ Running...' : '▶ Run Script'}
            </button>
            <button
              onClick={handleCopy}
              className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              {copied ? '✓ Copied' : '📋 Copy'}
            </button>
          </div>
        </div>

        {/* File Tabs */}
        <div className="flex bg-slate-900/60 border-b border-slate-800 px-2 pt-2 gap-1 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-t-xl text-xs font-mono transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-slate-950 text-lavender-300 border-t-2 border-lavender-500 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <span>📄</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Code Content Box */}
        <div className="p-5 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed bg-slate-950/90 max-h-72">
          <pre className="text-emerald-400/90 whitespace-pre">
            <code>{CODE_SNIPPETS[activeTab]}</code>
          </pre>
        </div>

        {/* Mini Console Output */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
          <div className="text-slate-500 font-bold text-[10px] uppercase tracking-wider mb-1">
            Console Output
          </div>
          {terminalLogs.slice(-4).map((log, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-lavender-400 font-bold">❯</span>
              <span className={log.includes('SUCCESS') || log.includes('Passed') ? 'text-emerald-400 font-semibold' : 'text-slate-300'}>
                {log}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

