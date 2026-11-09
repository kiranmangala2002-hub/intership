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

// Cohort Baseline Constants
const BASELINE_TOTAL = 1420;
const BASELINE_SHORTLISTED = 340;
const BASELINE_UNDER_REVIEW = 812;
const BASELINE_SUBMITTED = 268;
const BASELINE_AI_FULLSTACK = 724;
const BASELINE_EMBEDDED_IOT = 696;

// Unified Application Operations (Dual-engine: Mongo + File Persistence)
export const ApplicationModel = {
  async find(filter = {}) {
    if (isMongoConnected()) {
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
      return await MongoApplication.find(query).sort({ createdAt: -1 });
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
      return await MongoApplication.findById(id);
    }
    const apps = applicationStore.read();
    return apps.find((a) => a._id === id || a.id === id || a.applicationId === id) || null;
  },

  async create(data) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const applicationId = `SPH-2026-${randomSuffix}`;

    if (isMongoConnected()) {
      return await MongoApplication.create({
        ...data,
        applicationId,
      });
    }

    const apps = applicationStore.read();
    const newApp = {
      _id: 'app-' + Date.now(),
      id: 'app-' + Date.now(),
      applicationId,
      name: data.name.trim(),
      contact: data.contact.trim(),
      collegeName: data.collegeName.trim(),
      passoutYear: data.passoutYear,
      email: data.email.toLowerCase().trim(),
      domain: data.domain,
      resumeName: data.resumeName || 'Resume.pdf',
      photoUrl: data.photoUrl || '',
      status: data.status || 'Submitted',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    apps.unshift(newApp);
    applicationStore.write(apps);
    return newApp;
  },

  async deleteById(id) {
    if (isMongoConnected()) {
      return await MongoApplication.findByIdAndDelete(id);
    }

    const apps = applicationStore.read();
    const index = apps.findIndex((a) => a._id === id || a.id === id);
    if (index === -1) return null;

    const [deleted] = apps.splice(index, 1);
    applicationStore.write(apps);
    return deleted;
  },

  async updateStatus(id, newStatus) {
    if (isMongoConnected()) {
      return await MongoApplication.findByIdAndUpdate(
        id,
        { status: newStatus },
        { new: true }
      );
    }

    const apps = applicationStore.read();
    const app = apps.find((a) => a._id === id || a.id === id);
    if (!app) return null;

    app.status = newStatus;
    app.updatedAt = new Date().toISOString();
    applicationStore.write(apps);
    return app;
  },

  async getMetrics() {
    let liveApps = [];
    if (isMongoConnected()) {
      liveApps = await MongoApplication.find();
    } else {
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
          percentage: ((aiFullStackCount / totalCount) * 100).toFixed(1),
          stipend: '₹10,000 - ₹15,000/mo (Performance Based)',
        },
        embeddedSystemsIot: {
          name: 'Embedded Systems & IoT',
          count: embeddedIotCount,
          percentage: ((embeddedIotCount / totalCount) * 100).toFixed(1),
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
          percent: parseFloat(((underReviewCount / totalCount) * 100).toFixed(1)),
        },
        {
          stage: 'Shortlisted for Interview',
          count: shortlistedCount,
          percent: parseFloat(((shortlistedCount / totalCount) * 100).toFixed(1)),
        },
      ],
      lastUpdated: new Date().toISOString(),
    };
  },
};

export default MongoApplication;
