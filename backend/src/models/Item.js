import mongoose from 'mongoose';

// Mongoose Schema (when MongoDB is connected)
const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Fallback in-memory storage for instant out-of-the-box functionality
let inMemoryItems = [
  {
    id: '1',
    title: 'Initialize Frontend & Backend Folders',
    description: 'Scaffold React + Express fullstack project architecture.',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Set Up API Endpoints',
    description: 'Verify CORS, JSON body parser, and error handler middlewares.',
    createdAt: new Date().toISOString(),
  },
];

export const getInMemoryItems = () => inMemoryItems;

export const addInMemoryItem = (item) => {
  const newItem = {
    id: Date.now().toString(),
    title: item.title,
    description: item.description || '',
    createdAt: new Date().toISOString(),
  };
  inMemoryItems.unshift(newItem);
  return newItem;
};

export const deleteInMemoryItem = (id) => {
  const exists = inMemoryItems.some((i) => i.id === id);
  if (!exists) return false;
  inMemoryItems = inMemoryItems.filter((i) => i.id !== id);
  return true;
};

const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);
export default Item;

