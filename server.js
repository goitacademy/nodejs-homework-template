const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
  "mongodb+srv://taraskovalyshyn:BC1083KPbc9169ei@cluster0.tkez3bl.mongodb.net/contacts_reader?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("succsess");

    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
