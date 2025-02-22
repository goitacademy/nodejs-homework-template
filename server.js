const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

// mongoose.set("strictQuery", true);
const { DB_HOST, PORT = 3000 } = process.env;
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log(
      `Database connection successful! Use our API on port: ${PORT}.`
    );
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
