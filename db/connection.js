const mongoose = require("mongoose");

const connectMongo = async () => {
  return await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "test-app-t3",
  });
};

module.exports = {
  connectMongo,
};
