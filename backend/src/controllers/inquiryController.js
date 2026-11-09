import { InquiryModel } from '../models/Inquiry.js';

// @desc    Submit student/corporate inquiry
// @route   POST /api/inquiries
export const submitInquiry = async (req, res, next) => {
  try {
    const { name, email, phone, subject, domain, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email address and your query message.',
      });
    }

    const newInquiry = await InquiryModel.create({
      name,
      email,
      phone,
      subject,
      domain,
      message,
    });

    return res.status(201).json({
      success: true,
      message: 'Your query has been submitted to SPHERONIX Senior Mentors! We will reach out to your email shortly.',
      data: newInquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all inquiries (admin)
// @route   GET /api/inquiries
export const getInquiries = async (req, res, next) => {
  try {
    const inquiries = await InquiryModel.findAll();
    return res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    next(error);
  }
};
