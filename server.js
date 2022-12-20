require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.MONGO_URL;

const connection = mongoose.connect(DB_HOST, {
  promiseLibrary: global.Promise,
  // useCreateIndex: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
});

connection
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
