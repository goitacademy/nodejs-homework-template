const mongoose = require("mongoose");
// require("dotenv").config();

const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

// console.log("process.env.DB_HOST: ", process.env.DB_HOST);

// username: Bogdan
// password: P3k3VOVAR5gvOlcE

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch((error) => console.log(error.message));
