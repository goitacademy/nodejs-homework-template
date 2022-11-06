const mongoose = require('mongoose');
const BASE_URL = process.env.BASE_URL;

// connectMongo().catch(err => console.error(err));

async function connectMongo() {
  await mongoose.connect(BASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = { connectMongo };
