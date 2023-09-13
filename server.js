const app = require("./app");

const mongoose = require("mongoose");

const Host =
  "mongodb+srv://Sergey:Kx455k5i9rdOre0K@cluster0.s8fhtp1.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(Host)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
