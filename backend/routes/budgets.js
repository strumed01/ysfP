const express = require('express');
const Budget  = require('../models/Budget');
const auth    = require('../middleware/auth');

const router = express.Router();

// GET /api/budgets
router.get('/', auth, async (req, res) => {
  try {
    let budget = await Budget.findOne({ user: req.user._id });

    // Create default budget if none exists
    if (!budget) {
      budget = await Budget.create({
        user: req.user._id,
        items: [
          { category: 'Alimentation', total: 2000, color: '#00E5A0', icon: '🛒' },
          { category: 'Transport',    total: 800,  color: '#4DA6FF', icon: '🚗' },
          { category: 'Loisirs',      total: 600,  color: '#FFB547', icon: '🎉' },
          { category: 'Abonnements',  total: 400,  color: '#FF6B6B', icon: '📱' },
          { category: 'Santé',        total: 500,  color: '#B47FFF', icon: '💊' },
        ],
      });
    }

    res.json({ budget });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/budgets
router.put('/', auth, async (req, res) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) return res.status(400).json({ error: 'items doit être un tableau' });

    const budget = await Budget.findOneAndUpdate(
      { user: req.user._id },
      { $set: { items } },
      { new: true, upsert: true, runValidators: true }
    );

    res.json({ budget });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/budgets/reset
router.post('/reset', auth, async (req, res) => {
  try {
    const budget = await Budget.findOne({ user: req.user._id });
    if (!budget) return res.status(404).json({ error: 'Budget introuvable' });
    await budget.resetSpent();
    res.json({ message: 'Budget réinitialisé pour ce mois', budget });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
