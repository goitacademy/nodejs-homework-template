const app = require("./app");
const { DB_HOST, PORT = 3000 } = process.env;
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

// подключение к бд
mongoose
  .connect(DB_HOST)
  .then(() => {
    //запуск веб сервера//
    app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
