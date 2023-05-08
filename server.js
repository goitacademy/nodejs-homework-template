const app = require("./app");
const mongoose = require("mongoose");
// 3bYaYkJeaAFqpqNn

// const DB_HOST =
//   "mongodb+srv://Viacheslav:3bYaYkJeaAFqpqNn@cluster0.pf5qkht.mongodb.net/contacts_list";
const DB_HOST =
  "mongodb+srv://Viacheslav:3bYaYkJeaAFqpqNn@cluster0.pf5qkht.mongodb.net/contacts_list?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.messsage);
    process.exit(1);
  });
