const express = require('express');
const jwt     = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User    = require('../models/User');
const Budget  = require('../models/Budget');
const auth    = require('../middleware/auth');

const router = express.Router();

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

// POST /api/auth/register
router.post('/register', [
  body('name').trim().isLength({ min: 2 }).withMessage('Nom trop court'),
  body('email').isEmail().withMessage('Email invalide'),
  body('password').isLength({ min: 8 }).withMessage('Mot de passe: 8 caractères minimum'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { name, email, password, language = 'fr' } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Cet email est déjà utilisé' });

    const user = await User.create({ name, email, password, language });

    // Create default budgets for new user
    await Budget.create({
      user: user._id,
      items: [
        { category: 'Alimentation', total: 2000, color: '#00E5A0', icon: '🛒' },
        { category: 'Transport',    total: 800,  color: '#4DA6FF', icon: '🚗' },
        { category: 'Loisirs',      total: 600,  color: '#FFB547', icon: '🎉' },
        { category: 'Abonnements',  total: 400,  color: '#FF6B6B', icon: '📱' },
        { category: 'Santé',        total: 500,  color: '#B47FFF', icon: '💊' },
      ],
    });

    const token = generateToken(user._id);
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', [
  body('email').isEmail().withMessage('Email invalide'),
  body('password').notEmpty().withMessage('Mot de passe requis'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }
    if (!user.isActive) {
      return res.status(403).json({ error: 'Compte désactivé' });
    }

    const token = generateToken(user._id);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/auth/me
router.get('/me', auth, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
