const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isValidated: { type: Boolean, default: false }, // Nouveau champ pour validation
  stats: {
    points: { type: Number, default: 0 },
    coveredPoints: { type: Number, default: 0 },
    kmTravelled: { type: Number, default: 0 },
    panelsPosted: { type: Number, default: 0 },
  },
  role: { type: String, default: 'user' } // Nouveau champ pour le rôle
});

// Method to match passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
