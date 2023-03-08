require("dotenv").config();
const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;

const connectMongo = async () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

mongoose.connection.on("connected", () => {
  console.log("Database connection successful");
});

mongoose.connection.on("error", async (err) => {
  console.log(`Monggose connection error: ${err.message}`);
  process.exit(1);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});
module.exports = connectMongo;
