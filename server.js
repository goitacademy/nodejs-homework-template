const app = require("./app");

const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://White:NL6MZIovHzGLGAeV@cluster0.bgrvgy8.mongodb.net/contacts_reader?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

// подключение к бд
mongoose
  .connect(DB_HOST)
  .then(() => {
    //запуск веб сервера
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
