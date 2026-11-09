import crypto from 'crypto';
import mongoose from 'mongoose';
import { userStore } from '../config/dataStore.js';

const isMongoConnected = () => mongoose.connection.readyState === 1;

// Mongoose Schema (for MongoDB deployment)
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    contact: {
      type: String,
      trim: true,
      default: '',
    },
    collegeName: {
      type: String,
      trim: true,
      default: '',
    },
    passoutYear: {
      type: String,
      default: '2026',
    },
    role: {
      type: String,
      enum: ['student', 'admin', 'mentor'],
      default: 'student',
    },
    passwordHash: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let MongoUser;
try {
  MongoUser = mongoose.model('User', userSchema);
} catch (e) {
  MongoUser = mongoose.models.User;
}

// Password hashing utility using Node.js built-in crypto
export const hashPassword = (password, salt = null) => {
  const activeSalt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, activeSalt, 32).toString('hex');
  return { hash, salt: activeSalt };
};

export const verifyPassword = (password, storedHash, salt) => {
  const hash = crypto.scryptSync(password, salt, 32).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(storedHash, 'hex'));
};

// Simple secure token generator
export const generateToken = (user) => {
  const payload = {
    id: user._id || user.id,
    email: user.email,
    name: user.name,
    role: user.role || 'student',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
  };
  const tokenStr = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', process.env.JWT_SECRET || 'spheronix_secret_key_2026')
    .update(tokenStr)
    .digest('base64url');
  return `${tokenStr}.${signature}`;
};

export const verifyToken = (token) => {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [tokenStr, signature] = parts;
  const expectedSignature = crypto.createHmac('sha256', process.env.JWT_SECRET || 'spheronix_secret_key_2026')
    .update(tokenStr)
    .digest('base64url');

  if (signature !== expectedSignature) return null;

  try {
    const payload = JSON.parse(Buffer.from(tokenStr, 'base64url').toString('utf8'));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }
    return payload;
  } catch (err) {
    return null;
  }
};

// Unified User Operations (Dual-engine: Mongo + File Persistence)
export const UserModel = {
  async findByEmail(email) {
    const normalizedEmail = email.toLowerCase().trim();
    if (isMongoConnected()) {
      return await MongoUser.findOne({ email: normalizedEmail });
    }
    const users = userStore.read();
    return users.find((u) => u.email.toLowerCase() === normalizedEmail) || null;
  },

  async findById(id) {
    if (isMongoConnected()) {
      return await MongoUser.findById(id);
    }
    const users = userStore.read();
    return users.find((u) => u.id === id || u._id === id) || null;
  },

  async create(userData) {
    const { name, email, password, contact, collegeName, passoutYear, role = 'student' } = userData;
    const { hash, salt } = hashPassword(password);

    if (isMongoConnected()) {
      return await MongoUser.create({
        name,
        email: email.toLowerCase().trim(),
        contact: contact || '',
        collegeName: collegeName || '',
        passoutYear: passoutYear || '2026',
        role,
        passwordHash: hash,
        salt,
      });
    }

    const users = userStore.read();
    const newUser = {
      _id: 'user-' + Date.now(),
      id: 'user-' + Date.now(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      contact: contact || '',
      collegeName: collegeName || '',
      passoutYear: passoutYear || '2026',
      role,
      passwordHash: hash,
      salt,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    userStore.write(users);
    return newUser;
  },
};

export default MongoUser;

