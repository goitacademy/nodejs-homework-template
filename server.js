require("dotenv").config();
const mongoose = require("mongoose").set("strictQuery", true);
const { DB_HOST, PORT = 3000 } = process.env;

const app = require("./app");

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `It's alive!!!! (Server running. Use this API on port: ${PORT})`
      );
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
