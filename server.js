const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
  "mongodb+srv://burmik:zzum!iZ$hGSS4f2@hw-goit.z1zfnha.mongodb.net/contacts-data?retryWrites=true&w=majority";

const PORT = 3000;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
