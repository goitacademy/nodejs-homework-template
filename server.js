const app = require("./app");
const mongoose = require("mongoose");
const PORT = 3000;

const uriDb =
  "mongodb+srv://contactsMongoUser:tx4RDAxQGQghO2AL@cluster0.nowoij3.mongodb.net/db-contacts?retryWrites=true&w=majority";

const connection = mongoose.connect(uriDb);

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(
        `Server running. Use our API on port: ${PORT}. Database connection successful.`
      );
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
