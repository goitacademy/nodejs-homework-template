const mongoose = require("mongoose");
const app = require("./app");

const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((e) => {
    console.log("Database connection error:", e);
    process.exit(1);
  });
