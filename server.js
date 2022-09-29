const { connectMongo } = require("./src/db/connection");
const app = require("./src/app");
require("dotenv").config();

const PORT = process.env.PORT;

const start = async () => {
  try {
    await connectMongo();
    console.log("Database connection successful");
    app.listen(PORT, (err) => {
      if (err) console.error("Error at server laush", err);
      console.log(`Server works at port ${PORT}!`);
    });
  } catch (error) {
    console.error(`Failed to launch plication with error: ${error.message}`);
  }
};

start();
