require('dotenv').config();
const mongoose = require('mongoose');

const { DB_HOST: urlDb } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(urlDb, {
      dbName: 'db-contacts',
    });
    console.log('Database connection successful');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
