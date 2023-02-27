const app = require("./app");
require("dotenv").config();
const { connectDb } = require("./db");

connectDb()
  .then(
    app.listen(3000, () => {
      console.log("Database connection successful");
    })
  )
  .catch((error) => {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  });
