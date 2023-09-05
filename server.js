require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");
// const PORT = process.env.PORT || 3000;

const uriDb = process.env.DB_HOST;

const runServer = async () => {
  try {
    await mongoose.connect(uriDb, { dbName: "db-contacts" });
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (error) {
    console.error("Cannot connect to Mongo Database");
    console.error(error);
    process.exit(1);
  }
};

runServer();
