const app = require("./app");
const mongoose = require("mongoose");

require("dotenv").config();

const uriDb = process.env.DB_HOST;

const serverStart = async () => {
  try {
    const connectDb = await mongoose.connect(uriDb);
    console.log("Databese connection successfull");

    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (error) {
    console.log(error);
    console.error("Cannot connect to Mongo Database");
    process.exit(1);
  }
};

module.exports = serverStart();
