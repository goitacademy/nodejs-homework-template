const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
  process.env.DB_HOST ||
  "mongodb+srv://MaryDan:4W3dbq1I6FNwX1DA@cluster0.0qilsj8.mongodb.net/phonebook?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3000;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// 4W3dbq1I6FNwX1DA
// const { DB_HOST } = process.env;
