const mongoose = require("mongoose");
const app = require("./app");

const DB_HOST =
  "mongodb+srv://Specter:Vova2705@cluster0.wg5unuj.mongodb.net/db-contacts?retryWrites=true&w=majority";
const { PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connect success");
    app.listen(PORT);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
