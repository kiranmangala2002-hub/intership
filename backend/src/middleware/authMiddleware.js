import { verifyToken, UserModel } from '../models/User.js';

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No authorization token provided.',
    });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired authentication token. Please sign in again.',
    });
  }

  try {
    const user = await UserModel.findById(payload.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Authenticated user account no longer exists.',
      });
    }

    req.user = {
      id: user._id || user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      collegeName: user.collegeName,
    };
    next();
  } catch (error) {
    next(error);
  }
};

