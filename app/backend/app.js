const express = require('express');
const connectDB = require('./config');
const userRoutes = require('./routes/userRoutes');
const panelRoutes = require('./routes/panelRoutes');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/panels', panelRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
