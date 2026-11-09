import React, { useState } from 'react';
import { submitInquiry } from '../services/api';

const FAQS = [
  {
    q: 'Who is eligible to apply for SPHERONIX Corporate Internships & Training?',
    a: 'Students currently pursuing B.Tech / B.E, BCA, MCA, B.Sc (CS/IT) in their 2nd, 3rd, or final years, as well as recent graduates looking for professional corporate training, are eligible.',
    category: 'Eligibility',
  },
  {
    q: 'Is prior internship experience required before applying?',
    a: 'No prior corporate experience is required. We evaluate your foundational interest, problem-solving mindset, and eagerness to learn. Our senior mentors guide you from day one.',
    category: 'Requirements',
  },
  {
    q: 'Is the stipend given while working or after completion of the program?',
    a: 'Stipends (₹10,000 – ₹15,000/month, Performance Based) are credited monthly DURING your internship working period! You do not have to wait until the end of the entire program; each month your milestone deliverables and sprint tasks are evaluated by senior mentors and paid directly to your bank account.',
    category: 'Stipend',
  },
  {
    q: 'Will I receive an official experience letter and certificate?',
    a: 'Yes, upon successful completion, you receive an official Corporate Internship Certificate from SPHERONIX Technologies Pvt. Ltd with a verifiable QR code, along with a formal Letter of Recommendation (LOR).',
    category: 'Credentials',
  },
  {
    q: 'Can I balance this program alongside my college exams?',
    a: 'Absolutely. We offer flexible evening and weekend sessions. If you have university mid-terms or finals, you can request an official exam pause without losing your cohort progress.',
    category: 'Schedule',
  },
  {
    q: 'How does the Pre-Placement Offer (PPO) process work?',
    a: 'Interns demonstrating outstanding architecture skills, code quality, and collaboration are shortlisted for direct technical interviews for full-time engineering roles at SPHERONIX Technologies.',
    category: 'Placement',
  },
];

