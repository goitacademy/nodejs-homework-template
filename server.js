const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const uriDb = process.env.DB_URI;
const port = process.env.PORT;

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    console.log("Database connection successful");
    app.listen(port, () => {
      console.log("Server is running!");
    });
  })
  .catch(() => {
    console.log("Connection error!");
    process.exit(1);
  });
