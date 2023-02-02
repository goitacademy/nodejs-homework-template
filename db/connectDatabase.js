const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const { DB_HOST } = process.env;

connectDatabase().catch((err) => {
  console.error("Error while connecting to mongoDb.", err.message);
  process.exit(1);
});

async function connectDatabase() {
  await mongoose.connect(DB_HOST);
  console.log("Database connection successful");
}

module.exports = { connectDatabase };

