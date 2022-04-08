const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_CONNECTION = "mongodb+srv://Bender148:<Twl1yB9wmpgOLtFX>@cluster0.vkgcg.mongodb.net/contacts?retryWrites=true&w=majority";

const db = mongoose.connect(MONGO_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  poolSize: 5,
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose: Database connection successful.');
});

mongoose.connection.on('error', error => {
  console.log(`Mongoose: Error Database connection: ${error.message}.`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose: Database connection terminated.');
});

process.on('SIGINT', async () => {
  mongoose.connection.close(() => {
    console.log('Database connection terminated.');
    process.exit(1);
  });
});

module.exports = db;