const express = require('express');
const Panel = require('../models/Panel');
const multer = require('multer');
const OSRM = require('osrm');
const loadMessages = require('../utils/localize');

const router = express.Router();
const messages = loadMessages('fr'); // Charge les messages en français

const osrm = new OSRM({ path: 'path_to_your_osm_file.osrm', algorithm: 'MLD' });

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// Get all panels
router.get('/', async (req, res) => {
  try {
    const panels = await Panel.find();
    res.json(panels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new panel
router.post('/', async (req, res) => {
  const { location, coordinates } = req.body;

  const panel = new Panel({ location, coordinates });

  try {
    const newPanel = await panel.save();
    res.status(201).json(newPanel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Assign panel to user
router.put('/:id/assign', async (req, res) => {
  try {
    const panel = await Panel.findById(req.params.id);

    if (panel) {
      panel.assigned = true;
      panel.user = req.body.userId;

      const updatedPanel = await panel.save();
      res.json(updatedPanel);
    } else {
      res.status(404).json({ message: messages.PANEL_NOT_FOUND });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to get optimized route
router.post('/optimize', async (req, res) => {
  const { panelIds } = req.body;
  try {
    const panels = await Panel.find({ '_id': { $in: panelIds } });

    const coordinates = panels.map(panel => [panel.coordinates.lng, panel.coordinates.lat]);

    const options = {
      coordinates: coordinates,
      geometries: 'geojson',
      overview: 'full'
    };

    osrm.route(options, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(result.routes[0]);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/:id/photo', upload.single('photo'), async (req, res) => {
  try {
    const panel = await Panel.findById(req.params.id);

    if (panel) {
      panel.photo = req.file.path;
      const updatedPanel = await panel.save();
      res.json(updatedPanel);
    } else {
      res.status(404).json({ message: messages.PANEL_NOT_FOUND });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
