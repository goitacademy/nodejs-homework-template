const mongoose = require("mongoose");
const app = require("./app");


const DB_URI='mongodb+srv://cluster-db:liudmylalala@cluster0.io3aciw.mongodb.net/db-contacts?retryWrites=true&w=majority';
const PORT= 3000;

mongoose.set("strictQuery", true);

mongoose.connect(DB_URI)
  .then(() => {
    app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch(error => {
    console.log(error.message)
    process.exit(1);
  });
