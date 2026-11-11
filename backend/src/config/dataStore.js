import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../../data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial seed data for Applications (Rayalaseema Region Colleges)
const SEED_APPLICATIONS = [
  {
    _id: 'app-1794217722455',
    id: 'app-1794217722455',
    applicationId: 'SPH-2026-6800',
    name: 'K. Sai Teja Reddy',
    contact: '+91 9776655443',
    collegeName: 'Sri Venkateswara University College of Engineering (SVUCE), Tirupati',
    passoutYear: '2026',
    email: 'saiteja.reddy@example.com',
    domain: 'AI Integrated Full Stack Development',
    resumeName: 'SaiTeja_Reddy_SVUCE_FSD.pdf',
    photoUrl: '',
    status: 'Shortlisted',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    _id: 'app-1794037584528',
    id: 'app-1794037584528',
    applicationId: 'SPH-2026-3194',
    name: 'M. Harika Chowdary',
    contact: '+91 9888877777',
    collegeName: 'G. Pulla Reddy Engineering College (GPREC), Kurnool',
    passoutYear: '2026',
    email: 'harika.chowdary@example.com',
    domain: 'Embedded Systems & IoT',
    resumeName: 'Harika_Chowdary_GPREC_IoT.pdf',
    photoUrl: '',
    status: 'Submitted',
    createdAt: new Date(Date.now() - 86400000 * 2.5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2.5).toISOString(),
  },
  {
    _id: 'app-1793967165671',
    id: 'app-1793967165671',
    applicationId: 'SPH-2026-3462',
    name: 'B. Dinesh Naidu',
    contact: '+91 9123456789',
    collegeName: 'Rajeev Gandhi Memorial College of Engineering & Technology (RGMCET), Nandyal',
    passoutYear: '2026',
    email: 'dinesh.naidu@example.com',
    domain: 'AI Integrated Full Stack Development',
    resumeName: 'Dinesh_Naidu_RGMCET_CV.pdf',
    photoUrl: '',
    status: 'Submitted',
    createdAt: new Date(Date.now() - 86400000 * 2.2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2.2).toISOString(),
  },
  {
    _id: 'app-seed-001',
    id: 'app-seed-001',
    applicationId: 'SPH-2026-8841',
    name: 'P. Charan Kumar',
    contact: '+91 9876543210',
    collegeName: 'Madanapalle Institute of Technology & Science (MITS), Chittoor Dist',
    passoutYear: '2025',
    email: 'charan.kumar@example.com',
    domain: 'AI Integrated Full Stack Development',
    resumeName: 'Charan_Kumar_MITS_Resume.pdf',
    photoUrl: '',
    status: 'Shortlisted',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    _id: 'app-seed-002',
    id: 'app-seed-002',
    applicationId: 'SPH-2026-9214',
    name: 'S. Navya Sree',
    contact: '+91 9811223344',
    collegeName: 'K.S.R.M. College of Engineering (KSRMCE), Kadapa',
    passoutYear: '2026',
    email: 'navya.sree@example.com',
    domain: 'Embedded Systems & IoT',
    resumeName: 'Navya_Sree_KSRM_IoT_CV.pdf',
    photoUrl: '',
    status: 'Under Review',
    createdAt: new Date(Date.now() - 86400000 * 1.8).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1.8).toISOString(),
  },
  {
    _id: 'app-seed-003',
    id: 'app-seed-003',
    applicationId: 'SPH-2026-4521',
    name: 'V. Bhavani Prasad',
    contact: '+91 9440112233',
    collegeName: 'Sree Vidyanikethan Engineering College, Tirupati',
    passoutYear: '2026',
    email: 'bhavani.prasad@example.com',
    domain: 'Embedded Systems & IoT',
    resumeName: 'Bhavani_Prasad_SVEC_IoT.pdf',
    photoUrl: '',
    status: 'Shortlisted',
    createdAt: new Date(Date.now() - 86400000 * 1.5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1.5).toISOString(),
  },
  {
    _id: 'app-seed-004',
    id: 'app-seed-004',
    applicationId: 'SPH-2026-7832',
    name: 'G. Vamsi Krishna',
    contact: '+91 9848123456',
    collegeName: 'YSR Engineering College of Yogi Vemana University, Proddatur, Kadapa Dist',
    passoutYear: '2026',
    email: 'vamsi.krishna@example.com',
    domain: 'AI Integrated Full Stack Development',
    resumeName: 'Vamsi_Krishna_YSREC_FSD.pdf',
    photoUrl: '',
    status: 'Under Review',
    createdAt: new Date(Date.now() - 86400000 * 1.3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1.3).toISOString(),
  },
  {
    _id: 'app-seed-005',
    id: 'app-seed-005',
    applicationId: 'SPH-2026-2910',
    name: 'K. Manoj Kumar',
    contact: '+91 9618055443',
    collegeName: 'G. Pullaiah College of Engineering and Technology (GPCET), Kurnool',
    passoutYear: '2025',
    email: 'manoj.kumar@example.com',
    domain: 'Embedded Systems & IoT',
    resumeName: 'Manoj_Kumar_GPCET_IoT.pdf',
    photoUrl: '',
    status: 'Submitted',
    createdAt: new Date(Date.now() - 86400000 * 1.1).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1.1).toISOString(),
  },
  {
    _id: 'app-seed-006',
    id: 'app-seed-006',
    applicationId: 'SPH-2026-5394',
    name: 'T. Sneha Latha',
    contact: '+91 9390234567',
    collegeName: 'Sri Venkateswara College of Engineering and Technology (SVCET), Chittoor',
    passoutYear: '2026',
    email: 'sneha.latha@example.com',
    domain: 'AI Integrated Full Stack Development',
    resumeName: 'Sneha_Latha_SVCET_FSD.pdf',
    photoUrl: '',
    status: 'Shortlisted',
    createdAt: new Date(Date.now() - 86400000 * 0.9).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 0.9).toISOString(),
  },
  {
    _id: 'app-seed-007',
    id: 'app-seed-007',
    applicationId: 'SPH-2026-8173',
    name: 'N. Tharun Reddy',
    contact: '+91 9701345678',
    collegeName: 'Annamacharya Institute of Technology & Sciences (AITS), Rajampet, Kadapa Dist',
    passoutYear: '2026',
    email: 'tharun.reddy@example.com',
    domain: 'Embedded Systems & IoT',
    resumeName: 'Tharun_Reddy_AITS_IoT.pdf',
    photoUrl: '',
    status: 'Under Review',
    createdAt: new Date(Date.now() - 86400000 * 0.7).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 0.7).toISOString(),
  },
  {
    _id: 'app-seed-008',
    id: 'app-seed-008',
    applicationId: 'SPH-2026-1648',
    name: 'R. Rohith Varma',
    contact: '+91 9177456789',
    collegeName: 'Santhiram Engineering College (SREC), Nandyal',
    passoutYear: '2025',
    email: 'rohith.varma@example.com',
    domain: 'AI Integrated Full Stack Development',
    resumeName: 'Rohith_Varma_SREC_FSD.pdf',
    photoUrl: '',
    status: 'Submitted',
    createdAt: new Date(Date.now() - 86400000 * 0.5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 0.5).toISOString(),
  },
  {
    _id: 'app-seed-009',
    id: 'app-seed-009',
    applicationId: 'SPH-2026-6290',
    name: 'A. Deepthi Naidu',
    contact: '+91 9959567890',
    collegeName: 'Sri Venkateswara University College of Engineering (SVUCE), Tirupati',
    passoutYear: '2026',
    email: 'deepthi.naidu@example.com',
    domain: 'Embedded Systems & IoT',
    resumeName: 'Deepthi_Naidu_SVUCE_IoT.pdf',
    photoUrl: '',
    status: 'Shortlisted',
    createdAt: new Date(Date.now() - 86400000 * 0.3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 0.3).toISOString(),
  },
  {
    _id: 'app-seed-010',
    id: 'app-seed-010',
    applicationId: 'SPH-2026-3782',
    name: 'C. Hemanth Kumar',
    contact: '+91 9849678901',
    collegeName: 'G. Pulla Reddy Engineering College (GPREC), Kurnool',
    passoutYear: '2026',
    email: 'hemanth.kumar@example.com',
    domain: 'AI Integrated Full Stack Development',
    resumeName: 'Hemanth_Kumar_GPREC_FSD.pdf',
    photoUrl: '',
    status: 'Submitted',
    createdAt: new Date(Date.now() - 86400000 * 0.2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 0.2).toISOString(),
  },
  {
    _id: 'app-seed-011',
    id: 'app-seed-011',
    applicationId: 'SPH-2026-9145',
    name: 'K. Anusha Reddy',
    contact: '+91 9652789012',
    collegeName: 'Madanapalle Institute of Technology & Science (MITS), Chittoor Dist',
    passoutYear: '2026',
    email: 'anusha.reddy@example.com',
    domain: 'Embedded Systems & IoT',
    resumeName: 'Anusha_Reddy_MITS_IoT.pdf',
    photoUrl: '',
    status: 'Shortlisted',
    createdAt: new Date(Date.now() - 86400000 * 0.1).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 0.1).toISOString(),
  },
];

