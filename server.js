const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const uriDB = process.env.DB_HOST;

mongoose
  .connect(uriDB)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  });
