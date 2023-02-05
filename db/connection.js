const mongoose = require("mongoose");

const connectMongo = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://test:test@cluster0.utobjbu.mongodb.net/db-contacts?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Database connection successful");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = { connectMongo };
