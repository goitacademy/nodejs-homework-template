const mongoose = require("mongoose");
const app = require("./app");



const DB_HOST =
  "mongodb+srv://Oleksandr:wQylMtSYtfOk6cCn@cluster0.mkrqwuv.mongodb.net/contacts_reader";

mongoose
  .connect(DB_HOST)
  .then(() => {app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000");
  })})
  .catch(error=> {console.log(error.message)
  process.exit(1)});
