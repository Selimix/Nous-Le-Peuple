const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const Panel = require('../models/Panel');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

const importPanels = async () => {
  await connectDB();

  const panels = [];

  fs.createReadStream('data/panels.csv')
    .pipe(csv())
    .on('data', (row) => {
      const panel = {
        location: row.location,
        coordinates: {
          lat: parseFloat(row.latitude),
          lng: parseFloat(row.longitude),
        },
      };
      panels.push(panel);
    })
    .on('end', async () => {
      try {
        await Panel.insertMany(panels);
        console.log('Panels imported successfully');
        process.exit();
      } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
      }
    });
};

importPanels();
