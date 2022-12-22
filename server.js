const app = require("./app");

const mongoose = require("mongoose");
require("dotenv").config();

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);
mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connect success"))
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log("Server running. Use our API on port: 3000");
});
