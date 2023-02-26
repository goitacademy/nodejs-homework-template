require("dotenv").config();
const app = require("./app");
const getConnection = require("./db/mongoose");

app.listen(3000, async () => {
  console.log("Server running. Use our API on port: 3000");
  try {
    await getConnection();
    console.log("Database connection successful");
  } catch (error) {
    console.log("DB connection error", error);
    process.exit();
  }
});