export default function FaqSection({ onOpenRegister }) {
  const [openIndex, setOpenIndex] = useState(0);

  // Student Query Submission State
  const [queryForm, setQueryForm] = useState({
    name: '',
    email: '',
    phone: '',
    domain: 'AI Integrated Full Stack Development',
    subject: 'Student Query / Program Doubt',
    message: '',
  });
  const [queryLoading, setQueryLoading] = useState(false);
  const [querySuccess, setQuerySuccess] = useState('');
  const [queryError, setQueryError] = useState('');

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    setQuerySuccess('');
    setQueryError('');

    if (!queryForm.email || !queryForm.message.trim()) {
      setQueryError('Please provide your email address and question message.');
      return;
    }

    try {
      setQueryLoading(true);
      const res = await submitInquiry(queryForm);
      if (res.success) {
        setQuerySuccess(
          '🎉 Query Submitted Successfully! Your question has been logged in SPHERONIX Database. A Senior Mentor will respond to your email shortly.'
        );
        setQueryForm({
          name: '',
          email: '',
          phone: '',
          domain: 'AI Integrated Full Stack Development',
          subject: 'Student Query / Program Doubt',
          message: '',
        });
      }
    } catch (err) {
      setQueryError(err.response?.data?.message || 'Failed to submit query. Please try again or connect via WhatsApp.');
    } finally {
      setQueryLoading(false);
    }
  };

  return (
    <section className="space-y-12" id="faq-section">
      {/* FAQ Accordion Grid */}
      <div className="max-w-3xl mx-auto space-y-3.5">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl transition-all duration-200 overflow-hidden border ${isOpen
                  ? 'bg-white shadow-[0_8px_25px_rgba(124,58,237,0.1)] border-purple-300'
                  : 'bg-white/85 backdrop-blur-md border-lavender-200/90 hover:bg-white shadow-2xs'
                }`}
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full px-6 py-4.5 text-left flex justify-between items-center gap-4 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800">
                    {faq.category}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-lavender-950">
                    {faq.q}
                  </span>
                </div>
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180 bg-purple-600 text-white' : 'bg-lavender-100 text-purple-800'
                    }`}
                >
                  ▼
                </span>
              </button>

              {isOpen && (
                <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-lavender-800/90 leading-relaxed border-t border-lavender-100/70">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* STUDENT QUERY SUBMISSION FORM (Directly connected to MongoDB) */}
      {/* ========================================================= */}
      <div className="max-w-3xl mx-auto p-7 sm:p-9 rounded-3xl bg-white/95 backdrop-blur-xl border border-lavender-200/90 shadow-[0_12px_40px_rgba(124,58,237,0.08)] relative overflow-hidden">
        {/* Top Accent Strip */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600" />

        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-3.5 py-1 rounded-full border border-purple-200/60 inline-flex items-center gap-1.5 mb-2">
            💬 Have Questions or Doubts?
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-lavender-950">
            Submit a Student Query to Senior Mentors
          </h3>
          <p className="text-xs sm:text-sm text-lavender-700 mt-1.5">
            Ask any questions regarding domain curriculum, milestone evaluations, performance stipends, or batch schedules.
          </p>
        </div>

        {querySuccess && (
          <div className="p-4 mb-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-medium flex items-center gap-2">
            <span>✅</span>
            <span>{querySuccess}</span>
          </div>
        )}

        {queryError && (
          <div className="p-4 mb-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-medium flex items-center gap-2">
            <span>⚠️</span>
            <span>{queryError}</span>
          </div>
        )}

        <form onSubmit={handleQuerySubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-lavender-900 block mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                value={queryForm.name}
                onChange={(e) => setQueryForm({ ...queryForm, name: e.target.value })}
                placeholder="e.g. Kiran Kumar"
                className="w-full px-4 py-2.5 rounded-xl bg-lavender-50/70 border border-lavender-200 text-xs sm:text-sm text-lavender-950 placeholder-lavender-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-lavender-900 block mb-1">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                value={queryForm.email}
                onChange={(e) => setQueryForm({ ...queryForm, email: e.target.value })}
                placeholder="student@example.com"
                className="w-full px-4 py-2.5 rounded-xl bg-lavender-50/70 border border-lavender-200 text-xs sm:text-sm text-lavender-950 placeholder-lavender-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-lavender-900 block mb-1">
                Contact Phone / WhatsApp
              </label>
              <input
                type="tel"
                value={queryForm.phone}
                onChange={(e) => setQueryForm({ ...queryForm, phone: e.target.value })}
                placeholder="+91 9876543210"
                className="w-full px-4 py-2.5 rounded-xl bg-lavender-50/70 border border-lavender-200 text-xs sm:text-sm text-lavender-950 placeholder-lavender-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-lavender-900 block mb-1">
                Domain of Interest
              </label>
              <select
                value={queryForm.domain}
                onChange={(e) => setQueryForm({ ...queryForm, domain: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-lavender-50/70 border border-lavender-200 text-xs sm:text-sm text-lavender-950 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all cursor-pointer"
              >
                <option value="AI Integrated Full Stack Development">AI Integrated Full Stack Development</option>
                <option value="Embedded Systems & IoT">Embedded Systems & IoT</option>
                <option value="Stipend & Milestone Policies">Stipend & Milestone Policies</option>
                <option value="General Admissions Inquiry">General Admissions Inquiry</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-lavender-900 block mb-1">
              Your Question / Query Details <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={queryForm.message}
              onChange={(e) => setQueryForm({ ...queryForm, message: e.target.value })}
              placeholder="Ask anything about the training modules, daily schedule, college exam leave, or company project experience..."
              className="w-full px-4 py-3 rounded-2xl bg-lavender-50/70 border border-lavender-200 text-xs sm:text-sm text-lavender-950 placeholder-lavender-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <span className="text-[11px] text-lavender-500">
              🔒 Inquiries are logged directly into the SPHERONIX database.
            </span>
            <button
              type="submit"
              disabled={queryLoading}
              className="w-full sm:w-auto px-7 py-3 rounded-2xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-purple-600 via-lavender-600 to-indigo-600 shadow-[0_4px_16px_rgba(124,58,237,0.35)] hover:shadow-[0_6px_22px_rgba(124,58,237,0.55)] hover:scale-102 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {queryLoading ? 'Submitting to Database...' : '🚀 Submit Query to Mentors →'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
