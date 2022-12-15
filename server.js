const app = require("./app");

const mongoose = require("mongoose");
require("dotenv").config();

const { DB_HOST } = process.env;
mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connect success"))
  .catch((err) => console.log(err.message));

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});
