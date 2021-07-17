const app = require("../app");
const { connectMongo } = require("../db/connection");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const start = async () => {
  try {
    await connectMongo().catch((error) => {
      console.log(error.message);
      process.exit(1);
    });
    console.log("Database connection successful");
    app.listen(PORT, (err) => {
      if (err) console.error("Error at aserver launch:", err);
      console.log(`Server works at port ${PORT}!`);
    });
  } catch (error) {
    console.error(`Failed to launch application with error: ${error.message}`);
  }
};
start();
