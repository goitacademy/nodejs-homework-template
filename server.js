const mongoose = require("mongoose");
const app = require("./app.js");
mongoose.set("strictQuery", false);
require("dotenv").config();

const { PORT, DB_HOST } = process.env;

async function main() {
  try {
    await mongoose.connect(DB_HOST);
    console.log("Database connection is successful");
    app.listen(PORT, (err) => {
      if (err) console.error("Error at aserver launch", err);
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

main();
