const mongoose = require('mongoose');

const budgetItemSchema = new mongoose.Schema({
  category: { type: String, required: true, trim: true },
  total:    { type: Number, required: true, min: 0 },
  spent:    { type: Number, default: 0, min: 0 },
  color:    { type: String, default: '#00E5A0' },
  icon:     { type: String, default: '📦' },
});

const budgetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  month: {
    type: String, // Format: "2026-03"
    default: () => new Date().toISOString().slice(0, 7),
  },
  items: [budgetItemSchema],
}, { timestamps: true });

// Auto-reset spent at start of new month (handled via cron in production)
budgetSchema.methods.resetSpent = function () {
  this.items.forEach(item => { item.spent = 0; });
  this.month = new Date().toISOString().slice(0, 7);
  return this.save();
};

module.exports = mongoose.model('Budget', budgetSchema);
