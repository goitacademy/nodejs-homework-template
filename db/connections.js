const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const { HOST_URI } = process.env;

const connectMongo = async () => {
  try {
    await mongoose.connect(HOST_URI);
    console.log("Database connection successful");
  } catch (error) {
    console.error("Error while connecting to mongodb", error.message);
    process.exit(1);
  }
};

module.exports = {
  connectMongo,
};
