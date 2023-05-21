const app = require("./app");

const mongoose = require("mongoose");
const DB_HOST =
  "mongodb+srv://mazurfacker:UKl39FTb9topkEUl@mazurfacker.awka0v2.mongodb.net/contacts?retryWrites=true&w=majority";
// const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
