const mongoose = require('mongoose');

const panelSchema = new mongoose.Schema({
  location: { type: String, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  assigned: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  photo: { type: String },
}, {
  timestamps: true
});

const Panel = mongoose.model('Panel', panelSchema);

module.exports = Panel;
