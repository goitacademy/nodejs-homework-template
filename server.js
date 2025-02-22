const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

const mongoose = require("mongoose");
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
