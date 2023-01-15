const mongoose = require("mongoose");
const app = require("./src/app");

mongoose.set("strictQuery", false);
require("dotenv").config();

const PORT = 3000;
const { HOST_URI } = process.env;

async function main() {
  try {
    const connection = await mongoose.connect(HOST_URI);
    console.log("Database connection successful");
    return connection;
  } catch (error) {
    console.error("SERVER CONECTION ERROR: ", error.message);
    process.exit(1);
  }
}

main()
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`),
  );
