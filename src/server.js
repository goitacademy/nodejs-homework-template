const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

connection
  .then(() => {
    app.listen(3000, function () {
      console.log(`Server running. Use our API on port: ${3000}`);
    });
  })
  .catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`)
  );
