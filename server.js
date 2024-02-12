const app = require("./app");

const { DB_HOST, PORT } = process.env;

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", true);
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
