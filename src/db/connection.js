const mongoose = require("mongoose");
const BASE_URL = process.env.BASE_URL;

async function connectMongo() {
  await mongoose.connect(BASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = { connectMongo };
