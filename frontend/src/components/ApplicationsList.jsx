import React from 'react';

export default function ApplicationsList({
  applications,
  onDeleteApplication,
  onRefresh,
}) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Shortlisted':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Under Review':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Interview Scheduled':
        return 'bg-lavender-100 text-lavender-800 border-lavender-300';
      default:
        return 'bg-sky-100 text-sky-800 border-sky-300';
    }
  };

  return (
    <section className="pt-8" id="applications-section">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-lavender-950">
            🎓 Student Corporate Internships & Training Applications
          </h2>
          <p className="text-sm text-lavender-700 mt-1">
            Live applicant pool and SPHERONIX corporate review status.
          </p>
        </div>
        <button
          onClick={onRefresh}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-white/80 hover:bg-white text-lavender-700 border border-lavender-200 shadow-sm transition-all"
        >
          🔄 Refresh Applications
        </button>
      </div>

      {applications.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white/60 border border-dashed border-lavender-300 text-lavender-600 font-medium">
          No student applications submitted yet. Click &quot;Register / Apply&quot; to apply for your domain!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app) => (
            <div
              key={app._id || app.id}
              className="bg-white/85 backdrop-blur-md border border-lavender-200/90 rounded-3xl p-6 shadow-lavender-soft hover:shadow-card-3d transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header Profile Row */}
                <div className="flex justify-between items-start gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    {app.photoUrl ? (
                      <img
                        src={app.photoUrl}
                        alt={app.name}
                        className="w-13 h-13 w-[52px] h-[52px] rounded-full object-cover border-2 border-lavender-300 shadow-sm"
                      />
                    ) : (
                      <div className="w-[52px] h-[52px] rounded-full bg-gradient-to-br from-lavender-500 to-lavender-700 text-white font-bold text-lg flex items-center justify-center shadow-sm">
                        {app.name?.charAt(0)?.toUpperCase() || 'S'}
                      </div>
                    )}
                    <div>
                      <h4 className="font-extrabold text-lavender-950 text-base leading-tight">
                        {app.name}
                      </h4>
                      <p className="text-xs text-lavender-700 mt-0.5">
                        {app.collegeName}
                      </p>
                      <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-lavender-100 text-lavender-700 border border-lavender-200">
                        Batch of {app.passoutYear}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${getStatusBadge(
                      app.status
                    )}`}
                  >
                    {app.status || 'Submitted'}
                  </span>
                </div>

                {/* Details Box */}
                <div className="space-y-2 bg-lavender-50/70 p-3.5 rounded-2xl border border-lavender-100 text-xs mb-4">
                  <div className="flex justify-between">
                    <span className="text-lavender-500 font-semibold">Domain:</span>
                    <span className="text-lavender-900 font-bold text-right truncate max-w-[180px]">
                      {app.domain}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-lavender-500 font-semibold">Email:</span>
                    <span className="text-lavender-800 font-medium truncate max-w-[180px]">
                      {app.email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-lavender-500 font-semibold">Contact:</span>
                    <span className="text-lavender-800 font-medium">
                      {app.contact}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lavender-500 font-semibold">Resume:</span>
                    <span className="text-lavender-700 font-mono text-[11px] truncate max-w-[160px] bg-white px-2 py-0.5 rounded border border-lavender-200">
                      📄 {app.resumeName || 'Resume.pdf'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-lavender-100 flex items-center justify-between">
                <span className="text-[11px] text-lavender-500 font-medium">
                  {new Date(app.createdAt || Date.now()).toLocaleDateString()}
                </span>
                <button
                  onClick={() => onDeleteApplication(app._id || app.id)}
                  className="text-xs font-semibold px-2.5 py-1 rounded-lg text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors"
                >
                  Withdraw
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
