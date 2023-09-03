const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(app.listen(3000), console.log("DB connected successfully"))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
