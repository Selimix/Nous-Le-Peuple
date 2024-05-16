const express = require('express');
const connectDB = require('./config');
const userRoutes = require('./routes/userRoutes');
const panelRoutes = require('./routes/panelRoutes');
const adminRoutes = require('./routes/adminRoutes'); // Importez les nouvelles routes
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

// Middleware for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/panels', panelRoutes);
app.use('/api/admin', adminRoutes); // Ajoutez les nouvelles routes

// Static file serving for production build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'))
  );
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
