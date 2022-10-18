require("dotenv").config();
require("colors");
const mongoose = require("mongoose");

const app = require("./app");
const PORT = process.env.PORT || 3030;
const DB_HOST = process.env.MONGO_URL;

const connection = mongoose.connect(DB_HOST, {
  promiseLibrary: global.Promise,
  // useCreateIndex: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
});

connection
  .then(() => {
    console.log("Database connection successful".bold.cyan.italic);
    app.listen(PORT, function () {
      console.log(
        `Server running. Use our API on port: ${PORT}`.bold.cyan.italic
      );
    });
  })
  .catch((err) => {
    console.log(
      `Server not running. Error message: ${err.message}`.bold.red.italic
    );
    process.exit(1);
  });
