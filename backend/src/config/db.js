import mongoose from 'mongoose';
import { syncApplicationsToMongo } from '../scripts/syncMongo.js';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('ℹ️  No MONGODB_URI specified in .env. Running with in-memory storage fallback.');
    return;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    // Auto-sync applications from JSON cache to MongoDB Atlas
    syncApplicationsToMongo().catch((err) => {
      console.warn('⚠️ Auto-sync warning:', err.message);
    });
  } catch (error) {
    console.warn(`⚠️  MongoDB Connection Warning: ${error.message}`);
    console.warn('👉 Defaulting to in-memory store for demonstration.');
  }
};
