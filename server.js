const app = require("./app");
const { connectMongo } = require("./src/db/connection");
require("dotenv").config();
const port = process.env.PORT ? process.env.PORT : "3000";

app.listen(port, async () => {
  try {
    await connectMongo();
    return console.log("Database connection successful");
  } catch (error) {
    if (error) {
      console.error(error);
      process.exit(1);
    }
  }
});
