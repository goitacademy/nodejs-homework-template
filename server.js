const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Minaht:GiDeOn1983@cluster0.ccmrmnr.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.set("strictQwery", true);
mongoose
  .connect(DB_HOST)
  .then(app.listen(3000))
  .catch(() => console.log(error.message));

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });
