require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app.js");

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log("Database connection error:", error);
    process.exit(1);
  });
