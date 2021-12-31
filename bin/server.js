const app = require("../app");
const mongoose = require("mongoose");

const dotenv = require("dotenv"); // dotenv добавляет в переменное окружение (process.env) значение переменной DB_HOST, паролей, которые не отправляются на гитхаб
dotenv.config();

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
