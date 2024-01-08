const app = require("./app");

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const { DB_HOST } = process.env;

console.log(DB_HOST);
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log(DB_HOST);
    console.log("Database connections successful");
    app.listen(3000, () => {
      console.log("Server Running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
mongoose.set("strictQuery", true);
