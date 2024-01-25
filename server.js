// 0GtzUoFgm7OmxC6G
const mongoose = require("mongoose");
const app = require("./app");

const DB_HOST =
  "mongodb+srv://oleksiy:0GtzUoFgm7OmxC6G@cluster0.lsge9jo.mongodb.net/books_reader?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(3000))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
