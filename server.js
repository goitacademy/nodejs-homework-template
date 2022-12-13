const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

// const DB_HOST = "mongodb+srv://Evhenii:erOg7iRkCgIfPQgt@cluster0.rwpqagt.mongodb.net/db-contacts?retryWrites=true&w=majority";
// pass: erOg7iRkCgIfPQgt
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
