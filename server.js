const app = require("./app");

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const { DB_HOST } = process.env;

const connection = mongoose.connect(DB_HOST);

connection
  .then(
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
