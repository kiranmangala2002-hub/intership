import mongoose from 'mongoose';
import Item, {
  getInMemoryItems,
  addInMemoryItem,
  deleteInMemoryItem,
} from '../models/Item.js';

const isMongoConnected = () => mongoose.connection.readyState === 1;

// @desc    Get all items
// @route   GET /api/items
export const getItems = async (req, res, next) => {
  try {
    if (isMongoConnected()) {
      const items = await Item.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: items.length, data: items });
    }

    // In-memory fallback
    const items = getInMemoryItems();
    return res.status(200).json({ success: true, count: items.length, data: items });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new item
// @route   POST /api/items
export const createItem = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide a title' });
    }

    if (isMongoConnected()) {
      const item = await Item.create({ title, description });
      return res.status(201).json({ success: true, data: item });
    }

    // In-memory fallback
    const newItem = addInMemoryItem({ title, description });
    return res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete item
// @route   DELETE /api/items/:id
export const deleteItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isMongoConnected()) {
      const item = await Item.findByIdAndDelete(id);
      if (!item) {
        return res.status(404).json({ success: false, message: 'Item not found' });
      }
      return res.status(200).json({ success: true, message: 'Item deleted' });
    }

    // In-memory fallback
    const deleted = deleteInMemoryItem(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    return res.status(200).json({ success: true, message: 'Item deleted' });
  } catch (error) {
    next(error);
  }
};

