const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();
const { PORT, DB_HOST } = process.env;
const connection = mongoose.connect(DB_HOST, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  dbName: "db-contacts",
});

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
      // console.log(process.env);
    });
  })
  .catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`)
  );
