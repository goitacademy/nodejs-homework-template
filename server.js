const mongoose = require("mongoose");
const app = require("./app");

mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb+srv://nitro_06:1PalTScyKF5NN6qY@cluster0.rhsxq4c.mongodb.net/")
  .then(() =>
    app.listen(3000, () => {
      console.log("Database connection successful");
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });