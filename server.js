const app = require("./app");
const mongoose = require("mongoose");
const DB_HOST =
  "mongodb+srv://Levandosp:Worldoftank@cluster0.if2rhl0.mongodb.net/contacts_db?retryWrites=true&w=majority";

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000)
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

