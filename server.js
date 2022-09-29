const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => console.log("sadasd"))
  .catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log("Server running. Use our API on port: 3000");
});