// Initial seed data for Flagship Domains
const SEED_DOMAINS = [
  {
    id: 'fullstack-dev',
    title: 'AI Integrated Full Stack Development',
    category: 'Software Engineering',
    duration: '4 - 6 Months',
    stipend: '₹25,000 - ₹40,000/mo',
    stipendMin: 25000,
    stipendMax: 40000,
    icon: '💻',
    featured: true,
    description:
      'Master modern enterprise web engineering with Next.js, React, Node.js microservices, distributed cloud backends, and autonomous Generative AI agents.',
    skills: ['Next.js 15', 'React 19', 'Node.js', 'PostgreSQL', 'Docker', 'LangChain', 'Tailwind CSS', 'Redis'],
    highlights: [
      'Production-grade microservices architecture',
      'AI-augmented development & autonomous agent integration',
      'High-throughput real-time WebSocket pipelines',
      'Direct technical mentorship from principal architects',
    ],
    curriculum: [
      'Modern TypeScript & Advanced Component Architecture',
      'High-Concurrency Node.js, Express & Microservices',
      'Database Design, PostgreSQL, Prisma & Redis Caching',
      'Docker Containerization, CI/CD & Cloud Deployment',
      'Generative AI Agents, LLM Fine-Tuning & Vector Databases',
    ],
  },
  {
    id: 'embedded-iot',
    title: 'Embedded Systems & IoT',
    category: 'Hardware & IoT Engineering',
    duration: '3 - 6 Months',
    stipend: '₹22,000 - ₹38,000/mo',
    stipendMin: 22000,
    stipendMax: 38000,
    icon: '⚡',
    featured: true,
    description:
      'Design mission-critical IoT devices, real-time firmware in Embedded C/C++, ARM Cortex microcontrollers, wireless communication protocols, and Edge AI integration.',
    skills: ['Embedded C/C++', 'ARM Cortex-M', 'FreeRTOS', 'ESP32 / STM32', 'MQTT / BLE / Zigbee', 'Edge AI', 'PCB Design', 'Hardware Debugging'],
    highlights: [
      'Hands-on ARM Cortex & STM32 hardware prototyping',
      'Real-time operating system (FreeRTOS) multithreading',
      'Secure telemetry transmission over MQTT, BLE & LoRaWAN',
      'Direct testing on industrial-grade IoT hardware labs',
    ],
    curriculum: [
      'Low-Level Embedded C Programming & Peripheral Interfacing',
      'Microcontroller Architecture: ARM Cortex-M & STM32',
      'Real-Time Operating Systems (FreeRTOS) Kernel Concepts',
      'Wireless IoT Protocols: MQTT, CoAP, BLE, LoRaWAN',
      'Edge AI Inference on Microcontrollers & Sensor Fusion',
    ],
  },
];

