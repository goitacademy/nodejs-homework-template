const app = require("./app");

const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://White:NL6MZIovHzGLGAeV@cluster0.bgrvgy8.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

// подключение к бд
mongoose
  .connect(DB_HOST)
  .then(() => {
    //запуск веб сервера//
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
