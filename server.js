const mongoose = require("mongoose");
require("colors");
const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);
// const DB_HOST = "mongodb+srv://Evhenii:erOg7iRkCgIfPQgt@cluster0.rwpqagt.mongodb.net/db-contacts?retryWrites=true&w=majority";
// pass: erOg7iRkCgIfPQgt
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server running. Use our API on port: ${PORT} !!! Database success`.cyan
          .bold.italic
      );
    });
  })
  .catch((error) => {
    console.log(error.message.red.bold);
    process.exit(1);
  });

