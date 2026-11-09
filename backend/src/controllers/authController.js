import { UserModel, verifyPassword, generateToken } from '../models/User.js';

// @desc    Register new student account
// @route   POST /api/auth/register
export const registerStudent = async (req, res, next) => {
  try {
    const { name, email, password, contact, collegeName, passoutYear } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required for student registration.',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.',
      });
    }

    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email address already exists. Please sign in.',
      });
    }

    const newUser = await UserModel.create({
      name,
      email,
      password,
      contact: contact || '',
      collegeName: collegeName || '',
      passoutYear: passoutYear || '2026',
      role: 'student',
    });

    const token = generateToken(newUser);

    return res.status(201).json({
      success: true,
      message: 'Student account created successfully!',
      token,
      user: {
        id: newUser._id || newUser.id,
        name: newUser.name,
        email: newUser.email,
        contact: newUser.contact,
        collegeName: newUser.collegeName,
        passoutYear: newUser.passoutYear,
        role: newUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Sign in existing student
// @route   POST /api/auth/login
export const loginStudent = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email address and password.',
      });
    }

    const user = await UserModel.findByEmail(email);
    if (!user) {
      // Automatic seamless onboarding for student portal demo:
      // If student enters any valid email & password, create demo session!
      const autoUser = await UserModel.create({
        name: email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        email,
        password,
        role: 'student',
      });

      const token = generateToken(autoUser);
      return res.status(200).json({
        success: true,
        message: 'Student signed in successfully!',
        token,
        user: {
          id: autoUser._id || autoUser.id,
          name: autoUser.name,
          email: autoUser.email,
          role: autoUser.role,
        },
      });
    }

    // Verify password if user has hash and salt
    if (user.passwordHash && user.salt) {
      const isMatch = verifyPassword(password, user.passwordHash, user.salt);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid password. Please check your credentials and try again.',
        });
      }
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: 'Student signed in successfully!',
      token,
      user: {
        id: user._id || user.id,
        name: user.name,
        email: user.email,
        contact: user.contact || '',
        collegeName: user.collegeName || '',
        passoutYear: user.passoutYear || '2026',
        role: user.role || 'student',
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get currently authenticated student profile
// @route   GET /api/auth/me
export const getMe = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

