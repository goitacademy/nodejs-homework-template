const app = require("./app");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const DB_HOST =
  "mongodb+srv://glinskayam:WxUWQz39MJbHWeec@cluster0.ufgupe9.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
