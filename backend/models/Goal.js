const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: [true, 'Le nom de l\'objectif est requis'],
    trim: true,
    maxlength: 80,
  },
  targetAmount: {
    type: Number,
    required: [true, 'Le montant cible est requis'],
    min: [1, 'Le montant doit être positif'],
  },
  savedAmount: {
    type: Number,
    default: 0,
    min: 0,
  },
  icon:  { type: String, default: '🎯' },
  color: { type: String, default: '#4DA6FF' },
  deadline: {
    type: Date,
    default: null,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

// Virtual: progress percentage
goalSchema.virtual('progress').get(function () {
  return Math.min(100, Math.round((this.savedAmount / this.targetAmount) * 100));
});

// Auto-mark as completed
goalSchema.pre('save', function (next) {
  if (this.savedAmount >= this.targetAmount) this.isCompleted = true;
  next();
});

module.exports = mongoose.model('Goal', goalSchema);
