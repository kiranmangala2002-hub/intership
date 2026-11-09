import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load .env from backend root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas (or fallback to DataStore)
connectDB();

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Backend server is running at http://localhost:${PORT}`);
  console.log(`🔗 Health check available at http://localhost:${PORT}/api/health`);
});
