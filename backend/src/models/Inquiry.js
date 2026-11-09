import mongoose from 'mongoose';
import { inquiryStore } from '../config/dataStore.js';

const isMongoConnected = () => mongoose.connection.readyState === 1;

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: '',
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    subject: {
      type: String,
      trim: true,
      default: 'Student Query',
    },
    domain: {
      type: String,
      trim: true,
      default: 'General',
    },
    message: {
      type: String,
      required: [true, 'Message content is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['New', 'In Review', 'Resolved'],
      default: 'New',
    },
  },
  {
    timestamps: true,
  }
);

let MongoInquiry;
try {
  MongoInquiry = mongoose.model('Inquiry', inquirySchema);
} catch (e) {
  MongoInquiry = mongoose.models.Inquiry;
}

export const InquiryModel = {
  async findAll() {
    if (isMongoConnected()) {
      return await MongoInquiry.find().sort({ createdAt: -1 });
    }
    return inquiryStore.read();
  },

  async create(data) {
    if (isMongoConnected()) {
      return await MongoInquiry.create({
        name: data.name?.trim() || '',
        email: data.email?.toLowerCase().trim() || '',
        phone: data.phone?.trim() || '',
        subject: data.subject?.trim() || 'Student Query',
        domain: data.domain?.trim() || 'General',
        message: data.message?.trim() || '',
        status: 'New',
      });
    }

    const inquiries = inquiryStore.read();
    const newInquiry = {
      id: 'inq-' + Date.now(),
      name: data.name?.trim() || '',
      email: data.email?.toLowerCase().trim() || '',
      phone: data.phone?.trim() || '',
      subject: data.subject?.trim() || 'Student Query',
      domain: data.domain?.trim() || 'General',
      message: data.message?.trim() || '',
      status: 'New',
      createdAt: new Date().toISOString(),
    };
    inquiries.unshift(newInquiry);
    inquiryStore.write(inquiries);
    return newInquiry;
  },
};

export default MongoInquiry;
