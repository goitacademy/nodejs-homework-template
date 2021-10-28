const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;

const connectMongo = async () => {
  await mongoose.connect(DB_URL, {dbName: DB_NAME});
};

module.exports = connectMongo;
