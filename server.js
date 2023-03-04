const mongoose = require("mongoose");
const { start } = require("repl");

const app = require("./app");

const { DB_HOST, PORT = 5000 } = process.env;

mongoose
  .set("strictQuery", false)
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

  start()