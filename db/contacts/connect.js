const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const URI = process.env.DB_CONTACTS;

async function сonnectMongo() {
  await mongoose.connect(URI);
}

module.exports = сonnectMongo;
