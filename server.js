const app = require("./app");
const mongoose = require("mongoose");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", false);

mongoose
  .connect(
    "mongodb+srv://user:user123@cluster0.yukfpdx.mongodb.net/contacts_reader?retryWrites=true&w=majority"
  )
  .then(() => app.listen(PORT))
  .then(() => console.log("Database connection successful"))
  .catch((err) => {
    console.log(err.message);
    // якщо поилка, то завершує незакінчені процеси на сервері
    process.exit(1);
  });
