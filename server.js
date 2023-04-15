const app = require("./app");

const mongoose = require("mongoose");
const DB_HOST =
  "mongodb+srv://Alona:eCJDTRm8VPV5aLZ2@cluster0.ck2mily.mongodb.net/contacts_reader?retryWrites=true&w=majority";
// перед ? вставляэмо назву бд (contacts_reader), якщо ны, то створиться нова

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
    // закрити з невідомою помилкою
  });
