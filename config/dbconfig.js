const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const { DB_HOST: urlDb, PORT } = process.env;

const app = express();
const connection = mongoose.connect(urlDb);

const startServer = async () => {
  try {
    await connection;
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Best node serwer in the world in running on ${PORT}`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = { startServer };
