const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const PORT = 3000;
const DB_HOST =
  "mongodb+srv://AlexBerd:888Infinity@cluster0.svhdhds.mongodb.net/node-homework?retryWrites=true&w=majority";
mongoose.set("strictQuery", false);
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });

// app.listen(PORT, () => {
//   console.log(`Server running. Use our API on port: ${PORT}`);
// });
