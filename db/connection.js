const mongoose = require('mongoose');
require('dotenv').config();
connectMongo().catch(err => console.log(err));

async function connectMongo() {
  await mongoose.connect(process.env.MONGO_URL);
}

module.exports = {
  connectMongo,
};
