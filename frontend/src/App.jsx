import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ThreeCanvas from './components/ThreeCanvas';
import StudentAuthModal from './components/StudentAuthModal';
import WhatsAppChatModal from './components/WhatsAppChatModal';

// Dedicated Separate Pages
import HomePage from './pages/HomePage';
import DomainsPage from './pages/DomainsPage';
import JourneyPage from './pages/JourneyPage';
import PerksPage from './pages/PerksPage';
import FaqPage from './pages/FaqPage';
import ApplicationsPage from './pages/ApplicationsPage';

import {
  getHealthCheck,
  getApplications,
  getApplicationStats,
  deleteApplication,
  updateApplicationStatus,
  getMe,
  logoutStudent,
} from './services/api';

const DOMAINS_DATA = [
  {
    title: 'AI Integrated Full Stack Development',
    icon: '💻',
    tags: ['React / Next.js', 'Node.js', 'AI Agents / LLMs', 'LangChain', 'Python', 'Tailwind'],
    stipend: '₹10,000 - ₹15,000/mo (Performance Based)',
    duration: '3 - 6 Months',
    description:
      'Build scalable, high-performance web applications augmented with AI agents, LLM APIs, modern responsive interfaces, and production cloud backends.',
  },
  {
    title: 'Embedded Systems & IoT',
    icon: '⚡',
    tags: ['ARM Cortex-M', 'BeagleBone Linux', 'TinyML / Edge AI', 'FreeRTOS', 'ESP32 IoT', 'Device Drivers'],
    stipend: '₹10,000 – ₹15,000/mo (Performance Based)',
    duration: '6 Months',
    description:
      'Master industry-grade Embedded Systems, ARM Cortex-M, BeagleBone Linux device drivers, FreeRTOS, TinyML, and robotics with hands-on development boards.',
  },
];

