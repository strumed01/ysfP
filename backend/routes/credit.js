const express     = require('express');
const Transaction = require('../models/Transaction');
const auth        = require('../middleware/auth');

const router = express.Router();

/**
 * Credit score calculation algorithm (simplified)
 * Factors:
 *  - Payment history     35%  → ratio of on-time vs late payments
 *  - Credit utilization  30%  → expenses / (income * 0.8)
 *  - Account age         15%  → months since account creation
 *  - New credit           10% → transactions in last 30 days
 *  - Credit mix           10% → variety of categories
 */
async function calculateScore(userId, userCreatedAt) {
  const now   = new Date();
  const month = new Date(now.getFullYear(), now.getMonth(), 1);

  // All-time transactions
  const allTx = await Transaction.find({ user: userId });

  // This month
  const monthTx = allTx.filter(t => new Date(t.date) >= month);

  const income  = monthTx.filter(t => t.type === 'income').reduce((a, t) => a + t.amount, 0);
  const expense = monthTx.filter(t => t.type === 'expense').reduce((a, t) => a + Math.abs(t.amount), 0);

  // 1. Payment history (0-100): percentage of months with income >= expenses
  const paymentScore = allTx.length > 0
    ? Math.min(100, 60 + (income > expense ? 38 : 20))
    : 70;

  // 2. Credit utilization (0-100): lower is better
  const utilization = income > 0 ? expense / income : 0;
  const utilizationScore = utilization <= 0.2 ? 100
    : utilization <= 0.4 ? 85
    : utilization <= 0.6 ? 65
    : utilization <= 0.8 ? 45 : 20;

  // 3. Account age (0-100)
  const monthsOld = Math.floor((now - new Date(userCreatedAt)) / (1000 * 60 * 60 * 24 * 30));
  const ageScore = Math.min(100, monthsOld * 8 + 30);

  // 4. New credit: recent activity (0-100)
  const recentCount  = monthTx.length;
  const newCreditScore = recentCount >= 2 && recentCount <= 10 ? 90 : recentCount === 0 ? 50 : 70;

  // 5. Credit mix: category diversity (0-100)
  const categories = new Set(allTx.map(t => t.category));
  const mixScore = Math.min(100, categories.size * 14 + 20);

  // Weighted average → scale to 300-850
  const raw = (
    paymentScore    * 0.35 +
    utilizationScore * 0.30 +
    ageScore        * 0.15 +
    newCreditScore  * 0.10 +
    mixScore        * 0.10
  );

  const score = Math.round(300 + (raw / 100) * 550);

  return {
    score,
    factors: {
      paymentHistory:   Math.round(paymentScore),
      creditUtilization: Math.round(utilizationScore),
      accountAge:       Math.round(ageScore),
      newCredit:        Math.round(newCreditScore),
      creditMix:        Math.round(mixScore),
    },
    utilization: Math.round(utilization * 100),
    label: score >= 750 ? 'Excellent' : score >= 700 ? 'Très bien' : score >= 650 ? 'Bien' : score >= 600 ? 'Passable' : 'À améliorer',
  };
}

// GET /api/credit/score
router.get('/score', auth, async (req, res) => {
  try {
    const result = await calculateScore(req.user._id, req.user.createdAt);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/credit/tips
router.get('/tips', auth, async (req, res) => {
  try {
    const { score, factors, utilization } = await calculateScore(req.user._id, req.user.createdAt);

    const tips = [];

    if (factors.creditUtilization < 80) {
      tips.push({
        priority: 'high',
        icon: '💳',
        title: 'Réduire l\'utilisation du crédit',
        message: `Votre taux d'utilisation est de ${utilization}%. Visez moins de 20% pour +15 pts.`,
        impact: '+10 à +20 pts',
      });
    }
    if (factors.paymentHistory < 90) {
      tips.push({
        priority: 'high',
        icon: '📅',
        title: 'Paiements ponctuels',
        message: 'Réglez vos dettes à temps chaque mois pour améliorer votre historique.',
        impact: '+20 à +30 pts',
      });
    }
    if (factors.creditMix < 70) {
      tips.push({
        priority: 'medium',
        icon: '🎯',
        title: 'Diversifier vos dépenses',
        message: 'Variez vos catégories de dépenses pour montrer un profil financier équilibré.',
        impact: '+5 à +10 pts',
      });
    }

    res.json({ score, tips });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
