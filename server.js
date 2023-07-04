const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST, PORT } = process.env;

mongoose.set("strictQuery", true);

const port = PORT || 3000;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(port);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
