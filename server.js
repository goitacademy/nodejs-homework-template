const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Vitaly:goit2022@cluster0.kvjuldw.mongodb.net/db-contacts";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

//   app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });
