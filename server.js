const app = require("./app");
const mongoose = require("mongoose");

const { DATA_BASE, PORT } = process.env;

mongoose
  .connect(DATA_BASE)
  .then(() =>
    app.listen(PORT, function () {
      console.log(
        `Database connection successful. Use our API on port: ${PORT}`
      );
    })
  )
  .catch((error) => {
    console.log(`Failed to connect to database. ${error.message}`);
    process.exit(1);
  });
