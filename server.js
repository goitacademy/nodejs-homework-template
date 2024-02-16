const { mongoose } = require("mongoose");
const app = require("./app");
const { connectMongo } = require("./db/connection");
require("dotenv").config();

const { PORT } = process.env;
mongoose.set("strictQuery", true);

const startServer = async () => {
  try {
    await connectMongo();
    console.log("Database connection successful");

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (err) {
    console.log(`Failed to launch application with error: ${err.message}`);
    process.exit(1);
  }
};

startServer();
