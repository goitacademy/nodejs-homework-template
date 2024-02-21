const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();
require("colors");

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});

const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then((res) => console.log("Database connection successful".green))
  .catch((error) => {
    console.error("Database connection failed".red, error.message.red);
    process.exit(1);
  });
