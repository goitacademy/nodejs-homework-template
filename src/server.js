const mongoose = require("mongoose");

const app = require("../app");

const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);

const port = process.env.PORT || 3000;

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
