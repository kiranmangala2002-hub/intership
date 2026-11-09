import express from 'express';
import {
  getApplications,
  getApplicationStats,
  getApplicationById,
  lookupApplication,
  createApplication,
  deleteApplication,
  updateApplicationStatus,
} from '../controllers/applicationController.js';
import {
  registerStudent,
  loginStudent,
  getMe,
} from '../controllers/authController.js';
import {
  getDomains,
  getDomainById,
} from '../controllers/domainController.js';
import {
  submitInquiry,
  getInquiries,
} from '../controllers/inquiryController.js';
import {
  getWhatsAppConfig,
  submitWhatsAppInquiry,
  getWhatsAppLogs,
  verifyWebhook,
  handleWebhook,
} from '../controllers/whatsappController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import mongoose from 'mongoose';

const router = express.Router();

// System Health Check Endpoint
router.get('/health', (req, res) => {
  const isMongo = mongoose.connection.readyState === 1;
  res.status(200).json({
    success: true,
    message: 'SPHERONIX Technologies Corporate Internship Backend API is fully operational!',
    server: {
      uptimeSeconds: Math.floor(process.uptime()),
      environment: process.env.NODE_ENV || 'development',
      storageEngine: isMongo ? 'MongoDB (Cloud / Local)' : 'File-based JSON Persistence Engine (Auto-sync)',
      nodeVersion: process.version,
    },
    company: 'SPHERONIX Technologies Pvt. Ltd',
    timestamp: new Date().toISOString(),
  });
});

// Flagship Domains Routes
router.get('/domains', getDomains);
router.get('/domains/:id', getDomainById);

// Authentication Routes
router.post('/auth/register', registerStudent);
router.post('/auth/login', loginStudent);
router.get('/auth/me', authenticateToken, getMe);

// Student Internship Applications CRUD & Live Metrics
router.get('/applications/stats', getApplicationStats);
router.get('/applications/lookup/:identifier', lookupApplication);
router.route('/applications')
  .get(getApplications)
  .post(createApplication);

router.route('/applications/:id')
  .get(getApplicationById)
  .delete(deleteApplication);

router.patch('/applications/:id/status', updateApplicationStatus);

// Inquiries Routes
router.route('/inquiries')
  .get(getInquiries)
  .post(submitInquiry);

// WhatsApp Corporate Admissions & Messaging Routes
router.get('/whatsapp/config', getWhatsAppConfig);
router.post('/whatsapp/inquiry', submitWhatsAppInquiry);
router.get('/whatsapp/logs', getWhatsAppLogs);
router.route('/whatsapp/webhook')
  .get(verifyWebhook)
  .post(handleWebhook);

export default router;
