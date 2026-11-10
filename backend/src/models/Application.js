import mongoose from 'mongoose';
import { applicationStore } from '../config/dataStore.js';

const isMongoConnected = () => mongoose.connection.readyState === 1;

// Mongoose Schema for MongoDB
const applicationSchema = new mongoose.Schema(
  {
    applicationId: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
    },
    contact: {
      type: String,
      required: [true, 'Contact number is required'],
      trim: true,
    },
    collegeName: {
      type: String,
      required: [true, 'College name is required'],
      trim: true,
    },
    passoutYear: {
      type: String,
      required: [true, 'Passout year is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    domain: {
      type: String,
      required: [true, 'Internship domain selection is required'],
    },
    resumeName: {
      type: String,
      default: 'Uploaded_Resume.pdf',
    },
    photoUrl: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Submitted', 'Under Review', 'Shortlisted', 'Interview Scheduled'],
      default: 'Submitted',
    },
  },
  {
    timestamps: true,
  }
);

let MongoApplication;
try {
  MongoApplication = mongoose.model('Application', applicationSchema);
} catch (e) {
  MongoApplication = mongoose.models.Application;
}

// Cohort Baseline Constants: Set to 0 for minimum, genuine count of stored applications
const BASELINE_TOTAL = 0;
const BASELINE_SHORTLISTED = 0;
const BASELINE_UNDER_REVIEW = 0;
const BASELINE_SUBMITTED = 0;
const BASELINE_AI_FULLSTACK = 0;
const BASELINE_EMBEDDED_IOT = 0;

