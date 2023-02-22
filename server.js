const mongoose = require("mongoose");
const app = require("./app");

// reading access key from process.env
const { DB_HOST, PORT = 3000 } = process.env;

// connection to the DB
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 3000");
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    // killing connect to DB if connect is not sucessful
    process.exit(1);
  });
