const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "db-contacts",
    });
    console.log("Database connection successful");
  } catch (err) {
    console.log(`Error with connect to database: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
