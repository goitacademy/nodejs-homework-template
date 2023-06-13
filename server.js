const mongoose = require("mongoose");
const app = require("./app");
mongoose
  .connect("mongodb+srv://nitro_06:1PalTScyKF5NN6qY@cluster0.rhsxq4c.mongodb.net/db-contacts")
  .then(() =>
    app.listen(3000, () => {
      console.log("Database connection successful", 3000);
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
