const app = require("./app");

const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const DB_HOST =
//   "mongodb+srv://user:12qazxsw21@cluster0.htdi11t.mongodb.net/db_contacts?retryWrites=true&w=majority";

const { DB_HOST, PORT = 3000 } = process.env;

// dotenv.config();
mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log("Database connection successful");
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });
