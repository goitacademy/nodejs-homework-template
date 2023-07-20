const mongoose = require("mongoose");
const app = require("./app");

const DB_HOST =
  "mongodb+srv://Mamont:Uo7YHhFP7JezbKHa@cluster0.ovlu5iw.mongodb.net/db-contacts?retryWrites=true&w=majority";
const { PORT = 3000 } = process.env;
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
