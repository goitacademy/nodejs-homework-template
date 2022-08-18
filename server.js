
const { connectMongo } = require("./db/connection");
require("dotenv").config();
const app = require("./app");
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectMongo();
    app.listen(PORT, () => {
      console.log("Database connection successful");
      console.log(`"Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    return console.error(error.message), process.exit(1);
  }
};
start();
