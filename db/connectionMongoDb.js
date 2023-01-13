require("colors");

const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "../", "config/.env"),
});

mongoose.set("strictQuery", false);
mongoose.Promise = global.Promise;

// const options = {};

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database connection successful`.cyan);
  } catch (error) {
    console.error(`dbConnect failed => ${error}`.red);
    throw Error(error);
  }
};

module.exports = { dbConnect };
