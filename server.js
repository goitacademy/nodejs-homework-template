const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
  "mongodb+srv://Vitalii:Mango970512prettyboy@cluster0.dueofuh.mongodb.net/db_contact?retryWrites=true&w=majority";

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
