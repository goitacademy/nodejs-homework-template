const mongoose = require("mongoose");

const { PORT = 3000 } = process.env;
const  DB_HOST = "mongodb+srv://Bohdan_shveda:q5Eu1Iz68JOSIfib@cluster0.l2rijaf.mongodb.net/db_contacts?retryWrites=true&w=majority"
mongoose.set("strictQuery", true);

const app = require("./app");

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
