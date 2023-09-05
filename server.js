const mongoose = require("mongoose");
const app = require("./app");

mongoose.set("strictQuery", true);

mongoose
  .connect(
    "mongodb+srv://Roman:12345roman@cluster0.drocj57.mongodb.net/db-contacts?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