export default function App() {
  // Page Routing State with URL Hash Sync
  const getInitialPage = () => {
    const hash = window.location.hash.replace('#', '');
    const validPages = ['home', 'domains', 'journey', 'perks', 'faq', 'applications'];
    return validPages.includes(hash) ? hash : 'home';
  };

  const [activePage, setActivePage] = useState(getInitialPage);
  const [backendStatus, setBackendStatus] = useState('checking'); // 'checking' | 'online' | 'offline'
  const [applications, setApplications] = useState([]);
  const [applicationStats, setApplicationStats] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState('register'); // 'register' | 'signin'
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('spheronix_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const retryTimeoutRef = useRef(null);

  // Sync hash change (back/forward browser buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validPages = ['home', 'domains', 'journey', 'perks', 'faq', 'applications'];
      if (validPages.includes(hash)) {
        setActivePage(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Validate existing auth token on launch
  useEffect(() => {
    const token = localStorage.getItem('spheronix_token');
    if (token) {
      getMe()
        .then((res) => {
          if (res.success && res.user) {
            setCurrentUser(res.user);
            localStorage.setItem('spheronix_user', JSON.stringify(res.user));
          }
        })
        .catch(() => {
          logoutStudent();
          setCurrentUser(null);
        });
    }
  }, []);

  // Smooth Page Navigation Handler with 3D transition
  const handleNavigate = (pageId) => {
    setActivePage(pageId);
    window.location.hash = pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auto-connect loop
  useEffect(() => {
    let isMounted = true;

    const connectToBackend = async () => {
      try {
        await Promise.all([
          getHealthCheck(),
          fetchApplications(),
        ]);
        if (isMounted) {
          setBackendStatus('online');
        }
      } catch (err) {
        if (isMounted) {
          setBackendStatus('offline');
          retryTimeoutRef.current = setTimeout(connectToBackend, 2500);
        }
      }
    };

    connectToBackend();

    return () => {
      isMounted = false;
      if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
    };
  }, []);

  const fetchApplications = async () => {
    try {
      setIsRefreshing(true);
      const [appsRes, statsRes] = await Promise.allSettled([
        getApplications(),
        getApplicationStats(),
      ]);

      let loadedCount = applications.length;
      if (appsRes.status === 'fulfilled' && appsRes.value?.success) {
        setApplications(appsRes.value.data);
        loadedCount = appsRes.value.data.length;
      }
      if (statsRes.status === 'fulfilled' && statsRes.value?.success) {
        setApplicationStats(statsRes.value.data);
      }
      return { success: true, count: loadedCount, timestamp: Date.now() };
    } catch (err) {
      console.log('Error fetching applications & stats:', err.message);
      return { success: false, error: err.message };
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleOpenRegister = () => {
    setModalTab('register');
    setIsModalOpen(true);
  };

  const handleOpenSignIn = () => {
    setModalTab('signin');
    setIsModalOpen(true);
  };

  const handleApplicationSuccess = (newApp) => {
    setApplications((prev) => [newApp, ...prev]);
    // Immediately pull updated live stats from backend
    fetchApplications();
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('spheronix_user', JSON.stringify(user));
    } catch (e) {}
  };

  const handleLogout = () => {
    logoutStudent();
    setCurrentUser(null);
  };

  const handleDeleteApplication = async (id) => {
    if (!window.confirm('Are you sure you want to withdraw this application?')) {
      return;
    }

    try {
      await deleteApplication(id);
      setApplications((prev) => prev.filter((a) => (a._id || a.id) !== id));
      // Refresh stats from backend
      fetchApplications();
    } catch (err) {
      alert('Failed to delete application. Please check backend connection.');
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await updateApplicationStatus(id, newStatus);
      if (res.success) {
        setApplications((prev) =>
          prev.map((a) => ((a._id || a.id) === id ? { ...a, status: newStatus } : a))
        );
        fetchApplications();
      }
    } catch (err) {
      alert('Failed to update application status.');
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-lavender-50 via-lavender-100/60 to-lavender-200/50 text-lavender-950 overflow-x-hidden">
      {/* Futuristic Laser Route Transition Beam on Page Change */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none overflow-hidden">
        <div
          key={activePage}
          className="h-full w-full bg-gradient-to-r from-transparent via-purple-500 to-cyan-400 shadow-[0_0_12px_#a855f7,0_0_20px_#38bdf8]"
          style={{ animation: 'laserRouteBeam 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards' }}
        />
      </div>

      {/* 3D Ambient Scene */}
      <ThreeCanvas activePage={activePage} />

      {/* Navigation Bar with Clean Typography */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        backendStatus={backendStatus}
        onOpenRegister={handleOpenRegister}
        onOpenSignIn={handleOpenSignIn}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Page Content with Cool Kinetic Holographic Transition */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex-1 w-full">
        <div key={activePage} className="animate-cool-page relative">
          {/* Ambient Hologram Light Sweep Wave */}
          <div
            className="absolute -inset-x-20 h-24 pointer-events-none z-30"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(168, 85, 247, 0.12) 50%, rgba(56, 189, 248, 0.08) 80%, transparent 100%)',
              animation: 'pageLightSweep 0.5s ease-out forwards',
            }}
          />
          {activePage === 'home' && (
            <HomePage
              onOpenRegister={handleOpenRegister}
              onNavigate={handleNavigate}
            />
          )}

          {activePage === 'domains' && (
            <DomainsPage
              domains={DOMAINS_DATA}
              onSelectDomain={() => handleOpenRegister()}
            />
          )}

          {activePage === 'journey' && (
            <JourneyPage onApplyClick={handleOpenRegister} />
          )}

          {activePage === 'perks' && (
            <PerksPage onApplyClick={handleOpenRegister} />
          )}

          {activePage === 'faq' && (
            <FaqPage onOpenRegister={handleOpenRegister} />
          )}

          {activePage === 'applications' && (
            <ApplicationsPage
              applications={applications}
              stats={applicationStats}
              isRefreshing={isRefreshing}
              onDeleteApplication={handleDeleteApplication}
              onUpdateStatus={handleUpdateStatus}
              onRefresh={fetchApplications}
              onOpenRegister={handleOpenRegister}
            />
          )}
        </div>
      </main>

      {/* Registration & Sign In Modal with Lavender Theme */}
      <StudentAuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTab={modalTab}
        onApplicationSuccess={handleApplicationSuccess}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Interactive Official WhatsApp Admissions Chat Modal */}
      <WhatsAppChatModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
      />

      {/* Floating WhatsApp Quick-Connect Widget */}
      <button
        type="button"
        onClick={() => setIsWhatsAppModalOpen(true)}
        title="Chat with SPHERONIX Admissions on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] text-white shadow-[0_6px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_10px_35px_rgba(37,211,102,0.65)] hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>
        <svg className="w-5 h-5 fill-white flex-shrink-0" viewBox="0 0 24 24">
          <path d="M12.031 2c-5.508 0-9.984 4.477-9.984 9.984 0 1.761.458 3.481 1.33 5.002L2 22l5.163-1.354c1.464.799 3.111 1.22 4.868 1.22 5.508 0 9.984-4.477 9.984-9.984C22.015 6.477 17.539 2 12.031 2zm0 18.291c-1.503 0-2.977-.406-4.265-1.173l-.306-.182-3.167.831.846-3.087-.199-.317c-.841-1.341-1.286-2.903-1.286-4.512 0-4.573 3.721-8.294 8.294-8.294 4.573 0 8.294 3.721 8.294 8.294 0 4.573-3.721 8.294-8.294 8.294zm4.545-6.208c-.249-.125-1.474-.727-1.702-.81-.229-.083-.395-.125-.562.125-.166.249-.645.81-.79 1-.146.187-.291.208-.541.083-.249-.125-1.054-.388-2.008-1.238-.742-.662-1.243-1.48-1.389-1.729-.146-.249-.016-.384.109-.508.112-.112.249-.291.374-.437.125-.146.166-.249.249-.416.083-.166.042-.312-.021-.437-.062-.125-.562-1.353-.77-1.853-.203-.487-.41-.421-.562-.429-.146-.008-.312-.01-.479-.01-.166 0-.437.062-.666.312-.229.249-.874.854-.874 2.083 0 1.229.895 2.416 1.02 2.583.125.166 1.761 2.689 4.267 3.771.596.257 1.061.411 1.424.527.599.191 1.144.164 1.575.1 4.8-.072 1.474-.604 1.682-1.187.208-.583.208-1.083.146-1.187-.062-.104-.229-.166-.479-.291z"/>
        </svg>
        <span className="text-xs font-bold hidden sm:inline tracking-tight">Chat on WhatsApp</span>
      </button>

      <Footer />
    </div>
  );
}
