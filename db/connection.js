const mongoose = require("mongoose");

const connectMongo = async () => {
  return await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "db-contacts",
  });
};

module.exports = {
  connectMongo,
};
