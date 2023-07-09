const app = require("./app");
const mongoose = require("mongoose");

const { DB_HOST } = process.env;
// const DB_HOST =
//   "mongodb+srv://AK:wexFaneMg6CloDt6@cluster0.z6ykbc1.mongodb.net/db_contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
