const mongoose = require("mongoose");

const dbpath = process.env.MONGO_SECRET;

if (!dbpath) {
  throw "No dbSecret";
}

const connectDatabase = async () => {
  await mongoose
    .connect(dbpath)
    .then(() => console.log("Connected to mongo db..."))
    .catch(
      (err) => console.log("Error to connect db" + err) && process.exit(1)
    );
};

module.exports = { connectDatabase };
