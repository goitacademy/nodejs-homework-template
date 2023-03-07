const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Nikita:91pYyiJ4jOFAq2v5@cluster0.o6glv77.mongodb.net/contacts_book?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log(DB_HOST);
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
