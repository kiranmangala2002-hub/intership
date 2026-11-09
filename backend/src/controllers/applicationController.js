import { ApplicationModel } from '../models/Application.js';
import { WhatsAppModel } from '../models/WhatsApp.js';

// @desc    Get all internship applications
// @route   GET /api/applications
export const getApplications = async (req, res, next) => {
  try {
    const { status, domain, search } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (domain) filter.domain = domain;
    if (search) filter.search = search;

    const apps = await ApplicationModel.find(filter);
    return res.status(200).json({
      success: true,
      count: apps.length,
      data: apps,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get live application counts and cohort metrics for ApplicationsPage
// @route   GET /api/applications/stats
export const getApplicationStats = async (req, res, next) => {
  try {
    const metrics = await ApplicationModel.getMetrics();
    return res.status(200).json({
      success: true,
      data: metrics,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single application by ID
// @route   GET /api/applications/:id
export const getApplicationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const app = await ApplicationModel.findById(id);

    if (!app) {
      return res.status(404).json({
        success: false,
        message: 'Application not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: app,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Lookup application status by Application ID or Student Email
// @route   GET /api/applications/lookup/:identifier
export const lookupApplication = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    if (!identifier || !identifier.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an Application ID or registered email address.',
      });
    }

    const cleanQuery = identifier.trim().toLowerCase();
    const allApps = await ApplicationModel.find();
    const match = allApps.find(
      (a) =>
        (a.applicationId && a.applicationId.toLowerCase() === cleanQuery) ||
        (a.email && a.email.toLowerCase() === cleanQuery) ||
        a._id === identifier ||
        a.id === identifier
    );

    if (!match) {
      return res.status(404).json({
        success: false,
        message: `No application found matching "${identifier}". Please verify your Application ID or Email.`,
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        applicationId: match.applicationId,
        name: match.name,
        domain: match.domain,
        collegeName: match.collegeName,
        passoutYear: match.passoutYear,
        status: match.status || 'Submitted',
        resumeName: match.resumeName,
        createdAt: match.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Register / Submit Internship Application
// @route   POST /api/applications
export const createApplication = async (req, res, next) => {
  try {
    const {
      name,
      contact,
      collegeName,
      passoutYear,
      email,
      domain,
      resumeName,
      photoUrl,
    } = req.body;

    // Strict validation
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide student full name.' });
    }
    if (!contact || !contact.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide contact number.' });
    }
    if (!collegeName || !collegeName.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide college/university name.' });
    }
    if (!passoutYear) {
      return res.status(400).json({ success: false, message: 'Please select passout graduation year.' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide valid student email address.' });
    }
    if (!domain || !domain.trim()) {
      return res.status(400).json({ success: false, message: 'Please choose an internship domain.' });
    }

    const newApp = await ApplicationModel.create({
      name,
      contact,
      collegeName,
      passoutYear,
      email,
      domain,
      resumeName: resumeName || 'Resume.pdf',
      photoUrl: photoUrl || '',
      status: 'Submitted',
    });

    // Automatically generate WhatsApp application confirmation alert
    let waAlert = null;
    try {
      waAlert = WhatsAppModel.createApplicationAlert(newApp);
    } catch (e) {
      console.error('WhatsApp confirmation alert error:', e.message);
    }

    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully to SPHERONIX Corporate Review Board!',
      data: newApp,
      whatsapp: waAlert ? {
        chatUrl: waAlert.chatUrl,
        alertMessage: waAlert.alertMessage,
      } : null,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Withdraw / Delete application
// @route   DELETE /api/applications/:id
export const deleteApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await ApplicationModel.deleteById(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Application not found or already withdrawn.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Application withdrawn successfully.',
      data: deleted,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update application review status
// @route   PATCH /api/applications/:id/status
export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ['Submitted', 'Under Review', 'Shortlisted', 'Interview Scheduled'];
    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${allowedStatuses.join(', ')}`,
      });
    }

    const updated = await ApplicationModel.updateStatus(id, status);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Application not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: `Application status updated to ${status}.`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};
