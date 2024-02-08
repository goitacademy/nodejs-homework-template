const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const { DB_HOST: uriDb } = process.env;

const connection = mongoose.connect(uriDb, {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(
        `Server running. Access API here ► http://localhost:${PORT}/ \nFind methods in readme file available on my GitHub here ► https://github.com/SGlinkau/goit-nodejs-hw-02`
      );
    });
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
