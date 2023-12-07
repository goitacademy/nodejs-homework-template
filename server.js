const app = require("./app");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const { DB_HOST, PORT = 300 } = process.env;

async function main() {
  try {
    if (!DB_HOST) {
      throw new Error("DB_HOST not set!");
    }

    await mongoose.connect(DB_HOST);
    console.log("Database connection successful");

    app.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`Server is listening on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();
