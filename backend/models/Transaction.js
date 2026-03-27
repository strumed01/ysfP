const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: [true, 'Le libellé est requis'],
    trim: true,
    maxlength: 100,
  },
  amount: {
    type: Number,
    required: [true, 'Le montant est requis'],
    // Positive = income, Negative = expense
  },
  category: {
    type: String,
    required: [true, 'La catégorie est requise'],
    trim: true,
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true,
  },
  icon: {
    type: String,
    default: '📦',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  note: {
    type: String,
    maxlength: 200,
    default: '',
  },
}, { timestamps: true });

// Virtual for formatted amount
transactionSchema.virtual('formattedAmount').get(function () {
  return `${this.amount > 0 ? '+' : ''}${this.amount.toLocaleString('fr-MA')} MAD`;
});

// Index for fast user queries sorted by date
transactionSchema.index({ user: 1, date: -1 });

module.exports = mongoose.model('Transaction', transactionSchema);
