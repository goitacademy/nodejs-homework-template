const mongoose = require("mongoose");
const app = require("./app");

const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log("Database connection successful");
      console.log("Server running. Use our API on port: 3000");
    })
  )
  .catch((error) => {
    console.log(error.massege);
    process.exit(1);
  });
