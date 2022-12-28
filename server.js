const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT;

const connectionServer = async () => {
  try {
    if (!process.env.DB_HOST) {
      throw new Error("DB_HOST env variable is not set");
    }
    mongoose.connect(process.env.DB_HOST);
    console.log("Database connection successful");
  } catch (error) {
    console.error("Error: ", error.message);
    process.exit(1);
  }
};

const startServer = async () => {
  await connectionServer();

  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
};

startServer();
