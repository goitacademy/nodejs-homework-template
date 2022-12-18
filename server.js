const app = require("./app");

const mongoose = require("mongoose");
// ! MONGO_DB_USER = tester
// ! MONGO_DB_PASSWORD = testerovych
// ! MONGO_DB_PROJECT=cluster0.m4clvz
// ! MONGO_DB_NAME = contacts_store
// ! MONGO_DB_COLLECTION = contacts
require("dotenv").config();

const getMongoDbUri = () => {
  const uri =
    "mongodb+srv://" +
    process.env.MONGO_DB_USER +
    ":" +
    process.env.MONGO_DB_PASSWORD +
    "@" +
    process.env.MONGO_DB_PROJECT +
    ".mongodb.net/" +
    process.env.MONGO_DB_NAME;
  return uri;
};

async function connectToDb() {
  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(getMongoDbUri(), {
      // promiseLibrary: global.Promise,
      useNewUrlParser: true,
      // useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("<<< === connected to db === >>>");
  } catch (error) {
    console.log("<<< === connected to db FAILED === >>>");
    console.log(error);
  }
}

async function start() {
  try {
    connectToDb();
    app.listen(3000, () => {
      console.log(
        "Server running. Use our API on port: 3000",
        ",",
        "Wellkome",
        "http://localhost:3000/api/"
      );
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
start();
