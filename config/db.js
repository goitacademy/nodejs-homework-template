require('dotenv').config();
const mongoose = require('mongoose');

const DB_URI = process.env.DB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log('Database connection successful');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
