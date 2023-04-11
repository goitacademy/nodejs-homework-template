const mongoose = require("mongoose");
const app = require("./app");
const DB_HOST =
  "mongodb+srv://Maksym:litoha1988@cluster0.gvlstlh.mongodb.net/db-contacts?retryWrites=true&w=majority";
const PORT = 3000;
// const { PORT, DB_HOST } = process.env;

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
