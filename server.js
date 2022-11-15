const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const uriDb = process.env.HOST_DB;
const db = mongoose.connect(uriDb);
const PORT = process.env.PORT || 3333;

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((err) => {
  console.log(`Server not running. Error message: ${err.message}`);
  process.exit(1);
});
