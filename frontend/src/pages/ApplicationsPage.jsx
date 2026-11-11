import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { lookupApplication } from '../services/api';

export default function ApplicationsPage({
  applications = [],
  stats = null,
  onRefresh,
  onOpenRegister,
  onDeleteApplication,
  onUpdateStatus,
  isRefreshing = false,
}) {
  // Navigation Tabs: 'directory' | 'tracker' | 'analytics'
  const [activeTab, setActiveTab] = useState('directory');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Selected Applicant for Dossier Modal
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  // Self-Service Lookup State
  const [lookupQuery, setLookupQuery] = useState('');
  const [lookupResult, setLookupResult] = useState(null);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState('');

  // Live Sync / Refresh Feedback State
  const [refreshMessage, setRefreshMessage] = useState('');
  const [localRefreshing, setLocalRefreshing] = useState(false);

  // Manual Trigger for Live Sync with Backend
  const handleManualRefresh = async () => {
    setLocalRefreshing(true);
    setRefreshMessage('');
    try {
      if (onRefresh) {
        const res = await onRefresh();
        if (res && res.success) {
          setRefreshMessage(`Synced ${res.count} application${res.count === 1 ? '' : 's'} with live database`);
        } else {
          setRefreshMessage('Synced with live database');
        }
      }
    } catch (err) {
      setRefreshMessage('Failed to sync. Check backend server.');
    } finally {
      setLocalRefreshing(false);
      setTimeout(() => {
        setRefreshMessage('');
      }, 4000);
    }
  };

  // Handle Self-Service Lookup
  const handleLookup = async (e) => {
    e.preventDefault();
    if (!lookupQuery.trim()) return;
    setLookupLoading(true);
    setLookupError('');
    setLookupResult(null);
    try {
      const res = await lookupApplication(lookupQuery);
      if (res.success) {
        setLookupResult(res.data);
      }
    } catch (err) {
      setLookupError(err.response?.data?.message || 'No application found with that Application ID or Email.');
    } finally {
      setLookupLoading(false);
    }
  };

  // Minimum authentic live counts matching actual applications in backend database
  const baselineAll = 0;
  const baselineShortlisted = 0;
  const baselineUnderReview = 0;
  const baselineSubmitted = 0;

  const liveShortlisted = applications.filter((a) => a.status === 'Shortlisted').length;
  const liveUnderReview = applications.filter((a) => a.status === 'Under Review').length;
  const liveSubmitted = applications.filter((a) => a.status === 'Submitted' || !a.status).length;
  const userSubmissionsCount = applications.length;

  const countAll = stats?.totals?.all ?? (baselineAll + userSubmissionsCount);
  const countShortlisted = stats?.totals?.shortlisted ?? (baselineShortlisted + liveShortlisted);
  const countUnderReview = stats?.totals?.underReview ?? (baselineUnderReview + liveUnderReview);
  const countSubmitted = stats?.totals?.submitted ?? (baselineSubmitted + liveSubmitted);

  const aiDomain = stats?.domains?.aiIntegratedFullStack;
  const iotDomain = stats?.domains?.embeddedSystemsIot;

  const liveAiCount = applications.filter((a) => a.domain && a.domain.toLowerCase().includes('full stack')).length;
  const liveIotCount = applications.filter((a) => a.domain && a.domain.toLowerCase().includes('embedded')).length;

  const countAiFullStack = aiDomain?.count ?? liveAiCount;
  const countEmbeddedIot = iotDomain?.count ?? liveIotCount;
  const pctAiFullStack = aiDomain?.percentage ?? (countAll > 0 ? ((countAiFullStack / countAll) * 100).toFixed(1) : '0.0');
  const pctEmbeddedIot = iotDomain?.percentage ?? (countAll > 0 ? ((countEmbeddedIot / countAll) * 100).toFixed(1) : '0.0');

  // Filtered live applications list
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      // Status Filter
      if (selectedStatus !== 'All') {
        const appStatus = app.status || 'Submitted';
        if (appStatus !== selectedStatus) return false;
      }
      // Domain Filter
      if (selectedDomain !== 'All') {
        if (!app.domain || !app.domain.toLowerCase().includes(selectedDomain.toLowerCase())) {
          return false;
        }
      }
      // Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = app.name?.toLowerCase().includes(q);
        const matchEmail = app.email?.toLowerCase().includes(q);
        const matchCollege = app.collegeName?.toLowerCase().includes(q);
        const matchId = app.applicationId?.toLowerCase().includes(q);
        const matchDomain = app.domain?.toLowerCase().includes(q);
        if (!matchName && !matchEmail && !matchCollege && !matchId && !matchDomain) {
          return false;
        }
      }
      return true;
    });
  }, [applications, selectedStatus, selectedDomain, searchQuery]);

  // Status Badge Helper
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Shortlisted':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
          dot: 'bg-emerald-500',
          label: 'Shortlisted',
        };
      case 'Under Review':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-300',
          dot: 'bg-amber-500',
          label: 'Under Review',
        };
      case 'Interview Scheduled':
        return {
          bg: 'bg-purple-50 text-purple-800 border-purple-300',
          dot: 'bg-purple-500',
          label: 'Interview Scheduled',
        };
      default:
        return {
          bg: 'bg-sky-50 text-sky-800 border-sky-300',
          dot: 'bg-sky-500',
          label: 'Submitted',
        };
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-2 sm:px-4">
      {/* ========================================================= */}
      {/* 1. TOP HEADER & ACTION BANNER                            */}
      {/* ========================================================= */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-5 pb-6 border-b border-lavender-200/80">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-extrabold tracking-wider uppercase text-purple-700 bg-purple-100 px-3 py-0.5 rounded-full border border-purple-200/60 shadow-2xs">
              SPHERONIX Admissions Board
            </span>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-2xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Backend Connected
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-lavender-950 tracking-tight">
            Student Applications & Cohort Portal
          </h1>
          <p className="text-xs sm:text-sm text-lavender-700 mt-1 max-w-2xl leading-relaxed">
            Monitor verified applicant records, track live screening stages, review student credentials, and manage corporate internship admissions.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
          {refreshMessage && (
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/90 px-3 py-2 rounded-2xl border border-emerald-300 animate-fadeIn flex items-center justify-center gap-1.5 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              {refreshMessage}
            </span>
          )}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleManualRefresh}
              disabled={isRefreshing || localRefreshing}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold bg-white text-lavender-800 border border-lavender-200 shadow-2xs hover:bg-lavender-50 hover:border-purple-300 transition-all disabled:opacity-50 active:scale-95 cursor-pointer"
              title="Sync latest live applications and metrics directly from backend"
            >
              <span className={(isRefreshing || localRefreshing) ? 'animate-spin' : ''}>🔄</span>
              <span>{(isRefreshing || localRefreshing) ? 'Syncing...' : 'Sync Live'}</span>
            </button>
            <button
              onClick={onOpenRegister}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-purple-600 via-lavender-600 to-indigo-600 shadow-[0_4px_16px_rgba(124,58,237,0.35)] hover:shadow-[0_6px_22px_rgba(124,58,237,0.55)] hover:scale-102 active:scale-95 transition-all whitespace-nowrap cursor-pointer"
            >
              <span>➕ New Application</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. REAL-TIME COHORT METRICS CARDS (CLICKABLE FILTERS)     */}
      {/* ========================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Volume */}
        <div
          onClick={() => {
            setSelectedStatus('All');
            setActiveTab('directory');
          }}
          className={`cursor-pointer p-4 sm:p-5 rounded-3xl border transition-all duration-300 text-center relative overflow-hidden group ${
            selectedStatus === 'All' && activeTab === 'directory'
              ? 'bg-purple-600 text-white shadow-[0_8px_25px_rgba(147,51,234,0.35)] scale-102 border-purple-500'
              : 'bg-white/90 text-lavender-950 border-lavender-200/90 shadow-2xs hover:bg-white hover:-translate-y-1 hover:shadow-md'
          }`}
        >
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider block opacity-85 mb-0.5">
            Total Applicants
          </span>
          <span className="text-2xl sm:text-3xl lg:text-4xl font-black block tracking-tight">
            {countAll.toLocaleString()}
          </span>
          <span className="text-[10px] font-semibold opacity-75 mt-0.5 block">
            100% Cohort Volume
          </span>
        </div>

        {/* Shortlisted */}
        <div
          onClick={() => {
            setSelectedStatus('Shortlisted');
            setActiveTab('directory');
          }}
          className={`cursor-pointer p-4 sm:p-5 rounded-3xl border transition-all duration-300 text-center relative overflow-hidden group ${
            selectedStatus === 'Shortlisted' && activeTab === 'directory'
              ? 'bg-emerald-600 text-white shadow-[0_8px_25px_rgba(16,185,129,0.35)] scale-102 border-emerald-500'
              : 'bg-white/90 text-lavender-950 border-lavender-200/90 shadow-2xs hover:bg-white hover:-translate-y-1 hover:shadow-md'
          }`}
        >
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider block opacity-85 mb-0.5">
            Shortlisted
          </span>
          <span className="text-2xl sm:text-3xl lg:text-4xl font-black block tracking-tight text-emerald-600 group-hover:text-emerald-700">
            {countShortlisted.toLocaleString()}
          </span>
          <span className="text-[10px] font-semibold opacity-75 mt-0.5 block">
            {countAll > 0 ? `${((countShortlisted / countAll) * 100).toFixed(1)}% Qualified` : '0% Qualified'}
          </span>
        </div>

        {/* Under Review */}
        <div
          onClick={() => {
            setSelectedStatus('Under Review');
            setActiveTab('directory');
          }}
          className={`cursor-pointer p-4 sm:p-5 rounded-3xl border transition-all duration-300 text-center relative overflow-hidden group ${
            selectedStatus === 'Under Review' && activeTab === 'directory'
              ? 'bg-amber-500 text-white shadow-[0_8px_25px_rgba(245,158,11,0.35)] scale-102 border-amber-400'
              : 'bg-white/90 text-lavender-950 border-lavender-200/90 shadow-2xs hover:bg-white hover:-translate-y-1 hover:shadow-md'
          }`}
        >
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider block opacity-85 mb-0.5">
            Under Evaluation
          </span>
          <span className="text-2xl sm:text-3xl lg:text-4xl font-black block tracking-tight text-amber-600">
            {countUnderReview.toLocaleString()}
          </span>
          <span className="text-[10px] font-semibold opacity-75 mt-0.5 block">
            {countAll > 0 ? `${((countUnderReview / countAll) * 100).toFixed(1)}% In Screening` : '0% In Screening'}
          </span>
        </div>

        {/* Submitted */}
        <div
          onClick={() => {
            setSelectedStatus('Submitted');
            setActiveTab('directory');
          }}
          className={`cursor-pointer p-4 sm:p-5 rounded-3xl border transition-all duration-300 text-center relative overflow-hidden group ${
            selectedStatus === 'Submitted' && activeTab === 'directory'
              ? 'bg-sky-600 text-white shadow-[0_8px_25px_rgba(2,132,199,0.35)] scale-102 border-sky-500'
              : 'bg-white/90 text-lavender-950 border-lavender-200/90 shadow-2xs hover:bg-white hover:-translate-y-1 hover:shadow-md'
          }`}
        >
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider block opacity-85 mb-0.5">
            New Submissions
          </span>
          <span className="text-2xl sm:text-3xl lg:text-4xl font-black block tracking-tight text-sky-600">
            {countSubmitted.toLocaleString()}
          </span>
          <span className="text-[10px] font-semibold opacity-75 mt-0.5 block">
            {countAll > 0 ? `${((countSubmitted / countAll) * 100).toFixed(1)}% In Queue` : '0% In Queue'}
          </span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. INTERACTIVE SECTION TABS NAVIGATION                   */}
      {/* ========================================================= */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-1.5 rounded-2xl bg-white/80 backdrop-blur-md border border-lavender-200/80 shadow-2xs">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none w-full sm:w-auto py-0.5">
          <button
            onClick={() => setActiveTab('directory')}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'directory'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-lavender-700 hover:text-lavender-950 hover:bg-lavender-100/60'
            }`}
          >
            <span>📋 Live Applications Directory</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                activeTab === 'directory' ? 'bg-purple-800 text-white' : 'bg-lavender-200 text-lavender-800'
              }`}
            >
              {filteredApplications.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('tracker')}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'tracker'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-lavender-700 hover:text-lavender-950 hover:bg-lavender-100/60'
            }`}
          >
            <span>🔍 Self-Service Status Tracker</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'analytics'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-lavender-700 hover:text-lavender-950 hover:bg-lavender-100/60'
            }`}
          >
            <span>📊 Cohort Funnel Analytics</span>
          </button>
        </div>

        {/* View mode toggle (only in directory tab) */}
        {activeTab === 'directory' && (
          <div className="hidden sm:flex items-center gap-1 bg-lavender-100/80 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              title="Grid Card View"
              className={`p-1.5 rounded-lg text-xs transition-all ${
                viewMode === 'grid' ? 'bg-white text-purple-700 shadow-2xs font-bold' : 'text-lavender-600 hover:text-lavender-900'
              }`}
            >
              🪟 Cards
            </button>
            <button
              onClick={() => setViewMode('table')}
              title="Table List View"
              className={`p-1.5 rounded-lg text-xs transition-all ${
                viewMode === 'table' ? 'bg-white text-purple-700 shadow-2xs font-bold' : 'text-lavender-600 hover:text-lavender-900'
              }`}
            >
              📋 Table
            </button>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* TAB 1: LIVE APPLICANT DIRECTORY                           */}
      {/* ========================================================= */}
      {activeTab === 'directory' && (
        <div className="space-y-6 animate-cool-page">
          {/* Search & Domain Filter Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-lavender-200/80 shadow-2xs">
            {/* Live Search Input */}
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-lavender-400">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search candidate name, college, email, application ID..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-lavender-50/70 border border-lavender-200 text-xs sm:text-sm text-lavender-950 placeholder-lavender-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-lavender-400 hover:text-lavender-700"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Domain Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {['All', 'Full Stack', 'Embedded'].map((dom) => (
                <button
                  key={dom}
                  onClick={() => setSelectedDomain(dom)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    selectedDomain === dom
                      ? 'bg-purple-600 text-white shadow-2xs'
                      : 'bg-lavender-100 text-lavender-700 hover:bg-lavender-200'
                  }`}
                >
                  {dom === 'All' ? 'All Tracks' : dom === 'Full Stack' ? '💻 Full Stack' : '⚡ Embedded IoT'}
                </button>
              ))}
            </div>
          </div>

          {/* Directory Count Notice */}
          <div className="flex items-center justify-between text-xs text-lavender-600 px-1">
            <span>
              Showing <strong>{filteredApplications.length}</strong> active applicants
              {selectedStatus !== 'All' && <span> in <strong>{selectedStatus}</strong></span>}
              {selectedDomain !== 'All' && <span> under <strong>{selectedDomain}</strong></span>}
            </span>
            {(searchQuery || selectedStatus !== 'All' || selectedDomain !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedStatus('All');
                  setSelectedDomain('All');
                }}
                className="text-purple-600 hover:text-purple-800 font-bold underline"
              >
                Reset All Filters
              </button>
            )}
          </div>

          {/* Empty State */}
          {filteredApplications.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white/70 border-2 border-dashed border-lavender-300 space-y-3">
              <span className="text-4xl block">🔍</span>
              <h3 className="text-base font-black text-lavender-950">No applications match your filter</h3>
              <p className="text-xs text-lavender-600 max-w-md mx-auto">
                Try clearing your search term or domain filter, or submit a new candidate application.
              </p>
              <div className="pt-2 flex justify-center gap-2">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedStatus('All');
                    setSelectedDomain('All');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-lavender-100 text-lavender-700 hover:bg-lavender-200"
                >
                  Clear Filters
                </button>
                <button
                  onClick={onOpenRegister}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700"
                >
                  ➕ Submit New Application
                </button>
              </div>
            </div>
          ) : viewMode === 'grid' ? (
            /* ========================================================= */
            /* GRID CARDS VIEW                                           */
            /* ========================================================= */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredApplications.map((app) => {
                const badge = getStatusBadge(app.status);
                const isFullStack = app.domain?.toLowerCase().includes('full stack');
                return (
                  <div
                    key={app._id || app.id}
                    className="group bg-white/95 backdrop-blur-xl border border-lavender-200/90 rounded-3xl p-5 sm:p-6 shadow-[0_4px_20px_rgba(124,58,237,0.05)] hover:shadow-[0_12px_35px_rgba(124,58,237,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                  >
                    {/* Top Accent Strip */}
                    <div
                      className={`-mt-6 -mx-6 h-1.5 mb-5 bg-gradient-to-r ${
                        isFullStack
                          ? 'from-purple-600 to-indigo-600'
                          : 'from-teal-500 to-emerald-500'
                      }`}
                    />

                    <div>
                      {/* Header Profile Row */}
                      <div className="flex justify-between items-start gap-3 mb-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-black text-lg flex items-center justify-center shadow-2xs flex-shrink-0">
                            {app.name?.charAt(0)?.toUpperCase() || 'S'}
                          </div>
                          <div>
                            <h4 className="font-black text-lavender-950 text-base leading-tight group-hover:text-purple-700 transition-colors">
                              {app.name}
                            </h4>
                            <span className="text-[11px] font-mono font-bold text-purple-700 block mt-0.5">
                              {app.applicationId || 'SPH-2026'}
                            </span>
                          </div>
                        </div>

                        {/* Status Pill */}
                        <span
                          className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border flex items-center gap-1.5 shadow-2xs ${badge.bg}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                          <span>{badge.label}</span>
                        </span>
                      </div>

                      {/* Domain Tag */}
                      <div className="mb-3">
                        <span
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border inline-flex items-center gap-1 ${
                            isFullStack
                              ? 'bg-purple-50 text-purple-800 border-purple-200'
                              : 'bg-teal-50 text-teal-800 border-teal-200'
                          }`}
                        >
                          <span>{isFullStack ? '💻' : '⚡'}</span>
                          <span className="truncate max-w-[200px]">{app.domain}</span>
                        </span>
                      </div>

                      {/* College & Details Box */}
                      <div className="space-y-1.5 bg-lavender-50/70 p-3.5 rounded-2xl border border-lavender-200/70 text-xs mb-4">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-lavender-500 font-semibold flex-shrink-0 pt-0.5">College:</span>
                          <span
                            title={app.collegeName}
                            className="text-lavender-950 font-bold text-right text-xs leading-snug line-clamp-2 max-w-[210px]"
                          >
                            {app.collegeName}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lavender-500 font-semibold">Batch:</span>
                          <span className="text-lavender-800 font-bold">Class of {app.passoutYear}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lavender-500 font-semibold">Contact:</span>
                          <span className="text-lavender-800 font-mono text-[11px] truncate max-w-[170px]">
                            {app.contact}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lavender-500 font-semibold">Resume:</span>
                          <span className="text-purple-700 font-medium text-[11px] truncate max-w-[170px]">
                            📄 {app.resumeName || 'Resume.pdf'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions Row */}
                    <div className="pt-3 border-t border-lavender-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setSelectedApplicant(app)}
                        className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-purple-900 bg-lavender-100 hover:bg-lavender-200 border border-lavender-200/80 transition-all text-center"
                      >
                        👁️ View Dossier
                      </button>

                      {/* Quick Status Select */}
                      <select
                        value={app.status || 'Submitted'}
                        onChange={(e) => {
                          if (onUpdateStatus) {
                            onUpdateStatus(app._id || app.id, e.target.value);
                          }
                        }}
                        aria-label="Update Applicant Status"
                        className="py-2 px-2 rounded-xl text-xs font-bold bg-white border border-lavender-300 text-lavender-800 focus:outline-none focus:ring-1 focus:ring-purple-500 cursor-pointer"
                      >
                        <option value="Submitted">Submitted</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interview Scheduled">Interview Scheduled</option>
                      </select>

                      {/* Delete / Withdraw Button */}
                      {onDeleteApplication && (
                        <button
                          onClick={() => onDeleteApplication(app._id || app.id)}
                          title="Withdraw Application"
                          className="p-2 rounded-xl text-xs text-rose-600 hover:bg-rose-50 border border-rose-200/80 transition-all"
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* ========================================================= */
            /* RESPONSIVE TABLE VIEW                                     */
            /* ========================================================= */
            <div className="overflow-x-auto rounded-3xl bg-white border border-lavender-200 shadow-sm">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-lavender-50/80 border-b border-lavender-200 text-lavender-600 font-extrabold uppercase tracking-wider text-[10px]">
                    <th className="py-3.5 px-4">Candidate & ID</th>
                    <th className="py-3.5 px-4">Domain Track</th>
                    <th className="py-3.5 px-4">College & Batch</th>
                    <th className="py-3.5 px-4">Review Status</th>
                    <th className="py-3.5 px-4">Applied Date</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-lavender-100">
                  {filteredApplications.map((app) => {
                    const badge = getStatusBadge(app.status);
                    return (
                      <tr key={app._id || app.id} className="hover:bg-lavender-50/50 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                              {app.name?.charAt(0)?.toUpperCase() || 'S'}
                            </div>
                            <div>
                              <span className="font-extrabold text-lavender-950 block">{app.name}</span>
                              <span className="text-[10px] font-mono text-purple-700">{app.applicationId}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium text-lavender-800">
                          <span className="truncate max-w-[180px] block">{app.domain}</span>
                        </td>
                        <td className="py-3 px-4 text-lavender-700">
                          <span className="font-semibold text-lavender-900 block">{app.collegeName}</span>
                          <span className="text-[10px] text-lavender-500">Batch {app.passoutYear}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border inline-flex items-center gap-1 ${badge.bg}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                            <span>{badge.label}</span>
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[11px] text-lavender-600">
                          {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'Recent'}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => setSelectedApplicant(app)}
                              className="px-2.5 py-1 rounded-lg bg-lavender-100 hover:bg-lavender-200 text-purple-900 font-bold text-[11px]"
                            >
                              View
                            </button>
                            {onDeleteApplication && (
                              <button
                                onClick={() => onDeleteApplication(app._id || app.id)}
                                className="p-1 rounded-lg text-rose-600 hover:bg-rose-50 border border-rose-200"
                                title="Withdraw"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: SELF-SERVICE STATUS TRACKER                        */}
      {/* ========================================================= */}
      {activeTab === 'tracker' && (
        <div className="space-y-6 animate-cool-page">
          <div className="p-7 sm:p-10 rounded-3xl bg-white/95 backdrop-blur-xl border border-lavender-200/90 shadow-[0_10px_35px_rgba(124,58,237,0.08)]">
            <div className="max-w-xl mx-auto text-center mb-6">
              <span className="text-xs font-bold tracking-wider uppercase text-purple-700 bg-purple-100/80 px-3 py-1 rounded-full border border-purple-200/60 inline-flex items-center gap-1.5">
                🔍 Applicant Self-Service Portal
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-lavender-950 mt-2">
                Track Your Application Review Status
              </h3>
              <p className="text-xs sm:text-sm text-lavender-700 mt-1">
                Enter your official <strong>Application ID</strong> (e.g., <code className="bg-lavender-100 px-1.5 py-0.5 rounded text-purple-800 font-mono">SPH-2026-8841</code>) or registered email address.
              </p>
            </div>

            <form onSubmit={handleLookup} className="max-w-lg mx-auto flex flex-col sm:flex-row gap-2.5">
              <input
                type="text"
                value={lookupQuery}
                onChange={(e) => setLookupQuery(e.target.value)}
                placeholder="Enter Application ID or Email..."
                className="flex-1 px-4 py-3 rounded-2xl bg-lavender-50/70 border border-lavender-200/90 text-sm text-lavender-950 placeholder-lavender-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
              />
              <button
                type="submit"
                disabled={lookupLoading}
                className="px-6 py-3 rounded-2xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {lookupLoading ? 'Checking...' : 'Check Status →'}
              </button>
            </form>

            {lookupError && (
              <div className="mt-4 p-3.5 max-w-lg mx-auto rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs text-center font-medium">
                ⚠️ {lookupError}
              </div>
            )}

            {lookupResult && (
              <div className="mt-8 max-w-2xl mx-auto p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-lavender-50 via-white to-purple-50/40 border border-purple-200 shadow-md">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-lavender-100">
                  <div>
                    <span className="text-xs font-mono font-bold text-purple-700 block">
                      {lookupResult.applicationId}
                    </span>
                    <h4 className="text-lg font-black text-lavender-950 mt-0.5">
                      {lookupResult.name}
                    </h4>
                    <p className="text-xs text-lavender-600">
                      {lookupResult.collegeName} • Class of {lookupResult.passoutYear}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black border ${
                      getStatusBadge(lookupResult.status).bg
                    }`}
                  >
                    ● {lookupResult.status || 'Submitted'}
                  </span>
                </div>

                {/* 4-Stage Review Progress Pipeline */}
                <div className="mt-6 pt-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700 block mb-4">
                    Admissions Screening Roadmap
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    {[
                      {
                        num: '1',
                        label: 'Application Received',
                        desc: 'Digitally logged in cohort',
                        done: true,
                      },
                      {
                        num: '2',
                        label: 'Mentor Screening',
                        desc: 'Resume & domain review',
                        done: lookupResult.status !== 'Submitted',
                      },
                      {
                        num: '3',
                        label: 'Technical Round',
                        desc: 'Coding architecture review',
                        done: lookupResult.status === 'Shortlisted' || lookupResult.status === 'Interview Scheduled',
                      },
                      {
                        num: '4',
                        label: 'Corporate Offer',
                        desc: 'Stipend assignment',
                        done: lookupResult.status === 'Interview Scheduled',
                      },
                    ].map((step, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-2xl border text-center transition-all ${
                          step.done
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-900 shadow-2xs'
                            : 'bg-white border-lavender-200 text-lavender-600 opacity-60'
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-full mx-auto mb-1 text-xs font-black flex items-center justify-center ${
                            step.done ? 'bg-emerald-500 text-white' : 'bg-lavender-100 text-lavender-700'
                          }`}
                        >
                          {step.done ? '✓' : step.num}
                        </span>
                        <h6 className="text-xs font-bold">{step.label}</h6>
                        <p className="text-[10px] text-lavender-500 mt-0.5">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-lavender-100 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-lavender-700 gap-2">
                  <span>Track: <strong>{lookupResult.domain}</strong></span>
                  <span className="text-[11px] text-lavender-500 font-mono">
                    Applied: {new Date(lookupResult.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: COHORT ANALYTICS & RECRUITMENT FUNNEL              */}
      {/* ========================================================= */}
      {activeTab === 'analytics' && (
        <div className="space-y-6 animate-cool-page">
          {/* Spotlight Card */}
          <div className="p-7 sm:p-9 rounded-3xl bg-white/90 backdrop-blur-xl border border-lavender-200/90 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-3 py-0.5 rounded-full">
                  Recruitment Funnel
                </span>
                <h3 className="text-2xl font-black text-lavender-950 mt-1.5">
                  Corporate Evaluation Pipeline
                </h3>
                <p className="text-xs text-lavender-600 mt-0.5">
                  Real-time progression through applicant screening stages.
                </p>
              </div>

              <div className="bg-lavender-50 px-4 py-2 rounded-2xl border border-lavender-200 text-right">
                <span className="text-[10px] font-bold text-lavender-500 uppercase">Total Pool</span>
                <span className="text-2xl font-black text-purple-700 block">{countAll.toLocaleString()}</span>
              </div>
            </div>

            {/* Funnel Progress Bars */}
            <div className="space-y-4 pt-2">
              {[
                {
                  label: '1. Total Applications Received',
                  count: countAll,
                  pct: 100,
                  color: 'bg-purple-600',
                },
                {
                  label: '2. In Active Technical Evaluation',
                  count: countUnderReview,
                  pct: countAll > 0 ? ((countUnderReview / countAll) * 100).toFixed(1) : '0.0',
                  color: 'bg-amber-400',
                },
                {
                  label: '3. Shortlisted for Technical Interviews',
                  count: countShortlisted,
                  pct: countAll > 0 ? ((countShortlisted / countAll) * 100).toFixed(1) : '0.0',
                  color: 'bg-emerald-500',
                },
                {
                  label: '4. Newly Received / In Queue',
                  count: countSubmitted,
                  pct: countAll > 0 ? ((countSubmitted / countAll) * 100).toFixed(1) : '0.0',
                  color: 'bg-sky-500',
                },
              ].map((stage, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold text-lavender-900">
                    <span>{stage.label}</span>
                    <span>
                      {stage.count.toLocaleString()} ({stage.pct}%)
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-lavender-100 rounded-full overflow-hidden shadow-inner">
                    <div
                      className={`h-full ${stage.color} transition-all duration-700 rounded-full`}
                      style={{ width: `${stage.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Domain Track Distribution Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-6 rounded-3xl bg-white border border-lavender-200 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-purple-600 block mb-1">
                  Track 01
                </span>
                <h4 className="text-lg font-black text-lavender-950">AI Integrated Full Stack</h4>
                <p className="text-xs text-lavender-600 mt-0.5">React, Node.js, AI Agents & Cloud AWS</p>
                <span className="inline-block mt-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  ₹10,000 – ₹15,000/mo (Performance Based)
                </span>
              </div>
              <div className="text-right pl-4 border-l border-lavender-100">
                <span className="text-3xl font-black text-lavender-900 block">{countAiFullStack.toLocaleString()}</span>
                <span className="text-[10px] font-bold text-lavender-500 uppercase">{pctAiFullStack}% Share</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-lavender-200 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-teal-600 block mb-1">
                  Track 02
                </span>
                <h4 className="text-lg font-black text-lavender-950">Embedded Systems & IoT</h4>
                <p className="text-xs text-lavender-600 mt-0.5">ARM Cortex, FreeRTOS, ESP32 & PCB Design</p>
                <span className="inline-block mt-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  ₹10,000 – ₹15,000/mo (Performance Based)
                </span>
              </div>
              <div className="text-right pl-4 border-l border-lavender-100">
                <span className="text-3xl font-black text-lavender-900 block">{countEmbeddedIot.toLocaleString()}</span>
                <span className="text-[10px] font-bold text-lavender-500 uppercase">{pctEmbeddedIot}% Share</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. APPLICANT PROFILE DOSSIER MODAL                        */}
      {/* ========================================================= */}
      {selectedApplicant &&
        createPortal(
          <div
            className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md overflow-hidden"
            onClick={() => setSelectedApplicant(null)}
          >
            <div
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-[0_25px_70px_rgba(124,58,237,0.3)] flex flex-col overflow-hidden border border-lavender-200 animate-cool-page my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Gradient Stripe */}
              <div
                className={`h-2 w-full bg-gradient-to-r ${
                  selectedApplicant.domain?.toLowerCase().includes('full stack')
                    ? 'from-purple-600 via-pink-500 to-indigo-600'
                    : 'from-indigo-600 via-teal-500 to-emerald-500'
                }`}
              />

              {/* Header */}
              <div className="p-6 border-b border-lavender-100 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-black text-xl flex items-center justify-center shadow-2xs flex-shrink-0">
                    {selectedApplicant.name?.charAt(0)?.toUpperCase() || 'S'}
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-bold text-purple-700 block">
                      {selectedApplicant.applicationId || 'SPH-2026'}
                    </span>
                    <h3 className="text-xl font-black text-lavender-950">
                      {selectedApplicant.name}
                    </h3>
                    <p className="text-xs text-lavender-600 mt-0.5">
                      {selectedApplicant.collegeName} • Batch of {selectedApplicant.passoutYear}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedApplicant(null)}
                  className="w-8 h-8 rounded-full bg-lavender-100 hover:bg-lavender-200 text-lavender-700 flex items-center justify-center font-bold text-sm"
                >
                  ✕
                </button>
              </div>

              {/* Dossier Body */}
              <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="p-3.5 rounded-2xl bg-lavender-50/70 border border-lavender-200">
                    <span className="text-[10px] font-bold text-lavender-500 uppercase block">Selected Domain</span>
                    <span className="text-xs sm:text-sm font-extrabold text-lavender-950 mt-0.5 block">
                      {selectedApplicant.domain}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-lavender-50/70 border border-lavender-200">
                    <span className="text-[10px] font-bold text-lavender-500 uppercase block">Review Status</span>
                    <span
                      className={`inline-block mt-1 text-xs font-black px-2.5 py-0.5 rounded-full border ${
                        getStatusBadge(selectedApplicant.status).bg
                      }`}
                    >
                      ● {selectedApplicant.status || 'Submitted'}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-lavender-50/70 border border-lavender-200">
                    <span className="text-[10px] font-bold text-lavender-500 uppercase block">Contact Email</span>
                    <span className="text-xs font-mono font-bold text-lavender-950 mt-0.5 block">
                      {selectedApplicant.email}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-lavender-50/70 border border-lavender-200">
                    <span className="text-[10px] font-bold text-lavender-500 uppercase block">Phone Number</span>
                    <span className="text-xs font-mono font-bold text-lavender-950 mt-0.5 block">
                      {selectedApplicant.contact}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-lavender-50/70 border border-lavender-200 sm:col-span-2">
                    <span className="text-[10px] font-bold text-lavender-500 uppercase block">Resume Attachment</span>
                    <span className="text-xs font-medium text-purple-700 mt-0.5 flex items-center gap-1.5">
                      📄 {selectedApplicant.resumeName || 'Resume.pdf'} (Verified Attachment)
                    </span>
                  </div>
                </div>

                {/* Status Advancement Control */}
                <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h5 className="text-xs font-black text-purple-950">Change Candidate Review Stage</h5>
                    <p className="text-[11px] text-purple-700">Advance applicant through SPHERONIX screening rounds.</p>
                  </div>

                  <select
                    value={selectedApplicant.status || 'Submitted'}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      if (onUpdateStatus) {
                        onUpdateStatus(selectedApplicant._id || selectedApplicant.id, newStatus);
                      }
                      setSelectedApplicant((prev) => ({ ...prev, status: newStatus }));
                    }}
                    className="px-3 py-2 rounded-xl text-xs font-bold bg-white border border-purple-300 text-purple-950 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-2xs"
                  >
                    <option value="Submitted">1. Submitted</option>
                    <option value="Under Review">2. Under Review</option>
                    <option value="Shortlisted">3. Shortlisted</option>
                    <option value="Interview Scheduled">4. Interview Scheduled</option>
                  </select>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 px-6 bg-lavender-50/80 border-t border-lavender-100 flex items-center justify-between">
                <span className="text-[11px] text-lavender-600 font-mono">
                  Applied: {selectedApplicant.createdAt ? new Date(selectedApplicant.createdAt).toLocaleString() : 'Recent'}
                </span>
                <button
                  onClick={() => setSelectedApplicant(null)}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-lavender-700 bg-white border border-lavender-200 hover:bg-lavender-100"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Corporate Confidentiality Callout */}
      <div className="p-5 rounded-3xl bg-purple-50/70 border border-purple-200/80 flex flex-col sm:flex-row items-center gap-3.5 text-xs text-purple-900">
        <span className="text-2xl flex-shrink-0">🔒</span>
        <div className="text-center sm:text-left">
          <strong className="text-purple-950 block">SPHERONIX Corporate Admissions Data Protection</strong>
          <span className="text-purple-800/90">
            Candidate records, emails, and resume portfolios are protected and accessible only to authorized SPHERONIX technical mentors and recruitment leads.
          </span>
        </div>
      </div>
    </div>
  );
}
