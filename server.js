const mongoose = require("mongoose");
const app = require("./app");
const { DB_HOST, PORT } = process.env;

mongoose.set("strictQuery", true);
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch((er) => {
    console.log(er);
    process.exit(1);
  });
