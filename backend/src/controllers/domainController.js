import { DomainModel } from '../models/Domain.js';

// @desc    Get all flagship corporate internship domains
// @route   GET /api/domains
export const getDomains = async (req, res, next) => {
  try {
    const domains = DomainModel.findAll();
    return res.status(200).json({
      success: true,
      count: domains.length,
      data: domains,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single domain details by ID
// @route   GET /api/domains/:id
export const getDomainById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const domain = DomainModel.findById(id);

    if (!domain) {
      return res.status(404).json({
        success: false,
        message: 'Internship domain not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: domain,
    });
  } catch (error) {
    next(error);
  }
};

