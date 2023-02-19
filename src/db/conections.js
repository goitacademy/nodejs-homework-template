const mongoose = require('mongoose');

async function mongooseConection () {
  mongoose.set("strictQuery", false);
  return await mongoose.connect(process.env.MongoDBURL)
}

module.exports = {
  mongooseConection
}