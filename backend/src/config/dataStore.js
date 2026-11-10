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

// Initial seed data for Applications (Telugu States & Anantapur District Colleges)
const SEED_APPLICATIONS = [
  {
    _id: 'app-seed-001',
    id: 'app-seed-001',
    applicationId: 'SPH-2026-8841',
    name: 'P. Charan Kumar',
    contact: '+91 9876543210',
    collegeName: 'PVKK Institute of Technology (PVKKIT), Anantapur',
    passoutYear: '2025',
    email: 'charan.kumar@example.com',
    domain: 'AI Integrated Full Stack Development',
    resumeName: 'Charan_Kumar_PVKK_Resume.pdf',
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
    collegeName: 'Anantha Lakshmi Institute of Technology & Sciences (ALITS), Anantapur',
    passoutYear: '2026',
    email: 'navya.sree@example.com',
    domain: 'Embedded Systems & IoT',
    resumeName: 'Navya_Sree_ALITS_IoT_CV.pdf',
    photoUrl: '',
    status: 'Under Review',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
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
