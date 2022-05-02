const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const app = require('./app');
const PORT = process.env.PORT ?? 3000;
const MONGO_URI = process.env.MONGO_URI;

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Database successfully connected');
  } catch (error) {
    console.log('Database error connection');
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
};

start();
