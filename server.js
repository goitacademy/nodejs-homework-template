// lGiTTyySO8TS97OT

const app = require("./app");

const mongoose = require("mongoose");
const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(3000, () => {
      console.log("Database connection successful");
    })
  )
  .catch((error) => {
    console.error("Error connecting to MongoDB: ", error.message);
    process.exit(1);
  });
