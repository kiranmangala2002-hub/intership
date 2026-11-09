import { whatsappStore } from '../config/dataStore.js';

// Default SPHERONIX Corporate WhatsApp Credentials
const DEFAULT_WHATSAPP_NUMBER = '919876543210'; // +91 98765 43210
const DESK_NAME = 'SPHERONIX Technologies Corporate Admissions Desk';

export const WhatsAppModel = {
  // Returns live configuration and operational hours
  getConfig() {
    const rawNumber = process.env.WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER;
    const cleanNumber = rawNumber.replace(/[^0-9]/g, '');

    return {
      deskName: DESK_NAME,
      phoneNumber: rawNumber,
      cleanNumber,
      status: 'online',
      supportHours: 'Monday – Saturday: 9:00 AM – 7:30 PM IST',
      averageResponseTime: '< 15 Minutes',
      topics: [
        { id: 'admissions', label: 'Admissions & Eligibility (2026 Cohort)' },
        { id: 'syllabus', label: 'Detailed 6-Month Syllabus & Curriculum' },
        { id: 'stipend', label: 'Stipend Verification & Bank Payouts' },
        { id: 'status', label: 'Application Status Verification' },
        { id: 'custom', label: 'Direct Speak with Academic Advisor' },
      ],
      defaultMessage: 'Hi SPHERONIX Team, I am interested in Corporate Internships & Training Cohort 2026.',
    };
  },

  // Generates official click-to-chat URL
  buildChatUrl(customMessage = null) {
    const config = this.getConfig();
    const text = customMessage || config.defaultMessage;
    return `https://wa.me/${config.cleanNumber}?text=${encodeURIComponent(text)}`;
  },

  // Records an incoming student inquiry and returns direct WhatsApp chat link
  createInquiry(data) {
    const config = this.getConfig();
    const { name, contact, domain, topic, message } = data;

    // Structured corporate admissions message
    let formattedText = `*SPHERONIX Corporate Internship Inquiry*\n`;
    if (name) formattedText += `• *Applicant Name:* ${name.trim()}\n`;
    if (contact) formattedText += `• *Student Contact:* ${contact.trim()}\n`;
    if (domain) formattedText += `• *Chosen Domain:* ${domain}\n`;
    if (topic) formattedText += `• *Subject/Topic:* ${topic}\n`;
    if (message) formattedText += `• *Message:* ${message.trim()}\n`;
    formattedText += `\nHello Admissions Team, please assist me regarding the above inquiry.`;

    const chatUrl = `https://wa.me/${config.cleanNumber}?text=${encodeURIComponent(formattedText)}`;

    const logEntry = {
      id: 'wa-' + Date.now(),
      type: 'inquiry',
      applicantName: name ? name.trim() : 'Anonymous Candidate',
      contact: contact ? contact.trim() : '',
      domain: domain || 'General Corporate Program',
      topic: topic || 'General Inquiry',
      message: message ? message.trim() : '',
      chatUrl,
      status: 'initiated',
      createdAt: new Date().toISOString(),
    };

    const logs = whatsappStore.read();
    logs.unshift(logEntry);
    whatsappStore.write(logs);

    return {
      success: true,
      inquiryId: logEntry.id,
      chatUrl,
      formattedText,
    };
  },

  // Dispatches an automated confirmation notification record when a new application is submitted
  createApplicationAlert(application) {
    const config = this.getConfig();
    const { applicationId, name, domain, email, contact } = application;

    const alertMessage = 
      `*SPHERONIX Corporate Internships & Training*\n` +
      `Hello ${name},\n\n` +
      `Your application has been received by SPHERONIX Corporate Review Board:\n` +
      `• *Application ID:* ${applicationId}\n` +
      `• *Domain Track:* ${domain}\n` +
      `• *Cohort:* 2026 Corporate Batch\n` +
      `• *Status:* Submitted (Under HR & Technical Screening)\n\n` +
      `You can check your status on the portal anytime using ID: *${applicationId}*.`;

    const studentCleanContact = contact ? contact.replace(/[^0-9]/g, '') : '';
    const studentChatUrl = studentCleanContact
      ? `https://wa.me/${studentCleanContact}?text=${encodeURIComponent(alertMessage)}`
      : `https://wa.me/${config.cleanNumber}?text=${encodeURIComponent(alertMessage)}`;

    const logEntry = {
      id: 'wa-alert-' + Date.now(),
      type: 'application_confirmation',
      applicationId,
      applicantName: name,
      email,
      contact,
      domain,
      alertMessage,
      chatUrl: studentChatUrl,
      status: 'queued',
      createdAt: new Date().toISOString(),
    };

    const logs = whatsappStore.read();
    logs.unshift(logEntry);
    whatsappStore.write(logs);

    return logEntry;
  },

  // Returns all logs for monitoring
  findAllLogs() {
    return whatsappStore.read();
  },
};

export default WhatsAppModel;

