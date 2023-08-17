const mongoose = require("mongoose");
const app = require("./app");

const DB_HOST =
  "mongodb+srv://Evgeniy:Sx8RF7K7mPA2OZr9@cluster0.y9d0vjg.mongodb.net/contacts_api?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    procces.exit(1);
  });
