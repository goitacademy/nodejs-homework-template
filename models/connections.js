const mongoose = require("mongoose");

const url = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

async function connectMongo() {
  try {
    await mongoose.connect(url, { dbName });
    console.log("Connected successfully to server");
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
    process.exit();
  }
}

module.exports = {
  connectMongo,
};
