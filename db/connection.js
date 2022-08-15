const mongoose = require('mongoose');
require('dotenv').config();
connectMongo().catch(err => console.log(err));

async function connectMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.log('Database Connection Error!');
    console.log(error);
    process.exit(1);
  }
}

module.exports = {
  connectMongo,
};
