const mongoose = require("mongoose");
const app = require("./app");

const { MONGODB_HOST, PORT } = process.env;

mongoose
  .connect(MONGODB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
