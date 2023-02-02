const mongoose = require("mongoose");

const connectMongo = async () => {
  return mongoose.connect(
    "mongodb+srv://test:test@cluster0.utobjbu.mongodb.net/db-contacts?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};

module.exports = { connectMongo };
