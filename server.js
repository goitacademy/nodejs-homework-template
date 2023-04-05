const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://MaryDan:4W3dbq1I6FNwX1DA@cluster0.0qilsj8.mongodb.net/phonebook?retryWrites=true&w=majority";
const app = require("./app");
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => console.log(error.message));

// 4W3dbq1I6FNwX1DA
