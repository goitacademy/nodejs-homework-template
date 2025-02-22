const app = require('./app')

const mongoose = require("mongoose");

const {DB_HOST, PORT = 3000} = process.env;


mongoose.set('strictQuery', false);

mongoose.connect(DB_HOST)
    .then(() => {
    app.listen(PORT);
    console.log("Database connect");
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
