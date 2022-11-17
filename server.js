const mongoose = require("mongoose");

require('dotenv').config()

const { app } = require("./app");

const { HOST_DB } = process.env;
const PORT = 3000;

async function main() {
  try {
    if (!HOST_DB) {
      throw new Error("HOST_DB not set!");
    }

    await mongoose.connect(HOST_DB);

    console.log("Database connection successful");

    app.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`server is listening on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main()



