const mongoose = require("mongoose");
const app = require("./app");

// const DB_HOST =
//   "mongodb+srv://Natali:zVAh6QYuPBUI7kDe@cluster0.rtvnhpk.mongodb.net/contacts_reader?retryWrites=true&w=majority";
const { DB_HOST, PORT=3000 } = process.env;

mongoose
    .connect(DB_HOST)
    .then(() => {console.log("Database connection successful");
app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
}); }
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
