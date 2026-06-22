const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// Serverless connection cache - INSIDE ROUTES
let cachedDb = null;

const connectToDatabase = async () => {
  if (cachedDb) return cachedDb;

  try {
    cachedDb = await mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    return cachedDb;
  } catch (error) {
    throw error;
  }
};

// All task routes require a logged-in user
router.use(auth);

// GET all tasks belonging to the logged-in user only
router.get('/', async (req, res) => {
  try {
    await connectToDatabase();
    const tasks = await Task.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.error('❌ Tasks error:', error);
    res.status(500).json({ message: error.message });
  }
});

// POST new task - automatically attached to logged-in user
router.post('/', async (req, res) => {
  try {
    await connectToDatabase();
    const task = new Task({ ...req.body, user: req.userId });
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update task - only if it belongs to the logged-in user
router.put('/:id', async (req, res) => {
  try {
    await connectToDatabase();
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE task - only if it belongs to the logged-in user
router.delete('/:id', async (req, res) => {
  try {
    await connectToDatabase();
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
