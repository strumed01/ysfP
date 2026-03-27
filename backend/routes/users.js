const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/users/profile
router.get('/profile', auth, async (req, res) => {
  res.json({ user: req.user });
});

// PUT /api/users/profile
router.put('/profile', auth, [
  body('name').optional().trim().isLength({ min: 2 }).withMessage('Nom trop court'),
  body('email').optional().isEmail().withMessage('Email invalide'),
  body('language').optional().isIn(['fr', 'en', 'es', 'ar']).withMessage('Langue invalide'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { name, email, language, currency, avatar } = req.body;
    const updates = {};
    if (name)     updates.name     = name;
    if (email)    updates.email    = email;
    if (language) updates.language = language;
    if (currency) updates.currency = currency;
    if (avatar)   updates.avatar   = avatar;

    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true });
    res.json({ user });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ error: 'Cet email est déjà utilisé' });
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/users/password
router.put('/password', auth, [
  body('currentPassword').notEmpty().withMessage('Mot de passe actuel requis'),
  body('newPassword').isLength({ min: 8 }).withMessage('Nouveau mot de passe: 8 caractères minimum'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const user = await User.findById(req.user._id).select('+password');
    const isMatch = await user.comparePassword(req.body.currentPassword);
    if (!isMatch) return res.status(400).json({ error: 'Mot de passe actuel incorrect' });

    user.password = req.body.newPassword;
    await user.save();
    res.json({ message: 'Mot de passe mis à jour avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/users/account
router.delete('/account', auth, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { isActive: false });
    res.json({ message: 'Compte désactivé. Vos données seront supprimées sous 30 jours.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
