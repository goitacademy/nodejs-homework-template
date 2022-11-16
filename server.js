const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const { app } = require("./app");
const { HOST_DB, PORT = 3000 } = process.env;


(function () {
  try {
    mongoose.connect(HOST_DB);
    console.log("Database connection successful")
    app.listen(PORT, () => {
      console.log(PORT)
  })
  } catch (err) {
    console.log({ "Error": err.message });
    process.exit(1)
  }
})();


