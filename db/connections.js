const mongoose = require("mongoose");
const process = require("process");
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", true);
const connectMongo = async () => {
  return mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Database connection successful!"))
    .catch((error) => {
      console.log("Error:", error.message);
      // process.exit(1);
      // process.exitCode = 1;
    });
};

module.exports = { connectMongo };
