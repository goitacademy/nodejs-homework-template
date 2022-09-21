const mongoose = require("mongoose");

const { MONGO_DB_URI, DB_NAME } = process.env;

async function connectMongo() {
  try {
    await mongoose.connect(MONGO_DB_URI, { dbName: DB_NAME });
    console.log("Connected successfully to server");
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
    process.exit();
  }
}

module.exports = {
  connectMongo,
};
