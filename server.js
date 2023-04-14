const mongoose = require("mongoose");

const app = require("./app");

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb, {
  autoIndex: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(
        `Database connection successfully. Use our API on port: ${PORT}`
      );
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
