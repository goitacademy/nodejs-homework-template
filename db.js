const mongoose = require("mongoose");

const mongoUrl =
  "mongodb+srv://bieganskip:Newworlddisorder1996@cluster0.8flnzsv.mongodb.net/db-contacts?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;