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
const axios = require('axios');

// Route to get optimized route
router.post('/optimize', async (req, res) => {
  const { panelIds } = req.body;

  const panels = await Panel.find({ '_id': { $in: panelIds } });

  const waypoints = panels.map(panel => `${panel.coordinates.lat},${panel.coordinates.lng}`).join('|');

  const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${waypoints[0]}&destination=${waypoints[waypoints.length - 1]}&waypoints=optimize:true|${waypoints}&key=${googleMapsApiKey}`;

  const { data } = await axios.get(url);

  res.json(data);
});
