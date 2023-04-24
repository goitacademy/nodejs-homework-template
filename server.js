require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

const { MONGO_CLOUD_CONNECTION, PORT = 3000 } = process.env;

mongoose
  .connect(MONGO_CLOUD_CONNECTION)
  .then(() => {
    console.log("Connected to the cloud database!");
    app.listen(PORT, () =>
      console.log(`The server is running on port ${PORT}`)
    );
  })
  .catch((e) => {
    console.error("Couldn't connect to the database");
    process.exit(1);
  });
