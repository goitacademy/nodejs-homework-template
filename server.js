const mongoose = require("mongoose");
const app = require("./app");
// bs0E0UHJvKSvSReF

const DB_HOST =
  "mongodb+srv://Olena:bs0E0UHJvKSvSReF@cluster0.5zw2llw.mongodb.net/db-contacts?retryWrites=true&w=majority";
mongoose
  .connect(DB_HOST)
  .then(() => app.listen(3000))
  .catch((error) => console.log(error.message));
