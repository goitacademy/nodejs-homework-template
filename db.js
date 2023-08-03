const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://talka83:4AYhNPxiGyfKDK2z@cluster0.7juqpvi.mongodb.net/db-contacts`,
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
