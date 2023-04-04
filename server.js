const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://MaryDan:4W3dbq1I6FNwX1DA@cluster0.0qilsj8.mongodb.net/phonebook?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => console.log(error.message));

const app = require("./app");

// 4W3dbq1I6FNwX1DA
