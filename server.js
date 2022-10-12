const app = require("./app");
const mongoose = require("mongoose");

const uriDb =
  "mongodb+srv://MKuzich:MKuzich@cluster0.csbvxj0.mongodb.net/db-contacts";

const connection = mongoose.connect(uriDb, {
  promiseLibrary: global.Promise,
});

connection
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
