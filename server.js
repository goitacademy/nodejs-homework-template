const app = require("./app");
require("dotenv").config();
const { dbConnection } = require("./src/db/conection");

app.listen(4000, async () => {
  try {
    await dbConnection();
    console.log("Database connection successful");
    console.log("Server running. Use our API on port: 4000");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
});
