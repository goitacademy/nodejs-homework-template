const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();
const { DB_HOST, PORT } = process.env;

mongoose.set("strictQuery", false);

const connection = mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Database connection successful`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
