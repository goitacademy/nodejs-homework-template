const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const app = require("./app");
mongoose.set("strictQuery", true);

const connection = mongoose.connect(process.env.DB_HOST);

connection
  .then(() => {
    app.listen(3000);
    console.log(`Database connection successful`);
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
