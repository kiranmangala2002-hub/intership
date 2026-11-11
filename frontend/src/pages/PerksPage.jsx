import React, { useState } from 'react';
import TrainingPerks from '../components/TrainingPerks';
import PlacementTreeNetwork from '../components/PlacementTreeNetwork';
import Card3D from '../components/common3d/Card3D';
import Button3D from '../components/common3d/Button3D';
import Badge3D from '../components/common3d/Badge3D';
import { Award, QrCode, CheckCircle2, ShieldCheck, ArrowRight, FileText } from 'lucide-react';

export default function PerksPage({ onApplyClick }) {
  const [isQrVerified, setIsQrVerified] = useState(false);
  const [activeDocTab, setActiveDocTab] = useState('certificate'); // 'certificate' | 'lor'

  const handleVerifyClick = () => {
    setIsQrVerified(true);
    setTimeout(() => {
      // Keep verified state active
    }, 100);
  };

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
        <PlacementTreeNetwork />
      </section>

      {/* 3D Verified Credential & Interactive QR Verification Showcase */}
      <section className="max-w-4xl mx-auto">
        <Card3D maxTilt={6} depth={20} className="w-full">
          <div className="p-7 sm:p-10 rounded-3xl bg-white/95 backdrop-blur-xl border border-lavender-200/90 shadow-[0_15px_45px_rgba(124,58,237,0.12)] flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
            {/* Top metallic gold highlight */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-purple-500 to-indigo-600" />

            {/* Left Column: 3D Holographic Certificate Visualizer */}
            <div className="w-full md:w-5/12 flex flex-col items-center">
              <div className="relative w-full max-w-[280px] p-5 rounded-2xl bg-gradient-to-b from-amber-50/70 via-white to-purple-50/50 border-2 border-amber-300/80 shadow-[0_10px_30px_rgba(245,158,11,0.15)] flex flex-col items-center text-center">
                {/* Certificate Seal Badge */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 border-2 border-white shadow-md flex items-center justify-center text-xl text-white mb-2">
                  🏆
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-800">
                  SPHERONIX OFFICIAL CREDENTIAL
                </span>
                <h4 className="text-sm font-black text-lavender-950 mt-1">
                  Certificate of Internship
                </h4>
                <p className="text-[10px] text-lavender-600 mt-0.5">
                  Corporate Cohort 2026 Verification
                </p>

                {/* QR Code Graphic Box with Interactive Verification */}
                <div className="mt-4 p-3 rounded-xl bg-white border border-lavender-200 shadow-inner flex flex-col items-center">
                  <div className="w-24 h-24 bg-lavender-50 rounded-lg flex items-center justify-center relative overflow-hidden group">
                    <QrCode className="w-20 h-20 text-purple-900 group-hover:scale-105 transition-transform" />
                    {isQrVerified && (
                      <div className="absolute inset-0 bg-emerald-600/90 flex flex-col items-center justify-center text-white p-1 animate-cool-page">
                        <CheckCircle2 className="w-6 h-6 mb-1 text-white" />
                        <span className="text-[8px] font-black uppercase tracking-wider">
                          SHA-256 Valid
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] font-mono text-purple-700 font-bold mt-1.5">
                    SPH-2026-CERT-VERIFIED
                  </span>
                </div>

                {/* Verify Trigger Button */}
                <button
                  type="button"
                  onClick={handleVerifyClick}
                  className="mt-3 text-[11px] font-bold px-3 py-1 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300/80 shadow-2xs transition-all cursor-pointer"
                >
                  {isQrVerified ? '✓ Verified in Registry' : '🔍 Test QR Verification'}
                </button>
              </div>
            </div>

            {/* Right Column: Credential Value Details & Enrollment CTA */}
            <div className="flex-1 text-center md:text-left">
              <div className="mb-2">
                <Badge3D beacon={true} beaconColor="emerald">
                  <span className="text-xs font-black uppercase tracking-wider text-purple-700">
                    Official Industry Credential
                  </span>
                </Badge3D>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-lavender-950 mt-1">
                Verifiable Corporate Experience Certificate
              </h3>

              <p className="text-xs sm:text-sm text-lavender-700 leading-relaxed mt-2.5">
                Every graduate receives an official SPHERONIX Corporate Internship Certificate containing a cryptographic QR code for instant recruiter verification, along with an executive Letter of Recommendation (LOR) detailing project achievements.
              </p>

              {/* Feature Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-4 text-xs font-semibold text-lavender-800">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Instant Recruiter QR Scan</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Executive Recommendation Letter</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Verified Production Repos</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Direct Recruiter Fast-Tracking</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <Button3D
                  variant="primary"
                  size="md"
                  onClick={onApplyClick}
                  icon={<ArrowRight className="w-4 h-4 text-white" />}
                >
                  Enroll & Get Certified
                </Button3D>
              </div>
            </div>
          </div>
        </Card3D>
      </section>
    </div>
  );
}
