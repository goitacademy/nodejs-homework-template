const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const { DB_HOST } = process.env;

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Successful connection"))
  .catch((error) => console.log(error.message));
