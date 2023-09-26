const mongoose = require("mongoose");
const app = require("./app");
const { DB_HOSTS } = process.env;

mongoose.set("strictQuery", true);
mongoose
  .connect(DB_HOSTS)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((er) => {
    console.log(er);
    process.exit(1);
  });
