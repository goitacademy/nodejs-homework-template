const mongoose = require("mongoose");

const dbpath = process.env.DB_HOST;

if (!dbpath) {
  console.error("no db secret");
}

const connect = async () => {
  await mongoose
    .connect(dbpath)
    .then(() => console.log("Database connection successful"));
};

module.exports = connect;
