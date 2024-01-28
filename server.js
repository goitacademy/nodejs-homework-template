const app = require("./app");

const mongoose = require("mongoose");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });

// mongoose
//   .connect(DB_HOST)
//   .then(() => console.log("Database connect success"))
//   .catch((error) => console.log(error.message));

// const DB_HOST =
//   "mongodb+srv://Andrew:ua6J5g4ERRNldi1e@cluster0.lbsy0vm.mongodb.net/db-contacts?retryWrites=true&w=majority";
