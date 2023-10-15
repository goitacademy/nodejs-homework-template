const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Anna:Venito65@cluster0.r2pzy0u.mongodb.net/contacts_reader?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
