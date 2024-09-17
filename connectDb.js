const mongoose = require("mongoose");

const mongoUrl =
  "mongodb+srv://mpawlowski98:kKElKCWK27OGHv14@cluster1.7s09txe.mongodb.net/db-contacts";

const connectMongo = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection successful");
  } catch (er) {
    console.log("Database connection error", er.meesage);
    process.exit(1);
  }
};

module.exports = connectMongo;
