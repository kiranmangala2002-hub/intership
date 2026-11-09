import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('ℹ️  No MONGODB_URI specified in .env. Running with in-memory storage fallback.');
    return;
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️  MongoDB Connection Warning: ${error.message}`);
    console.warn('👉 Defaulting to in-memory store for demonstration.');
  }
};

