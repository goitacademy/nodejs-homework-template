const mongoose = require("mongoose");

const app = require("./app");

const { URI_DB, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);

const connection = mongoose.connect(URI_DB);

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running. Use API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  });
