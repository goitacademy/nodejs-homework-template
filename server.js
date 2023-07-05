const app = require("./app");

require("dotenv").config();
const mongoUrl = process.env.HOST_URL;
const mongoose = require("mongoose");
mongoose.set("autoCreate", false);
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Database connection succesful");
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
