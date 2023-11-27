//   xdnBsFqEZzOv2f0v
const mongoose = require("mongoose");
const app = require("./app");
const DB_HOST =
  "mongodb+srv://Antonina:xdnBsFqEZzOv2f0v@cluster0.lideuo9.mongodb.net/db_contacts?retryWrites=true&w=majority";
mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3300, () => {
      console.log("Database connection successful");
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
