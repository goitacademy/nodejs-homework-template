require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb);

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

const app = require("./app");

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});
