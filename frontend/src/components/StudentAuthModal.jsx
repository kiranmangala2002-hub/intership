import React, { useState } from 'react';
import { submitApplication, loginStudent } from '../services/api';

const DOMAIN_OPTIONS = [
  'AI Integrated Full Stack Development',
  'Embedded Systems & IoT',
];

const PASSOUT_YEARS = ['2024', '2025', '2026', '2027', '2028', '2029'];

export default function StudentAuthModal({
  isOpen,
  onClose,
  initialTab = 'register',
  onApplicationSuccess,
  onLoginSuccess,
}) {
  const [tab, setTab] = useState(initialTab); // 'register' | 'signin'
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [copiedId, setCopiedId] = useState(false);

  // Submitted Application Record for Post-Registration Confirmation View
  const [submittedRecord, setSubmittedRecord] = useState(null);

  // Register Form State
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    collegeName: '',
    passoutYear: '2026',
    email: '',
    domain: DOMAIN_OPTIONS[0],
    resumeName: '',
    photoUrl: '',
  });

  // Photo preview state
  const [photoPreview, setPhotoPreview] = useState(null);

  // Sign In Form State
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });

  if (!isOpen) return null;

  // Handle Photo File Upload & Preview
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrorMsg('Please select a valid image file (PNG, JPG, JPEG).');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setFormData((prev) => ({ ...prev, photoUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Resume File Upload
  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        resumeName: `${file.name} (${(file.size / 1024).toFixed(1)} KB)`,
      }));
    }
  };

  // Submit Internship Registration
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!formData.name || !formData.contact || !formData.collegeName || !formData.email || !formData.domain) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    try {
      setLoading(true);
      const res = await submitApplication(formData);
      if (res.success) {
        setSubmittedRecord(res.data);
        if (onApplicationSuccess) onApplicationSuccess(res.data);
        if (onLoginSuccess) {
          onLoginSuccess({
            name: formData.name,
            email: formData.email,
            contact: formData.contact,
            collegeName: formData.collegeName,
            domain: formData.domain,
            role: 'student',
          });
        }
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Submission failed. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  // Submit Sign In
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!signInData.email || !signInData.password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      const res = await loginStudent(signInData);
      if (res.success) {
        setSuccessMsg(`Welcome back, ${res.user.name}!`);
        if (onLoginSuccess) onLoginSuccess(res.user);
        setTimeout(() => {
          onClose();
        }, 1200);
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const copyDetailsToClipboard = () => {
    if (!submittedRecord) return;
    const text = `SPHERONIX Corporate Internship Application\nApplication ID: ${submittedRecord.applicationId}\nName: ${submittedRecord.name}\nDomain: ${submittedRecord.domain}\nCollege: ${submittedRecord.collegeName} (Batch ${submittedRecord.passoutYear})\nEmail: ${submittedRecord.email}\nPhone: ${submittedRecord.contact}\nStatus: ${submittedRecord.status || 'Submitted'}`;
    navigator.clipboard.writeText(text);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[120] flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white/95 backdrop-blur-xl border border-lavender-200/90 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-lavender-100 hover:bg-lavender-200 text-lavender-700 flex items-center justify-center font-bold text-sm transition-colors"
          onClick={() => {
            setSubmittedRecord(null);
            onClose();
          }}
        >
          ✕
        </button>

        {/* Company Logo Header */}
        <div className="flex items-center gap-3 mb-5">
          <img
            src="/logo.png"
            alt="SPHERONIX Technologies"
            className="h-8 sm:h-9 w-auto object-contain mix-blend-multiply"
          />
          <span className="text-xs font-bold text-lavender-700 tracking-wider uppercase pl-2 border-l border-lavender-300">
            Corporate Internships & Training
          </span>
        </div>

        {/* ========================================================= */}
        {/* APPLICATION SUCCESS & DETAILED CONFIRMATION VIEW          */}
        {/* ========================================================= */}
        {submittedRecord ? (
          <div className="space-y-5 animate-cool-page">
            <div className="text-center p-5 rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-purple-50/50 border border-emerald-200 shadow-sm">
              <span className="w-12 h-12 mx-auto mb-2 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-2xl shadow-sm">
                ✓
              </span>
              <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full">
                Application Received & Logged
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-lavender-950 mt-2">
                Congratulations, {submittedRecord.name}!
              </h2>
              <p className="text-xs text-lavender-600 mt-1 max-w-md mx-auto">
                Your application has been logged into the SPHERONIX Corporate Database. Here are your official credentials:
              </p>

              {/* Application ID Card */}
              <div className="mt-4 p-3.5 rounded-2xl bg-white border border-purple-200 flex items-center justify-between gap-3 shadow-2xs">
                <div className="text-left">
                  <span className="text-[10px] font-bold text-lavender-500 uppercase block">
                    Your Official Application ID
                  </span>
                  <span className="text-base sm:text-lg font-mono font-black text-purple-700">
                    {submittedRecord.applicationId}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={copyDetailsToClipboard}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-lavender-100 hover:bg-lavender-200 text-purple-900 border border-lavender-200 transition-all flex items-center gap-1.5"
                >
                  <span>{copiedId ? '✓ Copied!' : '📋 Copy ID'}</span>
                </button>
              </div>
            </div>

            {/* Applicant Detailed Dossier */}
            <div className="p-4 sm:p-5 rounded-2xl bg-lavender-50/70 border border-lavender-200 text-xs space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700 block mb-2">
                Submitted Student Profile Summary
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <span className="text-lavender-500 font-semibold block">Track Selected:</span>
                  <strong className="text-lavender-950">{submittedRecord.domain}</strong>
                </div>
                <div>
                  <span className="text-lavender-500 font-semibold block">Review Stage:</span>
                  <span className="text-emerald-700 font-extrabold bg-emerald-100 px-2 py-0.5 rounded-md inline-block mt-0.5">
                    ● {submittedRecord.status || 'Submitted (In Queue)'}
                  </span>
                </div>
                <div>
                  <span className="text-lavender-500 font-semibold block">College / University:</span>
                  <strong className="text-lavender-950">{submittedRecord.collegeName}</strong>
                </div>
                <div>
                  <span className="text-lavender-500 font-semibold block">Graduation Batch:</span>
                  <strong className="text-lavender-950">Class of {submittedRecord.passoutYear}</strong>
                </div>
                <div>
                  <span className="text-lavender-500 font-semibold block">Registered Email:</span>
                  <strong className="text-lavender-950 font-mono text-[11px]">{submittedRecord.email}</strong>
                </div>
                <div>
                  <span className="text-lavender-500 font-semibold block">Contact Phone:</span>
                  <strong className="text-lavender-950 font-mono text-[11px]">{submittedRecord.contact}</strong>
                </div>
                <div className="sm:col-span-2 pt-1 border-t border-lavender-200/80">
                  <span className="text-lavender-500 font-semibold block">Performance Stipend:</span>
                  <strong className="text-emerald-600 font-black">₹10,000 – ₹15,000/mo (Performance Based)</strong>
                </div>
              </div>
            </div>

            {/* What Happens Next Roadmap */}
            <div className="p-4 rounded-2xl bg-white border border-lavender-200 text-xs space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700 block">
                Next Steps for Your Cohort
              </span>
              <div className="space-y-1.5 text-lavender-700">
                <div className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">1.</span>
                  <span>Your profile is queued for portfolio review by senior SPHERONIX engineering mentors.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">2.</span>
                  <span>Shortlisted candidates receive technical screening links via email within 24–48 hours.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">3.</span>
                  <span>You can track your live status in the <strong>Applications Portal</strong> anytime.</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSubmittedRecord(null);
                  onClose();
                  window.location.hash = 'applications';
                }}
                className="w-full sm:flex-1 py-3 px-4 rounded-2xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md hover:scale-102 active:scale-95 transition-all text-center"
              >
                🔍 Track Live in Applications Portal →
              </button>
              <button
                type="button"
                onClick={() => {
                  setSubmittedRecord(null);
                  onClose();
                }}
                className="w-full sm:w-auto py-3 px-6 rounded-2xl text-xs font-bold text-lavender-700 bg-lavender-100 hover:bg-lavender-200 transition-colors"
              >
                Close & Finish
              </button>
            </div>
          </div>
        ) : (
          /* REGULAR FORM (REGISTER OR SIGN IN) */
          <>
            {/* Tab Toggle */}
            <div className="flex bg-lavender-100/80 p-1.5 rounded-2xl mb-6">
              <button
                type="button"
                className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-bold transition-all ${
                  tab === 'register'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-lavender-700 hover:text-lavender-900'
                }`}
                onClick={() => {
                  setTab('register');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
              >
                📝 Register / Apply
              </button>
              <button
                type="button"
                className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-bold transition-all ${
                  tab === 'signin'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-lavender-700 hover:text-lavender-900'
                }`}
                onClick={() => {
                  setTab('signin');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
              >
                🔐 Sign In
              </button>
            </div>

            {/* Feedback Alerts */}
            {errorMsg && (
              <div className="p-3.5 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-medium">
                ⚠️ {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="p-3.5 mb-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium">
                {successMsg}
              </div>
            )}

            {/* REGISTER / APPLY FORM */}
            {tab === 'register' ? (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <h2 className="text-2xl font-black text-lavender-950">
                    Student Corporate Internships & Training Registration
                  </h2>
                  <p className="text-xs text-lavender-700 mt-1">
                    Enter your details below to apply for the SPHERONIX Corporate Internships & Training Program.
                  </p>
                </div>

                {/* Photo Upload with Live Avatar Preview */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-lavender-50/70 border border-lavender-200/80">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-lavender-400 shadow-sm flex items-center justify-center bg-white flex-shrink-0">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl">📷</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-lavender-800">
                      Profile Photo (Optional)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                      id="modal-student-photo"
                    />
                    <label
                      htmlFor="modal-student-photo"
                      className="inline-block px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-600 text-white hover:bg-purple-700 cursor-pointer w-fit transition-colors"
                    >
                      Choose Photo...
                    </label>
                    <span className="text-[11px] text-lavender-500">JPG, PNG up to 2MB</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-lavender-900 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Alex Johnson"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-lavender-50/70 border border-lavender-200 text-lavender-950 placeholder-lavender-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  {/* Contact */}
                  <div>
                    <label className="block text-xs font-bold text-lavender-900 mb-1">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 9876543210"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-lavender-50/70 border border-lavender-200 text-lavender-950 placeholder-lavender-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  {/* College Name */}
                  <div>
                    <label className="block text-xs font-bold text-lavender-900 mb-1">
                      College / University *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. IIT Madras / BITS Pilani"
                      value={formData.collegeName}
                      onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-lavender-50/70 border border-lavender-200 text-lavender-950 placeholder-lavender-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  {/* Passout Year */}
                  <div>
                    <label className="block text-xs font-bold text-lavender-900 mb-1">
                      Passout Year *
                    </label>
                    <select
                      value={formData.passoutYear}
                      onChange={(e) => setFormData({ ...formData, passoutYear: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-lavender-50/70 border border-lavender-200 text-lavender-950 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {PASSOUT_YEARS.map((yr) => (
                        <option key={yr} value={yr}>
                          Batch of {yr}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-lavender-900 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="student@university.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-lavender-50/70 border border-lavender-200 text-lavender-950 placeholder-lavender-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* Dropdown to select Domains */}
                <div>
                  <label className="block text-xs font-bold text-lavender-900 mb-1">
                    Select Corporate Domain *
                  </label>
                  <select
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-lavender-50/70 border border-lavender-200 text-lavender-950 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                  >
                    {DOMAIN_OPTIONS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Resume Upload */}
                <div>
                  <label className="block text-xs font-bold text-lavender-900 mb-1">
                    Upload Resume (PDF / DOC) *
                  </label>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-lavender-50/70 border-2 border-dashed border-lavender-300">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeChange}
                      className="hidden"
                      id="modal-resume-file"
                    />
                    <label
                      htmlFor="modal-resume-file"
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-lavender-200 hover:bg-lavender-300 text-lavender-800 cursor-pointer transition-colors"
                    >
                      📄 Browse Resume
                    </label>
                    <span className="text-xs text-lavender-700 truncate font-mono">
                      {formData.resumeName || 'No resume file attached'}
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 mt-2 rounded-2xl text-sm font-extrabold text-white bg-gradient-to-r from-purple-600 via-lavender-600 to-indigo-600 shadow-[0_4px_16px_rgba(124,58,237,0.35)] hover:shadow-[0_6px_22px_rgba(124,58,237,0.55)] transition-all"
                >
                  {loading ? 'Submitting Application...' : '🚀 Submit Application for Internships & Training'}
                </button>
              </form>
            ) : (
              /* SIGN IN FORM */
              <form onSubmit={handleSignInSubmit} className="space-y-4">
                <div>
                  <h2 className="text-2xl font-black text-lavender-950">
                    Student Portal Sign In
                  </h2>
                  <p className="text-xs text-lavender-700 mt-1">
                    Track your application stages, technical interviews, and offer letters.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-lavender-900 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="student@university.edu"
                    value={signInData.email}
                    onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-lavender-50/70 border border-lavender-200 text-lavender-950 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-lavender-900 mb-1">
                    Password / Passkey *
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={signInData.password}
                    onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-lavender-50/70 border border-lavender-200 text-lavender-950 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="flex justify-between items-center text-xs">
                  <label className="flex items-center gap-1.5 text-lavender-800 font-medium cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded accent-purple-600" />
                    Remember me
                  </label>
                  <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-purple-600 font-semibold hover:underline">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl text-sm font-extrabold text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md hover:shadow-lg transition-all"
                >
                  {loading ? 'Authenticating...' : 'Sign In to Student Portal'}
                </button>

                <div className="p-3 rounded-xl bg-lavender-50 border border-lavender-200 text-xs text-lavender-700">
                  💡 <strong>Demo Login:</strong> Enter any student email (e.g. <code>student@college.edu</code>) and password.
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
