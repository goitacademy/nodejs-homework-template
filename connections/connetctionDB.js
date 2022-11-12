const mongoose = require("mongoose");

const connectMongo = async () => {
  try {
    return mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

mongoose.connection.on("connected", () => {
  console.log("Database connection successful");
});

mongoose.connection.on("error", (err) => {
  console.log("Connection error :", err);
});

mongoose.connection.on("disconnected", () => console.log("disconnected"));

module.exports = {
  connectMongo,
};
