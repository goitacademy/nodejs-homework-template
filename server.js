const app = require("./app");
const { DB_HOST } = require("./config");
const mongoose = require("mongoose");

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
