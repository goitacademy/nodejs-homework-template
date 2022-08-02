const mongoose = require("mongoose");

const connectMongo = async () => {
  return await mongoose.connect(
    "mongodb+srv://ts4ed:08071995@cluster0.8pnqpgo.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "db-contacts",
    }
  );
};

module.exports = {
  connectMongo,
};
