// const { MongoClient } = require("mongodb");
const { connectMongo } = require("./db/connection");
const app = require("./app");

const start = async () => {
  try {
    await connectMongo();
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  } catch (error) {
    return console.error(error.message), process.exit(1);
  }
};
start();
