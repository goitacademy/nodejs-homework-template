const app = require("./app");
const { connectionToDB } = require("./db/connection");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const startApp = async () => {
  try {
    await connectionToDB();

    console.log("Database connection successful");

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (e) {
    console.error(`Failed to launch app with error: ${e.message}`);
    process.exit(1);
  }
};

startApp();
