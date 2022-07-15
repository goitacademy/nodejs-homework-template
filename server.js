const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const { DB_HOST, PORT = 3000 } = process.env;
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Data is successfully connected");
    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
