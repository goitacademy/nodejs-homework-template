const mongoose = require("mongoose");
const { MONGO_URL } = process.env;

const connectMongo = async () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(MONGO_URL)
    .then(() => console.log("Database connection successful"))
    .catch((err) => {
      console.log(err.message);
      process.exit(1);
    });
};

module.exports = { connectMongo };