// Unified Application Operations (Dual-engine: Mongo + File Persistence)
export const ApplicationModel = {
  async find(filter = {}) {
    if (isMongoConnected()) {
      try {
        const query = {};
        if (filter.status && filter.status !== 'All') {
          query.status = filter.status;
        }
        if (filter.domain && filter.domain !== 'All') {
          query.domain = filter.domain;
        }
        if (filter.search && filter.search.trim()) {
          const regex = new RegExp(filter.search.trim(), 'i');
          query.$or = [
            { name: regex },
            { email: regex },
            { collegeName: regex },
            { applicationId: regex },
            { domain: regex },
          ];
        }
        const mongoApps = await MongoApplication.find(query).sort({ createdAt: -1 });
        if (mongoApps && mongoApps.length > 0) {
          return mongoApps;
        }
      } catch (err) {
        console.warn('⚠️ MongoDB query error, using local file store:', err.message);
      }
    }

    let apps = applicationStore.read();
    if (filter.status && filter.status !== 'All') {
      apps = apps.filter((a) => a.status === filter.status);
    }
    if (filter.domain && filter.domain !== 'All') {
      apps = apps.filter((a) => a.domain && a.domain.toLowerCase().includes(filter.domain.toLowerCase()));
    }
    if (filter.search && filter.search.trim()) {
      const q = filter.search.toLowerCase().trim();
      apps = apps.filter((a) =>
        (a.name && a.name.toLowerCase().includes(q)) ||
        (a.email && a.email.toLowerCase().includes(q)) ||
        (a.collegeName && a.collegeName.toLowerCase().includes(q)) ||
        (a.applicationId && a.applicationId.toLowerCase().includes(q)) ||
        (a.domain && a.domain.toLowerCase().includes(q))
      );
    }
    return apps.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async findById(id) {
    if (isMongoConnected()) {
      try {
        const mongoDoc = await MongoApplication.findById(id);
        if (mongoDoc) return mongoDoc;
      } catch (e) {
        // ID might not be a valid Mongo ObjectId, continue to search
      }
      try {
        const byCustom = await MongoApplication.findOne({
          $or: [{ applicationId: id }, { email: id }],
        });
        if (byCustom) return byCustom;
      } catch (e) {}
    }
    const apps = applicationStore.read();
    return apps.find((a) => a._id === id || a.id === id || a.applicationId === id) || null;
  },

  async create(data) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const applicationId = `SPH-2026-${randomSuffix}`;

    const newAppRecord = {
      _id: 'app-' + Date.now(),
      id: 'app-' + Date.now(),
      applicationId,
      name: data.name ? data.name.trim() : '',
      contact: data.contact ? data.contact.trim() : '',
      collegeName: data.collegeName ? data.collegeName.trim() : '',
      passoutYear: String(data.passoutYear || '2026'),
      email: data.email ? data.email.toLowerCase().trim() : '',
      domain: data.domain || 'AI Integrated Full Stack Development',
      resumeName: data.resumeName || 'Resume.pdf',
      photoUrl: data.photoUrl || '',
      status: data.status || 'Submitted',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // 1. ALWAYS persist to local file store (backend/data/applications.json)
    try {
      const apps = applicationStore.read();
      apps.unshift(newAppRecord);
      applicationStore.write(apps);
    } catch (err) {
      console.error('File store write error:', err.message);
    }

    // 2. Persist to MongoDB Atlas if connected
    if (isMongoConnected()) {
      try {
        const mongoDoc = await MongoApplication.create({
          applicationId,
          name: newAppRecord.name,
          contact: newAppRecord.contact,
          collegeName: newAppRecord.collegeName,
          passoutYear: newAppRecord.passoutYear,
          email: newAppRecord.email,
          domain: newAppRecord.domain,
          resumeName: newAppRecord.resumeName,
          photoUrl: newAppRecord.photoUrl,
          status: newAppRecord.status,
        });
        return mongoDoc;
      } catch (mongoErr) {
        console.error('MongoDB insert error (safely retained in JSON store):', mongoErr.message);
      }
    }

    return newAppRecord;
  },

  async deleteById(id) {
    let mongoDeleted = null;
    if (isMongoConnected()) {
      try {
        mongoDeleted = await MongoApplication.findByIdAndDelete(id);
      } catch (e) {
        // Try deleting by custom applicationId
        mongoDeleted = await MongoApplication.findOneAndDelete({ applicationId: id });
      }
    }

    const apps = applicationStore.read();
    const index = apps.findIndex((a) => a._id === id || a.id === id || a.applicationId === id);
    if (index !== -1) {
      const [deleted] = apps.splice(index, 1);
      applicationStore.write(apps);
      return mongoDeleted || deleted;
    }

    return mongoDeleted;
  },

  async updateStatus(id, newStatus) {
    let mongoUpdated = null;
    if (isMongoConnected()) {
      try {
        mongoUpdated = await MongoApplication.findByIdAndUpdate(
          id,
          { status: newStatus },
          { new: true }
        );
      } catch (e) {
        mongoUpdated = await MongoApplication.findOneAndUpdate(
          { applicationId: id },
          { status: newStatus },
          { new: true }
        );
      }
    }

    const apps = applicationStore.read();
    const app = apps.find((a) => a._id === id || a.id === id || a.applicationId === id);
    if (app) {
      app.status = newStatus;
      app.updatedAt = new Date().toISOString();
      applicationStore.write(apps);
      return mongoUpdated || app;
    }

    return mongoUpdated;
  },

  async getMetrics() {
    let liveApps = [];
    if (isMongoConnected()) {
      try {
        liveApps = await MongoApplication.find();
      } catch (e) {
        liveApps = [];
      }
    }
    if (!liveApps || liveApps.length === 0) {
      liveApps = applicationStore.read();
    }

    const liveTotal = liveApps.length;
    const liveShortlisted = liveApps.filter((a) => a.status === 'Shortlisted').length;
    const liveUnderReview = liveApps.filter((a) => a.status === 'Under Review').length;
    const liveSubmitted = liveApps.filter((a) => a.status === 'Submitted' || !a.status).length;

    const liveAiFullStack = liveApps.filter((a) =>
      a.domain && a.domain.toLowerCase().includes('full stack')
    ).length;
    const liveEmbeddedIot = liveApps.filter((a) =>
      a.domain && a.domain.toLowerCase().includes('embedded')
    ).length;

    const totalCount = BASELINE_TOTAL + liveTotal;
    const shortlistedCount = BASELINE_SHORTLISTED + liveShortlisted;
    const underReviewCount = BASELINE_UNDER_REVIEW + liveUnderReview;
    const submittedCount = BASELINE_SUBMITTED + liveSubmitted;

    const aiFullStackCount = BASELINE_AI_FULLSTACK + liveAiFullStack;
    const embeddedIotCount = BASELINE_EMBEDDED_IOT + liveEmbeddedIot;

    const aiPercentage = totalCount > 0 ? ((aiFullStackCount / totalCount) * 100).toFixed(1) : '0.0';
    const embeddedPercentage = totalCount > 0 ? ((embeddedIotCount / totalCount) * 100).toFixed(1) : '0.0';

    return {
      totals: {
        all: totalCount,
        shortlisted: shortlistedCount,
        underReview: underReviewCount,
        submitted: submittedCount,
      },
      liveSubmissionsCount: liveTotal,
      domains: {
        aiIntegratedFullStack: {
          name: 'AI Integrated Full Stack Development',
          count: aiFullStackCount,
          percentage: aiPercentage,
          stipend: '₹10,000 - ₹15,000/mo (Performance Based)',
        },
        embeddedSystemsIot: {
          name: 'Embedded Systems & IoT',
          count: embeddedIotCount,
          percentage: embeddedPercentage,
          stipend: '₹10,000 - ₹15,000/mo (Performance Based)',
        },
      },
      funnel: [
        {
          stage: 'Applications Received',
          count: totalCount,
          percent: 100,
        },
        {
          stage: 'Under Technical Evaluation',
          count: underReviewCount,
          percent: totalCount > 0 ? parseFloat(((underReviewCount / totalCount) * 100).toFixed(1)) : 0,
        },
        {
          stage: 'Shortlisted for Interview',
          count: shortlistedCount,
          percent: totalCount > 0 ? parseFloat(((shortlistedCount / totalCount) * 100).toFixed(1)) : 0,
        },
      ],
      lastUpdated: new Date().toISOString(),
    };
  },
};

export default MongoApplication;
