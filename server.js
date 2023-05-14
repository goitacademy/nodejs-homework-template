const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
