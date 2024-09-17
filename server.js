const mongoose = require("mongoose");

const app = require("./app");

mongoose.set("strictQuery", true);

const { BASE_URL } = process.env;

mongoose
  .connect(BASE_URL)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
