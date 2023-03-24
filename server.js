const app = require("./app");
require("dotenv").config();

const mongoose = require("mongoose");
const DB_HOST =
  "mongodb+srv://Yevheniia:Yevheniia1983@cluster0.mrdwxn7.mongodb.net/contacts_book?retryWrites=true&w=majority";

const { PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database is connected"))
  .catch((err) => console.log(err.message));

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
