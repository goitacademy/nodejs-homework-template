const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
  "mongodb+srv://Andrew:PnqjPj3qRUNly0MJ@database.1xc8rqm.mongodb.net/contacts_reader?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful")
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

