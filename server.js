const mongoose = require("mongoose");

const app = require("./app");
const DB_HOST =
  "mongodb+srv://savelieva0509:kapitowka@cluster0.jaqpcqf.mongodb.net/contactsReader?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

