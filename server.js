const mongoose  = require("mongoose");
const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const DB_URL = process.env.MONGO_URL;

mongoose
  .connect(DB_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log("Database connection successful");
      console.log(`Database works on PORT ${PORT}`);
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });




