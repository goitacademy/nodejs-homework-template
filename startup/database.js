const mongoose = require("mongoose");

const dbpath =
  "mongodb+srv://admin:hLmJx7Vx2RWpFXr6@cluster0.cxlpqra.mongodb.net/db-contacts?retryWrites=true&w=majority";

const connectDatabase = async () => {
  await mongoose
    .connect(dbpath)
    .then(() => console.log("Connected to mongo db..."))
    .catch(
      (err) => console.log("Error to connect db" + err) && process.exit(1)
    );
};

module.exports = { connectDatabase };
