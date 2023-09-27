const mongoose = require('mongoose');
const { mongoConnectionString } = require('./config');

class DatabaseConectionError extends Error {
  constructor() {
    super('Database connection failed');
  }
}

const connect = async () => {
  try {
    await mongoose.connect(mongoConnectionString);
  } catch (err) {
    console.error(err);
    throw new DatabaseConectionError();
  }
};


module.exports = {
    connect,
}

