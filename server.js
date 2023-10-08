const mongoose = require("mongoose");
const app = require("./app");
const { error } = require("./schema");
//PhHzLrFsBNB0Jy8f

const PORT = 5000;
const DB_HOST =
  "mongodb+srv://Zemfira:PhHzLrFsBNB0Jy8f@cluster0.hxnvwh5.mongodb.net/my-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
