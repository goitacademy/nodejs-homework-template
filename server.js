const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();
const { DB_HOST, PORT = 3000 } = process.env;

mongoose.connect(DB_HOST, () => {
  console.log("DB is connected");
});
app.listen(PORT, () => {
  console.log("Server running. Use our API on port: 3000");
});
