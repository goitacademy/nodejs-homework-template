const app = require("./app");
const mongoose = require("mongoose");


// XqGyC2o1WeY9N6nx
const DB_HOST = "mongodb+srv://dariazakharova:XqGyC2o1WeY9N6nx@cluster0.wwh9bgx.mongodb.net/db-contacts";

mongoose.set("strictQuery", true);

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch (error => {
    console.log(error.message);
    process.exit(1);
  })
