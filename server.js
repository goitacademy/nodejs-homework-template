const app = require("./app");
const mongoose = require("mongoose");
const DB_HOST =
  "mongodb+srv://Snizhana:VZcC6SZ0bB12isV7@cluster0.ncetjq6.mongodb.net/contacts_reader?retryWrites=true&w=majority";
mongoose.connect(DB_HOST)
  .then(() => console.log("Datanse connect success"))
  .catch(error => console.log(error.message));
// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });

// VZcC6SZ0bB12isV7
