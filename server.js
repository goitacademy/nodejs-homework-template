const app = require("./app");

const mongoose = require("mongoose");

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

// UKl39FTb9topkEUl npm i mongoose
