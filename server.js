const app = require("./app");
const mongoose = require("mongoose");

const dbb =
  "mongodb+srv://Yura:ft6wA1PRHcZP0JLe@cluster0.7fqh3.mongodb.net/contacts_reader?retryWrites=true&w=majority";
mongoose
  .connect(dbb)
  .then(() =>
    app.listen(4000, () => {
      console.log(" Port 4000");
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
