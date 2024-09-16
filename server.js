const app = require("./app");

const mongoose = require("mongoose");

const { DB_HOST } = process.env;
const { PORT } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful on port", `${PORT}`);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });