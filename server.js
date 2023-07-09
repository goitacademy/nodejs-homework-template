const mongoose = require("mongoose");
const app = require("./app");

const {DB_URI,PORT=3000} = process.env;
mongoose
  .connect(DB_URI)
  .then(() => app.listen(PORT))
  .then(() => console.log("Database connection successful"))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });