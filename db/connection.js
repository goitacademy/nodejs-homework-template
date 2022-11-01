const mongoose = require("mongoose");

const connectMongo = async () => {
  return mongoose.connect(
    "mongodb+srv://polosmakrr:hwpolosmakrr@cluster0.bmhhlxn.mongodb.net/?retryWrites=true&w=majority"
  );
};

module.exports = { connectMongo };
