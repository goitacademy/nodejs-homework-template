const mongoose = require("mongoose");

const app = require("./app");

mongoose.set("strictQuery", true);

mongoose
  .connect('mongodb+srv://annaboichuko:9lLLlEUbeK1xuQRM@cluster0.mfetyvw.mongodb.net/db-contacts')
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
