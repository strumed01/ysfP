const express = require('express');
const { body, validationResult } = require('express-validator');
const Goal = require('../models/Goal');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/goals
router.get('/', auth, async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ goals });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/goals
router.post('/', auth, [
  body('name').trim().notEmpty().withMessage('Nom requis'),
  body('targetAmount').isFloat({ min: 1 }).withMessage('Montant cible invalide'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { name, targetAmount, savedAmount = 0, icon, color, deadline } = req.body;

    const goal = await Goal.create({
      user: req.user._id,
      name, targetAmount,
      savedAmount: Math.min(savedAmount, targetAmount),
      icon:  icon  || '🎯',
      color: color || '#4DA6FF',
      deadline: deadline || null,
    });

    res.status(201).json({ goal });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/goals/:id/deposit — add savings to a goal
router.patch('/:id/deposit', auth, [
  body('amount').isFloat({ min: 0.01 }).withMessage('Montant invalide'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const goal = await Goal.findOne({ _id: req.params.id, user: req.user._id });
    if (!goal) return res.status(404).json({ error: 'Objectif introuvable' });

    goal.savedAmount = Math.min(goal.targetAmount, goal.savedAmount + parseFloat(req.body.amount));
    await goal.save();

    res.json({ goal, progress: goal.progress });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/goals/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const goal = await Goal.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!goal) return res.status(404).json({ error: 'Objectif introuvable' });
    res.json({ message: 'Objectif supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
