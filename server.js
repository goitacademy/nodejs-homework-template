const app = require("./app");

const mongoose = require("mongoose");

const DB_URI =
  "mongodb+srv://pnekrasov1910:o3rWsBBXa5OTeEIl@cluster0.wfpzyqr.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
