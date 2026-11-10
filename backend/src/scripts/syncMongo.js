import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const applicationSchema = new mongoose.Schema(
  {
    applicationId: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    contact: { type: String, required: true },
    collegeName: { type: String, required: true },
    passoutYear: { type: String, required: true },
    email: { type: String, required: true },
    domain: { type: String, required: true },
    resumeName: { type: String, default: 'Uploaded_Resume.pdf' },
    photoUrl: { type: String, default: '' },
    status: { type: String, default: 'Submitted' },
  },
  { timestamps: true }
);

const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);

export async function syncApplicationsToMongo() {
  const jsonPath = path.resolve(__dirname, '../../data/applications.json');
  if (!fs.existsSync(jsonPath)) {
    console.log('No applications.json found.');
    return 0;
  }

  const rawData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  console.log(`Synchronizing ${rawData.length} Telugu student applications with Anantapur district colleges to MongoDB...`);

  // Remove any legacy placeholder records from MongoDB that do not match the valid IDs
  const validIds = rawData.map((d) => d.applicationId);
  const deleteResult = await Application.deleteMany({ applicationId: { $nin: validIds } });
  if (deleteResult.deletedCount > 0) {
    console.log(`Cleaned up ${deleteResult.deletedCount} legacy records from MongoDB.`);
  }

  let synced = 0;
  for (const item of rawData) {
    await Application.findOneAndUpdate(
      { applicationId: item.applicationId },
      {
        applicationId: item.applicationId,
        name: item.name,
        contact: item.contact,
        collegeName: item.collegeName,
        passoutYear: item.passoutYear,
        email: item.email,
        domain: item.domain,
        resumeName: item.resumeName,
        photoUrl: item.photoUrl,
        status: item.status || 'Submitted',
        createdAt: item.createdAt ? new Date(item.createdAt) : new Date(),
        updatedAt: new Date(),
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log(`✅ Synced to MongoDB: ${item.applicationId} - ${item.name} (${item.collegeName})`);
    synced++;
  }

  const total = await Application.countDocuments();
  console.log(`MongoDB sync complete. Synced: ${synced}, Total in MongoDB: ${total}`);
  return total;
}

// If run directly via CLI
if (process.argv[1] && process.argv[1].endsWith('syncMongo.js')) {
  mongoose
    .connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 })
    .then(async () => {
      console.log('Connected to MongoDB Atlas.');
      await syncApplicationsToMongo();
      await mongoose.disconnect();
      console.log('Disconnected.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('MongoDB sync error:', err.message);
      process.exit(1);
    });
}
