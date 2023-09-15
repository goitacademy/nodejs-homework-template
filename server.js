const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

// const DB_HOST =
//   "mongodb+srv://Alex:teqA9hZxoUVrfaMM@cluster0.zv7cz5b.mongodb.net/db-contacts?retryWrites=true&w=majority";

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.connect(DB_HOST)
  .then(() => {

    console.log("Database connection successful");

    app.listen(PORT, () => {
      console.log(`Database connection successful. Use our API on port: ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  })

// teqA9hZxoUVrfaMM
