const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const loadMessages = require('../utils/localize');

const router = express.Router();
const messages = loadMessages('fr'); // Charge les messages en français

// Register user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: messages.USER_ALREADY_EXISTS });
  }

  const user = await User.create({ name, email, password });

  if (user) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.status(201).json({ _id: user._id, name: user.name, email: user.email, token });
  } else {
    res.status(400).json({ message: messages.INVALID_USER_DATA });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ _id: user._id, name: user.name, email: user.email, token });
  } else {
    res.status(401).json({ message: messages.INVALID_EMAIL_OR_PASSWORD });
  }
});

module.exports = router;
