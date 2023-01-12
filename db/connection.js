const mongoose = require("mongoose");

async function connectMongo() {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(
      "mongodb+srv://JimmySolidBone:qwerty123456@cluster0.udk5akc.mongodb.net/contacts?retryWrites=true&w=majority"
    );
    console.log("Database connection successful");
  } catch (error) {
    console.log("error connection to mongoDB");
    process.exit(1);
  }
}

module.exports = { connectMongo };
