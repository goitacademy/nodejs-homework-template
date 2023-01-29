const mongoose = require('mongoose');

const { DB_HOST, NODE_ENV } = process.env;
const isDevMode = NODE_ENV === 'development';

async function connectToContactsDB() {
  mongoose.set('strictQuery', false);
  try {
    await mongoose.connect(DB_HOST);
    isDevMode && console.log(`Successfully connected to DB`);
  } catch (error) {
    isDevMode &&
      console.log(`Can't connect to DB. Aborting process...\nError: ${error}`);
    return 1;
  }

  return 0;
}

module.exports = connectToContactsDB;
