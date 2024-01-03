const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
  "mongodb+srv://Roman80:rzAnXHy4cqIPbVBh@cluster0.qwko4cb.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.set(`strictQuery`, true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3002);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// app.listen(3002, () => {
//   console.log("Server running. Use our API on port: 3002");
// });
