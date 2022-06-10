const app = require("./app");
const mongoose = require("mongoose");

const { DB_HOST, POST = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(
    app.listen(POST, () => {
      console.log("Server running. Use our API on port: 3000");
    })
  )
  .then(console.log("Database connection successful"))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