// Seed Student User
const SEED_USERS = [
  {
    id: 'user-seed-001',
    name: 'Demo Student',
    email: 'student@spheronix.com',
    role: 'student',
    collegeName: 'SPHERONIX Institute of Technology',
    // Hash for 'Spheronix@2026'
    passwordHash: 'f85ff052324d445d70f653d2b580c36c381ec3a1d1ef972d8bb46e1650c7552f',
    salt: 'spheronix_salt_2026',
    createdAt: new Date().toISOString(),
  },
];

class JsonStore {
  constructor(filename, defaultData = []) {
    this.filePath = path.join(DATA_DIR, filename);
    this.defaultData = defaultData;
    this.init();
  }

  init() {
    try {
      if (!fs.existsSync(this.filePath)) {
        this.write(this.defaultData);
      }
    } catch (err) {
      console.error(`Error initializing ${this.filePath}:`, err.message);
    }
  }

  read() {
    try {
      if (!fs.existsSync(this.filePath)) {
        return this.defaultData;
      }
      const raw = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(raw);
    } catch (err) {
      console.error(`Error reading ${this.filePath}:`, err.message);
      return this.defaultData;
    }
  }

  write(data) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
      return true;
    } catch (err) {
      console.error(`Error writing ${this.filePath}:`, err.message);
      return false;
    }
  }
}

export const applicationStore = new JsonStore('applications.json', SEED_APPLICATIONS);
export const domainStore = new JsonStore('domains.json', SEED_DOMAINS);
export const userStore = new JsonStore('users.json', SEED_USERS);
export const inquiryStore = new JsonStore('inquiries.json', []);
export const whatsappStore = new JsonStore('whatsapp_logs.json', []);

export default {
  applicationStore,
  domainStore,
  userStore,
  inquiryStore,
  whatsappStore,
};
