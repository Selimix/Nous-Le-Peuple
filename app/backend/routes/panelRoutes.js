const express = require('express');
const Panel = require('../models/Panel');
const router = express.Router();

// Get all panels
router.get('/', async (req, res) => {
  const panels = await Panel.find();
  res.json(panels);
});

// Add new panel
router.post('/', async (req, res) => {
  const { location, coordinates } = req.body;

  const panel = new Panel({ location, coordinates });

  await panel.save();

  res.status(201).json(panel);
});

// Assign panel to user
router.put('/:id/assign', async (req, res) => {
  const panel = await Panel.findById(req.params.id);

  if (panel) {
    panel.assigned = true;
    panel.user = req.body.userId;

    await panel.save();

    res.json(panel);
  } else {
    res.status(404).json({ message: 'Panel not found' });
  }
});

module.exports = router;
