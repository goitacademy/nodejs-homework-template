const mongoose = require("mongoose");

const connectMongo = async () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database connection successful"));
};

module.exports = { connectMongo };
