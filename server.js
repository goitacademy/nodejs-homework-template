const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
  "mongodb+srv://Nikita:4SJCAKecoUG0CbYF@cluster0.7evflcw.mongodb.net/contacts_reader?retryWrites=true&w=majority";

const PORT = 3000;

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
