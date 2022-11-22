const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const connection = mongoose.connect(process.env.URLOFDB);

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(
        `Server running. Use our API on port: ${PORT}. Database connection successful.`
      );
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
