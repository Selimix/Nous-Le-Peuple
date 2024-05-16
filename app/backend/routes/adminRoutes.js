const express = require('express');
const User = require('../models/User');
const Panel = require('../models/Panel');
const { admin, protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Valider un utilisateur
router.put('/validate/:id', protect, admin, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.isValidated = true;
    await user.save();
    res.json({ message: 'Utilisateur validé' });
  } else {
    res.status(404).json({ message: 'Utilisateur non trouvé' });
  }
});

// Obtenir les statistiques
router.get('/stats', protect, admin, async (req, res) => {
  const users = await User.find();
  const panels = await Panel.find();
  const stats = {
    totalUsers: users.length,
    totalPanels: panels.length,
    coveredPanels: panels.filter(panel => panel.assigned).length,
  };
  res.json(stats);
});

// Obtenir les statistiques d'un utilisateur
router.get('/user-stats/:id', protect, admin, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user.stats);
  } else {
    res.status(404).json({ message: 'Utilisateur non trouvé' });
  }
});

// Supprimer un utilisateur
router.delete('/user/:id', protect, admin, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: 'Utilisateur supprimé' });
  } else {
    res.status(404).json({ message: 'Utilisateur non trouvé' });
  }
});

// Limiter un utilisateur
router.put('/limit/:id', protect, admin, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.role = 'limited';
    await user.save();
    res.json({ message: 'Utilisateur limité' });
  } else {
    res.status(404).json({ message: 'Utilisateur non trouvé' });
  }
});

module.exports = router;
