const mongoose = require("mongoose");

const connectMongoose = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection successful");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = { connectMongoose };
