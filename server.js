require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const DB_URI = process.env["DB.URI"];

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_URI)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running on PORT 3000");
    });
    console.log("Database connection established");
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
