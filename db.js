const mongoose = require("mongoose");
const MONGODB_URI =
  "mongodb+srv://bartekj:BU6udi7wBcqqJedz@goit.a7muvo0.mongodb.net/db-contacts";
const dbConnect = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useUnifiedTopology: true,
    });
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error", error);
    process.exit(1);
  }
};

module.exports = dbConnect;
