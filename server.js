const app = require("./app");
const connectDB = require("./db/connection");
require("dotenv").config();

const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT, (error) => {
      if (error) {
        console.log("Server launch error", error);
      }
      console.log("Database connection successful");
    });
  } catch (err) {
    console.log(`Failed to launch application with an error: "${err.message}"`);
    process.exit(1);
  }
};

startServer();
