require('dotenv').config();
const mongoose = require("mongoose");
const app = require("./app");
const { PORT = 3000 } = process.env;
mongoose.set("strictQuery", true);

mongoose
  .connect('mongodb+srv://dimas_zd:X32fCHGr6VWrtOXj@cluster13.ecufgwe.mongodb.net/contacts')
  .then(() => {
    app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch((erro) => {
    console.log(erro.message);
    process.exit(1);
  });

