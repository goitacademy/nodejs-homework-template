const mongoose = require("mongoose");
const createError = require("http-errors");

const MONGO_URL =
  "mongodb+srv://tar86irina:t02031986@cluster0.s2urx.mongodb.net/Contacts?retryWrites=true&w=majority";

const connectMongo = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection successful");
  } catch (error) {
    createError(error);
    process.exit(1);
  }
};
connectMongo();
module.exports = { connectMongo };
