import React, { useState, useEffect } from 'react';
import { getWhatsAppConfig, submitWhatsAppInquiry } from '../services/api';
import Button3D from './common3d/Button3D';

export default function WhatsAppChatModal({ isOpen, onClose }) {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [domain, setDomain] = useState('AI Integrated Full Stack Development');
  const [topic, setTopic] = useState('Admissions & Eligibility (2026 Cohort)');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      getWhatsAppConfig()
        .then((res) => {
          if (res.success) setConfig(res.data);
        })
        .catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await submitWhatsAppInquiry({
        name,
        contact,
        domain,
        topic,
        message,
      });

      if (res.success && res.data?.chatUrl) {
        window.open(res.data.chatUrl, '_blank', 'noopener,noreferrer');
        onClose();
      }
    } catch (err) {
      // Fallback direct link
      const fallbackUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
        `Hi SPHERONIX Team, I am interested in ${domain}. Topic: ${topic}`
      )}`;
      window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleDirectChat = () => {
    const directUrl = config?.chatUrl || 'https://wa.me/919876543210?text=Hi%20SPHERONIX%20Team%2C%20I%20am%20interested%20in%20Corporate%20Internships';
    window.open(directUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md rounded-3xl bg-white/95 backdrop-blur-2xl shadow-[0_25px_80px_rgba(37,211,102,0.3)] border border-emerald-200 overflow-hidden animate-cool-page">
        {/* Header - Authentic WhatsApp Brand Green */}
        <div className="bg-gradient-to-r from-[#20ba5a] via-[#25D366] to-[#128C7E] p-5 text-white shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center shadow-inner ring-2 ring-white/30">
                <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                  <path d="M12.031 2c-5.508 0-9.984 4.477-9.984 9.984 0 1.761.458 3.481 1.33 5.002L2 22l5.163-1.354c1.464.799 3.111 1.22 4.868 1.22 5.508 0 9.984-4.477 9.984-9.984C22.015 6.477 17.539 2 12.031 2zm0 18.291c-1.503 0-2.977-.406-4.265-1.173l-.306-.182-3.167.831.846-3.087-.199-.317c-.841-1.341-1.286-2.903-1.286-4.512 0-4.573 3.721-8.294 8.294-8.294 4.573 0 8.294 3.721 8.294 8.294 0 4.573-3.721 8.294-8.294 8.294zm4.545-6.208c-.249-.125-1.474-.727-1.702-.81-.229-.083-.395-.125-.562.125-.166.249-.645.81-.79 1-.146.187-.291.208-.541.083-.249-.125-1.054-.388-2.008-1.238-.742-.662-1.243-1.48-1.389-1.729-.146-.249-.016-.384.109-.508.112-.112.249-.291.374-.437.125-.146.166-.249.249-.416.083-.166.042-.312-.021-.437-.062-.125-.562-1.353-.77-1.853-.203-.487-.41-.421-.562-.429-.146-.008-.312-.01-.479-.01-.166 0-.437.062-.666.312-.229.249-.874.854-.874 2.083 0 1.229.895 2.416 1.02 2.583.125.166 1.761 2.689 4.267 3.771.596.257 1.061.411 1.424.527.599.191 1.144.164 1.575.1 4.8-.072 1.474-.604 1.682-1.187.208-.583.208-1.083.146-1.187-.062-.104-.229-.166-.479-.291z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base leading-tight">
                  SPHERONIX Admissions Desk
                </h3>
                <div className="flex items-center gap-1.5 text-[11px] opacity-90 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span>Online • Avg reply: &lt;15 mins</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="font-bold text-lavender-900 block mb-1">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. K. Sai Teja Reddy"
              className="w-full px-3.5 py-2.5 rounded-xl bg-lavender-50/70 border border-lavender-200 text-lavender-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#25D366] transition-all shadow-inner"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-lavender-900 block mb-1">
                WhatsApp Phone
              </label>
              <input
                type="tel"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 rounded-xl bg-lavender-50/70 border border-lavender-200 text-lavender-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#25D366] transition-all shadow-inner"
              />
            </div>

            <div>
              <label className="font-bold text-lavender-900 block mb-1">
                Domain Track
              </label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-lavender-50/70 border border-lavender-200 text-lavender-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#25D366] transition-all"
              >
                <option value="AI Integrated Full Stack Development">AI Integrated Full Stack</option>
                <option value="Embedded Systems & IoT">Embedded Systems & IoT</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-lavender-900 block mb-1">
              Select Query Topic
            </label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-lavender-50/70 border border-lavender-200 text-lavender-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#25D366] transition-all"
            >
              <option value="Admissions & Eligibility (2026 Cohort)">Admissions & Eligibility (2026 Cohort)</option>
              <option value="Detailed 6-Month Syllabus & Curriculum">Detailed 6-Month Syllabus & Curriculum</option>
              <option value="Stipend Verification & Bank Payouts">Stipend Verification & Bank Payouts</option>
              <option value="Application Status Verification">Application Status Verification</option>
              <option value="Direct Speak with Academic Advisor">Direct Speak with Academic Advisor</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-lavender-900 block mb-1">
              Optional Note / Question
            </label>
            <textarea
              rows="2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about batch timings, stipend slab, prerequisites..."
              className="w-full px-3.5 py-2 rounded-xl bg-lavender-50/70 border border-lavender-200 text-lavender-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#25D366] transition-all resize-none shadow-inner"
            />
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Button3D
              type="submit"
              disabled={loading}
              variant="cyan"
              size="md"
              className="w-full cursor-pointer justify-center"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M12.031 2c-5.508 0-9.984 4.477-9.984 9.984 0 1.761.458 3.481 1.33 5.002L2 22l5.163-1.354c1.464.799 3.111 1.22 4.868 1.22 5.508 0 9.984-4.477 9.984-9.984C22.015 6.477 17.539 2 12.031 2zm0 18.291c-1.503 0-2.977-.406-4.265-1.173l-.306-.182-3.167.831.846-3.087-.199-.317c-.841-1.341-1.286-2.903-1.286-4.512 0-4.573 3.721-8.294 8.294-8.294 4.573 0 8.294 3.721 8.294 8.294 0 4.573-3.721 8.294-8.294 8.294zm4.545-6.208c-.249-.125-1.474-.727-1.702-.81-.229-.083-.395-.125-.562.125-.166.249-.645.81-.79 1-.146.187-.291.208-.541.083-.249-.125-1.054-.388-2.008-1.238-.742-.662-1.243-1.48-1.389-1.729-.146-.249-.016-.384.109-.508.112-.112.249-.291.374-.437.125-.146.166-.249.249-.416.083-.166.042-.312-.021-.437-.062-.125-.562-1.353-.77-1.853-.203-.487-.41-.421-.562-.429-.146-.008-.312-.01-.479-.01-.166 0-.437.062-.666.312-.229.249-.874.854-.874 2.083 0 1.229.895 2.416 1.02 2.583.125.166 1.761 2.689 4.267 3.771.596.257 1.061.411 1.424.527.599.191 1.144.164 1.575.1 4.8-.072 1.474-.604 1.682-1.187.208-.583.208-1.083.146-1.187-.062-.104-.229-.166-.479-.291z"/>
                </svg>
                <span>{loading ? 'Connecting...' : 'Start Official WhatsApp Chat →'}</span>
              </span>
            </Button3D>

            <button
              type="button"
              onClick={handleDirectChat}
              className="w-full text-center py-1.5 text-lavender-600 hover:text-lavender-950 font-bold hover:underline transition-all cursor-pointer"
            >
              Or open direct blank chat ↗
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

