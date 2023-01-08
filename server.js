const app = require("./src/app");
const { mongoConnect } = require("./src/db/connection");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

mongoConnect()
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
