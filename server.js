require('dotenv').config();
const mongoose = require("mongoose");
const app = require("./app");
//const { DB_HOST } = require("./.env.example");
mongoose
  .connect('mongodb+srv://dimas_zd:X32fCHGr6VWrtOXj@cluster13.ecufgwe.mongodb.net/contacts')
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((erro) => {
    console.log(erro.message);
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });
