// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });

// const DB_HOST =
//   "mongodb+srv://Anna:o5gMy3TCQcizUXNm@cluster0.zwdydkg.mongodb.net/contact_book?retryWrites=true&w=majority";

const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
