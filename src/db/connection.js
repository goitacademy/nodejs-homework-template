const mongoose = require("mongoose");

const mongoUrl =
  "mongodb+srv://bloodseeker:bloodseeker1995ZM@cluster0.kwbm97q.mongodb.net/?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);

const connectMongo = async () => {
  return mongoose.connect(
    "mongodb+srv://bloodseeker:bloodseeker1995ZM@cluster0.kwbm97q.mongodb.net/?retryWrites=true&w=majority"
  );
};

module.exports = {
  connectMongo,
};
