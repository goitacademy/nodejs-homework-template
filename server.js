const mongoose = require("mongoose");

const {DB_HOST,PORT=3001} =process.env;

const app = require("./app");

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
  })
  .catch((error) => {
    console.log(error.message);
   process.exit(1);
  });



