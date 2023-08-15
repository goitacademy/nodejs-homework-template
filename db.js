const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.DB_HOST,
      {
        useNewUrlParser: true,
      }
    );
    console.log(`Database connection successful`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
module.exports = connectDB;
