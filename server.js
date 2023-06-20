const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb);

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(
        `Database connection succesful. Use our API on port: ${PORT}`
      );
    });
  })
  .catch((err) =>
    console.log(`Database connection failed. Error message: ${err.message}`)
  );
