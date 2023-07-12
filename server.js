const app = require("./app");

const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Ruslan:m1n3KiEVI3Lb5qci@cluster0.bvujnmt.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
