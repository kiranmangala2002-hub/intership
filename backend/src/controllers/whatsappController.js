import { WhatsAppModel } from '../models/WhatsApp.js';

// @desc    Get WhatsApp admissions desk configuration & topics
// @route   GET /api/whatsapp/config
export const getWhatsAppConfig = (req, res, next) => {
  try {
    const config = WhatsAppModel.getConfig();
    const chatUrl = WhatsAppModel.buildChatUrl();

    return res.status(200).json({
      success: true,
      data: {
        ...config,
        chatUrl,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit student WhatsApp inquiry & generate structured WhatsApp link
// @route   POST /api/whatsapp/inquiry
export const submitWhatsAppInquiry = (req, res, next) => {
  try {
    const { name, contact, domain, topic, message } = req.body;

    const result = WhatsAppModel.createInquiry({
      name,
      contact,
      domain,
      topic,
      message,
    });

    return res.status(201).json({
      success: true,
      message: 'WhatsApp inquiry initiated successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all WhatsApp interaction and alert logs (Admin)
// @route   GET /api/whatsapp/logs
export const getWhatsAppLogs = (req, res, next) => {
  try {
    const logs = WhatsAppModel.findAllLogs();
    return res.status(200).json({
      success: true,
      count: logs.length,
      data: logs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify Meta WhatsApp Cloud API Webhook
// @route   GET /api/whatsapp/webhook
export const verifyWebhook = (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'spheronix_whatsapp_webhook_token';

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('✅ WhatsApp Webhook verified successfully');
    return res.status(200).send(challenge);
  } else {
    return res.sendStatus(403);
  }
};

// @desc    Handle incoming WhatsApp Webhook events
// @route   POST /api/whatsapp/webhook
export const handleWebhook = (req, res) => {
  const body = req.body;

  if (body.object) {
    console.log('📩 Incoming WhatsApp Webhook event:', JSON.stringify(body, null, 2));
    return res.status(200).send('EVENT_RECEIVED');
  } else {
    return res.sendStatus(404);
  }
};

