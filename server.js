const app = require("./app");
// mongodb+srv://Serzh:QrFaNAeNdlVCk5CD@cluster0.fkv4dak.mongodb.net/db-contacts?retryWrites=true&w=majority
const mongoose = require("mongoose");
require("dotenv").config();
const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connection successful`);
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
