const express     = require('express');
const { body, validationResult } = require('express-validator');
const Transaction = require('../models/Transaction');
const Budget      = require('../models/Budget');
const auth        = require('../middleware/auth');

const router = express.Router();

// GET /api/transactions
router.get('/', auth, async (req, res) => {
  try {
    const { type, category, limit = 50, page = 1 } = req.query;
    const filter = { user: req.user._id };
    if (type)     filter.type     = type;
    if (category) filter.category = category;

    const total = await Transaction.countDocuments(filter);
    const transactions = await Transaction.find(filter)
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    res.json({ transactions, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/transactions
router.post('/', auth, [
  body('name').trim().notEmpty().withMessage('Libellé requis'),
  body('amount').isNumeric().withMessage('Montant invalide'),
  body('category').trim().notEmpty().withMessage('Catégorie requise'),
  body('type').isIn(['income', 'expense']).withMessage('Type invalide'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { name, amount, category, type, icon, date, note } = req.body;

    const transaction = await Transaction.create({
      user: req.user._id,
      name, amount, category, type,
      icon: icon || '📦',
      date: date || Date.now(),
      note,
    });

    // Update budget spent amount for expenses
    if (type === 'expense') {
      await Budget.updateOne(
        { user: req.user._id, 'items.category': category },
        { $inc: { 'items.$.spent': Math.abs(amount) } }
      );
    }

    res.status(201).json({ transaction });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/transactions/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ _id: req.params.id, user: req.user._id });
    if (!transaction) return res.status(404).json({ error: 'Transaction introuvable' });

    // Reverse budget impact
    if (transaction.type === 'expense') {
      await Budget.updateOne(
        { user: req.user._id, 'items.category': transaction.category },
        { $inc: { 'items.$.spent': -Math.abs(transaction.amount) } }
      );
    }

    await transaction.deleteOne();
    res.json({ message: 'Transaction supprimée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/transactions/stats
router.get('/stats', auth, async (req, res) => {
  try {
    const now   = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);

    const stats = await Transaction.aggregate([
      { $match: { user: req.user._id, date: { $gte: start } } },
      { $group: {
          _id: '$type',
          total: { $sum: { $abs: '$amount' } },
          count: { $sum: 1 },
        },
      },
    ]);

    const byCategory = await Transaction.aggregate([
      { $match: { user: req.user._id, type: 'expense', date: { $gte: start } } },
      { $group: { _id: '$category', total: { $sum: { $abs: '$amount' } } } },
      { $sort: { total: -1 } },
    ]);

    res.json({ stats, byCategory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
